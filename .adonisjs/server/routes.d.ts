import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'marketing.home': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.compensation_plans': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.pricing': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve.executives': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve.finance': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve.operations': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve.it': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve.distributors': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.how_we_do_it': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.integrations': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services.social_media': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services.seo': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services.paid_advertising': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services.branding': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services.product_maklon': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.features': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.features.network': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.features.ecommerce': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.features.wallet': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.not_found': { paramsTuple: [ParamValue,...ParamValue[]]; params: {'locale': ParamValue,'*': ParamValue[]} }
    'demo_requests.store': { paramsTuple?: []; params?: {} }
    'marketing.events.store': { paramsTuple?: []; params?: {} }
    'whatsapp.redirect': { paramsTuple: [ParamValue]; params: {'context': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'admin.demo_requests.index': { paramsTuple?: []; params?: {} }
    'admin.demo_requests.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.demo_requests.update_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.demo_requests.notes.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.marketing.overview': { paramsTuple?: []; params?: {} }
    'admin.marketing.visitors': { paramsTuple?: []; params?: {} }
    'admin.marketing.visitor': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'admin.marketing.whatsapp.index': { paramsTuple?: []; params?: {} }
    'admin.marketing.whatsapp.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.marketing.whatsapp.contacted': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.marketing.whatsapp.uncontacted': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.marketing.whatsapp.link': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.marketing.whatsapp.unlink': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.search': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'marketing.home': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.compensation_plans': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.pricing': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve.executives': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve.finance': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve.operations': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve.it': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve.distributors': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.how_we_do_it': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.integrations': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services.social_media': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services.seo': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services.paid_advertising': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services.branding': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services.product_maklon': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.features': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.features.network': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.features.ecommerce': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.features.wallet': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.not_found': { paramsTuple: [ParamValue,...ParamValue[]]; params: {'locale': ParamValue,'*': ParamValue[]} }
    'whatsapp.redirect': { paramsTuple: [ParamValue]; params: {'context': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'admin.demo_requests.index': { paramsTuple?: []; params?: {} }
    'admin.demo_requests.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.marketing.overview': { paramsTuple?: []; params?: {} }
    'admin.marketing.visitors': { paramsTuple?: []; params?: {} }
    'admin.marketing.visitor': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'admin.marketing.whatsapp.index': { paramsTuple?: []; params?: {} }
    'admin.marketing.whatsapp.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.search': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'marketing.home': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.compensation_plans': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.pricing': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve.executives': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve.finance': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve.operations': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve.it': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.who_we_serve.distributors': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.how_we_do_it': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.integrations': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services.social_media': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services.seo': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services.paid_advertising': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services.branding': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.services.product_maklon': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.features': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.features.network': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.features.ecommerce': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.features.wallet': { paramsTuple: [ParamValue]; params: {'locale': ParamValue} }
    'marketing.not_found': { paramsTuple: [ParamValue,...ParamValue[]]; params: {'locale': ParamValue,'*': ParamValue[]} }
    'whatsapp.redirect': { paramsTuple: [ParamValue]; params: {'context': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'admin.demo_requests.index': { paramsTuple?: []; params?: {} }
    'admin.demo_requests.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.marketing.overview': { paramsTuple?: []; params?: {} }
    'admin.marketing.visitors': { paramsTuple?: []; params?: {} }
    'admin.marketing.visitor': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'admin.marketing.whatsapp.index': { paramsTuple?: []; params?: {} }
    'admin.marketing.whatsapp.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.search': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'demo_requests.store': { paramsTuple?: []; params?: {} }
    'marketing.events.store': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'admin.demo_requests.notes.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.marketing.whatsapp.contacted': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.marketing.whatsapp.link': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'admin.demo_requests.update_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'admin.marketing.whatsapp.uncontacted': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.marketing.whatsapp.unlink': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}