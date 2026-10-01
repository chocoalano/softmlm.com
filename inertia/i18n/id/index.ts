import type { Messages } from '../en/index'
import common from './common'
import modules from './modules'
import homeIntro from './home_intro'
import homePlatform from './home_platform'
import homeClosing from './home_closing'
import compensation from './compensation'
import pricing from './pricing'
import personas from './personas'
import features from './features'
import implementation from './implementation'
import services from './services'
import integrations from './integrations'
import security from './security'

/**
 * All Indonesian marketing copy: the same shape as the English messages.
 */
const messages: Messages = {
  common,
  modules,
  homeIntro,
  homePlatform,
  homeClosing,
  compensation,
  pricing,
  personas,
  features,
  implementation,
  services,
  integrations,
  security,
}

export default messages
