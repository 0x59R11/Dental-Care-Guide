# Content and design foundation

The guide uses a warm illustrated style for teenagers and adults: cream backgrounds, teal actions, soft blue, peach and amber teaching panels, system fonts, and original SVG geometry. Layouts are static Astro pages with small scripts for preferences, learning progress, diagrams and quiz state.

## Layout map

| Page                 | Desktop composition                                                                                                       | Narrow-screen composition                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Home                 | Introduction beside a care scene; three illustrated module cards; care principle                                          | Actions first, compact care scene, stacked illustrated cards                                |
| Learn overview       | Progress and resume action; two-column illustrated lesson list                                                            | Progress, resume and stacked lessons; compact artwork                                       |
| Lesson               | Reading column with section links; inline diagrams beside relevant explanations; completion and named neighboring lessons | Single reading column, diagram above its numbered explanations, stacked next/previous links |
| Practice             | Four illustrated, anchor-linked routine sections; two-column care cards with small motifs                                 | Section links and stacked care cards; no fixed heights                                      |
| Quiz                 | Illustrated introduction; one native radio group; explicit feedback and next action; illustrated results and review links | Full-width answer labels; same sequence and keyboard flow                                   |
| Sources              | Illustrated introduction, reading-width editorial notes and separated source entries                                      | Stacked introduction and wrapping source titles                                             |
| Language entry / 404 | Shared artwork and localized return cards                                                                                 | Stacked language cards                                                                      |

Main navigation remains directly accessible. On smaller screens it moves below branding and preferences; it does not become a hidden menu. The current section uses text weight, a tinted surface and an underline. All modules work independently. No content is unlocked by progress or quiz scores.

## Illustration system

`src/components/illustrations/CareMotif.astro` defines shared dental-care objects. `Illustration.astro` composes them into typed scenes for the homepage, six lessons, four routines, quiz, results and sources. Small practice-card illustrations reuse these objects. Decorative scenes have `aria-hidden="true"`; their meaning is already supplied by nearby text.

The educational diagrams retain accessible names, numbered regions and ordinary HTML explanations. Prevention uses care objects, and the branching lesion model uses tissue cross-sections rather than numbered circles alone. Stabilization and arrest deliberately retain the early mark: appearance does not establish activity. The diagrams remain schematic, without fixed timelines, fabricated measurements or diagnostic promises.

Shared CSS variables control both themes. Motif outlines use a separate color from diagram annotations so the pale objects retain visible details in dark mode. Artwork contains no embedded translated labels, remote dependencies, fonts, bitmap images or animation.

## Lesson structure and content

Each MDX lesson imports the shared `Diagram` component and places it after the relevant explanation. The lesson route derives its section links from rendered level-two Markdown headings. Diagram titles are not duplicated in that section list. The progression lesson places dark-spot, possible-outcome and depth diagrams in their respective sections.

The refresh adds localized headings and illustration placement while preserving every existing paragraph, qualification, example, takeaway and source. The 14 practical recommendations and 20 quiz questions retain their content and IDs. Neighboring lesson links display the destination title; completion remains an explicit, separate action.

| Lesson                | Main model                                                           |
| --------------------- | -------------------------------------------------------------------- |
| Understanding teeth   | Crown tissues and roots with selectable numbered regions             |
| Cavity development    | Plaque → fermentable food → bacterial acids → mineral loss           |
| Sugar, food and acids | Clustered versus repeated exposure; separate direct acid effect      |
| Saliva and fluoride   | Outward and inward mineral exchange                                  |
| Progression           | Dark-spot uncertainty, branching outcomes and possible deeper damage |
| Prevention            | Several actions contributing to protection                           |

## Interaction and accessibility

Native controls retain keyboard behavior. The current quiz question has an explicitly focusable span inside its legend because Firefox does not reliably focus the legend element itself. Answers lock only after submission; moving to another question is always explicit. Progress and state use stable IDs shared across languages. Home and Learn resume the last visited lesson; the existing storage schema and reset behavior are unchanged.

Diagrams keep every explanation visible, even after a label is selected. Essential information never depends on JavaScript, hover, color or remembering a previous state. Selection highlights the corresponding region and text. Localized lesson section links and all core reading content work without JavaScript.

Layouts wrap long translated words at enlarged text sizes. Illustrations stay visible on small screens without fixed-height text containers. Motion remains limited to short diagram-highlight transitions, disabled for reduced-motion preferences.

Screenshot tests write desktop and mobile views of Home, Learn, Practice, Quiz and Sources to ignored `artifacts/refresh-*.png` files. Existing lesson, diagram, feedback and enlarged-text screenshots remain review artifacts rather than committed binary snapshots.
