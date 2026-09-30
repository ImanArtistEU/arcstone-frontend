import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/platform',
  '/raise-capital',
  '/manage-ownership',
  '/manage-distributions',
  '/administer-investors',
  '/start-ups',
  '/private-firms',
  '/about-us',
  '/careers',
  '/contact',
  '/waitlist',
  '/privacy-policy',
  '/terms-and-conditions',
  '/cookie-policy',
  '/legal-and-regulatory',
];

for (const route of ROUTES) {
  test(`Route "${route}" renders correctly without horizontal scroll`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState('domcontentloaded');

    // Confirm root elements render
    const navbar = page.locator('#custom-navbar');
    await expect(navbar).toBeVisible();

    const main = page.locator('#main-content');
    await expect(main).toBeVisible();

    const footer = page.locator('.footer');
    await expect(footer).toBeVisible();

    // Check for horizontal overflow (element wider than viewport)
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);
  });
}

test('Navbar dropdown opens on desktop viewports', async ({ page }, testInfo) => {
  if (testInfo.project.name.startsWith('mobile') || testInfo.project.name === 'tablet-768') {
    test.skip();
    return;
  }
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  const solutionsBtn = page.locator('.nav-drop-btn');
  await expect(solutionsBtn).toBeVisible();
  await solutionsBtn.click();

  const dropPanel = page.locator('.nav-drop-panel');
  await expect(dropPanel).toBeVisible();
  await expect(page.locator('.nav-drop-panel .ndp-col-header:has-text("Capital & Ownership")')).toBeVisible();
  await expect(page.locator('.nav-drop-panel .ndp-col-header:has-text("Administration")')).toBeVisible();
});

test('Mobile navigation menu drawer opens on mobile viewports', async ({ page }, testInfo) => {
  if (!testInfo.project.name.startsWith('mobile') && !testInfo.project.name.startsWith('tablet-768')) {
    test.skip();
    return;
  }
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  const mobileToggle = page.locator('#custom-mobile-toggle');
  await expect(mobileToggle).toBeVisible();
  await mobileToggle.click();

  const navMenu = page.locator('#custom-nav-menu');
  await expect(navMenu).toHaveClass(/is-open/);
});

test('Theme toggle switches body.dark-mode class', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  const isMobileDrawer = testInfo.project.name.startsWith('mobile') || testInfo.project.name === 'tablet-768';
  if (isMobileDrawer) {
    const mobileToggle = page.locator('#custom-mobile-toggle');
    await mobileToggle.click();
  }

  const themeToggle = page.locator('#custom-theme-toggle');
  await expect(themeToggle).toBeVisible();
  await themeToggle.click();

  const isDark = await page.evaluate(() => document.body.classList.contains('dark-mode'));
  expect(isDark).toBe(true);

  // Toggle back to light
  await themeToggle.click();
  const isLight = await page.evaluate(() => !document.body.classList.contains('dark-mode'));
  expect(isLight).toBe(true);
});

test('Cookie consent banner and preferences modal work', async ({ page }) => {
  // Clear consent cookie/localStorage first
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    document.cookie = 'arcstone_consent=; Max-Age=0; path=/;';
  });
  await page.reload();

  const banner = page.locator('.cookie-banner');
  await expect(banner).toBeVisible();

  // Click Preferences
  const prefBtn = page.locator('button:has-text("Preferences")');
  await prefBtn.click();

  const modal = page.locator('.cookie-modal-overlay');
  await expect(modal).toBeVisible();
  await expect(page.locator('.cookie-category-title:has-text("Strictly necessary")')).toBeVisible();
  await expect(page.locator('.cookie-category-title:has-text("Analytics & performance")')).toBeVisible();
});

test('Waitlist 3-step booking wizard renders qualification and calendar', async ({ page }, testInfo) => {
  await page.goto('/waitlist');
  await page.waitForLoadState('domcontentloaded');

  await expect(page.locator('.wl-stepper')).toBeVisible();
  if (testInfo.project.name.startsWith('mobile')) {
    await expect(page.locator('.wl-step-dot').first()).toBeVisible();
  } else {
    await expect(page.locator('.wl-step-label:has-text("Your details")')).toBeVisible();
    await expect(page.locator('.wl-step-label:has-text("Pick a time")')).toBeVisible();
    await expect(page.locator('.wl-step-label:has-text("Confirmed")')).toBeVisible();
  }

  // Step 1 Form fields
  await expect(page.locator('input[placeholder="First Name *"]')).toBeVisible();
  await expect(page.locator('input[placeholder="Work Email *"]')).toBeVisible();
});
