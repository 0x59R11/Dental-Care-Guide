import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';
import { lessonIds, routineGroups, diagramIds } from '../src/data/course';
import { questions } from '../src/data/quiz';
import { sources } from '../src/data/sources';
import { locales } from '../src/i18n/locales';
import { dictionaries } from '../src/i18n/ui';
import { diagrams } from '../src/i18n/diagrams';
const json = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const sourceIds = sources.map((source) => source.id);
const baseline = json('src/content/practice/en.json');
function nonempty(value: unknown): void {
  if (typeof value === 'string') {
    expect(value.trim()).not.toBe('');
    expect(value).not.toMatch(/\b(TODO|TBD|lorem ipsum|placeholder)\b/i);
  } else if (value && typeof value === 'object')
    Object.values(value).forEach(nonempty);
}
it('has unique, valid sources and balanced quiz definitions', () => {
  expect(new Set(sourceIds).size).toBe(sources.length);
  sources.forEach((source) => {
    expect(new URL(source.url).protocol).toBe('https:');
    expect(Object.keys(source.titles).sort()).toEqual([...locales].sort());
    nonempty(source);
  });
  expect(questions).toHaveLength(20);
  expect(new Set(questions.map((question) => question.id)).size).toBe(20);
  questions.forEach((question) => {
    expect(lessonIds).toContain(question.lessonId);
    expect(new Set(question.optionIds).size).toBe(4);
    expect(question.optionIds).toContain(question.correctOptionId);
  });
  const counts = [2, 4, 3, 3, 5, 3];
  lessonIds.forEach((id, index) =>
    expect(
      questions.filter((question) => question.lessonId === id),
    ).toHaveLength(counts[index]),
  );
  for (const [difficulty, count] of [
    ['foundational', 4],
    ['application', 10],
    ['challenging', 6],
  ] as const) {
    expect(
      questions.filter((question) => question.difficulty === difficulty),
    ).toHaveLength(count);
  }
  expect(questions.filter((question) => question.scenario)).toHaveLength(14);
});
for (const locale of locales)
  describe(locale, () => {
    it('has every UI key and diagram', () => {
      expect(Object.keys(dictionaries[locale]).sort()).toEqual(
        Object.keys(dictionaries.en).sort(),
      );
      nonempty(dictionaries[locale]);
      expect(Object.keys(diagrams[locale]).sort()).toEqual(
        [...diagramIds].sort(),
      );
      diagramIds.forEach((id) => {
        expect(diagrams[locale][id].steps.length).toBe(
          diagrams.en[id].steps.length,
        );
        nonempty(diagrams[locale][id]);
      });
    });
    it('has six complete lessons with source links', () => {
      const directory = `src/content/lessons/${locale}`;
      expect(readdirSync(directory).sort()).toEqual(
        lessonIds.map((id) => `${id}.mdx`).sort(),
      );
      for (const id of lessonIds) {
        const file = readFileSync(`${directory}/${id}.mdx`, 'utf8');
        const [, frontmatter, body] = file.split('---');
        const data = parse(frontmatter);
        expect(data.lessonId).toBe(id);
        expect(data.locale).toBe(locale);
        for (const field of [
          'title',
          'description',
          'question',
          'example',
          'takeaway',
          'curious',
        ])
          expect(data[field].length).toBeGreaterThan(10);
        expect(data.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(data.sourceIds.length).toBeGreaterThan(0);
        data.sourceIds.forEach((id: string) => expect(sourceIds).toContain(id));
        expect(body.trim().split(/\s+/).length).toBeGreaterThan(140);
        nonempty(data);
        nonempty(body);
      }
    });
    it('has matching routine cards and references', () => {
      const cards = json(`src/content/practice/${locale}.json`);
      expect(cards.map((card: { id: string }) => card.id)).toEqual(
        baseline.map((card: { id: string }) => card.id),
      );
      expect(new Set(cards.map((card: { id: string }) => card.id)).size).toBe(
        14,
      );
      cards.forEach((card: (typeof baseline)[number], index: number) => {
        expect(card.group).toBe(baseline[index].group);
        expect(routineGroups).toContain(card.group);
        expect(lessonIds).toContain(card.lessonId);
        expect(card.sourceIds).toEqual(baseline[index].sourceIds);
        card.sourceIds.forEach((id: string) => expect(sourceIds).toContain(id));
        for (const field of ['title', 'instruction', 'why'])
          expect(card[field].length).toBeGreaterThan(5);
        nonempty(card);
      });
    });
    it('has complete localized quiz wording', () => {
      const copy = json(`src/content/quiz/${locale}.json`);
      expect(Object.keys(copy).sort()).toEqual(
        questions.map((question) => question.id).sort(),
      );
      questions.forEach((question) => {
        const item = copy[question.id];
        expect(Object.keys(item.options).sort()).toEqual([
          ...question.optionIds,
        ]);
        expect(Object.keys(item).sort()).toEqual([
          'explanation',
          'options',
          'prompt',
        ]);
        const options = Object.values(item.options).map((value) =>
          String(value)
            .normalize('NFKC')
            .trim()
            .toLocaleLowerCase(locale)
            .replace(/\s+/g, ' '),
        );
        expect(new Set(options).size).toBe(question.optionIds.length);
        expect(typeof item.options[question.correctOptionId]).toBe('string');
        expect(item.prompt.length).toBeGreaterThan(10);
        expect(item.explanation.length).toBeGreaterThan(50);
        nonempty(item);
      });
    });
  });
