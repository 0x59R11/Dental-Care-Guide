import type { LessonId } from './course';

export const quizVersion = 3;

interface Question {
  id: string;
  lessonId: LessonId;
  optionIds: readonly string[];
  correctOptionId: string;
}

export const questions = [
  {
    id: 'tooth-enamel',
    lessonId: 'understanding-teeth',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'a',
  },
  {
    id: 'tooth-pulp',
    lessonId: 'understanding-teeth',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'b',
  },
  {
    id: 'plaque-acids',
    lessonId: 'how-cavities-develop',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'c',
  },
  {
    id: 'early-minerals',
    lessonId: 'how-cavities-develop',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'd',
  },
  {
    id: 'plaque-between-meals',
    lessonId: 'how-cavities-develop',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'a',
  },
  {
    id: 'plaque-low-sugar',
    lessonId: 'how-cavities-develop',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'b',
  },
  {
    id: 'sipping-frequency',
    lessonId: 'sugar-food-and-acids',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'b',
  },
  {
    id: 'sugar-free-acid',
    lessonId: 'sugar-food-and-acids',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'a',
  },
  {
    id: 'dual-exposure',
    lessonId: 'sugar-food-and-acids',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'c',
  },
  {
    id: 'saliva-role',
    lessonId: 'saliva-and-fluoride',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'd',
  },
  {
    id: 'fluoride-role',
    lessonId: 'saliva-and-fluoride',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'c',
  },
  {
    id: 'dry-mouth',
    lessonId: 'saliva-and-fluoride',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'b',
  },
  {
    id: 'early-detection',
    lessonId: 'when-problems-progress',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'a',
  },
  {
    id: 'lost-structure',
    lessonId: 'when-problems-progress',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'c',
  },
  {
    id: 'dark-spot',
    lessonId: 'when-problems-progress',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'd',
  },
  {
    id: 'lesion-arrest',
    lessonId: 'when-problems-progress',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'b',
  },
  {
    id: 'stable-lesion',
    lessonId: 'when-problems-progress',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'd',
  },
  {
    id: 'brushing-routine',
    lessonId: 'prevention',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'd',
  },
  {
    id: 'between-teeth',
    lessonId: 'prevention',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'b',
  },
  {
    id: 'tailored-care',
    lessonId: 'prevention',
    optionIds: ['a', 'b', 'c', 'd'],
    correctOptionId: 'a',
  },
] as const satisfies readonly Question[];
