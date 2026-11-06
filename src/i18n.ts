export type Lang = 'ru' | 'tg' | 'en'

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'tg', label: 'TJ' },
  { code: 'en', label: 'EN' },
]

type Dict = {
  nav: { services: string; demos: string; process: string; pricing: string; contact: string }
  hero: { brand: string; offer: string; support: string; cta: string; secondary: string }
  services: { title: string; lead: string; items: { title: string; text: string }[] }
  demos: {
    title: string
    lead: string
    items: { title: string; for: string; text: string; help: string }[]
  }
  process: { title: string; lead: string; steps: { title: string; text: string }[] }
  pricing: {
    title: string
    lead: string
    note: string
    packs: { name: string; price: string; text: string; features: string[] }[]
  }
  contact: {
    title: string
    lead: string
    telegram: string
    email: string
    telegramValue: string
    emailValue: string
    cta: string
  }
  footer: { rights: string }
}

export const copy: Record<Lang, Dict> = {
  ru: {
    nav: {
      services: 'Что делаю',
      demos: 'Примеры',
      process: 'Как работаем',
      pricing: 'Цены',
      contact: 'Контакты',
    },
    hero: {
      brand: 'Akbar M.',
      offer: 'Telegram-боты для бизнеса',
      support: 'Запись, заказы, каталог — под вашу задачу, без лишней сложности.',
      cta: 'Написать в Telegram',
      secondary: 'Смотреть примеры',
    },
    services: {
      title: 'Что делаю',
      lead: 'Боты, которые экономят время и принимают заявки, пока вы заняты делом.',
      items: [
        {
          title: 'Запись',
          text: 'Клиент выбирает услугу и время — бот напоминает и снижает «не пришёл».',
        },
        {
          title: 'Заказы',
          text: 'Меню, корзина и статус заказа прямо в Telegram — удобно для кафе и доставки.',
        },
        {
          title: 'Каталог',
          text: 'Товары и услуги с заявкой менеджеру: смотрит → пишет → вы связываетесь.',
        },
        {
          title: 'Напоминания',
          text: 'Автоуведомления о визите, оплате или статусе — меньше ручной переписки.',
        },
      ],
    },
    demos: {
      title: 'Примеры',
      lead: 'Три рабочих сценария. Подстроим под ваш бизнес.',
      items: [
        {
          title: 'Бот записи',
          for: 'Салон · клиника · репетитор',
          text: 'Дата, услуга, напоминание перед визитом.',
          help: 'Меньше пропущенных записей и хаоса в чатах.',
        },
        {
          title: 'Бот заказов',
          for: 'Кафе · доставка',
          text: 'Меню, корзина, подтверждение и статус.',
          help: 'Заказы принимаются даже когда телефоны заняты.',
        },
        {
          title: 'Каталог + заявка',
          for: 'Магазин · услуги',
          text: 'Каталог товаров → заявка менеджеру.',
          help: 'Клиент сам выбирает, вы отвечаете по готовой заявке.',
        },
      ],
    },
    process: {
      title: 'Как работаем',
      lead: 'Короткий путь от идеи до рабочего бота.',
      steps: [
        { title: 'Задача', text: 'Рассказываете, что нужно автоматизировать.' },
        { title: 'Демо', text: 'Показываю прототип под ваш сценарий.' },
        { title: 'Сдача', text: 'Запускаем бота и подключаем к вашему каналу.' },
        { title: 'Поддержка', text: 'Правки и помощь после запуска.' },
      ],
    },
    pricing: {
      title: 'Цены',
      lead: 'Ориентиры — точная сумма зависит от сценария.',
      note: 'Цены уточняются после короткого созвона или переписки.',
      packs: [
        {
          name: 'Старт',
          price: 'от $80',
          text: 'Один простой сценарий: запись или заявка.',
          features: ['1 сценарий', 'Базовые тексты', 'Запуск в Telegram'],
        },
        {
          name: 'Бизнес',
          price: 'от $180',
          text: 'Заказы или каталог с несколькими шагами.',
          features: ['Несколько шагов', 'Уведомления', 'Небольшие правки'],
        },
        {
          name: 'Под ключ',
          price: 'по запросу',
          text: 'Сложный бот, интеграции и сопровождение.',
          features: ['Кастом-логика', 'Интеграции', 'Поддержка'],
        },
      ],
    },
    contact: {
      title: 'Контакты',
      lead: 'Напишите — обсудим задачу и сроки.',
      telegram: 'Telegram',
      email: 'Email',
      telegramValue: '@your_telegram',
      emailValue: 'you@example.com',
      cta: 'Открыть Telegram',
    },
    footer: { rights: 'Telegram-боты для бизнеса' },
  },
  tg: {
    nav: {
      services: 'Чӣ мекунам',
      demos: 'Намунаҳо',
      process: 'Чӣ гуна кор',
      pricing: 'Нархҳо',
      contact: 'Тамос',
    },
    hero: {
      brand: 'Akbar M.',
      offer: 'Ботҳои Telegram барои бизнес',
      support: 'Сабти ном, фармоиш, каталог — мувофиқи вазифаи шумо.',
      cta: 'Навиштан ба Telegram',
      secondary: 'Дидани намунаҳо',
    },
    services: {
      title: 'Чӣ мекунам',
      lead: 'Ботҳое, ки вақтро сарфа мекунанд ва дархостҳоро қабул мекунанд.',
      items: [
        {
          title: 'Сабти ном',
          text: 'Мизоҳ вақт ва хизматро интихоб мекунад — бот ёдрас мекунад.',
        },
        {
          title: 'Фармоишҳо',
          text: 'Меню, сабад ва ҳолати фармоиш дар Telegram.',
        },
        {
          title: 'Каталог',
          text: 'Молҳо ва хизматҳо бо дархост ба менеҷер.',
        },
        {
          title: 'Ёдрасҳо',
          text: 'Огоҳиҳои худкор — камтар мукотибаи дастӣ.',
        },
      ],
    },
    demos: {
      title: 'Намунаҳо',
      lead: 'Се сенарияи корӣ. Ба бизнеси шумо мутобиқ мекунем.',
      items: [
        {
          title: 'Боти сабт',
          for: 'Салон · клиника · репетитор',
          text: 'Сана, хизмат, ёдрас пеш аз вохӯрӣ.',
          help: 'Камтар сабтҳои гумшуда ва бетартибӣ.',
        },
        {
          title: 'Боти фармоиш',
          for: 'Кафе · расондан',
          text: 'Меню, сабад, тасдиқ ва ҳолат.',
          help: 'Фармоишҳо ҳатто вақти бандӣ қабул мешаванд.',
        },
        {
          title: 'Каталог + дархост',
          for: 'Мағоза · хизматҳо',
          text: 'Каталог → дархост ба менеҷер.',
          help: 'Мизоҳ интихоб мекунад, шумо ба дархости тайёр ҷавоб медиҳед.',
        },
      ],
    },
    process: {
      title: 'Чӣ гуна кор мекунем',
      lead: 'Роҳи кӯтоҳ аз идея то боти корӣ.',
      steps: [
        { title: 'Вазифа', text: 'Мегӯед, чӣро автоматик кардан лозим аст.' },
        { title: 'Демо', text: 'Прототипро нишон медиҳам.' },
        { title: 'Супориш', text: 'Ботро ба Telegram пайваст мекунем.' },
        { title: 'Дастгирӣ', text: 'Ислоҳот ва кӯмак баъд аз оғоз.' },
      ],
    },
    pricing: {
      title: 'Нархҳо',
      lead: 'Тахминҳо — маблағи дақиқ аз сенария вобаста аст.',
      note: 'Нарх баъд аз сӯҳбати кӯтоҳ муайян мешавад.',
      packs: [
        {
          name: 'Оғоз',
          price: 'аз $80',
          text: 'Як сенарияи оддӣ: сабт ё дархост.',
          features: ['1 сенария', 'Матнҳои асосӣ', 'Оғоз дар Telegram'],
        },
        {
          name: 'Бизнес',
          price: 'аз $180',
          text: 'Фармоиш ё каталог бо чанд қадам.',
          features: ['Чанд қадам', 'Огоҳиҳо', 'Ислоҳоти хурд'],
        },
        {
          name: 'Калидӣ',
          price: 'бо дархост',
          text: 'Боти мураккаб, интегратсия ва ҳамроҳӣ.',
          features: ['Мантиқи махсус', 'Интегратсияҳо', 'Дастгирӣ'],
        },
      ],
    },
    contact: {
      title: 'Тамос',
      lead: 'Нависед — вазифа ва мӯҳлатро муҳокима мекунем.',
      telegram: 'Telegram',
      email: 'Email',
      telegramValue: '@your_telegram',
      emailValue: 'you@example.com',
      cta: 'Кушодани Telegram',
    },
    footer: { rights: 'Ботҳои Telegram барои бизнес' },
  },
  en: {
    nav: {
      services: 'What I build',
      demos: 'Examples',
      process: 'How it works',
      pricing: 'Pricing',
      contact: 'Contact',
    },
    hero: {
      brand: 'Akbar M.',
      offer: 'Telegram bots for business',
      support: 'Booking, orders, catalogs — tailored to your workflow.',
      cta: 'Message on Telegram',
      secondary: 'See examples',
    },
    services: {
      title: 'What I build',
      lead: 'Bots that save time and take requests while you work.',
      items: [
        {
          title: 'Booking',
          text: 'Clients pick a service and time — the bot reminds them.',
        },
        {
          title: 'Orders',
          text: 'Menu, cart, and order status right in Telegram.',
        },
        {
          title: 'Catalog',
          text: 'Products and services with a request to your manager.',
        },
        {
          title: 'Reminders',
          text: 'Auto notices for visits, payments, or status updates.',
        },
      ],
    },
    demos: {
      title: 'Examples',
      lead: 'Three practical flows. We adapt them to your business.',
      items: [
        {
          title: 'Booking bot',
          for: 'Salon · clinic · tutor',
          text: 'Date, service, reminder before the visit.',
          help: 'Fewer no-shows and messy chat threads.',
        },
        {
          title: 'Orders bot',
          for: 'Cafe · delivery',
          text: 'Menu, cart, confirmation, and status.',
          help: 'Orders keep coming when phones are busy.',
        },
        {
          title: 'Catalog + request',
          for: 'Shop · services',
          text: 'Product catalog → request to a manager.',
          help: 'Clients choose; you reply to a ready request.',
        },
      ],
    },
    process: {
      title: 'How it works',
      lead: 'A short path from idea to a working bot.',
      steps: [
        { title: 'Brief', text: 'Tell me what you want to automate.' },
        { title: 'Demo', text: 'I show a prototype for your flow.' },
        { title: 'Launch', text: 'We go live and connect Telegram.' },
        { title: 'Support', text: 'Tweaks and help after launch.' },
      ],
    },
    pricing: {
      title: 'Pricing',
      lead: 'Guidelines — the final quote depends on the flow.',
      note: 'Exact pricing after a short chat.',
      packs: [
        {
          name: 'Start',
          price: 'from $80',
          text: 'One simple flow: booking or a request form.',
          features: ['1 flow', 'Basic copy', 'Telegram launch'],
        },
        {
          name: 'Business',
          price: 'from $180',
          text: 'Orders or catalog with multiple steps.',
          features: ['Multi-step', 'Notifications', 'Small revisions'],
        },
        {
          name: 'Custom',
          price: 'on request',
          text: 'Complex bot, integrations, and ongoing support.',
          features: ['Custom logic', 'Integrations', 'Support'],
        },
      ],
    },
    contact: {
      title: 'Contact',
      lead: 'Write me — we will discuss scope and timing.',
      telegram: 'Telegram',
      email: 'Email',
      telegramValue: '@your_telegram',
      emailValue: 'you@example.com',
      cta: 'Open Telegram',
    },
    footer: { rights: 'Telegram bots for business' },
  },
}
