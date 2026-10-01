import type DemoRequestActivity from '#models/demo_request_activity'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class DemoRequestActivityTransformer extends BaseTransformer<DemoRequestActivity> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'type', 'fromStatus', 'toStatus', 'body', 'createdAt']),
      author: this.resource.user
        ? this.resource.user.fullName || this.resource.user.email
        : this.resource.userId === null
          ? 'System'
          : 'Deleted user',
    }
  }
}
