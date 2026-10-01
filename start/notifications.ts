/*
|--------------------------------------------------------------------------
| Lead notifications lifecycle
|--------------------------------------------------------------------------
|
| Lead emails are delivered in the background of the web process. Let any
| delivery in flight finish before the process exits (for example during
| a deploy restart) instead of dropping it.
|
*/

import app from '@adonisjs/core/services/app'
import LeadNotifier from '#services/lead_notifier'

app.terminating(() => LeadNotifier.idle())
