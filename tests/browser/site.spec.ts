import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { questions } from '../../src/data/quiz';
import { locales } from '../../src/i18n/locales';
import { lessonIds } from '../../src/data/course';

test('illustrated guide supports section navigation and resuming from Learn', async ({
  page,
}) => {
  await page.goto('en/learn/');
  await expect(page.locator('[data-resume]')).toBeHidden();
  await page.goto('en/learn/saliva-and-fluoride/');
  const sectionLink = page.locator('.lesson-contents a').last();
  const fragment = await sectionLink.getAttribute('href');
  await sectionLink.click();
  expect(new URL(page.url()).hash).toBe(fragment);
  await expect(page.locator(fragment!)).toBeInViewport();
  await expect(page.locator('.lesson-pagination .next-lesson')).toContainText(
    'When dental problems progress',
  );
  await page.getByRole('button', { name: 'Mark as read', exact: true }).click();
  await page.goto('en/learn/');
  await expect(page.locator('[data-resume]')).toHaveAttribute(
    'href',
    /saliva-and-fluoride\/$/,
  );
  await expect(page.locator('[data-progress-count]')).toContainText('1 of 6');
  await page.locator('[data-resume]').click();
  await expect(page).toHaveURL(/saliva-and-fluoride\/$/);
  await page.goto('de/learn/');
  await expect(page.locator('[data-resume]')).toHaveAttribute(
    'href',
    /de\/learn\/saliva-and-fluoride\/$/,
  );
  await page.locator('[data-reset-progress]').click();
  await expect(page.locator('[data-resume]')).toBeHidden();
});

test('every localized lesson has working section links and inline diagrams without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  for (const locale of locales) {
    for (const lesson of lessonIds) {
      await page.goto(`${locale}/learn/${lesson}/`);
      const links = page.locator('.lesson-contents a');
      expect(await links.count()).toBeGreaterThanOrEqual(3);
      for (const link of await links.all()) {
        const fragment = await link.getAttribute('href');
        const target = page.locator(
          `[id=${JSON.stringify(fragment!.slice(1))}]`,
        );
        await expect(target).toHaveCount(1);
        await expect(target).toHaveText((await link.textContent())!);
      }
      await expect(page.locator('.lesson-content [data-diagram]')).toHaveCount(
        lesson === 'when-problems-progress' ? 3 : 1,
      );
      await expect(
        page.locator('.lesson-content > [data-diagram] ~ h2').first(),
      ).toBeVisible();
      await expect(page.locator('.static-label').first()).toBeVisible();
    }
  }
  await context.close();
});

test('full learning, practice and keyboard quiz journey', async ({ page }) => {
  await page.goto('en/');
  await page
    .getByRole('link', { name: 'Explore the lessons', exact: true })
    .click();
  await page
    .getByRole('link', { name: /^Read lesson/ })
    .first()
    .click();
  await page.getByRole('button', { name: 'Mark as read', exact: true }).click();
  await expect(page.locator('[data-progress-count]')).toHaveText(
    '1 of 6 lessons read',
  );
  await page.locator('[data-step="2"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-step="2"]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page
    .locator('.module-nav')
    .getByRole('link', { name: /Practice/ })
    .click();
  await page.locator('.module-nav').getByRole('link', { name: /Test/ }).click();
  await page.locator('[data-start]').click();
  await expect(page.locator('[data-check]')).toBeDisabled();
  for (const [index, question] of questions.entries()) {
    await expect(page.locator('[data-question-heading]')).toBeFocused();
    const answer =
      index === 0
        ? question.optionIds.find((id) => id !== question.correctOptionId)!
        : question.correctOptionId;
    await page.locator(`input[value="${answer}"]`).focus();
    await page.keyboard.press('Space');
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-check]')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-feedback]')).toBeVisible();
    await expect(page.locator('[data-next]')).toBeFocused();
    await expect(page.locator('input').first()).toBeDisabled();
    await page.keyboard.press('Enter');
  }
  await expect(page.locator('[data-score]')).toHaveText(
    `You answered ${questions.length - 1} of ${questions.length} questions correctly.`,
  );
  await expect(page.locator('[data-review-lesson]:visible')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('[data-score]')).toContainText(
    `${questions.length - 1} of ${questions.length}`,
  );
  await page.locator('[data-review-lesson]:visible a').click();
  await expect(page).toHaveURL(/understanding-teeth/);
  await page.goto('en/test/');
  await page.locator('[data-retry]').click();
  await expect(page.locator('[data-check]')).toBeDisabled();
});

