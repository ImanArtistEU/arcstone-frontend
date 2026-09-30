import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export interface ConsentChoices {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface StoredConsent {
  version: number;
  timestamp: number;
  choices: ConsentChoices;
}

interface ConsentContextType {
  choices: ConsentChoices;
  hasResponded: boolean;
  bannerVisible: boolean;
  preferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: { analytics: boolean; marketing: boolean }) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const STORAGE_KEY = 'arcstone_consent';
const TTL_MS = 4320 * 60 * 60 * 1000; // 180 days

const defaultChoices: ConsentChoices = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function readStoredConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null;
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (!raw) {
    const match = document.cookie.match(new RegExp(`(?:^|; )${STORAGE_KEY}=([^;]*)`));
    raw = match ? decodeURIComponent(match[1]) : null;
  }
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== 1 || Date.now() - parsed.timestamp > TTL_MS) {
      return null;
    }
    return {
      version: parsed.version,
      timestamp: parsed.timestamp,
      choices: {
        necessary: true,
        analytics: Boolean(parsed.choices?.analytics),
        marketing: Boolean(parsed.choices?.marketing),
      },
    };
  } catch {
    return null;
  }
}

function writeStoredConsent(record: StoredConsent) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Ignore storage quota or access errors in private browsing modes
  }
  const encoded = encodeURIComponent(JSON.stringify(record));
  const maxAge = Math.floor(TTL_MS / 1000);
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${STORAGE_KEY}=${encoded}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}

function syncGtag(choices: ConsentChoices) {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === 'function') {
    gtag('consent', 'update', {
      analytics_storage: choices.analytics ? 'granted' : 'denied',
      ad_storage: choices.marketing ? 'granted' : 'denied',
      ad_user_data: choices.marketing ? 'granted' : 'denied',
      ad_personalization: choices.marketing ? 'granted' : 'denied',
    });
  }
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [record, setRecord] = useState<StoredConsent | null>(() => readStoredConsent());
  const [choices, setChoices] = useState<ConsentChoices>(() => readStoredConsent()?.choices ?? defaultChoices);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const hasResponded = record !== null;
  const bannerVisible = !hasResponded;

  useEffect(() => {
    syncGtag(choices);
  }, [choices]);

  const commitChoices = useCallback((newChoices: { analytics: boolean; marketing: boolean }) => {
    const full: ConsentChoices = {
      necessary: true,
      analytics: newChoices.analytics,
      marketing: newChoices.marketing,
    };
    const rec: StoredConsent = {
      version: 1,
      timestamp: Date.now(),
      choices: full,
    };
    writeStoredConsent(rec);
    setChoices(full);
    setRecord(rec);
    setPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => commitChoices({ analytics: true, marketing: true }), [commitChoices]);
  const rejectAll = useCallback(() => commitChoices({ analytics: false, marketing: false }), [commitChoices]);
  const savePreferences = useCallback(
    (prefs: { analytics: boolean; marketing: boolean }) => commitChoices(prefs),
    [commitChoices]
  );
  const openPreferences = useCallback(() => setPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setPreferencesOpen(false), []);

  const value = useMemo(
    () => ({
      choices,
      hasResponded,
      bannerVisible,
      preferencesOpen,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closePreferences,
    }),
    [choices, hasResponded, bannerVisible, preferencesOpen, acceptAll, rejectAll, savePreferences, openPreferences, closePreferences]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
};

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
};
