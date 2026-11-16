import { getCollection } from 'astro:content';
import { lessonIds, type LessonId, type RoutineGroup } from '../data/course';
import type { Locale } from '../i18n/locales';

export async function getLessons(locale: Locale) {
  const entries = await getCollection(
    'lessons',
    ({ data }) => data.locale === locale,
  );
  return entries.sort(
    (a, b) =>
      lessonIds.indexOf(a.data.lessonId) - lessonIds.indexOf(b.data.lessonId),
  );
}

export interface Recommendation {
  id: string;
  group: RoutineGroup;
  title: string;
  instruction: string;
  why: string;
  lessonId: LessonId;
  sourceIds: string[];
}

export interface QuestionCopy {
  prompt: string;
  options: Record<string, string>;
  explanation: string;
}

const practiceFiles = import.meta.glob<Recommendation[]>(
  '../content/practice/*.json',
  { eager: true, import: 'default' },
);
const quizFiles = import.meta.glob<Record<string, QuestionCopy>>(
  '../content/quiz/*.json',
  { eager: true, import: 'default' },
);

export function getRecommendations(locale: Locale): Recommendation[] {
  return practiceFiles[`../content/practice/${locale}.json`];
}

export function getQuizCopy(locale: Locale): Record<string, QuestionCopy> {
  return quizFiles[`../content/quiz/${locale}.json`];
}
