/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import { Bouncer } from '@adonisjs/bouncer'
import type User from '#models/user'

/**
 * View, filter and work "Book a Demo" leads in the back office.
 */
export const manageLeads = Bouncer.ability((user: User) => user.canManageLeads)

/**
 * See first-party marketing analytics (/admin/marketing).
 */
export const viewMarketing = Bouncer.ability((user: User) => user.canViewMarketing)
