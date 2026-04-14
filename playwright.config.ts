import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './pw-tests',
  timeout: 60_000,
  expect: {
    timeout: 15_000,
  },
  retries: 1,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});

