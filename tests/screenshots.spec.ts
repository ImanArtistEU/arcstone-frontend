import { test, expect } from '@playwright/test';

/**
 * True visual regression screenshot suite.
 * Captures pixel-level screenshots across representative viewports
 * (1440, 1280, 1024, 768, 430, 390) and compares against golden baselines.
 */

// Helper to stabilize rendering before taking screenshots
async function stabilizePage(page: any) {
  // Wait for fonts and network idle
  await page.waitForLoadState('networkidle');
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Pause all background videos at first frame to eliminate frame-rate divergence
    document.querySelectorAll('video').forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
  });
  // Brief pause for CSS transitions to settle
  await page.waitForTimeout(250);
}

test.describe('Key Surface Visual Screenshots', () => {
  const surfaces = [
    { name: 'homepage', path: '/' },
    { name: 'platform', path: '/platform' },
    { name: 'raise-capital', path: '/raise-capital' },
    { name: 'manage-ownership', path: '/manage-ownership' },
    { name: 'administer-investors', path: '/administer-investors' },
    { name: 'contact', path: '/contact' },
    { name: 'waitlist', path: '/waitlist' },
    { name: 'about-us', path: '/about-us' },
  ];

  for (const surface of surfaces) {
    test(`surface screenshot: ${surface.name}`, async ({ page }) => {
      await page.goto(surface.path);
      await stabilizePage(page);

      // Dismiss cookie banner so it doesn't mask page content during surface tests
      await page.evaluate(() => {
        const banner = document.querySelector('.cookie-banner');
        if (banner) (banner as HTMLElement).style.display = 'none';
      });

      await expect(page).toHaveScreenshot(`${surface.name}-viewport.png`, {
        animations: 'disabled',
        maxDiffPixelRatio: 0.05,
        fullPage: false,
      });
    });
  }
});

test.describe('Shared UI State Screenshots', () => {
  test('desktop navbar default state', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1440) <= 768) {
      test.skip();
      return;
    }
    await page.goto('/');
    await stabilizePage(page);

    const navbar = page.locator('#custom-navbar');
    await expect(navbar).toHaveScreenshot('navbar-desktop-default.png', {
      animations: 'disabled',
      maxDiffPixelRatio: 0.05,
    });
  });

  test('desktop navbar dropdown open state', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1440) <= 768) {
      test.skip();
      return;
    }
    await page.goto('/');
    await stabilizePage(page);

    const dropBtn = page.locator('.nav-drop-btn').first();
    await dropBtn.click();
    await page.waitForSelector('.nav-drop.open .nav-drop-panel', { state: 'visible' });
    await page.waitForTimeout(200);

    const navbar = page.locator('#custom-navbar');
    await expect(navbar).toHaveScreenshot('navbar-desktop-dropdown-open.png', {
      animations: 'disabled',
      maxDiffPixelRatio: 0.05,
    });
  });

  test('mobile navigation drawer open state', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1440) > 768) {
      test.skip();
      return;
    }
    await page.goto('/');
    await stabilizePage(page);

    const mobileToggle = page.locator('#custom-mobile-toggle');
    await mobileToggle.click();
    await page.waitForSelector('.custom-nav-menu.is-open', { state: 'visible' });
    await page.waitForTimeout(200);

    const navbar = page.locator('#custom-navbar');
    await expect(navbar).toHaveScreenshot('navbar-mobile-drawer-open.png', {
      animations: 'disabled',
      maxDiffPixelRatio: 0.05,
    });
  });

  test('footer component appearance', async ({ page }) => {
    await page.goto('/');
    await stabilizePage(page);

    const footer = page.locator('footer.footer');
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    await expect(footer).toHaveScreenshot('footer-component.png', {
      animations: 'disabled',
      maxDiffPixelRatio: 0.05,
    });
  });

  test('dark mode appearance', async ({ page }) => {
    await page.goto('/');
    await stabilizePage(page);

    await page.evaluate(() => {
      document.body.classList.add('dark-mode');
    });
    await page.waitForTimeout(250);

    await expect(page).toHaveScreenshot('homepage-dark-mode.png', {
      animations: 'disabled',
      maxDiffPixelRatio: 0.05,
      fullPage: false,
    });
  });

  test('cookie consent banner and modal state', async ({ page }) => {
    await page.goto('/');
    await stabilizePage(page);

    const banner = page.locator('.cookie-banner');
    if (await banner.isVisible()) {
      await expect(banner).toHaveScreenshot('cookie-banner.png', {
        animations: 'disabled',
        maxDiffPixelRatio: 0.05,
      });

      const manageBtn = page.locator('.cookie-btn-ghost').first();
      await manageBtn.click();
      await page.waitForSelector('.cookie-modal', { state: 'visible' });
      await page.waitForTimeout(200);

      const modal = page.locator('.cookie-modal');
      await expect(modal).toHaveScreenshot('cookie-modal-preferences.png', {
        animations: 'disabled',
        maxDiffPixelRatio: 0.05,
      });
    }
  });
});
