/**
 * Back-office roles. "user" is the default for every account; staff are
 * promoted with `node ace users:role <email> <role>`.
 *
 * - sales: works leads (contact details) and sees marketing analytics.
 * - marketing: sees marketing analytics (anonymous visitors, sources,
 *   campaigns, journeys) but not the leads' contact details.
 * - admin: everything.
 */
export const roles = ['user', 'sales', 'marketing', 'admin'] as const

/** Roles that may open the marketing analytics (/admin/marketing). */
export const marketingViewerRoles = ['admin', 'sales', 'marketing'] as const

export type UserRole = (typeof roles)[number]
