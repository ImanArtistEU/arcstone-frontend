import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ConsentSettings {
  ad_storage: boolean;
  ad_user_data: boolean;
  ad_personalization: boolean;
  analytics_storage: boolean;
  functionality_storage: boolean;
  security_storage: boolean;
}

interface ConsentContextType {
  consent: ConsentSettings | null;
  hasDecided: boolean;
  isPreferencesOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  acceptAll: () => void;
  denyAll: () => void;
  savePreferences: (settings: Partial<ConsentSettings>) => void;
}

const defaultConsent: ConsentSettings = {
  ad_storage: false,
  ad_user_data: false,
  ad_personalization: false,
  analytics_storage: false,
  functionality_storage: true,
  security_storage: true,
};

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<ConsentSettings | null>(null);
  const [hasDecided, setHasDecided] = useState<boolean>(true); // start closed to avoid flash, then check storage
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('arcstone_consent');
      if (stored) {
        const parsed = JSON.parse(stored);
        setConsent(parsed);
        setHasDecided(true);
        updateGtagConsent(parsed);
      } else {
        setHasDecided(false);
      }
    } catch {
      setHasDecided(false);
    }
  }, []);

  const updateGtagConsent = (settings: ConsentSettings) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        ad_storage: settings.ad_storage ? 'granted' : 'denied',
        ad_user_data: settings.ad_user_data ? 'granted' : 'denied',
        ad_personalization: settings.ad_personalization ? 'granted' : 'denied',
        analytics_storage: settings.analytics_storage ? 'granted' : 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted',
      });
    }
  };

  const acceptAll = () => {
    const fullConsent: ConsentSettings = {
      ad_storage: true,
      ad_user_data: true,
      ad_personalization: true,
      analytics_storage: true,
      functionality_storage: true,
      security_storage: true,
    };
    setConsent(fullConsent);
    setHasDecided(true);
    setIsPreferencesOpen(false);
    try {
      localStorage.setItem('arcstone_consent', JSON.stringify(fullConsent));
    } catch {}
    updateGtagConsent(fullConsent);
  };

  const denyAll = () => {
    const minimalConsent: ConsentSettings = {
      ...defaultConsent,
    };
    setConsent(minimalConsent);
    setHasDecided(true);
    setIsPreferencesOpen(false);
    try {
      localStorage.setItem('arcstone_consent', JSON.stringify(minimalConsent));
    } catch {}
    updateGtagConsent(minimalConsent);
  };

  const savePreferences = (settings: Partial<ConsentSettings>) => {
    const updated: ConsentSettings = {
      ...defaultConsent,
      ...consent,
      ...settings,
      functionality_storage: true,
      security_storage: true,
    };
    setConsent(updated);
    setHasDecided(true);
    setIsPreferencesOpen(false);
    try {
      localStorage.setItem('arcstone_consent', JSON.stringify(updated));
    } catch {}
    updateGtagConsent(updated);
  };

  return (
    <ConsentContext.Provider
      value={{
        consent,
        hasDecided,
        isPreferencesOpen,
        openPreferences: () => setIsPreferencesOpen(true),
        closePreferences: () => setIsPreferencesOpen(false),
        acceptAll,
        denyAll,
        savePreferences,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
};
