# Content and design foundation

The implementation follows the approved calm field-guide direction: warm neutral background, teal actions, restrained blue/amber teaching panels, system fonts and original SVG geometry. Layouts are static Astro pages with small scripts for preferences, learning progress, diagrams and quiz state.

## Layout map

| Page           | Desktop composition                                                                               | Narrow-screen composition                                                |
| -------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Home           | Compact introduction beside a tooth; three module cards; brief care principle                     | Introduction and actions; stacked module cards; decorative tooth omitted |
| Learn overview | Introduction, shared progress, two-column lesson list                                             | Progress and six stacked lessons                                         |
| Lesson         | Reading column, wide two-column diagram, example, takeaway, disclosure, completion and navigation | Single reading column; diagram above its numbered descriptions           |
| Practice       | Four anchor-linked sections, each with two-column cards                                           | Section anchors and stacked cards; no fixed heights                      |
| Quiz           | Reading-width card, one native radio group, explicit feedback and next action                     | Full-width answer labels; same sequence and keyboard flow                |
| Sources        | Reading-width editorial notes and linked source list                                              | Same structure with wrapping titles                                      |

Navigation stays visible. On smaller screens module navigation moves below branding and preferences; it does not become a hidden menu. All modules work independently. No content is unlocked by progress or quiz scores.

## Learning-objective coverage

| Lesson                | Main model                                                      | Quiz IDs                               |
| --------------------- | --------------------------------------------------------------- | -------------------------------------- |
| Understanding teeth   | Crown tissues and roots with selectable numbered regions        | `tooth-enamel`, `tooth-pulp`           |
| Cavity development    | Plaque → fermentable food → bacterial acids → mineral loss      | `plaque-acids`, `early-minerals`       |
| Sugar, food and acids | Clustered versus repeated exposure; separate direct acid effect | `sipping-frequency`, `sugar-free-acid` |
| Saliva and fluoride   | Outward and inward mineral exchange                             | `saliva-role`, `fluoride-role`         |
| Progression           | Branching stabilization or deeper damage, without a timeline    | `early-detection`, `lost-structure`    |
| Prevention            | Several actions contributing to protection                      | `brushing-routine`, `between-teeth`    |

The Practice inventory contains three morning, five daytime, three evening and three long-term recommendations. The glossary, claim qualifications, references and owner checklist are in `editorial-review.md`.

## Interaction and accessibility decisions

Native controls retain keyboard behavior. The current quiz question has an explicitly focusable text span inside its legend because Firefox does not reliably focus the legend element itself. Answers lock only after submission; moving to another question is always explicit. Progress and state use stable IDs shared across languages.

Diagrams keep every explanation visible, even after a label is selected, so essential information never depends on JavaScript, hover, color or remembering a previous state. Selection highlights the corresponding region and text. Original geometry is shared across translations, with longer labels outside the SVG.

All layout tracks can shrink, and text can wrap within long translated words at enlarged font sizes. Diagrams use theme variables; essential descriptions remain ordinary HTML text. Motion is limited to short diagram-highlight transitions and disabled for reduced-motion preferences.

Screenshots from the visual browser test are generated in `artifacts/`: `home-desktop.png`, `lesson-mobile.png`, and `enlarged.png`. They are review artifacts rather than committed binary snapshots.
