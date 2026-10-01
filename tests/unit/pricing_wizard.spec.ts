import { test } from '@japa/runner'
import {
  emptyAnswers,
  isStepComplete,
  restoreAnswers,
  STEPS,
  toggleChoice,
  toSnapshot,
} from '#shared/pricing_wizard'

const allowed = {
  businessType: ['mlm', 'direct_selling'],
  activeMembers: ['under_1k', '5k_25k'],
  currentSystem: ['none', 'replacing'],
  modules: ['member_management', 'compensation'],
  compensationComplexity: ['simple', 'custom'],
  dataMigration: ['none', 'member_data', 'unsure'],
  integrations: ['payment', 'unsure'],
}

test.group('Pricing wizard', () => {
  test('has two steps in quick mode and three in full mode', ({ assert }) => {
    assert.deepEqual(STEPS.quick, ['business', 'modules'])
    assert.deepEqual(STEPS.full, ['business', 'modules', 'implementation'])
  })

  test('only lets a visitor continue once a step is answered', ({ assert }) => {
    const answers = emptyAnswers()
    assert.isFalse(isStepComplete('business', answers, 'quick'))

    answers.businessType = 'mlm'
    answers.activeMembers = '5k_25k'
    assert.isTrue(isStepComplete('business', answers, 'quick'))
    assert.isFalse(
      isStepComplete('business', answers, 'full'),
      'full mode also asks about the current system'
    )

    answers.currentSystem = 'replacing'
    assert.isTrue(isStepComplete('business', answers, 'full'))

    assert.isFalse(isStepComplete('modules', answers, 'full'))
    answers.modules = ['compensation']
    assert.isTrue(isStepComplete('modules', answers, 'full'))

    answers.compensationComplexity = 'custom'
    answers.dataMigration = ['member_data']
    assert.isFalse(isStepComplete('implementation', answers, 'full'))
    answers.integrations = ['payment']
    assert.isTrue(isStepComplete('implementation', answers, 'full'))
  })

  test('"none" and "not sure" exclude the other choices', ({ assert }) => {
    const exclusive = ['none', 'unsure']
    let list = toggleChoice<string>([], 'member_data', exclusive)
    list = toggleChoice(list, 'network_structure', exclusive)
    assert.deepEqual(list, ['member_data', 'network_structure'])

    list = toggleChoice(list, 'unsure', exclusive)
    assert.deepEqual(list, ['unsure'])

    list = toggleChoice(list, 'member_data', exclusive)
    assert.deepEqual(list, ['member_data'])

    list = toggleChoice(list, 'member_data', exclusive)
    assert.deepEqual(list, [])
  })

  test('the snapshot only carries what the mode asked for', ({ assert }) => {
    const answers = {
      ...emptyAnswers(),
      businessType: 'mlm' as const,
      activeMembers: '5k_25k' as const,
      currentSystem: 'replacing' as const,
      modules: ['compensation' as const],
      compensationComplexity: 'custom' as const,
      dataMigration: ['member_data' as const],
      integrations: ['payment' as const],
    }

    assert.deepEqual(toSnapshot(answers, 'quick'), {
      businessType: 'mlm',
      activeMembers: '5k_25k',
      modules: ['compensation'],
    })
    assert.deepEqual(toSnapshot(answers, 'full'), {
      businessType: 'mlm',
      activeMembers: '5k_25k',
      modules: ['compensation'],
      currentSystem: 'replacing',
      compensationComplexity: 'custom',
      dataMigration: ['member_data'],
      integrations: ['payment'],
    })
  })

  test('restores saved answers and drops unknown values', ({ assert }) => {
    const restored = restoreAnswers(
      {
        businessType: 'mlm',
        activeMembers: 'billions',
        modules: ['compensation', 'teleport', 42],
        integrations: 'payment',
        email: 'someone@example.com',
      },
      allowed as never
    )

    assert.equal(restored.businessType, 'mlm')
    assert.equal(restored.activeMembers, '')
    assert.deepEqual(restored.modules, ['compensation'])
    assert.deepEqual(restored.integrations, [])
    assert.notProperty(restored, 'email')
    assert.deepEqual(restoreAnswers(null, allowed as never), emptyAnswers())
  })
})
