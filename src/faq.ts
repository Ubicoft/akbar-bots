import type { Lang } from './i18n'

export type FaqItem = { q: string; a: string }

type FaqCopy = {
  title: string
  lead: string
  items: FaqItem[]
}

export const faqByLang: Record<Lang, FaqCopy> = {
  ru: {
    title: 'FAQ',
    lead: 'Коротко по срокам, языку и тому, что будет после запуска.',
    items: [
      {
        q: 'Сколько занимает первый бот?',
        a: 'Простой сценарий — обычно несколько дней после ТЗ. Сложный — дольше, скажу сроки заранее.',
      },
      {
        q: 'Нужен ли свой сервер?',
        a: 'Для старта чаще хватает простого хостинга/облака. Если нужен свой сервер — обсудим отдельно.',
      },
      {
        q: 'Бот может говорить на таджикском?',
        a: 'Да. Тексты делаю на RU / TJ / EN — как удобно вашим клиентам.',
      },
      {
        q: 'Что если бот сломается?',
        a: 'После сдачи есть поддержка: поправлю баги и помогу с мелкими правками по договорённости.',
      },
      {
        q: 'Можно начать с малого?',
        a: 'Да. Часто стартуем с одного сценария, потом добавляем шаги и уведомления.',
      },
    ],
  },
  tg: {
    title: 'Саволҳо',
    lead: 'Дар бораи мӯҳлат, забон ва дастгирӣ пас аз оғоз.',
    items: [
      {
        q: 'Боти аввал чанд вақт мегирад?',
        a: 'Сенарияи оддӣ — одатан чанд рӯз баъд аз вазифа. Мураккабтар — дарозтар, мӯҳлатро пештар мегӯям.',
      },
      {
        q: 'Сервери худ лозим аст?',
        a: 'Барои оғоз аксар вақт хостинги оддӣ/абр кифоя аст. Агар сервери худ лозим бошад — алоҳида муҳокима мекунем.',
      },
      {
        q: 'Бот ба забони тоҷикӣ гап зада метавонад?',
        a: 'Ҳа. Матнҳоро ба RU / TJ / EN менависам — чӣ тавре ки ба мизоҷони шумо қулай аст.',
      },
      {
        q: 'Агар бот вайрон шавад?',
        a: 'Баъд аз супориш дастгирӣ ҳаст: хатоҳоро ислоҳ мекунам ва бо мувофиқа ислоҳоти хурд мекунам.',
      },
      {
        q: 'Аз хурд оғоз кардан мумкин аст?',
        a: 'Ҳа. Аксар вақт аз як сенария оғоз мекунем, баъд қадамҳо ва огоҳиҳоро илова мекунем.',
      },
    ],
  },
  en: {
    title: 'FAQ',
    lead: 'Timing, language, hosting, and what happens after launch.',
    items: [
      {
        q: 'How long for the first bot?',
        a: 'A simple flow usually takes a few days after the brief. Complex ones take longer — I share dates up front.',
      },
      {
        q: 'Do I need my own server?',
        a: 'For a start, simple hosting/cloud is enough. If you need your own server, we discuss it separately.',
      },
      {
        q: 'Can the bot speak Tajik?',
        a: 'Yes. Copy can be RU / TJ / EN — whatever your customers prefer.',
      },
      {
        q: 'What if the bot breaks?',
        a: 'Support after delivery: I fix bugs and help with small tweaks as agreed.',
      },
      {
        q: 'Can we start small?',
        a: 'Yes. We often ship one flow first, then add steps and notifications.',
      },
    ],
  },
}
