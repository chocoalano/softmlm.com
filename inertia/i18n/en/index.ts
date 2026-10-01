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

/**
 * All English marketing copy. This object's shape is the contract every
 * other language must match.
 */
const messages = {
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
}

export type Messages = typeof messages

export default messages
