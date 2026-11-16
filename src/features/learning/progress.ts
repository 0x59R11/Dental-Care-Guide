import { lessonIds, type LessonId } from '../../data/course';
import {
  browserStorage,
  readStored,
  storagePrefix,
  writeStored,
} from '../../lib/storage';

interface LearningProgress {
  completed: LessonId[];
  last: LessonId | null;
}
const key = storagePrefix + 'learning';
const storage = browserStorage('localStorage');
const raw = readStored<Partial<LearningProgress>>(storage, key);
const state: LearningProgress = {
  completed: [
    ...new Set(
      Array.isArray(raw?.completed)
        ? raw.completed.filter((id) => lessonIds.includes(id))
        : [],
    ),
  ],
  last: raw?.last && lessonIds.includes(raw.last) ? raw.last : null,
};
const current = document.querySelector<HTMLElement>('[data-lesson-id]')?.dataset
  .lessonId as LessonId | undefined;
if (current && lessonIds.includes(current)) {
  state.last = current;
  writeStored(storage, key, state);
}

function update() {
  document
    .querySelectorAll<HTMLElement>('[data-learning-progress]')
    .forEach((element) => {
      element.hidden = false;
    });
  document
    .querySelectorAll<HTMLElement>('[data-progress-count]')
    .forEach((element) => {
      element.textContent = element.dataset.template!.replace(
        '{count}',
        new Intl.NumberFormat(document.documentElement.lang).format(
          state.completed.length,
        ),
      );
    });
  document
    .querySelectorAll<HTMLProgressElement>('[data-learning-meter]')
    .forEach((meter) => {
      meter.value = state.completed.length;
    });
  document
    .querySelectorAll<HTMLElement>('[data-completed-lesson]')
    .forEach((badge) => {
      badge.hidden = !state.completed.includes(
        badge.dataset.completedLesson as LessonId,
      );
    });
  const button = document.querySelector<HTMLButtonElement>('[data-mark-read]');
  if (button && current) {
    const complete = state.completed.includes(current);
    button.textContent = complete
      ? button.dataset.done!
      : button.dataset.label!;
    button.disabled = complete;
    button.hidden = false;
  }
  const resume = document.querySelector<HTMLAnchorElement>('[data-resume]');
  if (resume) {
    resume.hidden = !state.last;
    if (state.last) resume.href = `${resume.dataset.learnUrl}${state.last}/`;
  }
}

document.querySelector('[data-mark-read]')?.addEventListener('click', () => {
  if (!current || state.completed.includes(current)) return;
  state.completed.push(current);
  const persisted = writeStored(storage, key, state);
  const warning = document.querySelector<HTMLElement>('[data-storage-warning]');
  if (warning) warning.hidden = persisted;
  update();
});
document
  .querySelector('[data-reset-progress]')
  ?.addEventListener('click', () => {
    state.completed = [];
    state.last = null;
    writeStored(storage, key, state);
    const status = document.querySelector<HTMLElement>('[data-reset-status]');
    if (status) status.textContent = status.dataset.message!;
    update();
  });
update();
