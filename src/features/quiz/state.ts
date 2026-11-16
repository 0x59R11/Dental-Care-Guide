import { questions, quizVersion } from '../../data/quiz';
export interface Attempt {
  version: number;
  index: number;
  answers: string[];
  selected: string | null;
  optionOrders: string[][];
}
export function freshAttempt(random: () => number = Math.random): Attempt {
  const optionOrders = questions.map((question) => {
    const order: string[] = [...question.optionIds];
    for (let index = order.length - 1; index > 0; index--) {
      const swap = Math.floor(random() * (index + 1));
      [order[index], order[swap]] = [order[swap], order[index]];
    }
    return order;
  });
  return {
    version: quizVersion,
    index: 0,
    answers: [],
    selected: null,
    optionOrders,
  };
}
export function restoreAttempt(value: unknown): Attempt | null {
  if (!value || typeof value !== 'object') return null;
  const state = value as Attempt;
  if (
    state.version !== quizVersion ||
    !Number.isInteger(state.index) ||
    state.index < 0 ||
    state.index > questions.length ||
    !Array.isArray(state.answers) ||
    !Array.isArray(state.optionOrders) ||
    state.optionOrders.length !== questions.length ||
    !state.optionOrders.every(
      (order, index) =>
        Array.isArray(order) &&
        order.length === questions[index].optionIds.length &&
        new Set(order).size === order.length &&
        order.every(
          (id) =>
            typeof id === 'string' &&
            (questions[index].optionIds as readonly string[]).includes(id),
        ),
    )
  )
    return null;
  if (
    state.answers.length < state.index ||
    state.answers.length > Math.min(state.index + 1, questions.length)
  )
    return null;
  if (
    !state.answers.every(
      (answer, index) =>
        typeof answer === 'string' &&
        (questions[index].optionIds as readonly string[]).includes(answer),
    )
  )
    return null;
  if (state.index === questions.length)
    return state.selected === null
      ? {
          ...state,
          answers: [...state.answers],
          optionOrders: state.optionOrders.map((order) => [...order]),
        }
      : null;
  const options: readonly string[] = questions[state.index].optionIds;
  if (
    state.selected !== null &&
    (typeof state.selected !== 'string' || !options.includes(state.selected))
  )
    return null;
  if (
    state.answers.length > state.index &&
    state.selected !== state.answers[state.index]
  )
    return null;
  return {
    ...state,
    answers: [...state.answers],
    optionOrders: state.optionOrders.map((order) => [...order]),
  };
}
export function selectAnswer(state: Attempt, option: string): Attempt {
  const question = questions[state.index];
  if (
    !question ||
    state.answers.length !== state.index ||
    !(question.optionIds as readonly string[]).includes(option)
  )
    return state;
  return { ...state, selected: option };
}
export function submitAnswer(state: Attempt): Attempt {
  if (
    state.selected === null ||
    state.answers.length !== state.index ||
    !questions[state.index]
  )
    return state;
  if (
    !(questions[state.index].optionIds as readonly string[]).includes(
      state.selected,
    )
  )
    return state;
  return { ...state, answers: [...state.answers, state.selected] };
}
export function nextQuestion(state: Attempt): Attempt {
  return state.index < questions.length &&
    state.answers.length === state.index + 1
    ? { ...state, index: state.index + 1, selected: null }
    : state;
}
export function score(state: Attempt): number {
  return state.answers.filter(
    (answer, index) => answer === questions[index]?.correctOptionId,
  ).length;
}
export function reviewLessons(state: Attempt): string[] {
  return [
    ...new Set(
      questions
        .filter(
          (question, index) =>
            index < state.answers.length &&
            state.answers[index] !== question.correctOptionId,
        )
        .map((question) => question.lessonId),
    ),
  ];
}
