import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'desktop-1440',
      use: {
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'desktop-1280',
      use: {
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: 'tablet-1024',
      use: {
        viewport: { width: 1024, height: 768 },
      },
    },
    {
      name: 'tablet-768',
      use: {
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: 'mobile-430',
      use: {
        viewport: { width: 430, height: 932 },
        isMobile: true,
      },
    },
    {
      name: 'mobile-390',
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
      },
    },
    {
      name: 'mobile-375',
      use: {
        viewport: { width: 375, height: 667 },
        isMobile: true,
      },
    },
  ],
  webServer: {
    command: 'npm run preview -- --port 3000',
    port: 3000,
    reuseExistingServer: true,
  },
});
