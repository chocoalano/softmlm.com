/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'robots': {
    methods: ["GET","HEAD"],
    pattern: '/robots.txt',
    tokens: [{"old":"/robots.txt","type":0,"val":"robots.txt","end":""}],
    types: placeholder as Registry['robots']['types'],
  },
  'sitemap': {
    methods: ["GET","HEAD"],
    pattern: '/sitemap.xml',
    tokens: [{"old":"/sitemap.xml","type":0,"val":"sitemap.xml","end":""}],
    types: placeholder as Registry['sitemap']['types'],
  },
  'marketing.home': {
    methods: ["GET","HEAD"],
    pattern: '/:locale',
    tokens: [{"old":"/:locale","type":1,"val":"locale","end":""}],
    types: placeholder as Registry['marketing.home']['types'],
  },
  'marketing.compensation_plans': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/compensation-plans',
    tokens: [{"old":"/:locale/compensation-plans","type":1,"val":"locale","end":""},{"old":"/:locale/compensation-plans","type":0,"val":"compensation-plans","end":""}],
    types: placeholder as Registry['marketing.compensation_plans']['types'],
  },
  'marketing.pricing': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/pricing',
    tokens: [{"old":"/:locale/pricing","type":1,"val":"locale","end":""},{"old":"/:locale/pricing","type":0,"val":"pricing","end":""}],
    types: placeholder as Registry['marketing.pricing']['types'],
  },
  'marketing.who_we_serve': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/who-we-serve',
    tokens: [{"old":"/:locale/who-we-serve","type":1,"val":"locale","end":""},{"old":"/:locale/who-we-serve","type":0,"val":"who-we-serve","end":""}],
    types: placeholder as Registry['marketing.who_we_serve']['types'],
  },
  'marketing.who_we_serve.executives': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/who-we-serve/executives',
    tokens: [{"old":"/:locale/who-we-serve/executives","type":1,"val":"locale","end":""},{"old":"/:locale/who-we-serve/executives","type":0,"val":"who-we-serve","end":""},{"old":"/:locale/who-we-serve/executives","type":0,"val":"executives","end":""}],
    types: placeholder as Registry['marketing.who_we_serve.executives']['types'],
  },
  'marketing.who_we_serve.finance': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/who-we-serve/finance',
    tokens: [{"old":"/:locale/who-we-serve/finance","type":1,"val":"locale","end":""},{"old":"/:locale/who-we-serve/finance","type":0,"val":"who-we-serve","end":""},{"old":"/:locale/who-we-serve/finance","type":0,"val":"finance","end":""}],
    types: placeholder as Registry['marketing.who_we_serve.finance']['types'],
  },
  'marketing.who_we_serve.operations': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/who-we-serve/operations',
    tokens: [{"old":"/:locale/who-we-serve/operations","type":1,"val":"locale","end":""},{"old":"/:locale/who-we-serve/operations","type":0,"val":"who-we-serve","end":""},{"old":"/:locale/who-we-serve/operations","type":0,"val":"operations","end":""}],
    types: placeholder as Registry['marketing.who_we_serve.operations']['types'],
  },
  'marketing.who_we_serve.it': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/who-we-serve/it-teams',
    tokens: [{"old":"/:locale/who-we-serve/it-teams","type":1,"val":"locale","end":""},{"old":"/:locale/who-we-serve/it-teams","type":0,"val":"who-we-serve","end":""},{"old":"/:locale/who-we-serve/it-teams","type":0,"val":"it-teams","end":""}],
    types: placeholder as Registry['marketing.who_we_serve.it']['types'],
  },
  'marketing.who_we_serve.distributors': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/who-we-serve/distributors',
    tokens: [{"old":"/:locale/who-we-serve/distributors","type":1,"val":"locale","end":""},{"old":"/:locale/who-we-serve/distributors","type":0,"val":"who-we-serve","end":""},{"old":"/:locale/who-we-serve/distributors","type":0,"val":"distributors","end":""}],
    types: placeholder as Registry['marketing.who_we_serve.distributors']['types'],
  },
  'marketing.how_we_do_it': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/how-we-do-it',
    tokens: [{"old":"/:locale/how-we-do-it","type":1,"val":"locale","end":""},{"old":"/:locale/how-we-do-it","type":0,"val":"how-we-do-it","end":""}],
    types: placeholder as Registry['marketing.how_we_do_it']['types'],
  },
  'marketing.integrations': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/integrations',
    tokens: [{"old":"/:locale/integrations","type":1,"val":"locale","end":""},{"old":"/:locale/integrations","type":0,"val":"integrations","end":""}],
    types: placeholder as Registry['marketing.integrations']['types'],
  },
  'marketing.security': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/security',
    tokens: [{"old":"/:locale/security","type":1,"val":"locale","end":""},{"old":"/:locale/security","type":0,"val":"security","end":""}],
    types: placeholder as Registry['marketing.security']['types'],
  },
  'marketing.privacy': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/privacy',
    tokens: [{"old":"/:locale/privacy","type":1,"val":"locale","end":""},{"old":"/:locale/privacy","type":0,"val":"privacy","end":""}],
    types: placeholder as Registry['marketing.privacy']['types'],
  },
  'marketing.terms': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/terms',
    tokens: [{"old":"/:locale/terms","type":1,"val":"locale","end":""},{"old":"/:locale/terms","type":0,"val":"terms","end":""}],
    types: placeholder as Registry['marketing.terms']['types'],
  },
  'marketing.services': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/services',
    tokens: [{"old":"/:locale/services","type":1,"val":"locale","end":""},{"old":"/:locale/services","type":0,"val":"services","end":""}],
    types: placeholder as Registry['marketing.services']['types'],
  },
  'marketing.services.social_media': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/services/social-media',
    tokens: [{"old":"/:locale/services/social-media","type":1,"val":"locale","end":""},{"old":"/:locale/services/social-media","type":0,"val":"services","end":""},{"old":"/:locale/services/social-media","type":0,"val":"social-media","end":""}],
    types: placeholder as Registry['marketing.services.social_media']['types'],
  },
  'marketing.services.seo': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/services/seo',
    tokens: [{"old":"/:locale/services/seo","type":1,"val":"locale","end":""},{"old":"/:locale/services/seo","type":0,"val":"services","end":""},{"old":"/:locale/services/seo","type":0,"val":"seo","end":""}],
    types: placeholder as Registry['marketing.services.seo']['types'],
  },
  'marketing.services.paid_advertising': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/services/paid-advertising',
    tokens: [{"old":"/:locale/services/paid-advertising","type":1,"val":"locale","end":""},{"old":"/:locale/services/paid-advertising","type":0,"val":"services","end":""},{"old":"/:locale/services/paid-advertising","type":0,"val":"paid-advertising","end":""}],
    types: placeholder as Registry['marketing.services.paid_advertising']['types'],
  },
  'marketing.services.branding': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/services/branding',
    tokens: [{"old":"/:locale/services/branding","type":1,"val":"locale","end":""},{"old":"/:locale/services/branding","type":0,"val":"services","end":""},{"old":"/:locale/services/branding","type":0,"val":"branding","end":""}],
    types: placeholder as Registry['marketing.services.branding']['types'],
  },
  'marketing.services.product_maklon': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/services/product-maklon',
    tokens: [{"old":"/:locale/services/product-maklon","type":1,"val":"locale","end":""},{"old":"/:locale/services/product-maklon","type":0,"val":"services","end":""},{"old":"/:locale/services/product-maklon","type":0,"val":"product-maklon","end":""}],
    types: placeholder as Registry['marketing.services.product_maklon']['types'],
  },
  'marketing.features': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/features',
    tokens: [{"old":"/:locale/features","type":1,"val":"locale","end":""},{"old":"/:locale/features","type":0,"val":"features","end":""}],
    types: placeholder as Registry['marketing.features']['types'],
  },
  'marketing.features.network': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/features/network-management',
    tokens: [{"old":"/:locale/features/network-management","type":1,"val":"locale","end":""},{"old":"/:locale/features/network-management","type":0,"val":"features","end":""},{"old":"/:locale/features/network-management","type":0,"val":"network-management","end":""}],
    types: placeholder as Registry['marketing.features.network']['types'],
  },
  'marketing.features.ecommerce': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/features/ecommerce',
    tokens: [{"old":"/:locale/features/ecommerce","type":1,"val":"locale","end":""},{"old":"/:locale/features/ecommerce","type":0,"val":"features","end":""},{"old":"/:locale/features/ecommerce","type":0,"val":"ecommerce","end":""}],
    types: placeholder as Registry['marketing.features.ecommerce']['types'],
  },
  'marketing.features.wallet': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/features/wallet-payout',
    tokens: [{"old":"/:locale/features/wallet-payout","type":1,"val":"locale","end":""},{"old":"/:locale/features/wallet-payout","type":0,"val":"features","end":""},{"old":"/:locale/features/wallet-payout","type":0,"val":"wallet-payout","end":""}],
    types: placeholder as Registry['marketing.features.wallet']['types'],
  },
  'marketing.not_found': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/*',
    tokens: [{"old":"/:locale/*","type":1,"val":"locale","end":""},{"old":"/:locale/*","type":2,"val":"*","end":""}],
    types: placeholder as Registry['marketing.not_found']['types'],
  },
  'demo_requests.store': {
    methods: ["POST"],
    pattern: '/demo-requests',
    tokens: [{"old":"/demo-requests","type":0,"val":"demo-requests","end":""}],
    types: placeholder as Registry['demo_requests.store']['types'],
  },
  'marketing.events.store': {
    methods: ["POST"],
    pattern: '/marketing/events',
    tokens: [{"old":"/marketing/events","type":0,"val":"marketing","end":""},{"old":"/marketing/events","type":0,"val":"events","end":""}],
    types: placeholder as Registry['marketing.events.store']['types'],
  },
  'tracking_preference.update': {
    methods: ["POST"],
    pattern: '/privacy/tracking',
    tokens: [{"old":"/privacy/tracking","type":0,"val":"privacy","end":""},{"old":"/privacy/tracking","type":0,"val":"tracking","end":""}],
    types: placeholder as Registry['tracking_preference.update']['types'],
  },
  'whatsapp.redirect': {
    methods: ["GET","HEAD"],
    pattern: '/r/whatsapp/:context',
    tokens: [{"old":"/r/whatsapp/:context","type":0,"val":"r","end":""},{"old":"/r/whatsapp/:context","type":0,"val":"whatsapp","end":""},{"old":"/r/whatsapp/:context","type":1,"val":"context","end":""}],
    types: placeholder as Registry['whatsapp.redirect']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard',
    tokens: [{"old":"/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['dashboard']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
  'admin.demo_requests.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/demo-requests',
    tokens: [{"old":"/admin/demo-requests","type":0,"val":"admin","end":""},{"old":"/admin/demo-requests","type":0,"val":"demo-requests","end":""}],
    types: placeholder as Registry['admin.demo_requests.index']['types'],
  },
  'admin.demo_requests.show': {
    methods: ["GET","HEAD"],
    pattern: '/admin/demo-requests/:id',
    tokens: [{"old":"/admin/demo-requests/:id","type":0,"val":"admin","end":""},{"old":"/admin/demo-requests/:id","type":0,"val":"demo-requests","end":""},{"old":"/admin/demo-requests/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.demo_requests.show']['types'],
  },
  'admin.demo_requests.update_status': {
    methods: ["PATCH"],
    pattern: '/admin/demo-requests/:id/status',
    tokens: [{"old":"/admin/demo-requests/:id/status","type":0,"val":"admin","end":""},{"old":"/admin/demo-requests/:id/status","type":0,"val":"demo-requests","end":""},{"old":"/admin/demo-requests/:id/status","type":1,"val":"id","end":""},{"old":"/admin/demo-requests/:id/status","type":0,"val":"status","end":""}],
    types: placeholder as Registry['admin.demo_requests.update_status']['types'],
  },
  'admin.demo_requests.notes.store': {
    methods: ["POST"],
    pattern: '/admin/demo-requests/:id/notes',
    tokens: [{"old":"/admin/demo-requests/:id/notes","type":0,"val":"admin","end":""},{"old":"/admin/demo-requests/:id/notes","type":0,"val":"demo-requests","end":""},{"old":"/admin/demo-requests/:id/notes","type":1,"val":"id","end":""},{"old":"/admin/demo-requests/:id/notes","type":0,"val":"notes","end":""}],
    types: placeholder as Registry['admin.demo_requests.notes.store']['types'],
  },
  'admin.marketing.overview': {
    methods: ["GET","HEAD"],
    pattern: '/admin/marketing',
    tokens: [{"old":"/admin/marketing","type":0,"val":"admin","end":""},{"old":"/admin/marketing","type":0,"val":"marketing","end":""}],
    types: placeholder as Registry['admin.marketing.overview']['types'],
  },
  'admin.marketing.visitors': {
    methods: ["GET","HEAD"],
    pattern: '/admin/marketing/visitors',
    tokens: [{"old":"/admin/marketing/visitors","type":0,"val":"admin","end":""},{"old":"/admin/marketing/visitors","type":0,"val":"marketing","end":""},{"old":"/admin/marketing/visitors","type":0,"val":"visitors","end":""}],
    types: placeholder as Registry['admin.marketing.visitors']['types'],
  },
  'admin.marketing.visitor': {
    methods: ["GET","HEAD"],
    pattern: '/admin/marketing/visitors/:uuid',
    tokens: [{"old":"/admin/marketing/visitors/:uuid","type":0,"val":"admin","end":""},{"old":"/admin/marketing/visitors/:uuid","type":0,"val":"marketing","end":""},{"old":"/admin/marketing/visitors/:uuid","type":0,"val":"visitors","end":""},{"old":"/admin/marketing/visitors/:uuid","type":1,"val":"uuid","end":""}],
    types: placeholder as Registry['admin.marketing.visitor']['types'],
  },
  'admin.marketing.whatsapp.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/marketing/whatsapp',
    tokens: [{"old":"/admin/marketing/whatsapp","type":0,"val":"admin","end":""},{"old":"/admin/marketing/whatsapp","type":0,"val":"marketing","end":""},{"old":"/admin/marketing/whatsapp","type":0,"val":"whatsapp","end":""}],
    types: placeholder as Registry['admin.marketing.whatsapp.index']['types'],
  },
  'admin.marketing.whatsapp.show': {
    methods: ["GET","HEAD"],
    pattern: '/admin/marketing/whatsapp/:id',
    tokens: [{"old":"/admin/marketing/whatsapp/:id","type":0,"val":"admin","end":""},{"old":"/admin/marketing/whatsapp/:id","type":0,"val":"marketing","end":""},{"old":"/admin/marketing/whatsapp/:id","type":0,"val":"whatsapp","end":""},{"old":"/admin/marketing/whatsapp/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.marketing.whatsapp.show']['types'],
  },
  'admin.marketing.whatsapp.contacted': {
    methods: ["POST"],
    pattern: '/admin/marketing/whatsapp/:id/contacted',
    tokens: [{"old":"/admin/marketing/whatsapp/:id/contacted","type":0,"val":"admin","end":""},{"old":"/admin/marketing/whatsapp/:id/contacted","type":0,"val":"marketing","end":""},{"old":"/admin/marketing/whatsapp/:id/contacted","type":0,"val":"whatsapp","end":""},{"old":"/admin/marketing/whatsapp/:id/contacted","type":1,"val":"id","end":""},{"old":"/admin/marketing/whatsapp/:id/contacted","type":0,"val":"contacted","end":""}],
    types: placeholder as Registry['admin.marketing.whatsapp.contacted']['types'],
  },
  'admin.marketing.whatsapp.uncontacted': {
    methods: ["DELETE"],
    pattern: '/admin/marketing/whatsapp/:id/contacted',
    tokens: [{"old":"/admin/marketing/whatsapp/:id/contacted","type":0,"val":"admin","end":""},{"old":"/admin/marketing/whatsapp/:id/contacted","type":0,"val":"marketing","end":""},{"old":"/admin/marketing/whatsapp/:id/contacted","type":0,"val":"whatsapp","end":""},{"old":"/admin/marketing/whatsapp/:id/contacted","type":1,"val":"id","end":""},{"old":"/admin/marketing/whatsapp/:id/contacted","type":0,"val":"contacted","end":""}],
    types: placeholder as Registry['admin.marketing.whatsapp.uncontacted']['types'],
  },
  'admin.marketing.whatsapp.link': {
    methods: ["POST"],
    pattern: '/admin/marketing/whatsapp/:id/lead',
    tokens: [{"old":"/admin/marketing/whatsapp/:id/lead","type":0,"val":"admin","end":""},{"old":"/admin/marketing/whatsapp/:id/lead","type":0,"val":"marketing","end":""},{"old":"/admin/marketing/whatsapp/:id/lead","type":0,"val":"whatsapp","end":""},{"old":"/admin/marketing/whatsapp/:id/lead","type":1,"val":"id","end":""},{"old":"/admin/marketing/whatsapp/:id/lead","type":0,"val":"lead","end":""}],
    types: placeholder as Registry['admin.marketing.whatsapp.link']['types'],
  },
  'admin.marketing.whatsapp.unlink': {
    methods: ["DELETE"],
    pattern: '/admin/marketing/whatsapp/:id/lead',
    tokens: [{"old":"/admin/marketing/whatsapp/:id/lead","type":0,"val":"admin","end":""},{"old":"/admin/marketing/whatsapp/:id/lead","type":0,"val":"marketing","end":""},{"old":"/admin/marketing/whatsapp/:id/lead","type":0,"val":"whatsapp","end":""},{"old":"/admin/marketing/whatsapp/:id/lead","type":1,"val":"id","end":""},{"old":"/admin/marketing/whatsapp/:id/lead","type":0,"val":"lead","end":""}],
    types: placeholder as Registry['admin.marketing.whatsapp.unlink']['types'],
  },
  'admin.search': {
    methods: ["GET","HEAD"],
    pattern: '/admin/search',
    tokens: [{"old":"/admin/search","type":0,"val":"admin","end":""},{"old":"/admin/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['admin.search']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
