<script setup lang="ts">
/**
 * How services can combine (never bundled automatically), and who each
 * service is for.
 */
import { computed } from 'vue'
import { ArrowRight, Info } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { servicePath, services, type ServiceKey } from '@shared/services'
import { SERVICES_TRACKING_PAGE } from '@shared/services'
import { track } from '@shared/analytics'
import { serviceIcons } from '~/content/services'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('services')
const common = useCopy('common')
const { lp, locale } = useI18n()

const audience = computed(() =>
  services.map((service) => ({
    key: service.key,
    label: common.value.nav.serviceLinks[service.key].label,
    who: t.value.hub.audience.items[service.key],
    href: lp(servicePath(service)),
    icon: serviceIcons[service.key],
  }))
)

function explore(service: ServiceKey) {
  track('service_interest', { service, page: SERVICES_TRACKING_PAGE, locale: locale.value })
}
</script>

<template>
  <section class="sm-section sm-section--compact sm-section--tint htg" aria-labelledby="htg-title">
    <div class="sm-container">
      <div class="sm-heading">
        <span v-reveal class="sm-eyebrow">{{ t.hub.together.eyebrow }}</span>
        <h2 id="htg-title" v-reveal="60" class="sm-h2">{{ t.hub.together.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.hub.together.lead }}</p>
      </div>
      <ol class="htg__examples">
        <li
          v-for="(example, i) in t.hub.together.examples"
          :key="example.title"
          v-reveal="i * 70"
          class="htg__example"
        >
          <span class="htg__num" aria-hidden="true">0{{ i + 1 }}</span>
          <h3 class="sm-h4">{{ example.title }}</h3>
          <p class="sm-body">{{ example.text }}</p>
        </li>
      </ol>
      <p v-reveal class="htg__note">
        <Info :size="17" aria-hidden="true" /> {{ t.hub.together.note }}
      </p>

      <div class="htg__audience">
        <div class="htg__audience-head">
          <span v-reveal class="sm-eyebrow">{{ t.hub.audience.eyebrow }}</span>
          <h2 v-reveal="60" class="sm-h3">{{ t.hub.audience.title }}</h2>
        </div>
        <ul class="htg__who">
          <li v-for="item in audience" :key="item.key">
            <a :href="item.href" class="htg__who-link" @click="explore(item.key)">
              <span class="sm-icon-tile sm-icon-tile--sm" aria-hidden="true"
                ><component :is="item.icon" :size="17"
              /></span>
              <span class="htg__who-text">
                <b>{{ item.label }}</b>
                <span>{{ item.who }}</span>
              </span>
              <ArrowRight :size="16" aria-hidden="true" class="htg__who-arrow" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.htg__examples {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.htg__example {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.htg__num {
  font-family: var(--sm-display);
  font-size: 14px;
  font-weight: 700;
  color: var(--sm-primary-ink);
}
.htg__note {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  padding: 14px 18px;
  border-radius: 14px;
  background: var(--sm-info-bg);
  font-size: 15px;
  font-weight: 500;
  color: var(--sm-text);
}
.htg__note svg {
  flex: none;
  color: var(--sm-info);
}
.htg__audience {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.4fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: start;
  margin-top: clamp(56px, 7vw, 96px);
}
.htg__audience-head {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.htg__who {
  list-style: none;
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--sm-border);
}
.htg__who li {
  border-bottom: 1px solid var(--sm-border);
}
.htg__who-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 4px;
  transition: color 0.15s;
}
.htg__who-link:hover {
  color: var(--sm-primary-ink);
}
.htg__who-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.htg__who-text b {
  font-size: 15.5px;
  font-weight: 650;
}
.htg__who-text span {
  font-size: 14.5px;
  color: var(--sm-muted);
}
.htg__who-arrow {
  flex: none;
  color: var(--sm-primary-ink);
}
@media (max-width: 900px) {
  .htg__examples,
  .htg__audience {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