test('quiz preserves selection, feedback and position across refresh and language', async ({
  page,
}) => {
  await page.goto('en/test/');
  await page.locator('[data-start]').click();
  const order = await page
    .locator('input[name="answer"]')
    .evaluateAll((inputs) =>
      inputs.map((input) => (input as HTMLInputElement).value),
    );
  await page.locator('input[value="a"]').check();
  await page.reload();
  expect(
    await page
      .locator('input[name="answer"]')
      .evaluateAll((inputs) =>
        inputs.map((input) => (input as HTMLInputElement).value),
      ),
  ).toEqual(order);
  await expect(page.locator('input[value="a"]')).toBeChecked();
  await page.locator('#language-select').selectOption('de');
  await expect(page).toHaveURL(/de\/test\//);
  expect(
    await page
      .locator('input[name="answer"]')
      .evaluateAll((inputs) =>
        inputs.map((input) => (input as HTMLInputElement).value),
      ),
  ).toEqual(order);
  await expect(page.locator('input[value="a"]')).toBeChecked();
  await page.locator('[data-check]').click();
  await page.locator('#language-select').selectOption('uk');
  await expect(page.locator('[data-feedback]')).toBeVisible();
  await page.locator('[data-next]').click();
  await page.reload();
  await expect(page.locator('[data-quiz-content]>.eyebrow')).toContainText(
    `2 / ${questions.length}`,
  );
});

test('progress, theme, resume and route anchor preferences', async ({
  page,
}) => {
  await page.goto('en/learn/prevention/');
  await page.locator('[data-mark-read]').click();
  await page.locator('#theme-select').selectOption('dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.locator('#language-select').selectOption('ru');
  await expect(page.locator('[data-mark-read]')).toBeDisabled();
  await page.goto('ru/');
  await expect(page.locator('[data-resume]')).toHaveAttribute(
    'href',
    /ru\/learn\/prevention\//,
  );
  await page.goto('ru/practice/#evening');
  await page.locator('#language-select').selectOption('de');
  await expect(page).toHaveURL(/de\/practice\/#evening/);
  await page.goto('de/learn/');
  await page.locator('[data-reset-progress]').click();
  await expect(page.locator('[data-learning-meter]')).toHaveJSProperty(
    'value',
    0,
  );
  await page.goto('de/');
  await expect(page.locator('[data-resume]')).toBeHidden();
  await page.locator('#theme-select').selectOption('system');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).not.toHaveAttribute('data-theme');
  await expect(page.locator('body')).toHaveCSS(
    'background-color',
    'rgb(21, 37, 36)',
  );
  await page.locator('#theme-select').selectOption('light');
  await expect(page.locator('body')).toHaveCSS(
    'background-color',
    'rgb(250, 248, 242)',
  );
});

test('entry detection never overrides an explicit URL', async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'languages', {
      value: ['fr', 'DE-at', 'ru'],
    }),
  );
  await page.goto('./', { waitUntil: 'commit' });
  await expect(page).toHaveURL(/de\/$/);
  await page.locator('#language-select').selectOption('ru');
  await expect(page).toHaveURL(/ru\/$/);
  await page.goto('./', { waitUntil: 'commit' });
  await expect(page).toHaveURL(/ru\/$/);
  await page.goto('uk/learn/prevention/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
});

test('blocked and malformed storage do not break the app', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => '{broken';
    Storage.prototype.setItem = () => {
      throw new Error('blocked');
    };
  });
  await page.goto('en/learn/prevention/');
  await page.locator('[data-mark-read]').click();
  await expect(page.locator('[data-storage-warning]')).toBeVisible();
  await page.goto('en/test/');
  await page.locator('[data-start]').click();
  await page.locator('input[value="a"]').check();
  await page.locator('[data-check]').click();
  await expect(page.locator('[data-feedback]')).toBeVisible();
  await expect(page.locator('[data-quiz-storage]')).toBeVisible();
});

