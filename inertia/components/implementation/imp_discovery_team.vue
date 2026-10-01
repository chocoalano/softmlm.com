<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight, Landmark, Network, Server, Settings2, Crown } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { findPersona, personaPath } from '@shared/personas'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('implementation')
const { lp } = useI18n()

/** Each role links to the page that speaks to it. */
const roles = computed(() => {
  const copy = t.value.discoveryTeam
  return [
    { key: 'owner', icon: Crown, href: lp(personaPath(findPersona('executives'))) },
    { key: 'operations', icon: Settings2, href: lp(personaPath(findPersona('operations'))) },
    { key: 'finance', icon: Landmark, href: lp(personaPath(findPersona('finance'))) },
    { key: 'it', icon: Server, href: lp(personaPath(findPersona('it'))) },
    { key: 'sme', icon: Network, href: lp('/compensation-plans') },
  ].map((role) => ({
    ...role,
    ...copy.roles[role.key as keyof typeof copy.roles],
    link: role.key === 'sme' ? copy.smeLink : copy.roleLink,
  }))
})
</script>

<template>
  <section class="sm-section sm-section--compact sm-section--tint idt" aria-labelledby="idt-title">
    <div class="sm-container">
      <div class="sm-heading">
        <span v-reveal class="sm-eyebrow">{{ t.discoveryTeam.eyebrow }}</span>
        <h2 id="idt-title" v-reveal="60" class="sm-h2">{{ t.discoveryTeam.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.discoveryTeam.lead }}</p>
      </div>
      <ul class="idt__grid">
        <li v-for="(role, i) in roles" :key="role.key" v-reveal="(i % 5) * 50" class="idt__card">
          <span class="sm-icon-tile" aria-hidden="true"
            ><component :is="role.icon" :size="20"
          /></span>
          <h3 class="sm-h4">{{ role.title }}</h3>
          <p>{{ role.text }}</p>
          <a :href="role.href" class="sm-link idt__link"
            >{{ role.link }}<span class="sr-only">: {{ role.title }}</span> <ArrowRight :size="15"
          /></a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.idt__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}
.idt__card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 22px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.idt__card p {
  flex: 1;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--sm-muted);
}
.idt__link {
  font-size: 14px;
}
@media (max-width: 1180px) {
  .idt__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 760px) {
  .idt__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 480px) {
  .idt__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
