import { describe, expect, it } from 'vitest';
import { questions, quizVersion } from '../src/data/quiz';
import {
  freshAttempt,
  nextQuestion,
  restoreAttempt,
  reviewLessons,
  score,
  selectAnswer,
  submitAnswer,
} from '../src/features/quiz/state';
describe('quiz state', () => {
  it('requires an answer, allows changes, and locks exactly one submission', () => {
    let state = freshAttempt();
    expect(submitAnswer(state)).toBe(state);
    expect(nextQuestion(state)).toBe(state);
    expect(selectAnswer(state, 'invalid')).toBe(state);
    state = selectAnswer(selectAnswer(state, 'b'), 'a');
    expect(state.selected).toBe('a');
    state = submitAnswer(state);
    expect(score(state)).toBe(1);
    expect(submitAnswer(state)).toBe(state);
    expect(selectAnswer(state, 'b')).toBe(state);
    state = nextQuestion(state);
    expect(state.index).toBe(1);
    expect(state.selected).toBeNull();
    expect(nextQuestion(state)).toBe(state);
  });
  it.each([true, false])(
    'scores a full attempt: all correct = %s',
    (correct) => {
      let state = freshAttempt();
      for (const question of questions) {
        const answer = correct
          ? question.correctOptionId
          : question.optionIds.find((id) => id !== question.correctOptionId)!;
        state = nextQuestion(submitAnswer(selectAnswer(state, answer)));
        expect(restoreAttempt(JSON.parse(JSON.stringify(state)))).toEqual(
          state,
        );
      }
      expect(state.index).toBe(questions.length);
      expect(score(state)).toBe(correct ? questions.length : 0);
      expect(reviewLessons(state)).toHaveLength(correct ? 0 : 6);
      expect(nextQuestion(state)).toBe(state);
      expect(freshAttempt().answers).toEqual([]);
    },
  );
  it.each([
    null,
    {},
    [],
    'bad',
    { version: 0, index: 0, answers: [], selected: null },
    { version: quizVersion, index: 99, answers: [], selected: null },
    { version: quizVersion, index: 0, answers: ['a', 'b'], selected: 'a' },
    { version: quizVersion, index: 1, answers: [], selected: null },
    { version: quizVersion, index: 0, answers: ['b'], selected: 'a' },
    { version: quizVersion, index: 0, answers: [], selected: 'z' },
    { version: quizVersion, index: 0.5, answers: [], selected: null },
    { version: quizVersion, index: 0, answers: ['z'], selected: 'z' },
  ])('rejects incompatible or invalid storage: %j', (value) =>
    expect(
      restoreAttempt(
        value && typeof value === 'object' && !Array.isArray(value)
          ? { optionOrders: freshAttempt().optionOrders, ...value }
          : value,
      ),
    ).toBeNull(),
  );
  it('restores both selected and checked answers', () => {
    const selected = selectAnswer(freshAttempt(), 'b');
    expect(restoreAttempt(selected)).toEqual(selected);
    expect(restoreAttempt(submitAnswer(selected))).toEqual(
      submitAnswer(selected),
    );
  });
});

describe('answer order and recovery', () => {
  it('shuffles deterministically without changing the answer key or question definitions', () => {
    const unchanged = freshAttempt(() => 0.999);
    const shuffled = freshAttempt(() => 0);
    expect(unchanged.optionOrders[0]).toEqual(['a', 'b', 'c', 'd']);
    expect(shuffled.optionOrders[0]).toEqual(['b', 'c', 'd', 'a']);
    expect(questions[0].optionIds).toEqual(['a', 'b', 'c', 'd']);
    for (const attempt of [unchanged, shuffled]) {
      attempt.optionOrders.forEach((order, index) =>
        expect([...order].sort()).toEqual(
          [...questions[index].optionIds].sort(),
        ),
      );
      expect(
        score(
          submitAnswer(selectAnswer(attempt, questions[0].correctOptionId)),
        ),
      ).toBe(1);
    }
  });
  it('preserves every permutation and answer through selected, checked, and finished states', () => {
    let state = freshAttempt(() => 0);
    const order = state.optionOrders;
    for (const question of questions) {
      state = selectAnswer(state, question.correctOptionId);
      expect(restoreAttempt(JSON.parse(JSON.stringify(state)))).toEqual(state);
      state = submitAnswer(state);
      expect(restoreAttempt(state)).toEqual(state);
      state = nextQuestion(state);
      expect(state.optionOrders).toEqual(order);
    }
    const restored = restoreAttempt(state)!;
    expect(restored).toEqual(state);
    expect(restored.optionOrders).not.toBe(state.optionOrders);
    expect(restored.optionOrders[0]).not.toBe(state.optionOrders[0]);
  });
  it('rejects old attempts and malformed option orders', () => {
    const state = freshAttempt();
    for (const optionOrders of [
      undefined,
      null,
      [],
      state.optionOrders.slice(1),
      [['a', 'a', 'c', 'd'], ...state.optionOrders.slice(1)],
      [['a', 'b', 'c', 'x'], ...state.optionOrders.slice(1)],
      [['a', 'b', 'c'], ...state.optionOrders.slice(1)],
      [null, ...state.optionOrders.slice(1)],
    ]) {
      expect(restoreAttempt({ ...state, optionOrders })).toBeNull();
    }
    expect(restoreAttempt({ ...state, version: quizVersion - 1 })).toBeNull();
  });
  it('retry starts clean with newly generated orders and review includes only submitted mistakes', () => {
    let state = freshAttempt(() => 0);
    expect(reviewLessons(state)).toEqual([]);
    for (const question of questions.slice(0, 2)) {
      const wrong = question.optionIds.find(
        (option) => option !== question.correctOptionId,
      )!;
      state = nextQuestion(submitAnswer(selectAnswer(state, wrong)));
    }
    expect(reviewLessons(state)).toEqual(['understanding-teeth']);
    const retry = freshAttempt(() => 0.999);
    expect(retry.index).toBe(0);
    expect(retry.selected).toBeNull();
    expect(retry.answers).toEqual([]);
    expect(score(retry)).toBe(0);
    expect(retry.optionOrders).not.toEqual(state.optionOrders);
  });
});
