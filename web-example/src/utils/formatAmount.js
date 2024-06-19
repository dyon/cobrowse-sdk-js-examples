import LocaleCurrency from 'locale-currency'

export const formatAmount = (amount) => {
  // If for some reason the language is not available, default to en-US
  const language = navigator.language ?? 'en-US'

  return amount.toLocaleString(language, {
    style: 'currency',
    currency: LocaleCurrency.getCurrency(language)
  })
}