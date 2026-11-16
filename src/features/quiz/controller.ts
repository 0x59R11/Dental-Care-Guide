import { questions } from '../../data/quiz';
import {
  browserStorage,
  readStored,
  storagePrefix,
  writeStored,
} from '../../lib/storage';
import {
  freshAttempt,
  restoreAttempt,
  selectAnswer,
  submitAnswer,
  nextQuestion,
  score,
  reviewLessons,
} from './state';
const root = document.querySelector<HTMLElement>('[data-quiz]')!;
const panel = root.querySelector<HTMLElement>('[data-quiz-content]')!;
const storage = browserStorage('sessionStorage');
const key = storagePrefix + 'quiz';
let state = restoreAttempt(readStored(storage, key));
root.hidden = false;
function save() {
  root.querySelector<HTMLElement>('[data-quiz-storage]')!.hidden = writeStored(
    storage,
    key,
    state,
  );
}
function mount(selector: string) {
  panel.replaceChildren(
    root.querySelector<HTMLTemplateElement>(selector)!.content.cloneNode(true),
  );
}
function render(focus = true) {
  if (!state) return;
  if (state.index === questions.length) {
    mount('[data-results-template]');
    const result = panel.querySelector<HTMLElement>('[data-score]')!;
    const format = new Intl.NumberFormat(document.documentElement.lang);
    result.textContent = result.dataset
      .template!.replace('{score}', format.format(score(state)))
      .replace('{total}', format.format(questions.length));
    const missed = reviewLessons(state);
    panel
      .querySelectorAll<HTMLElement>('[data-review-lesson]')
      .forEach(
        (link) => (link.hidden = !missed.includes(link.dataset.reviewLesson!)),
      );
    panel.querySelector<HTMLElement>('[data-topics]')!.hidden =
      missed.length === 0;
    panel.querySelector<HTMLElement>('[data-all-correct]')!.hidden =
      missed.length !== 0;
    panel
      .querySelectorAll<HTMLElement>('[data-review-answer]')
      .forEach((answer) => {
        answer.textContent = JSON.parse(answer.dataset.options!)[
          state!.answers[Number(answer.dataset.reviewAnswer)]
        ];
      });
    panel.querySelector('[data-retry]')!.addEventListener('click', () => {
      state = freshAttempt();
      save();
      render();
    });
    if (focus)
      panel.querySelector<HTMLElement>('[data-results-heading]')!.focus();
    return;
  }
  mount(`[data-question-template="${state.index}"]`);
  const options = panel.querySelector<HTMLElement>('.quiz-options')!;
  for (const id of state.optionOrders[state.index]) {
    options.append(
      options
        .querySelector<HTMLInputElement>(`input[value="${id}"]`)!
        .closest('label')!,
    );
  }
  const locked = state.answers.length > state.index;
  const check = panel.querySelector<HTMLButtonElement>('[data-check]')!;
  panel.querySelectorAll<HTMLInputElement>('input').forEach((input) => {
    input.checked = input.value === state!.selected;
    input.disabled = locked;
    input.addEventListener('change', () => {
      state = selectAnswer(state!, input.value);
      check.disabled = false;
      save();
    });
  });
  check.disabled = !state.selected || locked;
  check.hidden = locked;
  if (locked) {
    const correct =
      state.answers[state.index] === questions[state.index].correctOptionId;
    const verdict = panel.querySelector<HTMLElement>('[data-verdict]')!;
    verdict.textContent = correct
      ? verdict.dataset.correct!
      : verdict.dataset.incorrect!;
    const feedback = panel.querySelector<HTMLElement>('[data-feedback]')!;
    feedback.hidden = false;
    feedback.classList.add(correct ? 'correct' : 'incorrect');
    panel.querySelector<HTMLElement>('[data-next]')!.hidden = false;
  }
  panel.querySelector('form')!.addEventListener('submit', (event) => {
    event.preventDefault();
    const next = submitAnswer(state!);
    if (next === state) return;
    state = next;
    save();
    render(false);
    panel.querySelector<HTMLElement>('[data-next]')!.focus();
  });
  panel.querySelector('[data-next]')!.addEventListener('click', () => {
    state = nextQuestion(state!);
    save();
    render();
  });
  if (focus)
    panel.querySelector<HTMLElement>('[data-question-heading]')!.focus();
}
if (state) {
  root.querySelector<HTMLElement>('[data-restored]')!.hidden = false;
  render(false);
} else {
  panel.querySelector('[data-start]')!.addEventListener('click', () => {
    state = freshAttempt();
    save();
    render();
  });
}
