import type { Lang } from './i18n'

export type DemoId = 'booking' | 'orders' | 'catalog'

export type ChatChoice = { id: string; label: string }
export type ChatStep = {
  bot: string[]
  choices?: ChatChoice[]
  next?: Record<string, string>
  end?: boolean
}

export type DemoScript = {
  id: DemoId
  title: string
  for: string
  text: string
  help: string
  botName: string
  restart: string
  hint: string
  steps: Record<string, ChatStep>
  start: string
}

const botName: Record<Lang, string> = {
  ru: 'Ваш бот',
  tg: 'Боти шумо',
  en: 'Your bot',
}

const scripts: Record<Lang, DemoScript[]> = {
  ru: [
    {
      id: 'booking',
      title: 'Бот записи',
      for: 'Салон · клиника · репетитор',
      text: 'Услуга, мастер, слот, напоминание и перенос.',
      help: 'Меньше пропущенных визитов и переписки вразнобой.',
      botName: botName.ru,
      restart: 'Сначала',
      hint: 'Нажмите вариант — как в Telegram',
      start: 'start',
      steps: {
        start: {
          bot: ['Здравствуйте! Я ваш бот записи.', 'Что нужно сегодня?'],
          choices: [
            { id: 'book', label: 'Записаться' },
            { id: 'move', label: 'Перенести визит' },
            { id: 'price', label: 'Узнать цены' },
          ],
          next: { book: 'service', move: 'reschedule', price: 'pricelist' },
        },
        service: {
          bot: ['Выберите услугу:'],
          choices: [
            { id: 'hair', label: 'Стрижка — 80 с.' },
            { id: 'nails', label: 'Маникюр — 120 с.' },
            { id: 'tutor', label: 'Урок — 100 с.' },
          ],
          next: { hair: 'master', nails: 'master', tutor: 'master' },
        },
        master: {
          bot: ['К кому записать?'],
          choices: [
            { id: 'any', label: 'Любой свободный' },
            { id: 'anna', label: 'Анна' },
            { id: 'dilshod', label: 'Дилшод' },
          ],
          next: { any: 'when', anna: 'when', dilshod: 'when' },
        },
        when: {
          bot: ['Когда удобно?'],
          choices: [
            { id: 'today', label: 'Сегодня, 17:00' },
            { id: 'tomorrow', label: 'Завтра, 11:00' },
            { id: 'sat', label: 'Суббота, 14:00' },
          ],
          next: { today: 'remind', tomorrow: 'remind', sat: 'remind' },
        },
        remind: {
          bot: ['Напоминание перед визитом?'],
          choices: [
            { id: 'h1', label: 'За 1 час' },
            { id: 'h24', label: 'За сутки' },
            { id: 'both', label: 'Оба варианта' },
          ],
          next: { h1: 'done', h24: 'done', both: 'done' },
        },
        done: {
          bot: [
            'Готово — вы в записи.',
            'Карточка: услуга + время + мастер.',
            'Напоминание придёт в этот чат.',
          ],
          end: true,
        },
        reschedule: {
          bot: ['Нашёл запись на завтра, 11:00. Куда перенести?'],
          choices: [
            { id: 'eve', label: 'Завтра, 18:00' },
            { id: 'mon', label: 'Понедельник, 12:00' },
            { id: 'cancel', label: 'Отменить визит' },
          ],
          next: { eve: 'moved', mon: 'moved', cancel: 'cancelled' },
        },
        moved: {
          bot: ['Перенесено ✓', 'Старое напоминание снято, новое поставлено.'],
          end: true,
        },
        cancelled: {
          bot: ['Визит отменён.', 'Если передумаете — напишите «записаться».'],
          end: true,
        },
        pricelist: {
          bot: [
            'Прайс:',
            '• Стрижка — 80 с.',
            '• Маникюр — 120 с.',
            '• Урок — 100 с.',
            'Записать сейчас?',
          ],
          choices: [
            { id: 'yes', label: 'Да, записать' },
            { id: 'later', label: 'Позже' },
          ],
          next: { yes: 'service', later: 'bye' },
        },
        bye: {
          bot: ['Ок. Когда будете готовы — я на связи.'],
          end: true,
        },
      },
    },
    {
      id: 'orders',
      title: 'Бот заказов',
      for: 'Кафе · доставка',
      text: 'Меню с ценами, корзина, доставка и статус.',
      help: 'Заказы идут даже когда линия занята.',
      botName: botName.ru,
      restart: 'Сначала',
      hint: 'Соберите заказ с ценами в сомони',
      start: 'start',
      steps: {
        start: {
          bot: ['Меню на сегодня 👋', 'Цены в сомони (с.). Что положить?'],
          choices: [
            { id: 'plov', label: 'Плов — 45 с.' },
            { id: 'lagman', label: 'Лагман — 40 с.' },
            { id: 'tea', label: 'Чай ×2 — 12 с.' },
          ],
          next: { plov: 'more', lagman: 'more', tea: 'more' },
        },
        more: {
          bot: ['В корзине. Добавить ещё?'],
          choices: [
            { id: 'salad', label: '+ Салат — 18 с.' },
            { id: 'drink', label: '+ Компот — 10 с.' },
            { id: 'checkout', label: 'К оформлению' },
          ],
          next: { salad: 'fulfill', drink: 'fulfill', checkout: 'fulfill' },
        },
        fulfill: {
          bot: ['Как получить заказ?'],
          choices: [
            { id: 'delivery', label: 'Доставка (+8 с.)' },
            { id: 'pickup', label: 'Самовывоз' },
          ],
          next: { delivery: 'address', pickup: 'pay' },
        },
        address: {
          bot: ['Куда везти?'],
          choices: [
            { id: 'center', label: 'Центр, 20–30 мин' },
            { id: 'south', label: 'Юг города, 35–45 мин' },
          ],
          next: { center: 'pay', south: 'pay' },
        },
        pay: {
          bot: ['Итого посчитано. Способ оплаты?'],
          choices: [
            { id: 'cash', label: 'Наличные' },
            { id: 'card', label: 'Карта курьеру' },
            { id: 'online', label: 'Онлайн' },
          ],
          next: { cash: 'confirm', card: 'confirm', online: 'confirm' },
        },
        confirm: {
          bot: [
            'Заказ принят ✓',
            'Готовим ~25 мин. Статус пришлю сюда.',
            'Можно спросить: «где заказ?»',
          ],
          choices: [
            { id: 'status', label: 'Где заказ?' },
            { id: 'done', label: 'Ок, жду' },
          ],
          next: { status: 'tracking', done: 'idle' },
        },
        tracking: {
          bot: ['Сейчас: готовится 🍳', 'Через ~10 мин передадим курьеру/на выдачу.'],
          end: true,
        },
        idle: {
          bot: ['Отлично. Приятного аппетита!'],
          end: true,
        },
      },
    },
    {
      id: 'catalog',
      title: 'Каталог + заявка',
      for: 'Магазин · услуги',
      text: 'Категории, цена, детали и заявка менеджеру.',
      help: 'Клиент выбирает сам — вы отвечаете по готовой заявке.',
      botName: botName.ru,
      restart: 'Сначала',
      hint: 'Выберите товар и оставьте заявку',
      start: 'start',
      steps: {
        start: {
          bot: ['Каталог открыт. Что смотрим?'],
          choices: [
            { id: 'gadgets', label: 'Гаджеты' },
            { id: 'home', label: 'Для дома' },
            { id: 'service', label: 'Услуги' },
          ],
          next: { gadgets: 'gadgets', home: 'home', service: 'services' },
        },
        gadgets: {
          bot: ['Гаджеты в наличии:'],
          choices: [
            { id: 'phone', label: 'Чехол — 120 с.' },
            { id: 'cable', label: 'Кабель USB‑C — 55 с.' },
            { id: 'back', label: '← Назад' },
          ],
          next: { phone: 'details', cable: 'details', back: 'start' },
        },
        home: {
          bot: ['Для дома:'],
          choices: [
            { id: 'lamp', label: 'Лампа — 350 с.' },
            { id: 'back', label: '← Назад' },
          ],
          next: { lamp: 'details', back: 'start' },
        },
        services: {
          bot: ['Услуги:'],
          choices: [
            { id: 'wifi', label: 'Установка Wi‑Fi — от 200 с.' },
            { id: 'back', label: '← Назад' },
          ],
          next: { wifi: 'details', back: 'start' },
        },
        details: {
          bot: [
            'Кратко: в наличии, гарантия 30 дней.',
            'Что дальше?',
          ],
          choices: [
            { id: 'ask', label: 'Оставить заявку' },
            { id: 'more', label: 'Другие варианты' },
            { id: 'faq', label: 'Доставка / оплата' },
          ],
          next: { ask: 'contact', more: 'start', faq: 'ship' },
        },
        ship: {
          bot: [
            'Доставка по городу — 25 с., от 300 с. бесплатно.',
            'Оплата: наличные / карта / перевод.',
            'Оформим заявку?',
          ],
          choices: [
            { id: 'yes', label: 'Да, заявку' },
            { id: 'no', label: 'Пока нет' },
          ],
          next: { yes: 'contact', no: 'bye' },
        },
        contact: {
          bot: ['Как с вами связаться?'],
          choices: [
            { id: 'tg', label: 'В этом чате' },
            { id: 'call', label: 'Перезвоните' },
          ],
          next: { tg: 'sent', call: 'sent' },
        },
        sent: {
          bot: [
            'Заявка ушла менеджеру ✓',
            'Обычно отвечаем в течение часа.',
            'Номер заявки: #A-204',
          ],
          end: true,
        },
        bye: {
          bot: ['Хорошо. Каталог всегда здесь — напишите, когда будете готовы.'],
          end: true,
        },
      },
    },
  ],
  tg: [
    {
      id: 'booking',
      title: 'Боти сабт',
      for: 'Салон · клиника · репетитор',
      text: 'Хизмат, усто, вақт, ёдрас ва гузаронидан.',
      help: 'Камтар сабтҳои гумшуда ва мукотибаи пароканда.',
      botName: botName.tg,
      restart: 'Аз аввал',
      hint: 'Вариантро пахш кунед — мисли Telegram',
      start: 'start',
      steps: {
        start: {
          bot: ['Салом! Ман боти сабти шумо ҳастам.', 'Имрӯз чӣ лозим аст?'],
          choices: [
            { id: 'book', label: 'Сабт шудан' },
            { id: 'move', label: 'Вақтро иваз кунам' },
            { id: 'price', label: 'Нархҳо' },
          ],
          next: { book: 'service', move: 'reschedule', price: 'pricelist' },
        },
        service: {
          bot: ['Хизматро интихоб кунед:'],
          choices: [
            { id: 'hair', label: 'Мӯйбурӣ — 80 с.' },
            { id: 'nails', label: 'Маникюр — 120 с.' },
            { id: 'tutor', label: 'Дарс — 100 с.' },
          ],
          next: { hair: 'master', nails: 'master', tutor: 'master' },
        },
        master: {
          bot: ['Ба назди кӣ?'],
          choices: [
            { id: 'any', label: 'Ҳар каси холӣ' },
            { id: 'anna', label: 'Анна' },
            { id: 'dilshod', label: 'Дилшод' },
          ],
          next: { any: 'when', anna: 'when', dilshod: 'when' },
        },
        when: {
          bot: ['Кай қулай аст?'],
          choices: [
            { id: 'today', label: 'Имрӯз, 17:00' },
            { id: 'tomorrow', label: 'Фардо, 11:00' },
            { id: 'sat', label: 'Шанбе, 14:00' },
          ],
          next: { today: 'remind', tomorrow: 'remind', sat: 'remind' },
        },
        remind: {
          bot: ['Ёдрас пеш аз вохӯрӣ?'],
          choices: [
            { id: 'h1', label: '1 соат пеш' },
            { id: 'h24', label: '1 рӯз пеш' },
            { id: 'both', label: 'Ҳар ду' },
          ],
          next: { h1: 'done', h24: 'done', both: 'done' },
        },
        done: {
          bot: ['Тайёр — шумо сабт шудед.', 'Ёдрас дар ҳамин чат меояд.'],
          end: true,
        },
        reschedule: {
          bot: ['Сабти фардо, 11:00 ёфт шуд. Ба кай гузаронем?'],
          choices: [
            { id: 'eve', label: 'Фардо, 18:00' },
            { id: 'mon', label: 'Душанбе, 12:00' },
            { id: 'cancel', label: 'Бекор кунам' },
          ],
          next: { eve: 'moved', mon: 'moved', cancel: 'cancelled' },
        },
        moved: {
          bot: ['Гузаронида шуд ✓', 'Ёдраси нав гузошта шуд.'],
          end: true,
        },
        cancelled: {
          bot: ['Сабт бекор шуд.', 'Агар хоҳед — боз нависед.'],
          end: true,
        },
        pricelist: {
          bot: [
            'Нархнома:',
            '• Мӯйбурӣ — 80 с.',
            '• Маникюр — 120 с.',
            '• Дарс — 100 с.',
            'Ҳозир сабт кунем?',
          ],
          choices: [
            { id: 'yes', label: 'Ҳа, сабт' },
            { id: 'later', label: 'Баъдтар' },
          ],
          next: { yes: 'service', later: 'bye' },
        },
        bye: {
          bot: ['Хуб. Вақте омода шудед — ман ҳастам.'],
          end: true,
        },
      },
    },
    {
      id: 'orders',
      title: 'Боти фармоиш',
      for: 'Кафе · расондан',
      text: 'Меню бо нарх, сабад, расондан ва ҳолат.',
      help: 'Фармоишҳо ҳатто вақти бандӣ қабул мешаванд.',
      botName: botName.tg,
      restart: 'Аз аввал',
      hint: 'Фармоишро бо нарх ба сомонӣ ҷамъ кунед',
      start: 'start',
      steps: {
        start: {
          bot: ['Менюи имрӯз 👋', 'Нархҳо бо сомонӣ (с.). Чӣ мегиред?'],
          choices: [
            { id: 'plov', label: 'Палов — 45 с.' },
            { id: 'lagman', label: 'Лағмон — 40 с.' },
            { id: 'tea', label: 'Чой ×2 — 12 с.' },
          ],
          next: { plov: 'more', lagman: 'more', tea: 'more' },
        },
        more: {
          bot: ['Дар сабад. Боз чизе?'],
          choices: [
            { id: 'salad', label: '+ Салат — 18 с.' },
            { id: 'drink', label: '+ Компот — 10 с.' },
            { id: 'checkout', label: 'Ба расӣ' },
          ],
          next: { salad: 'fulfill', drink: 'fulfill', checkout: 'fulfill' },
        },
        fulfill: {
          bot: ['Чӣ гуна мегиред?'],
          choices: [
            { id: 'delivery', label: 'Расондан (+8 с.)' },
            { id: 'pickup', label: 'Худ гирифтан' },
          ],
          next: { delivery: 'address', pickup: 'pay' },
        },
        address: {
          bot: ['Ба куҷо расонем?'],
          choices: [
            { id: 'center', label: 'Марказ, 20–30 дақ' },
            { id: 'south', label: 'Ҷануб, 35–45 дақ' },
          ],
          next: { center: 'pay', south: 'pay' },
        },
        pay: {
          bot: ['Ҷамъ ҳисоб шуд. Пардохт?'],
          choices: [
            { id: 'cash', label: 'Нақд' },
            { id: 'card', label: 'Корт ба курьер' },
            { id: 'online', label: 'Онлайн' },
          ],
          next: { cash: 'confirm', card: 'confirm', online: 'confirm' },
        },
        confirm: {
          bot: [
            'Фармоиш қабул шуд ✓',
            'Тайёрӣ ~25 дақ. Ҳолат ҳамин ҷо меояд.',
          ],
          choices: [
            { id: 'status', label: 'Фармоиш куҷост?' },
            { id: 'done', label: 'Хуб, интизорам' },
          ],
          next: { status: 'tracking', done: 'idle' },
        },
        tracking: {
          bot: ['Ҳозир: тайёрӣ 🍳', 'Тақрибан 10 дақ дигар.'],
          end: true,
        },
        idle: {
          bot: ['Офарин. Нуши ҷон!'],
          end: true,
        },
      },
    },
    {
      id: 'catalog',
      title: 'Каталог + дархост',
      for: 'Мағоза · хизматҳо',
      text: 'Категория, нарх, тафсилот ва дархост.',
      help: 'Мизоҳ интихоб мекунад — шумо ба дархости тайёр ҷавоб медиҳед.',
      botName: botName.tg,
      restart: 'Аз аввал',
      hint: 'Молро интихоб кунед ва дархост гузоред',
      start: 'start',
      steps: {
        start: {
          bot: ['Каталог кушода аст. Чӣро мебинед?'],
          choices: [
            { id: 'gadgets', label: 'Гаҷетҳо' },
            { id: 'home', label: 'Барои хона' },
            { id: 'service', label: 'Хизматҳо' },
          ],
          next: { gadgets: 'gadgets', home: 'home', service: 'services' },
        },
        gadgets: {
          bot: ['Гаҷетҳо:'],
          choices: [
            { id: 'phone', label: 'Ғилоф — 120 с.' },
            { id: 'cable', label: 'Кабели USB‑C — 55 с.' },
            { id: 'back', label: '← Бозгашт' },
          ],
          next: { phone: 'details', cable: 'details', back: 'start' },
        },
        home: {
          bot: ['Барои хона:'],
          choices: [
            { id: 'lamp', label: 'Чароғ — 350 с.' },
            { id: 'back', label: '← Бозгашт' },
          ],
          next: { lamp: 'details', back: 'start' },
        },
        services: {
          bot: ['Хизматҳо:'],
          choices: [
            { id: 'wifi', label: 'Насби Wi‑Fi — аз 200 с.' },
            { id: 'back', label: '← Бозгашт' },
          ],
          next: { wifi: 'details', back: 'start' },
        },
        details: {
          bot: ['Дар захира, кафолат 30 рӯз.', 'Минбаъд?'],
          choices: [
            { id: 'ask', label: 'Дархост гузорам' },
            { id: 'more', label: 'Дигар вариантҳо' },
            { id: 'faq', label: 'Расондан / пардохт' },
          ],
          next: { ask: 'contact', more: 'start', faq: 'ship' },
        },
        ship: {
          bot: [
            'Расондан дар шаҳр — 25 с., аз 300 с. ройгон.',
            'Пардохт: нақд / корт / гузарондан.',
            'Дархост мегузорем?',
          ],
          choices: [
            { id: 'yes', label: 'Ҳа, дархост' },
            { id: 'no', label: 'Ҳоло не' },
          ],
          next: { yes: 'contact', no: 'bye' },
        },
        contact: {
          bot: ['Чӣ гуна тамос гирем?'],
          choices: [
            { id: 'tg', label: 'Дар ҳамин чат' },
            { id: 'call', label: 'Занг занед' },
          ],
          next: { tg: 'sent', call: 'sent' },
        },
        sent: {
          bot: ['Дархост рафт ✓', 'Одатан дар як соат ҷавоб.', 'Рақам: #A-204'],
          end: true,
        },
        bye: {
          bot: ['Хуб. Каталог ҳамин ҷост.'],
          end: true,
        },
      },
    },
  ],
  en: [
    {
      id: 'booking',
      title: 'Booking bot',
      for: 'Salon · clinic · tutor',
      text: 'Service, specialist, slot, reminder, and reschedule.',
      help: 'Fewer no-shows and messy back-and-forth.',
      botName: botName.en,
      restart: 'Restart',
      hint: 'Tap a reply — like in Telegram',
      start: 'start',
      steps: {
        start: {
          bot: ['Hi! I am your booking bot.', 'What do you need?'],
          choices: [
            { id: 'book', label: 'Book a visit' },
            { id: 'move', label: 'Reschedule' },
            { id: 'price', label: 'See prices' },
          ],
          next: { book: 'service', move: 'reschedule', price: 'pricelist' },
        },
        service: {
          bot: ['Pick a service:'],
          choices: [
            { id: 'hair', label: 'Haircut — $8' },
            { id: 'nails', label: 'Manicure — $12' },
            { id: 'tutor', label: 'Lesson — $10' },
          ],
          next: { hair: 'master', nails: 'master', tutor: 'master' },
        },
        master: {
          bot: ['Who should take you?'],
          choices: [
            { id: 'any', label: 'Anyone free' },
            { id: 'anna', label: 'Anna' },
            { id: 'dilshod', label: 'Dilshod' },
          ],
          next: { any: 'when', anna: 'when', dilshod: 'when' },
        },
        when: {
          bot: ['When works for you?'],
          choices: [
            { id: 'today', label: 'Today, 17:00' },
            { id: 'tomorrow', label: 'Tomorrow, 11:00' },
            { id: 'sat', label: 'Saturday, 14:00' },
          ],
          next: { today: 'remind', tomorrow: 'remind', sat: 'remind' },
        },
        remind: {
          bot: ['Reminder before the visit?'],
          choices: [
            { id: 'h1', label: '1 hour before' },
            { id: 'h24', label: '1 day before' },
            { id: 'both', label: 'Both' },
          ],
          next: { h1: 'done', h24: 'done', both: 'done' },
        },
        done: {
          bot: ['Booked.', 'You will get a reminder in this chat.'],
          end: true,
        },
        reschedule: {
          bot: ['Found tomorrow at 11:00. Move to when?'],
          choices: [
            { id: 'eve', label: 'Tomorrow, 18:00' },
            { id: 'mon', label: 'Monday, 12:00' },
            { id: 'cancel', label: 'Cancel visit' },
          ],
          next: { eve: 'moved', mon: 'moved', cancel: 'cancelled' },
        },
        moved: {
          bot: ['Moved ✓', 'Old reminder cleared, new one set.'],
          end: true,
        },
        cancelled: {
          bot: ['Visit cancelled.', 'Message me anytime to book again.'],
          end: true,
        },
        pricelist: {
          bot: [
            'Prices:',
            '• Haircut — $8',
            '• Manicure — $12',
            '• Lesson — $10',
            'Book now?',
          ],
          choices: [
            { id: 'yes', label: 'Yes, book' },
            { id: 'later', label: 'Later' },
          ],
          next: { yes: 'service', later: 'bye' },
        },
        bye: {
          bot: ['Sure. I am here when you are ready.'],
          end: true,
        },
      },
    },
    {
      id: 'orders',
      title: 'Orders bot',
      for: 'Cafe · delivery',
      text: 'Priced menu, cart, delivery, and live status.',
      help: 'Orders keep coming when phones are busy.',
      botName: botName.en,
      restart: 'Restart',
      hint: 'Build an order — prices switch with language',
      start: 'start',
      steps: {
        start: {
          bot: ["Today's menu 👋", 'Prices in USD ($). What goes in the cart?'],
          choices: [
            { id: 'plov', label: 'Plov — $4.50' },
            { id: 'lagman', label: 'Lagman — $4' },
            { id: 'tea', label: 'Tea ×2 — $1.20' },
          ],
          next: { plov: 'more', lagman: 'more', tea: 'more' },
        },
        more: {
          bot: ['In the cart. Add more?'],
          choices: [
            { id: 'salad', label: '+ Salad — $1.80' },
            { id: 'drink', label: '+ Kompot — $1' },
            { id: 'checkout', label: 'Checkout' },
          ],
          next: { salad: 'fulfill', drink: 'fulfill', checkout: 'fulfill' },
        },
        fulfill: {
          bot: ['How should we fulfill it?'],
          choices: [
            { id: 'delivery', label: 'Delivery (+$0.80)' },
            { id: 'pickup', label: 'Pickup' },
          ],
          next: { delivery: 'address', pickup: 'pay' },
        },
        address: {
          bot: ['Where should we deliver?'],
          choices: [
            { id: 'center', label: 'Center, 20–30 min' },
            { id: 'south', label: 'South side, 35–45 min' },
          ],
          next: { center: 'pay', south: 'pay' },
        },
        pay: {
          bot: ['Total is ready. Payment method?'],
          choices: [
            { id: 'cash', label: 'Cash' },
            { id: 'card', label: 'Card to courier' },
            { id: 'online', label: 'Online' },
          ],
          next: { cash: 'confirm', card: 'confirm', online: 'confirm' },
        },
        confirm: {
          bot: [
            'Order received ✓',
            'Ready in ~25 min. Status updates here.',
          ],
          choices: [
            { id: 'status', label: 'Where is my order?' },
            { id: 'done', label: 'OK, waiting' },
          ],
          next: { status: 'tracking', done: 'idle' },
        },
        tracking: {
          bot: ['Status: cooking 🍳', 'About 10 min until handoff.'],
          end: true,
        },
        idle: {
          bot: ['Great. Enjoy your meal!'],
          end: true,
        },
      },
    },
    {
      id: 'catalog',
      title: 'Catalog + request',
      for: 'Shop · services',
      text: 'Categories, price, details, and a manager request.',
      help: 'Clients choose; you reply to a ready request.',
      botName: botName.en,
      restart: 'Restart',
      hint: 'Pick an item and leave a request',
      start: 'start',
      steps: {
        start: {
          bot: ['Catalog is open. What are we browsing?'],
          choices: [
            { id: 'gadgets', label: 'Gadgets' },
            { id: 'home', label: 'Home' },
            { id: 'service', label: 'Services' },
          ],
          next: { gadgets: 'gadgets', home: 'home', service: 'services' },
        },
        gadgets: {
          bot: ['Gadgets in stock:'],
          choices: [
            { id: 'phone', label: 'Case — $12' },
            { id: 'cable', label: 'USB‑C cable — $5.50' },
            { id: 'back', label: '← Back' },
          ],
          next: { phone: 'details', cable: 'details', back: 'start' },
        },
        home: {
          bot: ['Home:'],
          choices: [
            { id: 'lamp', label: 'Lamp — $35' },
            { id: 'back', label: '← Back' },
          ],
          next: { lamp: 'details', back: 'start' },
        },
        services: {
          bot: ['Services:'],
          choices: [
            { id: 'wifi', label: 'Wi‑Fi setup — from $20' },
            { id: 'back', label: '← Back' },
          ],
          next: { wifi: 'details', back: 'start' },
        },
        details: {
          bot: ['In stock, 30-day warranty.', 'Next step?'],
          choices: [
            { id: 'ask', label: 'Leave a request' },
            { id: 'more', label: 'Other options' },
            { id: 'faq', label: 'Shipping / pay' },
          ],
          next: { ask: 'contact', more: 'start', faq: 'ship' },
        },
        ship: {
          bot: [
            'City delivery — $2.50, free from $30.',
            'Pay by cash / card / transfer.',
            'Send a request?',
          ],
          choices: [
            { id: 'yes', label: 'Yes, request' },
            { id: 'no', label: 'Not now' },
          ],
          next: { yes: 'contact', no: 'bye' },
        },
        contact: {
          bot: ['How should we reach you?'],
          choices: [
            { id: 'tg', label: 'In this chat' },
            { id: 'call', label: 'Call me' },
          ],
          next: { tg: 'sent', call: 'sent' },
        },
        sent: {
          bot: ['Request sent ✓', 'We usually reply within an hour.', 'Ticket #A-204'],
          end: true,
        },
        bye: {
          bot: ['All good. The catalog stays here whenever you are ready.'],
          end: true,
        },
      },
    },
  ],
}

export function getDemoScripts(lang: Lang) {
  return scripts[lang]
}
