import { type SchemaRules } from '@adonisjs/lucid/types/schema_generator'

/**
 * Columns typed by hand in their models: unions (status, role, source,
 * locale, activity type) and JSON snapshots the models (de)serialise.
 */
export default {
  tables: {
    demo_requests: {
      skipColumns: [
        'status',
        'source',
        'locale',
        'pricing_estimate_snapshot',
        'selected_modules_snapshot',
        'service_interests',
        'service_details',
        'attribution_snapshot',
      ],
    },
    marketing_events: {
      skipColumns: ['event_name', 'interest_category', 'metadata'],
    },
    marketing_whatsapp_intents: {
      skipColumns: ['context', 'interest_category', 'attribution', 'link_method'],
    },
    demo_request_activities: {
      skipColumns: ['type', 'from_status', 'to_status'],
    },
    users: {
      skipColumns: ['role'],
    },
  },
} satisfies SchemaRules
