<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { HOW_WE_DO_IT_PATH } from '@shared/implementation'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('homeClosing')
const { lp } = useI18n()
</script>

<template>
  <section id="implementation" class="sm-section sm-section--tint im">
    <div class="sm-container im__grid">
      <div class="im__side">
        <span v-reveal class="sm-eyebrow">{{ t.implementation.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ t.implementation.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.implementation.lead }}</p>
        <div v-reveal="180" class="im__concerns">
          <div v-for="item in t.implementation.concerns" :key="item.q" class="im__concern">
            <b>{{ item.q }}</b>
            <span>{{ item.a }}</span>
          </div>
        </div>
        <div v-reveal="220" class="im__links">
          <a :href="lp(HOW_WE_DO_IT_PATH)" class="sm-link"
            >{{ t.implementation.pageLink }} <ArrowRight :size="15"
          /></a>
          <MarketingWhatsappCta
            context="implementation"
            page="homepage"
            section="implementation"
            variant="contextual"
            appearance="link"
            :label="t.implementation.whatsapp"
          />
        </div>
      </div>

      <ol class="im__timeline">
        <li
          v-for="(phase, i) in t.implementation.phases"
          :key="phase.title"
          v-reveal="(i % 3) * 60"
          class="im__phase"
        >
          <span class="im__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <div>
            <h3 class="sm-h4">{{ phase.title }}</h3>
            <p class="sm-body">{{ phase.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.im__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: start;
}
.im__side {
  position: sticky;
  top: calc(var(--sm-header-h) + 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.im__links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
}
.im__concerns {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 8px;
}
.im__concern {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 16px 18px;
  border-radius: 16px;
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
}
.im__concern b {
  font-size: 15.5px;
  font-weight: 650;
}
.im__concern span {
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--sm-muted);
}
.im__timeline {
  list-style: none;
  position: relative;
  display: flex;
  flex-direction: column;
}
.im__timeline::before {
  content: '';
  position: absolute;
  top: 24px;
  bottom: 24px;
  left: 23px;
  width: 2px;
  background: linear-gradient(180deg, var(--sm-primary), var(--sm-accent) 60%, var(--sm-tech));
  opacity: 0.35;
}
.im__phase {
  position: relative;
  display: flex;
  gap: 24px;
  padding: 0 0 36px;
}
.im__phase:last-child {
  padding-bottom: 0;
}
.im__num {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  flex: none;
  border-radius: 50%;
  background: var(--sm-surface);
  border: 2px solid var(--sm-primary-200);
  font-size: 14px;
  font-weight: 700;
  color: var(--sm-primary-ink);
  font-variant-numeric: tabular-nums;
}
.im__phase:first-child .im__num,
.im__phase:nth-child(8) .im__num {
  background: var(--sm-primary);
  border-color: var(--sm-primary-ink);
  color: #fff;
}
.im__phase .sm-h4 {
  margin: 10px 0 6px;
}
@media (max-width: 980px) {
  .im__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .im__side {
    position: static;
  }
}
</style>
