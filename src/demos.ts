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

const scripts: Record<Lang, DemoScript[]> = {
  ru: [
    {
      id: 'booking',
      title: 'Бот записи',
      for: 'Салон · клиника · репетитор',
      text: 'Дата, услуга, напоминание перед визитом.',
      help: 'Меньше пропущенных записей и хаоса в чатах.',
      botName: 'Запись Bot',
      restart: 'Сначала',
      hint: 'Нажмите вариант — как в Telegram',
      start: 'start',
      steps: {
        start: {
          bot: ['Здравствуйте! Куда записать?', 'Выберите услугу:'],
          choices: [
            { id: 'hair', label: 'Стрижка' },
            { id: 'nails', label: 'Маникюр' },
            { id: 'tutor', label: 'Урок' },
          ],
          next: { hair: 'when', nails: 'when', tutor: 'when' },
        },
        when: {
          bot: ['Отлично. Когда удобно?'],
          choices: [
            { id: 'today', label: 'Сегодня, 17:00' },
            { id: 'tomorrow', label: 'Завтра, 11:00' },
            { id: 'sat', label: 'Суббота, 14:00' },
          ],
          next: { today: 'done', tomorrow: 'done', sat: 'done' },
        },
        done: {
          bot: [
            'Готово — вы в записи.',
            'За час пришлю напоминание в этот чат.',
          ],
          end: true,
        },
      },
    },
    {
      id: 'orders',
      title: 'Бот заказов',
      for: 'Кафе · доставка',
      text: 'Меню, корзина, подтверждение и статус.',
      help: 'Заказы принимаются даже когда телефоны заняты.',
      botName: 'Заказ Bot',
      restart: 'Сначала',
      hint: 'Соберите мини-заказ',
      start: 'start',
      steps: {
        start: {
          bot: ['Меню на сегодня 👋', 'Что положить в корзину?'],
          choices: [
            { id: 'plov', label: 'Плов ×1' },
            { id: 'lagman', label: 'Лагман ×1' },
            { id: 'tea', label: 'Чай ×2' },
          ],
          next: { plov: 'more', lagman: 'more', tea: 'more' },
        },
        more: {
          bot: ['Добавлено. Ещё что-то?'],
          choices: [
            { id: 'salad', label: '+ Салат' },
            { id: 'drink', label: '+ Напиток' },
            { id: 'checkout', label: 'Оформить' },
          ],
          next: { salad: 'checkout', drink: 'checkout', checkout: 'checkout' },
        },
        checkout: {
          bot: [
            'Заказ принят ✓',
            'Готовим ~25 мин. Статус придёт сюда.',
          ],
          end: true,
        },
      },
    },
    {
      id: 'catalog',
      title: 'Каталог + заявка',
      for: 'Магазин · услуги',
      text: 'Каталог товаров → заявка менеджеру.',
      help: 'Клиент сам выбирает, вы отвечаете по готовой заявке.',
      botName: 'Каталог Bot',
      restart: 'Сначала',
      hint: 'Выберите товар и оставьте заявку',
      start: 'start',
      steps: {
        start: {
          bot: ['Каталог открыт. Что интересно?'],
          choices: [
            { id: 'phone', label: 'Чехол — 120 с.' },
            { id: 'lamp', label: 'Лампа — 350 с.' },
            { id: 'service', label: 'Установка Wi‑Fi' },
          ],
          next: { phone: 'ask', lamp: 'ask', service: 'ask' },
        },
        ask: {
          bot: ['Оставить заявку менеджеру?'],
          choices: [
            { id: 'yes', label: 'Да, оставить' },
            { id: 'info', label: 'Ещё детали' },
          ],
          next: { yes: 'sent', info: 'sent' },
        },
        sent: {
          bot: [
            'Заявка ушла менеджеру.',
            'Обычно отвечаем в течение часа.',
          ],
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
      text: 'Сана, хизмат, ёдрас пеш аз вохӯрӣ.',
      help: 'Камтар сабтҳои гумшуда ва бетартибӣ.',
      botName: 'Сабт Bot',
      restart: 'Аз аввал',
      hint: 'Вариантро пахш кунед — мисли Telegram',
      start: 'start',
      steps: {
        start: {
          bot: ['Салом! Ба куҷо сабт кунам?', 'Хизматро интихоб кунед:'],
          choices: [
            { id: 'hair', label: 'Мӯйбурӣ' },
            { id: 'nails', label: 'Маникюр' },
            { id: 'tutor', label: 'Дарс' },
          ],
          next: { hair: 'when', nails: 'when', tutor: 'when' },
        },
        when: {
          bot: ['Хуб. Кай қулай аст?'],
          choices: [
            { id: 'today', label: 'Имрӯз, 17:00' },
            { id: 'tomorrow', label: 'Фардо, 11:00' },
            { id: 'sat', label: 'Шанбе, 14:00' },
          ],
          next: { today: 'done', tomorrow: 'done', sat: 'done' },
        },
        done: {
          bot: ['Тайёр — шумо сабт шудед.', 'Як соат пеш ёдрас мефиристам.'],
          end: true,
        },
      },
    },
    {
      id: 'orders',
      title: 'Боти фармоиш',
      for: 'Кафе · расондан',
      text: 'Меню, сабад, тасдиқ ва ҳолат.',
      help: 'Фармоишҳо ҳатто вақти бандӣ қабул мешаванд.',
      botName: 'Фармоиш Bot',
      restart: 'Аз аввал',
      hint: 'Фармоиши хурдро ҷамъ кунед',
      start: 'start',
      steps: {
        start: {
          bot: ['Менюи имрӯз 👋', 'Чӣ ба сабад гузорем?'],
          choices: [
            { id: 'plov', label: 'Палов ×1' },
            { id: 'lagman', label: 'Лағмон ×1' },
            { id: 'tea', label: 'Чой ×2' },
          ],
          next: { plov: 'more', lagman: 'more', tea: 'more' },
        },
        more: {
          bot: ['Илова шуд. Боз чизе?'],
          choices: [
            { id: 'salad', label: '+ Салат' },
            { id: 'drink', label: '+ Нӯшокӣ' },
            { id: 'checkout', label: 'Расӣ кардан' },
          ],
          next: { salad: 'checkout', drink: 'checkout', checkout: 'checkout' },
        },
        checkout: {
          bot: ['Фармоиш қабул шуд ✓', 'Тайёрӣ ~25 дақ. Ҳолат ҳамин ҷо меояд.'],
          end: true,
        },
      },
    },
    {
      id: 'catalog',
      title: 'Каталог + дархост',
      for: 'Мағоза · хизматҳо',
      text: 'Каталог → дархост ба менеҷер.',
      help: 'Мизоҳ интихоб мекунад, шумо ба дархости тайёр ҷавоб медиҳед.',
      botName: 'Каталог Bot',
      restart: 'Аз аввал',
      hint: 'Молро интихоб кунед ва дархост гузоред',
      start: 'start',
      steps: {
        start: {
          bot: ['Каталог кушода аст. Чӣ лозим аст?'],
          choices: [
            { id: 'phone', label: 'Ғилоф — 120 с.' },
            { id: 'lamp', label: 'Чароғ — 350 с.' },
            { id: 'service', label: 'Насби Wi‑Fi' },
          ],
          next: { phone: 'ask', lamp: 'ask', service: 'ask' },
        },
        ask: {
          bot: ['Дархост ба менеҷер гузорем?'],
          choices: [
            { id: 'yes', label: 'Ҳа, гузоред' },
            { id: 'info', label: 'Боз маълумот' },
          ],
          next: { yes: 'sent', info: 'sent' },
        },
        sent: {
          bot: ['Дархост рафт.', 'Одатан дар як соат ҷавоб медиҳем.'],
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
      text: 'Date, service, reminder before the visit.',
      help: 'Fewer no-shows and messy chat threads.',
      botName: 'Booking Bot',
      restart: 'Restart',
      hint: 'Tap a reply — like in Telegram',
      start: 'start',
      steps: {
        start: {
          bot: ['Hi! What should I book?', 'Pick a service:'],
          choices: [
            { id: 'hair', label: 'Haircut' },
            { id: 'nails', label: 'Manicure' },
            { id: 'tutor', label: 'Lesson' },
          ],
          next: { hair: 'when', nails: 'when', tutor: 'when' },
        },
        when: {
          bot: ['Nice. When works for you?'],
          choices: [
            { id: 'today', label: 'Today, 17:00' },
            { id: 'tomorrow', label: 'Tomorrow, 11:00' },
            { id: 'sat', label: 'Saturday, 14:00' },
          ],
          next: { today: 'done', tomorrow: 'done', sat: 'done' },
        },
        done: {
          bot: ['Booked.', 'I will remind you here an hour before.'],
          end: true,
        },
      },
    },
    {
      id: 'orders',
      title: 'Orders bot',
      for: 'Cafe · delivery',
      text: 'Menu, cart, confirmation, and status.',
      help: 'Orders keep coming when phones are busy.',
      botName: 'Orders Bot',
      restart: 'Restart',
      hint: 'Build a tiny order',
      start: 'start',
      steps: {
        start: {
          bot: ["Today's menu 👋", 'What goes in the cart?'],
          choices: [
            { id: 'plov', label: 'Plov ×1' },
            { id: 'lagman', label: 'Lagman ×1' },
            { id: 'tea', label: 'Tea ×2' },
          ],
          next: { plov: 'more', lagman: 'more', tea: 'more' },
        },
        more: {
          bot: ['Added. Anything else?'],
          choices: [
            { id: 'salad', label: '+ Salad' },
            { id: 'drink', label: '+ Drink' },
            { id: 'checkout', label: 'Checkout' },
          ],
          next: { salad: 'checkout', drink: 'checkout', checkout: 'checkout' },
        },
        checkout: {
          bot: ['Order received ✓', 'Ready in ~25 min. Status updates here.'],
          end: true,
        },
      },
    },
    {
      id: 'catalog',
      title: 'Catalog + request',
      for: 'Shop · services',
      text: 'Product catalog → request to a manager.',
      help: 'Clients choose; you reply to a ready request.',
      botName: 'Catalog Bot',
      restart: 'Restart',
      hint: 'Pick an item and leave a request',
      start: 'start',
      steps: {
        start: {
          bot: ['Catalog is open. What looks good?'],
          choices: [
            { id: 'phone', label: 'Case — $12' },
            { id: 'lamp', label: 'Lamp — $35' },
            { id: 'service', label: 'Wi‑Fi setup' },
          ],
          next: { phone: 'ask', lamp: 'ask', service: 'ask' },
        },
        ask: {
          bot: ['Send a request to the manager?'],
          choices: [
            { id: 'yes', label: 'Yes, send it' },
            { id: 'info', label: 'More details' },
          ],
          next: { yes: 'sent', info: 'sent' },
        },
        sent: {
          bot: ['Request sent.', 'We usually reply within an hour.'],
          end: true,
        },
      },
    },
  ],
}

export function getDemoScripts(lang: Lang) {
  return scripts[lang]
}
