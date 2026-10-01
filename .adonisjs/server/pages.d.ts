import '@adonisjs/inertia/types'

import type { VNodeProps, AllowedComponentProps, ComponentInstance } from 'vue'

type ExtractProps<T> = Omit<
  ComponentInstance<T>['$props'],
  keyof VNodeProps | keyof AllowedComponentProps
>

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'admin/demo_requests/index': ExtractProps<(typeof import('../../inertia/pages/admin/demo_requests/index.vue'))['default']>
    'admin/demo_requests/show': ExtractProps<(typeof import('../../inertia/pages/admin/demo_requests/show.vue'))['default']>
    'admin/marketing/overview': ExtractProps<(typeof import('../../inertia/pages/admin/marketing/overview.vue'))['default']>
    'admin/marketing/visitor': ExtractProps<(typeof import('../../inertia/pages/admin/marketing/visitor.vue'))['default']>
    'admin/marketing/visitors': ExtractProps<(typeof import('../../inertia/pages/admin/marketing/visitors.vue'))['default']>
    'admin/marketing/whatsapp_intent': ExtractProps<(typeof import('../../inertia/pages/admin/marketing/whatsapp_intent.vue'))['default']>
    'admin/marketing/whatsapp_intents': ExtractProps<(typeof import('../../inertia/pages/admin/marketing/whatsapp_intents.vue'))['default']>
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.vue'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.vue'))['default']>
    'compensation_plans': ExtractProps<(typeof import('../../inertia/pages/compensation_plans.vue'))['default']>
    'dashboard': ExtractProps<(typeof import('../../inertia/pages/dashboard.vue'))['default']>
    'errors/forbidden': ExtractProps<(typeof import('../../inertia/pages/errors/forbidden.vue'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.vue'))['default']>
    'features/feature': ExtractProps<(typeof import('../../inertia/pages/features/feature.vue'))['default']>
    'features/index': ExtractProps<(typeof import('../../inertia/pages/features/index.vue'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.vue'))['default']>
    'how_we_do_it': ExtractProps<(typeof import('../../inertia/pages/how_we_do_it.vue'))['default']>
    'integrations': ExtractProps<(typeof import('../../inertia/pages/integrations.vue'))['default']>
    'marketing_not_found': ExtractProps<(typeof import('../../inertia/pages/marketing_not_found.vue'))['default']>
    'pricing': ExtractProps<(typeof import('../../inertia/pages/pricing.vue'))['default']>
    'services/index': ExtractProps<(typeof import('../../inertia/pages/services/index.vue'))['default']>
    'services/service': ExtractProps<(typeof import('../../inertia/pages/services/service.vue'))['default']>
    'who_we_serve/index': ExtractProps<(typeof import('../../inertia/pages/who_we_serve/index.vue'))['default']>
    'who_we_serve/persona': ExtractProps<(typeof import('../../inertia/pages/who_we_serve/persona.vue'))['default']>
  }
}