for (const locale of locales) {
  test(`${locale}: 320px, enlarged text, no overflow and accessible page types`, async ({
    page,
    browserName,
  }) => {
    test.setTimeout(180000);
    test.skip(
      browserName !== 'chromium',
      'Full accessibility sweep runs in Chromium; other browsers cover flows.',
    );
    await page.setViewportSize({ width: 320, height: 780 });
    for (const path of [
      '',
      'learn/',
      ...lessonIds.map((id) => `learn/${id}/`),
      'practice/',
      'test/',
      'sources/',
    ]) {
      await page.goto(`${locale}/${path}`);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      if (path === 'test/') await page.locator('[data-start]').click();
      for (const theme of ['light', 'dark']) {
        await page.locator('#theme-select').selectOption(theme);
        const result = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(result.violations, `${locale}/${path} ${theme}`).toEqual([]);
      }
      await page.addStyleTag({ content: 'html {font-size: 200%}' });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  });
  test(`${locale}: reading without JavaScript`, async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      baseURL,
    });
    const page = await context.newPage();
    await page.goto(`${locale}/learn/understanding-teeth/`);
    await expect(page.locator('.prose')).toBeVisible();
    await expect(page.locator('.static-label')).toHaveCount(4);
    await expect(page.locator('[data-step]').first()).toBeHidden();
    await page.goto(`${locale}/practice/`);
    await expect(page.locator('.practice-card')).toHaveCount(14);
    await page.goto(`${locale}/test/`);
    await expect(page.locator('main noscript')).toBeVisible();
    await page.goto('./', { waitUntil: 'commit' });
    await expect(page.locator('[data-entry-language]')).toHaveCount(4);
    await context.close();
  });
}

for (const locale of locales) {
  test(`${locale}: quiz feedback, single selection, review links and perfect score`, async ({
    page,
    browserName,
  }) => {
    await page.setViewportSize({ width: 320, height: 780 });
    await page.goto(`${locale}/test/`);
    await page.locator('[data-start]').click();
    for (const question of questions) {
      await expect(page.locator('[data-feedback]')).toBeHidden();
      await expect(page.locator('[data-check]')).toBeDisabled();
      const incorrect = question.optionIds.find(
        (id) => id !== question.correctOptionId,
      )!;
      await page.locator(`input[value="${incorrect}"]`).check();
      await page.locator(`input[value="${question.correctOptionId}"]`).check();
      await expect(page.locator('input:checked')).toHaveCount(1);
      const correctText = await page
        .locator(`input[value="${question.correctOptionId}"] + span`)
        .textContent();
      await page.locator('[data-check]').click();
      await expect(page.locator('[data-feedback]')).toHaveClass(
        /(?:^| )correct(?: |$)/,
      );
      await expect(page.locator('[data-feedback]')).toContainText(correctText!);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      if (browserName === 'chromium' && question.id === questions[0].id) {
        for (const theme of ['light', 'dark']) {
          await page.locator('#theme-select').selectOption(theme);
          expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
            [],
          );
        }
      }
      await expect(page.locator('[data-feedback] a')).toHaveAttribute(
        'href',
        new RegExp(`/${locale}/learn/${question.lessonId}/$`),
      );
      await page.locator('[data-next]').click();
    }
    await expect(page.locator('[data-score]')).toContainText(
      String(questions.length),
    );
    await expect(page.locator('[data-all-correct]')).toBeVisible();
    await expect(page.locator('[data-topics]')).toBeHidden();
    if (browserName === 'chromium')
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.locator('details summary').click();
    await expect(page.locator('.answer-review a')).toHaveCount(
      questions.length,
    );
    await page.locator('[data-retry]').click();
    await expect(page.locator('input:checked')).toHaveCount(0);
    await expect(page.locator('[data-feedback]')).toBeHidden();
  });
  test(`${locale}: new diagrams remain readable without JavaScript`, async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      baseURL,
      viewport: { width: 320, height: 780 },
    });
    const page = await context.newPage();
    await page.goto(`${locale}/learn/when-problems-progress/`);
    await expect(page.locator('[data-diagram]')).toHaveCount(3);
    await expect(page.locator('.static-label')).toHaveCount(12);
    for (const label of await page.locator('.static-label').all())
      await expect(label).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await context.close();
  });
}

test('quiz renders stored shuffled order and retry creates a new valid attempt', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0;
  });
  await page.goto('en/test/');
  await page.locator('[data-start]').click();
  const displayedOrder = () =>
    page
      .locator('input')
      .evaluateAll((inputs) =>
        inputs.map((input) => (input as HTMLInputElement).value),
      );
  expect(await displayedOrder()).toEqual(['b', 'c', 'd', 'a']);
  for (const question of questions) {
    await page.locator(`input[value="${question.correctOptionId}"]`).check();
    await page.locator('[data-check]').click();
    await page.locator('[data-next]').click();
  }
  await page.evaluate(() => {
    Math.random = () => 0.999;
  });
  await page.locator('[data-retry]').click();
  expect(await displayedOrder()).toEqual(['a', 'b', 'c', 'd']);
});
