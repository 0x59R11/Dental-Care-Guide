export const lessonIds = [
  'understanding-teeth',
  'how-cavities-develop',
  'sugar-food-and-acids',
  'saliva-and-fluoride',
  'when-problems-progress',
  'prevention',
] as const;

export type LessonId = (typeof lessonIds)[number];
export const routineGroups = [
  'morning',
  'day',
  'evening',
  'long-term',
] as const;
export type RoutineGroup = (typeof routineGroups)[number];

export const diagramIds = [...lessonIds, 'dark-spots', 'lesion-depth'] as const;
export type DiagramId = (typeof diagramIds)[number];
