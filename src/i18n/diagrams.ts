import type { Locale } from './locales';
import type { DiagramId } from '../data/course';
export interface DiagramCopy {
  title: string;
  steps: [string, string][];
}
export const diagrams: Record<Locale, Record<DiagramId, DiagramCopy>> = {
  en: {
    'dark-spots': {
      title: 'A dark spot can have different causes',
      steps: [
        [
          'A stain',
          'A natural groove can be stained even when the enamel is healthy.',
        ],
        [
          'Early damage',
          'The surface may still be whole even though enamel has weakened.',
        ],
        [
          'A hole',
          'Some tooth material is missing. A dentist needs to check what care is needed.',
        ],
        [
          'Damage that has stopped',
          'A mark may remain after decay stops getting worse. Color alone cannot show this, and a hole may still be present.',
        ],
      ],
    },
    'lesion-depth': {
      title: 'How damage can reach deeper layers',
      steps: [
        [
          'Early damage',
          'Enamel can weaken without pain. Early care may help it improve or stop getting worse.',
        ],
        [
          'A hole forms',
          'More damage can leave a hole. Saliva cannot replace the missing piece.',
        ],
        [
          'Below the enamel',
          'Damage can reach dentin, the layer beneath enamel, even under a surface that looks whole.',
        ],
        [
          'The soft center',
          'Deep damage can affect nerves and blood vessels and lead to infection. Home care alone cannot treat it. This is a possible path, not a fixed sequence.',
        ],
      ],
    },
    'when-problems-progress': {
      title: 'Early damage can change in different ways',
      steps: [
        [
          'A weakened area',
          'Enamel has lost some minerals, but the surface is still whole.',
        ],
        [
          'Getting worse',
          'Further damage can reach deeper into the tooth. The speed varies.',
        ],
        [
          'Staying the same',
          'Little or no change has been seen over time. This does not mean the tooth is fully repaired.',
        ],
        [
          'Damage has stopped',
          'Care may stop decay getting worse. A mark can remain, and daily care and dental checks still matter.',
        ],
      ],
    },
    'understanding-teeth': {
      title: 'Inside a tooth',
      steps: [
        [
          'Enamel',
          'The hard outside protects the crown. A missing piece cannot grow back.',
        ],
        [
          'Dentin',
          'The layer below enamel makes up much of the tooth. When exposed, it can be sensitive.',
        ],
        ['Pulp', 'The soft center contains nerves and blood vessels.'],
        [
          'Roots',
          'Roots hold the tooth in the jaw. They have a different covering from enamel.',
        ],
      ],
    },
    'how-cavities-develop': {
      title: 'From plaque to a weakened tooth',
      steps: [
        ['Plaque', 'A sticky layer of bacteria builds up on the tooth.'],
        [
          'Sugar from food and drinks',
          'Sugar gives some bacteria fuel. They can also use some starches.',
        ],
        ['Acids', 'Bacteria make acids as they use this fuel.'],
        [
          'Weakened enamel',
          'Repeated acid attacks can weaken the tooth. A hole may eventually form.',
        ],
      ],
    },
    'sugar-food-and-acids': {
      title: 'How you drink matters too',
      steps: [
        [
          'With a meal',
          'You avoid spreading a sweet drink over hours. The total sugar amount still matters.',
        ],
        [
          'Sipping for hours',
          'Each sip gives bacteria more sugar. The dots show separate sips, not measured acid levels.',
        ],
        [
          'Sugar-free but acidic',
          "The drink's own acids can still wear away tooth surfaces.",
        ],
      ],
    },
    'saliva-and-fluoride': {
      title: 'Losing and regaining minerals',
      steps: [
        [
          'Losing minerals',
          'Acids can remove minerals that keep enamel strong.',
        ],
        [
          'Regaining minerals',
          'Saliva and fluoride help early weakened areas regain minerals. They cannot fill a hole.',
        ],
      ],
    },
    prevention: {
      title: 'Habits that work together',
      steps: [
        [
          'Clean',
          'Brush and clean between teeth to remove plaque and care for gums.',
        ],
        ['Protect', 'Use fluoride toothpaste to help keep enamel strong.'],
        [
          'Choose',
          'Have less sugar and avoid sipping acidic drinks for hours.',
        ],
        [
          'Get advice',
          'Agree dental checks for your needs. Ask about ongoing dryness or discomfort.',
        ],
      ],
    },
  },
  ru: {
    'dark-spots': {
      title: 'У тёмного пятна бывают разные причины',
      steps: [
        [
          'Окрашивание',
          'Естественная бороздка может окраситься, даже если эмаль здорова.',
        ],
        [
          'Раннее повреждение',
          'Поверхность может быть целой, хотя эмаль уже ослаблена.',
        ],
        [
          'Дырка',
          'Часть ткани зуба утрачена. Стоматолог проверит, какая помощь нужна.',
        ],
        [
          'Повреждение остановилось',
          'Пятно может остаться, когда кариес больше не ухудшается. Цвет этого не доказывает; дырка тоже может оставаться.',
        ],
      ],
    },
    'lesion-depth': {
      title: 'Как повреждение достигает глубоких слоёв',
      steps: [
        [
          'Раннее повреждение',
          'Эмаль может ослабевать без боли. Ранняя помощь может улучшить её состояние или остановить ухудшение.',
        ],
        [
          'Появляется дырка',
          'Дальнейшее повреждение может оставить дырку. Слюна не заменит утраченную часть.',
        ],
        [
          'Под эмалью',
          'Повреждение может дойти до дентина — слоя под эмалью, даже если поверхность кажется целой.',
        ],
        [
          'Мягкая середина',
          'Глубокое повреждение может затронуть нервы и сосуды и привести к инфекции. Домашний уход этого не вылечит. Это возможный путь, а не обязательная последовательность.',
        ],
      ],
    },
    'when-problems-progress': {
      title: 'Раннее повреждение может меняться по-разному',
      steps: [
        [
          'Ослабленный участок',
          'Эмаль потеряла часть минералов, но поверхность ещё целая.',
        ],
        [
          'Ухудшение',
          'Повреждение может проникать глубже. Скорость бывает разной.',
        ],
        [
          'Без изменений',
          'За время наблюдения изменений мало или нет. Это не значит, что зуб полностью восстановился.',
        ],
        [
          'Повреждение остановилось',
          'Уход может остановить развитие кариеса. Пятно может остаться; ежедневный уход и осмотры всё равно нужны.',
        ],
      ],
    },
    'understanding-teeth': {
      title: 'Что внутри зуба',
      steps: [
        [
          'Эмаль',
          'Твёрдый наружный слой защищает коронку. Утраченный кусочек не отрастает.',
        ],
        [
          'Дентин',
          'Слой под эмалью составляет большую часть зуба. При обнажении он может быть чувствительным.',
        ],
        ['Пульпа', 'Мягкая середина содержит нервы и кровеносные сосуды.'],
        [
          'Корни',
          'Корни удерживают зуб в челюсти. Их покрытие отличается от эмали.',
        ],
      ],
    },
    'how-cavities-develop': {
      title: 'От налёта к ослаблению зуба',
      steps: [
        ['Налёт', 'На зубе накапливается липкий слой бактерий.'],
        [
          'Сахар из еды и напитков',
          'Сахар питает некоторые бактерии. Они могут использовать и некоторые крахмалы.',
        ],
        ['Кислоты', 'Используя это питание, бактерии выделяют кислоты.'],
        [
          'Ослабленная эмаль',
          'Частое действие кислот может ослабить зуб. Со временем может появиться дырка.',
        ],
      ],
    },
    'sugar-food-and-acids': {
      title: 'Как вы пьёте — тоже важно',
      steps: [
        [
          'За едой',
          'Вы не растягиваете сладкий напиток на часы. Общее количество сахара всё равно важно.',
        ],
        [
          'Глотками несколько часов',
          'Каждый глоток даёт бактериям ещё сахар. Точки обозначают глотки, а не измеренную кислотность.',
        ],
        [
          'Без сахара, но с кислотами',
          'Собственные кислоты напитка всё равно могут повреждать поверхность зубов.',
        ],
      ],
    },
    'saliva-and-fluoride': {
      title: 'Потеря и возвращение минералов',
      steps: [
        [
          'Потеря минералов',
          'Кислоты могут удалять минералы, которые делают эмаль прочной.',
        ],
        [
          'Возвращение минералов',
          'Слюна и фторид помогают вернуть минералы в участки с ранним повреждением. Дырку они не заполняют.',
        ],
      ],
    },
    prevention: {
      title: 'Привычки, которые помогают вместе',
      steps: [
        [
          'Очищайте',
          'Щётка и очищение между зубами удаляют налёт и помогают дёснам.',
        ],
        ['Защищайте', 'Пользуйтесь пастой с фторидом для укрепления эмали.'],
        ['Выбирайте', 'Меньше сахара; не растягивайте кислые напитки на часы.'],
        [
          'Советуйтесь',
          'Согласуйте осмотры с учётом своих потребностей. Обсудите постоянную сухость или дискомфорт.',
        ],
      ],
    },
  },
  uk: {
    'dark-spots': {
      title: 'У темної плями бувають різні причини',
      steps: [
        [
          'Забарвлення',
          'Природна борозенка може забарвитися, навіть якщо емаль здорова.',
        ],
        [
          'Раннє пошкодження',
          'Поверхня може бути цілою, хоча емаль уже ослаблена.',
        ],
        [
          'Дірка',
          'Частина тканини зуба втрачена. Стоматолог перевірить, яка допомога потрібна.',
        ],
        [
          'Пошкодження зупинилося',
          'Пляма може залишитися, коли карієс більше не погіршується. Колір цього не доводить; дірка теж може залишатися.',
        ],
      ],
    },
    'lesion-depth': {
      title: 'Як пошкодження дістається глибоких шарів',
      steps: [
        [
          'Раннє пошкодження',
          'Емаль може слабшати без болю. Рання допомога може покращити її стан або зупинити погіршення.',
        ],
        [
          'З’являється дірка',
          'Подальше пошкодження може залишити дірку. Слина не замінить втрачену частину.',
        ],
        [
          'Під емаллю',
          'Пошкодження може дістатися дентину — шару під емаллю, навіть якщо поверхня здається цілою.',
        ],
        [
          'М’яка середина',
          'Глибоке пошкодження може зачепити нерви й судини та спричинити інфекцію. Домашній догляд цього не вилікує. Це можливий шлях, а не обов’язкова послідовність.',
        ],
      ],
    },
    'when-problems-progress': {
      title: 'Раннє пошкодження може змінюватися по-різному',
      steps: [
        [
          'Ослаблена ділянка',
          'Емаль втратила частину мінералів, але поверхня ще ціла.',
        ],
        [
          'Погіршення',
          'Пошкодження може проникати глибше. Швидкість буває різною.',
        ],
        [
          'Без змін',
          'За час спостереження змін мало або немає. Це не означає, що зуб повністю відновився.',
        ],
        [
          'Пошкодження зупинилося',
          'Догляд може зупинити розвиток карієсу. Пляма може залишитися; щоденний догляд і огляди все одно потрібні.',
        ],
      ],
    },
    'understanding-teeth': {
      title: 'Що всередині зуба',
      steps: [
        [
          'Емаль',
          'Твердий зовнішній шар захищає коронку. Втрачений шматочок не відростає.',
        ],
        [
          'Дентин',
          'Шар під емаллю становить більшу частину зуба. За оголення він може бути чутливим.',
        ],
        ['Пульпа', 'М’яка середина містить нерви та кровоносні судини.'],
        [
          'Корені',
          'Корені утримують зуб у щелепі. Їхнє покриття відрізняється від емалі.',
        ],
      ],
    },
    'how-cavities-develop': {
      title: 'Від нальоту до ослаблення зуба',
      steps: [
        ['Наліт', 'На зубі накопичується липкий шар бактерій.'],
        [
          'Цукор з їжі та напоїв',
          'Цукор живить деякі бактерії. Вони можуть використовувати й деякі крохмалі.',
        ],
        ['Кислоти', 'Використовуючи це живлення, бактерії утворюють кислоти.'],
        [
          'Ослаблена емаль',
          'Часта дія кислот може послабити зуб. Із часом може з’явитися дірка.',
        ],
      ],
    },
    'sugar-food-and-acids': {
      title: 'Як ви п’єте — теж важливо',
      steps: [
        [
          'Під час їжі',
          'Ви не розтягуєте солодкий напій на години. Загальна кількість цукру все одно важлива.',
        ],
        [
          'Ковтками кілька годин',
          'Кожен ковток дає бактеріям ще цукор. Крапки позначають ковтки, а не виміряну кислотність.',
        ],
        [
          'Без цукру, але з кислотами',
          'Власні кислоти напою все одно можуть пошкоджувати поверхню зубів.',
        ],
      ],
    },
    'saliva-and-fluoride': {
      title: 'Втрата та повернення мінералів',
      steps: [
        [
          'Втрата мінералів',
          'Кислоти можуть видаляти мінерали, які роблять емаль міцною.',
        ],
        [
          'Повернення мінералів',
          'Слина й фторид допомагають повернути мінерали в ділянки з раннім ослабленням. Дірку вони не заповнюють.',
        ],
      ],
    },
    prevention: {
      title: 'Звички, які допомагають разом',
      steps: [
        [
          'Очищайте',
          'Щітка й очищення між зубами видаляють наліт і допомагають яснам.',
        ],
        ['Захищайте', 'Користуйтеся пастою з фторидом для зміцнення емалі.'],
        ['Обирайте', 'Менше цукру; не розтягуйте кислі напої на години.'],
        [
          'Радьтеся',
          'Узгодьте огляди відповідно до своїх потреб. Обговоріть постійну сухість або дискомфорт.',
        ],
      ],
    },
  },
  de: {
    'dark-spots': {
      title: 'Ein dunkler Fleck kann verschiedene Ursachen haben',
      steps: [
        [
          'Eine Verfärbung',
          'Eine natürliche Rille kann verfärbt sein, obwohl der Schmelz gesund ist.',
        ],
        [
          'Früher Schaden',
          'Die Oberfläche kann noch ganz sein, obwohl der Schmelz geschwächt ist.',
        ],
        [
          'Ein Loch',
          'Zahnsubstanz fehlt. Lass zahnärztlich prüfen, welche Versorgung nötig ist.',
        ],
        [
          'Gestoppter Schaden',
          'Ein Fleck kann bleiben, obwohl Karies nicht mehr schlimmer wird. Die Farbe allein beweist das nicht; ein Loch kann weiterhin bestehen.',
        ],
      ],
    },
    'lesion-depth': {
      title: 'Wie Schäden tiefere Schichten erreichen können',
      steps: [
        [
          'Früher Schaden',
          'Schmelz kann ohne Schmerzen schwächer werden. Frühe Pflege kann helfen, den Schaden zu bessern oder zu stoppen.',
        ],
        [
          'Ein Loch entsteht',
          'Weitere Schäden können ein Loch hinterlassen. Speichel ersetzt das fehlende Stück nicht.',
        ],
        [
          'Unter dem Schmelz',
          'Schäden können das Dentin unter dem Schmelz erreichen, auch unter einer scheinbar ganzen Oberfläche.',
        ],
        [
          'Das weiche Innere',
          'Tiefe Schäden können Nerven und Blutgefäße betreffen und Infektionen auslösen. Häusliche Pflege allein behandelt das nicht. Dies ist ein möglicher Weg, keine feste Reihenfolge.',
        ],
      ],
    },
    'when-problems-progress': {
      title: 'Frühe Schäden können sich unterschiedlich entwickeln',
      steps: [
        [
          'Eine geschwächte Stelle',
          'Dem Schmelz fehlen Mineralien, aber die Oberfläche ist noch ganz.',
        ],
        [
          'Es wird schlimmer',
          'Weitere Schäden können tiefer in den Zahn reichen. Das Tempo ist unterschiedlich.',
        ],
        [
          'Es bleibt gleich',
          'Über eine Zeit war wenig oder keine Veränderung zu sehen. Das bedeutet keine vollständige Reparatur.',
        ],
        [
          'Der Schaden ist gestoppt',
          'Pflege kann Karies zum Stillstand bringen. Ein Fleck kann bleiben; tägliche Pflege und Kontrollen bleiben wichtig.',
        ],
      ],
    },
    'understanding-teeth': {
      title: 'Im Inneren eines Zahns',
      steps: [
        [
          'Zahnschmelz',
          'Die harte Außenseite schützt die Krone. Ein fehlendes Stück wächst nicht nach.',
        ],
        [
          'Dentin',
          'Die Schicht unter dem Schmelz bildet einen großen Teil des Zahns. Freiliegend kann sie empfindlich sein.',
        ],
        ['Zahnmark', 'Das weiche Innere enthält Nerven und Blutgefäße.'],
        [
          'Wurzeln',
          'Wurzeln halten den Zahn im Kiefer. Ihre Oberfläche hat eine andere Hülle als Zahnschmelz.',
        ],
      ],
    },
    'how-cavities-develop': {
      title: 'Vom Belag zum geschwächten Zahn',
      steps: [
        [
          'Zahnbelag',
          'Eine klebrige Schicht aus Bakterien sammelt sich auf dem Zahn.',
        ],
        [
          'Zucker aus Essen und Trinken',
          'Zucker gibt manchen Bakterien Nahrung. Sie können auch manche Stärkearten nutzen.',
        ],
        ['Säuren', 'Beim Nutzen dieser Nahrung bilden Bakterien Säuren.'],
        [
          'Geschwächter Schmelz',
          'Wiederholte Säureangriffe können den Zahn schwächen. Schließlich kann ein Loch entstehen.',
        ],
      ],
    },
    'sugar-food-and-acids': {
      title: 'Auch die Art des Trinkens zählt',
      steps: [
        [
          'Zum Essen',
          'Du verteilst ein süßes Getränk nicht über Stunden. Die gesamte Zuckermenge bleibt wichtig.',
        ],
        [
          'Stundenlanges Nippen',
          'Jeder Schluck liefert neuen Zucker. Die Punkte zeigen einzelne Schlucke, keine gemessenen Säurewerte.',
        ],
        [
          'Zuckerfrei, aber sauer',
          'Die eigenen Säuren des Getränks können die Zahnoberfläche weiterhin angreifen.',
        ],
      ],
    },
    'saliva-and-fluoride': {
      title: 'Mineralien verlieren und zurückgewinnen',
      steps: [
        [
          'Mineralien verlieren',
          'Säuren können Mineralien herauslösen, die den Schmelz stark machen.',
        ],
        [
          'Mineralien zurückgewinnen',
          'Speichel und Fluorid helfen früh geschwächten Stellen, Mineralien zurückzugewinnen. Sie können kein Loch füllen.',
        ],
      ],
    },
    prevention: {
      title: 'Gewohnheiten, die sich ergänzen',
      steps: [
        [
          'Reinigen',
          'Putze und reinige Zwischenräume, um Belag zu entfernen und das Zahnfleisch zu pflegen.',
        ],
        ['Schützen', 'Nutze Fluoridzahnpasta, um den Schmelz stark zu halten.'],
        [
          'Auswählen',
          'Weniger Zucker und kein stundenlanges Nippen an sauren Getränken helfen.',
        ],
        [
          'Rat holen',
          'Vereinbare passende Kontrollen. Sprich anhaltende Trockenheit oder Beschwerden an.',
        ],
      ],
    },
  },
};
