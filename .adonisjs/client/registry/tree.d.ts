/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  marketing: {
    home: typeof routes['marketing.home']
    compensationPlans: typeof routes['marketing.compensation_plans']
    pricing: typeof routes['marketing.pricing']
    whoWeServe: typeof routes['marketing.who_we_serve'] & {
      executives: typeof routes['marketing.who_we_serve.executives']
      finance: typeof routes['marketing.who_we_serve.finance']
      operations: typeof routes['marketing.who_we_serve.operations']
      it: typeof routes['marketing.who_we_serve.it']
      distributors: typeof routes['marketing.who_we_serve.distributors']
    }
    howWeDoIt: typeof routes['marketing.how_we_do_it']
    integrations: typeof routes['marketing.integrations']
    services: typeof routes['marketing.services'] & {
      socialMedia: typeof routes['marketing.services.social_media']
      seo: typeof routes['marketing.services.seo']
      paidAdvertising: typeof routes['marketing.services.paid_advertising']
      branding: typeof routes['marketing.services.branding']
      productMaklon: typeof routes['marketing.services.product_maklon']
    }
    features: typeof routes['marketing.features'] & {
      network: typeof routes['marketing.features.network']
      ecommerce: typeof routes['marketing.features.ecommerce']
      wallet: typeof routes['marketing.features.wallet']
    }
    notFound: typeof routes['marketing.not_found']
    events: {
      store: typeof routes['marketing.events.store']
    }
  }
  demoRequests: {
    store: typeof routes['demo_requests.store']
  }
  whatsapp: {
    redirect: typeof routes['whatsapp.redirect']
  }
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  dashboard: typeof routes['dashboard']
  admin: {
    demoRequests: {
      index: typeof routes['admin.demo_requests.index']
      show: typeof routes['admin.demo_requests.show']
      updateStatus: typeof routes['admin.demo_requests.update_status']
      notes: {
        store: typeof routes['admin.demo_requests.notes.store']
      }
    }
    marketing: {
      overview: typeof routes['admin.marketing.overview']
      visitors: typeof routes['admin.marketing.visitors']
      visitor: typeof routes['admin.marketing.visitor']
      whatsapp: {
        index: typeof routes['admin.marketing.whatsapp.index']
        show: typeof routes['admin.marketing.whatsapp.show']
        contacted: typeof routes['admin.marketing.whatsapp.contacted']
        uncontacted: typeof routes['admin.marketing.whatsapp.uncontacted']
        link: typeof routes['admin.marketing.whatsapp.link']
        unlink: typeof routes['admin.marketing.whatsapp.unlink']
      }
    }
    search: typeof routes['admin.search']
  }
}
