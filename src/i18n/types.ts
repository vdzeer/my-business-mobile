import 'react-i18next'
import en from './Languages/en'
import ru from './Languages/ru'
import uk from './Languages/uk'

declare module 'react-i18next' {
  interface Resources {
    en: typeof en
    ru: typeof ru
    uk: typeof uk
  }
}
