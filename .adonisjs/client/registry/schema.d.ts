/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'robots': {
    methods: ["GET","HEAD"]
    pattern: '/robots.txt'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/crawler_files_controller').default['robots']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/crawler_files_controller').default['robots']>>>
    }
  }
  'sitemap': {
    methods: ["GET","HEAD"]
    pattern: '/sitemap.xml'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/crawler_files_controller').default['sitemap']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/crawler_files_controller').default['sitemap']>>>
    }
  }
  'marketing.home': {
    methods: ["GET","HEAD"]
    pattern: '/:locale'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.compensation_plans': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/compensation-plans'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.pricing': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/pricing'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.who_we_serve': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/who-we-serve'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.who_we_serve.executives': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/who-we-serve/executives'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.who_we_serve.finance': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/who-we-serve/finance'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.who_we_serve.operations': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/who-we-serve/operations'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.who_we_serve.it': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/who-we-serve/it-teams'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.who_we_serve.distributors': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/who-we-serve/distributors'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.how_we_do_it': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/how-we-do-it'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.integrations': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/integrations'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.security': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/security'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.privacy': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/privacy'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.terms': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/terms'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.services': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/services'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.services.social_media': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/services/social-media'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.services.seo': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/services/seo'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.services.paid_advertising': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/services/paid-advertising'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.services.branding': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/services/branding'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.services.product_maklon': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/services/product-maklon'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.features': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/features'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.features.network': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/features/network-management'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.features.ecommerce': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/features/ecommerce'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.features.wallet': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/features/wallet-payout'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.not_found': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/*'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { locale: ParamValue; '*': ParamValue[] }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'demo_requests.store': {
    methods: ["POST"]
    pattern: '/demo-requests'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/demo_request').demoRequestValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/demo_request').demoRequestValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/demo_requests_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/demo_requests_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'marketing.events.store': {
    methods: ["POST"]
    pattern: '/marketing/events'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/marketing_event').marketingEventsValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/marketing_event').marketingEventsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/marketing_events_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/marketing_events_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'tracking_preference.update': {
    methods: ["POST"]
    pattern: '/privacy/tracking'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tracking_preference_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tracking_preference_controller').default['update']>>>
    }
  }
  'whatsapp.redirect': {
    methods: ["GET","HEAD"]
    pattern: '/r/whatsapp/:context'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { context: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/whatsapp_redirect_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/whatsapp_redirect_controller').default['show']>>>
    }
  }
  'new_account.create': {
    methods: ["GET","HEAD"]
    pattern: '/signup'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
    }
  }
  'new_account.store': {
    methods: ["POST"]
    pattern: '/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'session.create': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['create']>>>
    }
  }
  'session.store': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'dashboard': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'session.destroy': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>>
    }
  }
  'admin.demo_requests.index': {
    methods: ["GET","HEAD"]
    pattern: '/admin/demo-requests'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_demo_requests_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_demo_requests_controller').default['index']>>>
    }
  }
  'admin.demo_requests.show': {
    methods: ["GET","HEAD"]
    pattern: '/admin/demo-requests/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_demo_requests_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_demo_requests_controller').default['show']>>>
    }
  }
  'admin.demo_requests.update_status': {
    methods: ["PATCH"]
    pattern: '/admin/demo-requests/:id/status'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin_demo_request').leadStatusValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/admin_demo_request').leadStatusValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_demo_requests_controller').default['updateStatus']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_demo_requests_controller').default['updateStatus']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.demo_requests.notes.store': {
    methods: ["POST"]
    pattern: '/admin/demo-requests/:id/notes'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin_demo_request').leadNoteValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/admin_demo_request').leadNoteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_demo_requests_controller').default['storeNote']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_demo_requests_controller').default['storeNote']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.marketing.overview': {
    methods: ["GET","HEAD"]
    pattern: '/admin/marketing'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_marketing_controller').default['overview']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_marketing_controller').default['overview']>>>
    }
  }
  'admin.marketing.visitors': {
    methods: ["GET","HEAD"]
    pattern: '/admin/marketing/visitors'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_marketing_controller').default['visitors']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_marketing_controller').default['visitors']>>>
    }
  }
  'admin.marketing.visitor': {
    methods: ["GET","HEAD"]
    pattern: '/admin/marketing/visitors/:uuid'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { uuid: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_marketing_controller').default['visitor']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_marketing_controller').default['visitor']>>>
    }
  }
  'admin.marketing.whatsapp.index': {
    methods: ["GET","HEAD"]
    pattern: '/admin/marketing/whatsapp'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_whatsapp_intents_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_whatsapp_intents_controller').default['index']>>>
    }
  }
  'admin.marketing.whatsapp.show': {
    methods: ["GET","HEAD"]
    pattern: '/admin/marketing/whatsapp/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_whatsapp_intents_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_whatsapp_intents_controller').default['show']>>>
    }
  }
  'admin.marketing.whatsapp.contacted': {
    methods: ["POST"]
    pattern: '/admin/marketing/whatsapp/:id/contacted'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_whatsapp_intents_controller').default['markContacted']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_whatsapp_intents_controller').default['markContacted']>>>
    }
  }
  'admin.marketing.whatsapp.uncontacted': {
    methods: ["DELETE"]
    pattern: '/admin/marketing/whatsapp/:id/contacted'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_whatsapp_intents_controller').default['unmarkContacted']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_whatsapp_intents_controller').default['unmarkContacted']>>>
    }
  }
  'admin.marketing.whatsapp.link': {
    methods: ["POST"]
    pattern: '/admin/marketing/whatsapp/:id/lead'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_whatsapp_intents_controller').default['link']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_whatsapp_intents_controller').default['link']>>>
    }
  }
  'admin.marketing.whatsapp.unlink': {
    methods: ["DELETE"]
    pattern: '/admin/marketing/whatsapp/:id/lead'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_whatsapp_intents_controller').default['unlink']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_whatsapp_intents_controller').default['unlink']>>>
    }
  }
  'admin.search': {
    methods: ["GET","HEAD"]
    pattern: '/admin/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_search_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_search_controller').default['handle']>>>
    }
  }
}
