import type { Locale } from './locales';
import type { DiagramId } from '../data/course';
export interface DiagramCopy {
  title: string;
  steps: [string, string][];
}
export const diagrams: Record<Locale, Record<DiagramId, DiagramCopy>> = {
  en: {
    'dark-spots': {
      title: 'One dark mark, different explanations',
      steps: [
        [
          'Stained fissure',
          'Pigment can sit in a natural groove while the enamel remains sound. This drawing cannot identify your tooth.',
        ],
        [
          'Early lesion',
          'Minerals may be lost beneath an intact surface. Appearance alone does not establish activity.',
        ],
        [
          'Cavitated lesion',
          'The surface has broken down and structure is missing. Depth and cleaning access influence management.',
        ],
        [
          'Inactive lesion',
          'An assessed lesion may stop progressing while discoloration remains. Inactivity can occur with or without a cavity; color does not prove it.',
        ],
      ],
    },
    'lesion-depth': {
      title: 'A possible route toward the pulp',
      steps: [
        [
          'Early enamel change',
          'Mineral loss may begin beneath an intact, painless surface. It may arrest or remineralize.',
        ],
        [
          'Surface breakdown',
          'Further loss may create a cavity. Missing enamel does not regrow through saliva.',
        ],
        [
          'Dentin involvement',
          'Damage may extend beneath enamel, including under an apparently intact surface. These drawings show one possible course, not a required sequence.',
        ],
        [
          'Pulp involvement',
          'Deep disease may inflame or infect living pulp. Further disease may cause an abscess; home care alone cannot treat this damage.',
        ],
      ],
    },
    'when-problems-progress': {
      title: 'One early lesion, different possible outcomes',
      steps: [
        [
          'Early lesion',
          'Start with a mineral-weakened area whose surface is still intact.',
        ],
        [
          'Progression',
          'Repeated acid challenges can outweigh protection and allow deeper damage; speed varies.',
        ],
        [
          'Stabilization',
          'Little or no detectable change over time does not mean microscopic mineral exchange has stopped.',
        ],
        [
          'Arrest',
          'Better conditions and appropriate care can stop progression. A mark may remain, and prevention and monitoring continue.',
        ],
      ],
    },

    'understanding-teeth': {
      title: 'Inside a tooth',
      steps: [
        [
          'Enamel',
          'The hard outer covering protects the crown. It cannot regrow a missing piece.',
        ],
        [
          'Dentin',
          'This supporting layer contains tiny channels; exposure can cause sensitivity.',
        ],
        [
          'Pulp',
          'Living tissue with nerves and blood vessels lies at the center.',
        ],
        [
          'Roots',
          'Roots anchor the tooth. Their surface is covered by cementum, not enamel.',
        ],
      ],
    },
    'how-cavities-develop': {
      title: 'From plaque to mineral loss',
      steps: [
        [
          'Plaque',
          'Bacteria live in an attached biofilm above the enamel, the tooth’s mineral-rich outer covering.',
        ],
        [
          'Food exposure',
          'Sugars and other fermentable carbohydrates supply fuel to bacteria.',
        ],
        [
          'Bacterial acids',
          'Some bacteria produce acids as they use this fuel. Lower pH means more acidic conditions.',
        ],
        [
          'Mineral loss',
          'Repeated acid challenges can outweigh repair. A cavity may eventually form.',
        ],
      ],
    },
    'sugar-food-and-acids': {
      title: 'Two patterns, different exposures',
      steps: [
        [
          'With a meal',
          'The same sweet drink taken with a meal creates fewer separate exposures. Reducing the amount still matters.',
        ],
        [
          'Sipping for hours',
          'Repeated sips supply fresh sugar again and again. The dots show exposures, not a measured pH curve.',
        ],
        [
          'Sugar-free but acidic',
          'Direct drink acids can contribute to erosion even without sugar or bacterial acid production.',
        ],
      ],
    },
    'saliva-and-fluoride': {
      title: 'Mineral exchange at the surface',
      steps: [
        [
          'Mineral loss',
          'Acidic conditions can dissolve minerals from enamel.',
        ],
        [
          'Mineral recovery',
          'Saliva supplies minerals and buffers acids; fluoride supports recovery of early damage. This does not fill a hole.',
        ],
      ],
    },
    prevention: {
      title: 'Several habits, complementary protection',
      steps: [
        [
          'Clean',
          'Brushing and suitable interdental cleaning disturb plaque and support gum health.',
        ],
        [
          'Protect',
          'Fluoride toothpaste helps reduce mineral loss and supports recovery.',
        ],
        [
          'Reduce exposures',
          'Less sugar and fewer prolonged acid exposures reduce challenges to teeth.',
        ],
        [
          'Adapt care',
          'Saliva and risk-based examinations support protection. Discuss persistent dry mouth and symptoms.',
        ],
      ],
    },
  },
  ru: {
    'dark-spots': {
      title: 'Тёмное пятно: разные объяснения',
      steps: [
        [
          'Окрашенная фиссура',
          'Пигмент может находиться в естественной бороздке при здоровой эмали. По рисунку нельзя оценить ваш зуб.',
        ],
        [
          'Ранний очаг',
          'Под целой поверхностью могут быть потеряны минералы. Внешний вид сам по себе не определяет активность.',
        ],
        [
          'Очаг с полостью',
          'Поверхность разрушена, часть ткани утрачена. Глубина и доступность для очищения влияют на тактику.',
        ],
        [
          'Неактивный очаг',
          'Оценённый врачом очаг может перестать прогрессировать при сохранении окраски. Неактивность возможна с полостью и без неё; цвет её не доказывает.',
        ],
      ],
    },
    'lesion-depth': {
      title: 'Возможный путь к пульпе',
      steps: [
        [
          'Раннее изменение эмали',
          'Потеря минералов может начаться под целой безболезненной поверхностью. Очаг может остановиться или реминерализоваться.',
        ],
        [
          'Разрушение поверхности',
          'Дальнейшая потеря может создать полость. Слюна не отращивает утраченную эмаль.',
        ],
        [
          'Поражение дентина',
          'Повреждение может распространяться под эмалью, в том числе под внешне целой поверхностью. Это возможный путь, а не обязательная последовательность.',
        ],
        [
          'Поражение пульпы',
          'Глубокое заболевание может вызвать воспаление или инфекцию живой пульпы. Возможно развитие абсцесса; одного домашнего ухода недостаточно.',
        ],
      ],
    },
    'when-problems-progress': {
      title: 'Один ранний очаг — разные исходы',
      steps: [
        [
          'Ранний очаг',
          'Исходная точка — участок с потерей минералов и ещё целой поверхностью.',
        ],
        [
          'Прогрессирование',
          'Повторные кислотные воздействия могут перевесить защиту и углубить поражение; скорость различается.',
        ],
        [
          'Стабилизация',
          'Отсутствие заметных изменений со временем не означает остановку микроскопического обмена минералов.',
        ],
        [
          'Остановка',
          'Улучшение условий и подходящая помощь могут остановить прогрессирование. Пятно может остаться; профилактика и наблюдение продолжаются.',
        ],
      ],
    },

    'understanding-teeth': {
      title: 'Внутри зуба',
      steps: [
        [
          'Эмаль',
          'Твёрдое наружное покрытие защищает коронку. Утраченный фрагмент не отрастает.',
        ],
        [
          'Дентин',
          'Опорный слой содержит мелкие канальцы; его обнажение может вызывать чувствительность.',
        ],
        [
          'Пульпа',
          'В центре находится живая ткань с нервами и кровеносными сосудами.',
        ],
        [
          'Корни',
          'Корни удерживают зуб. Их поверхность покрыта цементом, а не эмалью.',
        ],
      ],
    },
    'how-cavities-develop': {
      title: 'От налёта к потере минералов',
      steps: [
        [
          'Налёт',
          'Бактерии живут в прикреплённой биоплёнке над эмалью — богатым минералами наружным покрытием зуба.',
        ],
        [
          'Контакт с пищей',
          'Сахара и другие ферментируемые углеводы служат питанием бактериям.',
        ],
        [
          'Бактериальные кислоты',
          'Используя это питание, некоторые бактерии образуют кислоты. Снижение pH означает более кислую среду.',
        ],
        [
          'Потеря минералов',
          'Повторные кислотные воздействия могут перевесить восстановление. Со временем может возникнуть полость.',
        ],
      ],
    },
    'sugar-food-and-acids': {
      title: 'Два режима — разные воздействия',
      steps: [
        [
          'Во время еды',
          'Тот же сладкий напиток во время еды создаёт меньше отдельных воздействий. Уменьшение количества тоже важно.',
        ],
        [
          'По глотку часами',
          'Каждый глоток вновь приносит сахар. Точки обозначают контакты, а не измеренную кривую pH.',
        ],
        [
          'Без сахара, но с кислотой',
          'Кислоты напитка могут вызывать эрозию даже без сахара и бактериальных кислот.',
        ],
      ],
    },
    'saliva-and-fluoride': {
      title: 'Обмен минералами на поверхности',
      steps: [
        [
          'Потеря минералов',
          'В кислой среде минералы могут растворяться и выходить из эмали.',
        ],
        [
          'Восстановление минералов',
          'Слюна доставляет минералы и нейтрализует кислоты; фториды помогают восстанавливать ранние повреждения. Полость так не заполнить.',
        ],
      ],
    },
    prevention: {
      title: 'Несколько привычек дополняют защиту',
      steps: [
        [
          'Очищать',
          'Щётка и подходящий межзубный инструмент нарушают налёт и поддерживают здоровье дёсен.',
        ],
        [
          'Защищать',
          'Паста с фтором помогает уменьшить потерю минералов и поддерживает восстановление.',
        ],
        [
          'Сокращать воздействия',
          'Меньше сахара и длительных контактов с кислотой — меньше нагрузки на зубы.',
        ],
        [
          'Адаптировать уход',
          'Слюна и осмотры с учётом риска поддерживают защиту. Обсуждайте постоянную сухость и симптомы.',
        ],
      ],
    },
  },
  uk: {
    'dark-spots': {
      title: 'Темна пляма: різні пояснення',
      steps: [
        [
          'Забарвлена фісура',
          'Пігмент може міститися в природній борозенці за здорової емалі. За малюнком не можна оцінити ваш зуб.',
        ],
        [
          'Раннє вогнище',
          'Під цілою поверхнею можуть бути втрачені мінерали. Сам зовнішній вигляд не визначає активності.',
        ],
        [
          'Вогнище з порожниною',
          'Поверхня зруйнована, частину тканини втрачено. Глибина й доступність для очищення впливають на тактику.',
        ],
        [
          'Неактивне вогнище',
          'Оцінене лікарем вогнище може перестати прогресувати зі збереженням кольору. Неактивність можлива з порожниною й без неї; колір її не доводить.',
        ],
      ],
    },
    'lesion-depth': {
      title: 'Можливий шлях до пульпи',
      steps: [
        [
          'Рання зміна емалі',
          'Втрата мінералів може початися під цілою безболісною поверхнею. Вогнище може зупинитися або ремінералізуватися.',
        ],
        [
          'Руйнування поверхні',
          'Подальша втрата може утворити порожнину. Слина не відрощує втрачену емаль.',
        ],
        [
          'Ураження дентину',
          'Пошкодження може поширюватися під емаллю, зокрема під зовні цілою поверхнею. Це можливий шлях, а не обов’язкова послідовність.',
        ],
        [
          'Ураження пульпи',
          'Глибоке захворювання може спричинити запалення чи інфекцію живої пульпи. Можливий абсцес; самого домашнього догляду недостатньо.',
        ],
      ],
    },
    'when-problems-progress': {
      title: 'Одне раннє вогнище — різні наслідки',
      steps: [
        [
          'Раннє вогнище',
          'Початкова точка — ділянка з утратою мінералів і ще цілою поверхнею.',
        ],
        [
          'Прогресування',
          'Повторні кислотні впливи можуть переважити захист і поглибити ураження; швидкість різниться.',
        ],
        [
          'Стабілізація',
          'Відсутність помітних змін із часом не означає зупинки мікроскопічного обміну мінералів.',
        ],
        [
          'Зупинка',
          'Поліпшення умов і відповідна допомога можуть зупинити прогресування. Пляма може залишитися; профілактика та спостереження тривають.',
        ],
      ],
    },

    'understanding-teeth': {
      title: 'Усередині зуба',
      steps: [
        [
          'Емаль',
          'Тверде зовнішнє покриття захищає коронку. Утрачений фрагмент не відростає.',
        ],
        [
          'Дентин',
          'Опорний шар містить дрібні канальці; його оголення може спричиняти чутливість.',
        ],
        [
          'Пульпа',
          'У центрі міститься жива тканина з нервами та кровоносними судинами.',
        ],
        [
          'Корені',
          'Корені утримують зуб. Їхня поверхня вкрита цементом, а не емаллю.',
        ],
      ],
    },
    'how-cavities-develop': {
      title: 'Від нальоту до втрати мінералів',
      steps: [
        [
          'Наліт',
          'Бактерії живуть у прикріпленій біоплівці над емаллю — багатим на мінерали зовнішнім покриттям зуба.',
        ],
        [
          'Контакт з їжею',
          'Цукри та інші ферментовані вуглеводи живлять бактерії.',
        ],
        [
          'Бактеріальні кислоти',
          'Використовуючи це живлення, деякі бактерії утворюють кислоти. Нижчий pH означає кисліше середовище.',
        ],
        [
          'Втрата мінералів',
          'Повторні кислотні впливи можуть переважити відновлення. Згодом може утворитися порожнина.',
        ],
      ],
    },
    'sugar-food-and-acids': {
      title: 'Два режими — різні впливи',
      steps: [
        [
          'Під час їди',
          'Той самий солодкий напій під час їди створює менше окремих впливів. Зменшення кількості теж важливе.',
        ],
        [
          'По ковтку годинами',
          'Кожен ковток знову приносить цукор. Крапки позначають контакти, а не виміряну криву pH.',
        ],
        [
          'Без цукру, але з кислотою',
          'Кислоти напою можуть спричиняти ерозію навіть без цукру та бактеріальних кислот.',
        ],
      ],
    },
    'saliva-and-fluoride': {
      title: 'Обмін мінералами на поверхні',
      steps: [
        [
          'Втрата мінералів',
          'У кислому середовищі мінерали можуть розчинятися й виходити з емалі.',
        ],
        [
          'Відновлення мінералів',
          'Слина постачає мінерали й нейтралізує кислоти; фториди підтримують відновлення ранніх ушкоджень. Порожнину так не заповнити.',
        ],
      ],
    },
    prevention: {
      title: 'Кілька звичок доповнюють захист',
      steps: [
        [
          'Очищувати',
          'Щітка й відповідний міжзубний інструмент руйнують наліт і підтримують здоров’я ясен.',
        ],
        [
          'Захищати',
          'Паста з фтором допомагає зменшити втрату мінералів і підтримує відновлення.',
        ],
        [
          'Скорочувати впливи',
          'Менше цукру й тривалих контактів із кислотою — менше навантаження на зуби.',
        ],
        [
          'Адаптувати догляд',
          'Слина й огляди з урахуванням ризику підтримують захист. Обговорюйте постійну сухість і симптоми.',
        ],
      ],
    },
  },
  de: {
    'dark-spots': {
      title: 'Ein dunkler Fleck, verschiedene Erklärungen',
      steps: [
        [
          'Verfärbte Fissur',
          'Pigment kann bei gesundem Schmelz in einer natürlichen Furche liegen. Diese Zeichnung beurteilt deinen Zahn nicht.',
        ],
        [
          'Frühe Läsion',
          'Unter intakter Oberfläche können Mineralien fehlen. Das Aussehen allein bestimmt die Aktivität nicht.',
        ],
        [
          'Kavitierte Läsion',
          'Die Oberfläche ist eingebrochen, Substanz fehlt. Tiefe und Reinigungszugang beeinflussen die Behandlung.',
        ],
        [
          'Inaktive Läsion',
          'Eine untersuchte Läsion kann trotz bleibender Verfärbung zum Stillstand kommen. Inaktivität ist mit oder ohne Loch möglich; Farbe beweist sie nicht.',
        ],
      ],
    },
    'lesion-depth': {
      title: 'Ein möglicher Weg zur Pulpa',
      steps: [
        [
          'Frühe Schmelzveränderung',
          'Mineralverlust kann unter intakter, schmerzloser Oberfläche beginnen. Die Läsion kann arretieren oder remineralisieren.',
        ],
        [
          'Oberflächeneinbruch',
          'Weiterer Verlust kann ein Loch erzeugen. Speichel lässt fehlenden Schmelz nicht nachwachsen.',
        ],
        [
          'Dentinbeteiligung',
          'Schäden können sich unter dem Schmelz ausbreiten, auch bei scheinbar intakter Oberfläche. Die Bilder zeigen einen möglichen, keinen vorgeschriebenen Verlauf.',
        ],
        [
          'Pulpabeteiligung',
          'Tiefe Erkrankung kann lebende Pulpa entzünden oder infizieren. Ein Abszess ist möglich; häusliche Pflege allein behandelt diesen Schaden nicht.',
        ],
      ],
    },
    'when-problems-progress': {
      title: 'Eine frühe Läsion, verschiedene mögliche Verläufe',
      steps: [
        [
          'Frühe Läsion',
          'Ausgangspunkt ist eine mineralgeschwächte Stelle mit noch intakter Oberfläche.',
        ],
        [
          'Fortschreiten',
          'Wiederholte Säurebelastung kann Schutz überwiegen und tiefere Schäden ermöglichen; die Geschwindigkeit variiert.',
        ],
        [
          'Stabilisierung',
          'Wenig oder keine erkennbare Veränderung über Zeit bedeutet keinen Stillstand des mikroskopischen Mineralaustauschs.',
        ],
        [
          'Arretierung',
          'Bessere Bedingungen und passende Betreuung können Fortschreiten stoppen. Ein Fleck kann bleiben; Vorsorge und Kontrollen gehen weiter.',
        ],
      ],
    },

    'understanding-teeth': {
      title: 'Im Inneren eines Zahns',
      steps: [
        [
          'Zahnschmelz',
          'Die harte Außenschicht schützt die Krone. Ein fehlendes Stück wächst nicht nach.',
        ],
        [
          'Dentin',
          'Diese tragende Schicht enthält feine Kanälchen; freiliegendes Dentin kann empfindlich sein.',
        ],
        [
          'Pulpa',
          'Im Zentrum liegt lebendes Gewebe mit Nerven und Blutgefäßen.',
        ],
        [
          'Wurzeln',
          'Wurzeln verankern den Zahn. Ihre Oberfläche ist mit Zement bedeckt, nicht mit Schmelz.',
        ],
      ],
    },
    'how-cavities-develop': {
      title: 'Vom Belag zum Mineralverlust',
      steps: [
        [
          'Zahnbelag',
          'Bakterien leben im anhaftenden Biofilm über dem Schmelz, der mineralreichen Außenhülle des Zahns.',
        ],
        [
          'Nahrungskontakt',
          'Zucker und andere vergärbare Kohlenhydrate liefern Bakterien Nahrung.',
        ],
        [
          'Bakterielle Säuren',
          'Manche Bakterien bilden beim Nutzen dieser Nahrung Säuren. Ein niedrigerer pH bedeutet ein saureres Milieu.',
        ],
        [
          'Mineralverlust',
          'Wiederholte Säureangriffe können die Erholung überwiegen. Schließlich kann ein Loch entstehen.',
        ],
      ],
    },
    'sugar-food-and-acids': {
      title: 'Zwei Muster, unterschiedliche Einwirkungen',
      steps: [
        [
          'Zu einer Mahlzeit',
          'Dasselbe süße Getränk zur Mahlzeit bedeutet weniger einzelne Kontakte. Die Gesamtmenge zu senken bleibt wichtig.',
        ],
        [
          'Stundenlanges Nippen',
          'Wiederholte Schlucke liefern immer neuen Zucker. Die Punkte zeigen Kontakte, keine gemessene pH-Kurve.',
        ],
        [
          'Zuckerfrei, aber sauer',
          'Getränkesäuren können auch ohne Zucker oder bakterielle Säurebildung zur Erosion beitragen.',
        ],
      ],
    },
    'saliva-and-fluoride': {
      title: 'Mineralaustausch an der Oberfläche',
      steps: [
        [
          'Mineralverlust',
          'Unter sauren Bedingungen können sich Mineralien aus dem Schmelz lösen.',
        ],
        [
          'Mineralgewinn',
          'Speichel liefert Mineralien und puffert Säuren; Fluorid unterstützt die Erholung früher Schäden. Ein Loch wird dadurch nicht gefüllt.',
        ],
      ],
    },
    prevention: {
      title: 'Mehrere Gewohnheiten ergänzen sich',
      steps: [
        [
          'Reinigen',
          'Putzen und passende Zwischenraumreinigung stören Beläge und unterstützen gesundes Zahnfleisch.',
        ],
        [
          'Schützen',
          'Fluoridzahnpasta hilft, Mineralverlust zu verringern und die Erholung zu unterstützen.',
        ],
        [
          'Einwirkungen verringern',
          'Weniger Zucker und weniger lange Säurekontakte entlasten die Zähne.',
        ],
        [
          'Pflege anpassen',
          'Speichel und risikogerechte Untersuchungen unterstützen den Schutz. Sprich anhaltende Trockenheit und Beschwerden an.',
        ],
      ],
    },
  },
};
