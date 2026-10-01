<script setup lang="ts">
/**
 * One member in the genealogy tree, rendering its own children
 * recursively. Filtering and selection state live in the parent tree.
 */
import { Minus, Plus } from 'lucide-vue-next'
import type { NetworkMember } from '~/content/network'
import { useCopy } from '~/i18n'

defineProps<{
  member: NetworkMember
  expanded: Set<string>
  selectedId: string
  dimmed: (member: NetworkMember) => boolean
  matched: (member: NetworkMember) => boolean
}>()

defineOptions({ name: 'NetworkNode' })

const emit = defineEmits<{ toggle: [id: string]; select: [id: string] }>()

const t = useCopy('homePlatform')

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
</script>

<template>
  <li>
    <div
      class="nn"
      :class="{
        'nn--dim': dimmed(member),
        'nn--match': matched(member),
        'nn--selected': selectedId === member.id,
      }"
    >
      <button
        type="button"
        class="nn__card"
        :aria-pressed="selectedId === member.id"
        @click="emit('select', member.id)"
      >
        <span class="nn__head">
          <span class="ui-avatar nn__avatar" :class="`nn__avatar--${member.rank.toLowerCase()}`">{{
            initials(member.name)
          }}</span>
          <span class="nn__who">
            <span class="nn__name">{{ member.name }}</span>
            <span class="nn__rank">
              <span class="nn__status" :class="{ 'is-active': member.active }" />
              {{ member.rank }} · {{ member.active ? t.network.active : t.network.inactive }}
            </span>
          </span>
        </span>
        <span class="nn__metrics">
          <span
            ><small>{{ t.network.members }}</small
            >{{ member.members }}</span
          >
          <span
            ><small>{{ t.network.groupSales }}</small
            >{{ member.groupSales }}</span
          >
        </span>
      </button>
      <button
        v-if="member.children?.length"
        type="button"
        class="nn__toggle"
        :aria-expanded="expanded.has(member.id)"
        :aria-label="
          expanded.has(member.id) ? t.network.collapse(member.name) : t.network.expand(member.name)
        "
        @click="emit('toggle', member.id)"
      >
        <Minus v-if="expanded.has(member.id)" :size="13" aria-hidden="true" />
        <Plus v-else :size="13" aria-hidden="true" />
      </button>
    </div>

    <ul v-if="member.children?.length && expanded.has(member.id)">
      <NetworkNode
        v-for="child in member.children"
        :key="child.id"
        :member="child"
        :expanded="expanded"
        :selected-id="selectedId"
        :dimmed="dimmed"
        :matched="matched"
        @toggle="(id: string) => emit('toggle', id)"
        @select="(id: string) => emit('select', id)"
      />
      <li v-if="member.more">
        <span class="nn__more">{{ t.network.more(member.more) }}</span>
      </li>
    </ul>
  </li>
</template>
