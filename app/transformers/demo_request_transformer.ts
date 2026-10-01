import type DemoRequest from '#models/demo_request'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class DemoRequestTransformer extends BaseTransformer<DemoRequest> {
  /**
   * Row shown in the lead list.
   */
  toObject() {
    return this.pick(this.resource, [
      'id',
      'fullName',
      'company',
      'email',
      'phone',
      'businessType',
      'activeMembers',
      'selectedModulesSnapshot',
      'serviceInterests',
      'interestCategory',
      'source',
      'status',
      'createdAt',
      'updatedAt',
    ])
  }

  /**
   * Everything the lead detail page needs. The IP hash and user agent are
   * deliberately left out: they exist for spam analysis, not for sales.
   */
  forDetail() {
    return this.pick(this.resource, [
      'id',
      'fullName',
      'company',
      'email',
      'phone',
      'businessType',
      'activeMembers',
      'selectedModulesSnapshot',
      'pricingEstimateSnapshot',
      'serviceInterests',
      'serviceDetails',
      'interestCategory',
      'message',
      'source',
      'status',
      'landingPage',
      'referrer',
      'utmSource',
      'utmMedium',
      'utmCampaign',
      'utmContent',
      'utmTerm',
      'createdAt',
      'updatedAt',
      'contactedAt',
      'qualifiedAt',
      'demoScheduledAt',
      'convertedAt',
      'closedAt',
    ])
  }
}
