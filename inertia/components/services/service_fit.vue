<script setup lang="ts">
/**
 * Who the service is for, and why it matters in a network business. The
 * maklon page shows, in the same place, what the page offers and what is
 * discussed for each product (docs/product-maklon-evidence.md).
 */
import { computed } from 'vue'
import { CircleCheck, MessagesSquare, Users } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import type { ServiceKey } from '@shared/services'
import { useCopy } from '~/i18n'

const props = defineProps<{ service: ServiceKey }>()
const t = useCopy('services')
const content = computed(() => t.value.pages[props.service])
const context = computed(() => ('context' in content.value ? content.value.context : null))
const transparency = computed(() =>
  'transparency' in content.value ? content.value.transparency : null
)
</script>

<template>
  <section class="sm-section sm-section--compact sft" aria-labelledby="sft-title">
    <div class="sm-container sft__grid">
      <div v-reveal class="sft__audience">
        <span class="sm-eyebrow">{{ t.shared.audienceEyebrow }}</span>
        <h2 id="sft-title" class="sm-h3">{{ content.audience.title }}</h2>
        <ul>
          <li v-for="item in content.audience.items" :key="item">
            <Users :size="18" aria-hidden="true" /> {{ item }}
          </li>
        </ul>
      </div>

      <div v-if="context" v-reveal="80" class="sft__context">
        <span class="sm-eyebrow">{{ t.shared.contextEyebrow }}</span>
        <h2 class="sm-h3">{{ context.title }}</h2>
        <p class="sm-body">{{ context.lead }}</p>
        <ul>
          <li v-for="item in context.items" :key="item" class="sm-check">
            <CircleCheck :size="18" aria-hidden="true" /> {{ item }}
          </li>
        </ul>
      </div>

      <div v-else-if="transparency" v-reveal="80" class="sft__context sft__context--honest">
        <h2 class="sm-h3">{{ transparency.title }}</h2>
        <p class="sm-body">{{ transparency.lead }}</p>
        <div class="sft__columns">
          <div>
            <h3 class="sft__col-title">{{ transparency.confirmed.title }}</h3>
            <ul>
              <li v-for="item in transparency.confirmed.items" :key="item" class="sm-check">
                <CircleCheck :size="18" aria-hidden="true" /> {{ item }}
              </li>
            </ul>
          </div>
          <div>
            <h3 class="sft__col-title">{{ transparency.perProject.title }}</h3>
            <ul>
              <li v-for="item in transparency.perProject.items" :key="item" class="sft__open">
                <MessagesSquare :size="18" aria-hidden="true" /> {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sft__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.3fr);
  gap: 16px;
  align-items: stretch;
}
.sft__audience,
.sft__context {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: clamp(24px, 3vw, 36px);
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
}
.sft__audience {
  background: var(--sm-surface-subtle);
}
.sft__context {
  background: var(--sm-surface);
}
.sft__audience ul,
.sft__context ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.sft__audience li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 15.5px;
  line-height: 1.5;
  color: var(--sm-text-2);
}
.sft__audience li svg {
  flex: none;
  margin-top: 2px;
  color: var(--sm-primary-ink);
}
.sft__context--honest {
  border-color: var(--sm-primary-200);
}
.sft__columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}
.sft__col-title {
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-muted);
}
.sft__open {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 15.5px;
  line-height: 1.5;
  color: var(--sm-text-2);
}
.sft__open svg {
  flex: none;
  margin-top: 2px;
  color: var(--sm-primary-ink);
}
@media (max-width: 960px) {
  .sft__grid,
  .sft__columns {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
