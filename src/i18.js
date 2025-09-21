// src/i18n.js
import { createI18n } from 'vue-i18n'

import EN from './i18n/EN.json'
import BN from './i18n/BN.json'

const messages = {
  EN, BN
}

const numberFormats = {
  'en-US': { currency: { style: 'currency', currency: 'USD' }, decimal: { style: 'decimal', minimumFractionDigits: 2 }, percent: { style: 'percent' } },
  'bn-BD': { currency: { style: 'currency', currency: 'BDT' }, decimal: { style: 'decimal', minimumFractionDigits: 2 }, percent: { style: 'percent' } },
  // ... (other number formats, same as you have now)
}

export function createCustomI18n(locale = 'EN') {
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'EN',
    messages,
    numberFormats,
  })
}