import type { Lang } from './i18n'

export type Pack = {
  name: string
  price: string
  text: string
  features: string[]
}

type PricingCopy = {
  title: string
  lead: string
  note: string
  packs: Pack[]
}

/** Student-friendly starter quotes; currency follows UI language. */
export const pricingByLang: Record<Lang, PricingCopy> = {
  ru: {
    title: 'Цены',
    lead: 'Ориентиры для старта — без раздутых «агентских» чеков.',
    note: 'Точная сумма после короткого созвона. Можно начать с малого сценария.',
    packs: [
      {
        name: 'Старт',
        price: 'от 4 500 ₽',
        text: 'Один простой сценарий: запись или заявка.',
        features: ['1 сценарий', 'Базовые тексты', 'Запуск в Telegram'],
      },
      {
        name: 'Бизнес',
        price: 'от 11 000 ₽',
        text: 'Заказы или каталог с несколькими шагами.',
        features: ['Несколько шагов', 'Уведомления', 'Небольшие правки'],
      },
      {
        name: 'Под ключ',
        price: 'от 22 000 ₽',
        text: 'Сложный бот, интеграции и сопровождение.',
        features: ['Кастом-логика', 'Интеграции', 'Поддержка'],
      },
    ],
  },
  tg: {
    title: 'Нархҳо',
    lead: 'Тахминҳои оғозӣ — бе нархҳои ширкатҳои калон.',
    note: 'Маблағи дақиқ баъд аз сӯҳбати кӯтоҳ. Метавонед аз сенарияи хурд оғоз кунед.',
    packs: [
      {
        name: 'Оғоз',
        price: 'аз 450 с.',
        text: 'Як сенарияи оддӣ: сабт ё дархост.',
        features: ['1 сенария', 'Матнҳои асосӣ', 'Оғоз дар Telegram'],
      },
      {
        name: 'Бизнес',
        price: 'аз 1 100 с.',
        text: 'Фармоиш ё каталог бо чанд қадам.',
        features: ['Чанд қадам', 'Огоҳиҳо', 'Ислоҳоти хурд'],
      },
      {
        name: 'Калидӣ',
        price: 'аз 2 200 с.',
        text: 'Боти мураккаб, интегратсия ва ҳамроҳӣ.',
        features: ['Мантиқи махсус', 'Интегратсияҳо', 'Дастгирӣ'],
      },
    ],
  },
  en: {
    title: 'Pricing',
    lead: 'Starter-friendly ranges — not agency markup.',
    note: 'Exact quote after a short chat. You can start with one simple flow.',
    packs: [
      {
        name: 'Start',
        price: 'from $55',
        text: 'One simple flow: booking or a request form.',
        features: ['1 flow', 'Basic copy', 'Telegram launch'],
      },
      {
        name: 'Business',
        price: 'from $130',
        text: 'Orders or catalog with multiple steps.',
        features: ['Multi-step', 'Notifications', 'Small revisions'],
      },
      {
        name: 'Custom',
        price: 'from $260',
        text: 'Complex bot, integrations, and ongoing support.',
        features: ['Custom logic', 'Integrations', 'Support'],
      },
    ],
  },
}
