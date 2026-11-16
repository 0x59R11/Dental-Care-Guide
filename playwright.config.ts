import { defineConfig, devices } from '@playwright/test';
const base = (process.env.BASE_PATH ?? '/Dental-Care-Guide').replace(/\/$/, '');
export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3,
  timeout: 45000,
  expect: { timeout: 7000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: `http://127.0.0.1:4387${base}/`, trace: 'retain-on-failure' },
  webServer: {
    command: 'npm run preview -- --ignore-lock --host 127.0.0.1 --port 4387',
    url: `http://127.0.0.1:4387${base}/en/`,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: process.env.BROWSER_PATH
          ? { executablePath: process.env.BROWSER_PATH }
          : undefined,
      },
    },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
