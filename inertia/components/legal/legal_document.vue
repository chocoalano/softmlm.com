<script setup lang="ts">
/**
 * The Privacy Notice and the Terms of Use: a plain reading layout with a
 * table of contents (a sidebar on wide screens, a collapsed list on
 * phones). The copy lives in i18n `legal`; `kind` places the cookie table,
 * the analytics switch, the contact options or a link to the Privacy
 * Notice inside a section.
 */
import { computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { LEGAL_UPDATED, PRIVACY_PATH, type TrackingPreference } from '@shared/legal'
import LegalCookies from '~/components/legal/legal_cookies.vue'
import LegalContact from '~/components/legal/legal_contact.vue'
import TrackingPreferenceSwitch from '~/components/legal/tracking_preference.vue'
import { useCopy, useI18n } from '~/i18n'

const props = defineProps<{
  doc: 'privacy' | 'terms'
  page: string
  trackingPreference?: TrackingPreference
}>()

const t = useCopy('legal')
const { lp } = useI18n()
const content = computed(() => t.value[props.doc])
</script>

<template>
  <section class="sm-section lgl">
    <header class="sm-container lgl__head">
      <span class="sm-eyebrow">{{ t.eyebrow }}</span>
      <h1 class="lgl__title">{{ content.title }}</h1>
      <p class="sm-lead">{{ content.lead }}</p>
      <p class="lgl__updated">
        {{ t.updatedLabel }}: <time :datetime="LEGAL_UPDATED">{{ t.updated }}</time>
      </p>
    </header>

    <div class="sm-container lgl__grid">
      <details class="lgl__toc lgl__toc--compact">
        <summary>{{ t.contents }}</summary>
        <nav :aria-label="t.contents">
          <ol>
            <li v-for="section in content.sections" :key="section.id">
              <a :href="`#${section.id}`">{{ section.title }}</a>
            </li>
          </ol>
        </nav>
      </details>

      <nav class="lgl__toc lgl__toc--side" :aria-label="t.contents">
        <p class="lgl__toc-title">{{ t.contents }}</p>
        <ol>
          <li v-for="section in content.sections" :key="section.id">
            <a :href="`#${section.id}`">{{ section.title }}</a>
          </li>
        </ol>
      </nav>

      <article class="lgl__body">
        <section
          v-for="section in content.sections"
          :id="section.id"
          :key="section.id"
          class="lgl__section"
          :aria-labelledby="`${section.id}-title`"
        >
          <h2 :id="`${section.id}-title`" class="lgl__h2">{{ section.title }}</h2>
          <p v-for="text in section.paragraphs" :key="text">{{ text }}</p>
          <ul v-if="section.items?.length">
            <li v-for="item in section.items" :key="item">{{ item }}</li>
          </ul>

          <LegalCookies v-if="section.kind === 'cookies'" />
          <TrackingPreferenceSwitch
            v-else-if="section.kind === 'preference'"
            :preference="trackingPreference ?? 'on'"
          />
          <LegalContact v-else-if="section.kind === 'contact'" :page="page" />
          <a v-else-if="section.kind === 'privacy-link'" :href="lp(PRIVACY_PATH)" class="sm-link"
            >{{ t.privacyLink }} <ArrowRight :size="16"
          /></a>

          <p v-for="text in section.after ?? []" :key="text">{{ text }}</p>
        </section>
      </article>
    </div>
  </section>
</template>

<style scoped>
.lgl {
  padding-top: clamp(40px, 6vw, 88px);
}
.lgl__head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: clamp(32px, 4vw, 56px);
}
.lgl__title {
  font-family: var(--sm-display);
  font-weight: 800;
  font-size: clamp(36px, 4.6vw, 58px);
  line-height: 1.05;
  letter-spacing: -0.036em;
  color: var(--sm-text);
  text-wrap: balance;
}
.lgl__updated {
  font-size: 14px;
  color: var(--sm-subtle);
}
.lgl__grid {
  display: grid;
  grid-template-columns: minmax(200px, 260px) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 80px);
  align-items: start;
  border-top: 1px solid var(--sm-border);
  padding-top: clamp(32px, 4vw, 56px);
}

.lgl__toc ol {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.lgl__toc a {
  display: block;
  padding: 6px 0;
  font-size: 14.5px;
  line-height: 1.4;
  color: var(--sm-muted);
  transition: color 0.15s;
}
.lgl__toc a:hover {
  color: var(--sm-primary-ink);
}
.lgl__toc--side {
  position: sticky;
  top: calc(var(--sm-header-h) + 24px);
  max-height: calc(100vh - var(--sm-header-h) - 48px);
  overflow-y: auto;
}
.lgl__toc-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-text);
  margin-bottom: 10px;
}
.lgl__toc--compact {
  display: none;
}

.lgl__body {
  display: flex;
  flex-direction: column;
  gap: clamp(36px, 4vw, 52px);
  max-width: 760px;
}
.lgl__section {
  display: flex;
  flex-direction: column;
  gap: 14px;
  scroll-margin-top: calc(var(--sm-header-h) + 24px);
}
.lgl__h2 {
  font-family: var(--sm-display);
  font-weight: 700;
  font-size: clamp(22px, 2.2vw, 28px);
  line-height: 1.2;
  letter-spacing: -0.024em;
  color: var(--sm-text);
}
.lgl__section p,
.lgl__section li {
  font-size: 16.5px;
  line-height: 1.7;
  color: var(--sm-text-2);
  text-wrap: pretty;
}
.lgl__section ul {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 22px;
  list-style: disc;
}
.lgl__section li::marker {
  color: var(--sm-primary-ink);
}

@media (max-width: 960px) {
  .lgl__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .lgl__toc--side {
    display: none;
  }
  .lgl__toc--compact {
    display: block;
    border: 1px solid var(--sm-border);
    border-radius: var(--sm-r-md);
    background: var(--sm-surface-subtle);
  }
  .lgl__toc--compact summary {
    cursor: pointer;
    padding: 14px 18px;
    font-size: 15px;
    font-weight: 600;
    color: var(--sm-text);
  }
  .lgl__toc--compact nav {
    padding: 0 18px 12px;
  }
}
</style>
