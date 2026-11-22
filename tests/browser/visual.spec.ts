import { test } from '@playwright/test';
import { questions } from '../../src/data/quiz';

test('illustrated page layouts', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium');
  for (const [locale, width, theme] of [
    ['en', 1280, 'light'],
    ['de', 320, 'dark'],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['', 'learn/', 'practice/', 'test/', 'sources/']) {
      await page.goto(`${locale}/${route}`);
      await page.locator('#theme-select').selectOption(theme);
      await page.screenshot({
        path: `artifacts/refresh-${locale}-${theme}-${route.replace('/', '') || 'home'}.png`,
        fullPage: true,
      });
    }
  }
});
test('layout inspection', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium');
  await page.goto('en/');
  await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('de/learn/understanding-teeth/');
  await page.screenshot({
    path: 'artifacts/lesson-mobile.png',
    fullPage: true,
  });
  await page.goto('en/');
  await page.addStyleTag({ content: 'html {font-size:200%}' });
  await page.screenshot({ path: 'artifacts/enlarged.png', fullPage: true });
});

test('expanded diagrams and quiz visual inspection', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium');
  for (const [locale, width, theme] of [
    ['de', 320, 'light'],
    ['en', 1280, 'dark'],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${locale}/learn/when-problems-progress/`);
    await page.locator('#theme-select').selectOption(theme);
    for (const [index, figure] of (
      await page.locator('[data-diagram]').all()
    ).entries()) {
      await figure.screenshot({
        path: `artifacts/${locale}-${theme}-diagram-${index}.png`,
      });
    }
    await page.locator('.lesson-content details summary').click();
    await page.locator('.lesson-content details').screenshot({
      path: `artifacts/${locale}-${theme}-optional-detail.png`,
    });
    for (const lesson of [
      'prevention',
      'sugar-food-and-acids',
      'saliva-and-fluoride',
    ]) {
      await page.goto(`${locale}/learn/${lesson}/`);
      await page
        .locator('[data-diagram]')
        .screenshot({ path: `artifacts/${locale}-${theme}-${lesson}.png` });
    }
  }
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('uk/learn/how-cavities-develop/');
  await page
    .locator('[data-diagram]')
    .screenshot({ path: 'artifacts/plaque-mobile.png' });
  await page.goto('de/test/');
  await page.locator('[data-start]').click();
  await page.locator('input[value="b"]').check();
  await page.locator('[data-check]').click();
  await page
    .locator('[data-quiz-content]')
    .screenshot({ path: 'artifacts/quiz-feedback-mobile.png' });
  for (const question of questions.slice(1)) {
    await page.locator('[data-next]').click();
    await page.locator(`input[value="${question.correctOptionId}"]`).check();
    await page.locator('[data-check]').click();
  }
  await page.locator('[data-next]').click();
  await page
    .locator('[data-quiz-content]')
    .screenshot({ path: 'artifacts/quiz-results-mobile.png' });
});
