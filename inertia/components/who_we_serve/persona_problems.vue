<script setup lang="ts">
/**
 * The problems a role recognises, laid out the way that role talks about
 * them (see ProblemStyle in content/personas.ts).
 */
import { computed } from 'vue'
import { ArrowRight, MessageCircleQuestion, Quote, UserRound } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { personaStructure } from '~/content/personas'
import { useCopy } from '~/i18n'
import type { PersonaKey } from '@shared/personas'

const props = defineProps<{ persona: PersonaKey }>()

const t = useCopy('personas')
const problems = computed(() => t.value.personas[props.persona].problems)
const style = computed(() => personaStructure[props.persona].problems)
</script>

<template>
  <section
    class="sm-section sm-section--compact sm-section--tint pp"
    :class="`pp--${style}`"
    aria-labelledby="problems-title"
  >
    <div class="sm-container">
      <div class="pp__layout">
        <div class="sm-heading pp__head">
          <span v-reveal class="sm-eyebrow">{{ problems.eyebrow }}</span>
          <h2 id="problems-title" v-reveal="60" class="sm-h2">{{ problems.title }}</h2>
          <p v-reveal="120" class="sm-lead">{{ problems.lead }}</p>
        </div>

        <!-- Owners: in their own words -->
        <ul v-if="style === 'quotes'" class="pp__quotes">
          <li v-for="(item, i) in problems.items" :key="item.title" v-reveal="(i % 2) * 70">
            <Quote :size="26" class="pp__quote-mark" aria-hidden="true" />
            <h3 class="pp__quote">“{{ item.title }}”</h3>
            <p>{{ item.text }}</p>
          </li>
        </ul>

        <!-- Finance: the questions asked every period -->
        <ul v-else-if="style === 'questions'" class="pp__questions">
          <li v-for="(item, i) in problems.items" :key="item.title" v-reveal="(i % 3) * 60">
            <span class="pp__tag">{{ item.tag }}</span>
            <h3 class="pp__question">“{{ item.title }}”</h3>
            <p>{{ item.text }}</p>
          </li>
        </ul>

        <!-- Operations: everyday scenarios -->
        <ol v-else-if="style === 'scenarios'" class="pp__scenarios">
          <li v-for="(item, i) in problems.items" :key="item.title" v-reveal="i * 50">
            <span class="pp__num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            <span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </span>
          </li>
        </ol>

        <!-- IT: topics to evaluate, stated plainly -->
        <ul v-else-if="style === 'topics'" class="pp__topics">
          <li v-for="(item, i) in problems.items" :key="item.title" v-reveal="(i % 3) * 60">
            <span class="pp__topic-num" aria-hidden="true">{{
              String(i + 1).padStart(2, '0')
            }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </li>
        </ul>

        <!-- Distributors: what members send to support -->
        <div v-else v-reveal="80" class="pp__inbox">
          <p class="pp__inbox-head">
            <MessageCircleQuestion :size="17" aria-hidden="true" /> {{ t.shared.inboxTitle }}
          </p>
          <ul>
            <li v-for="item in problems.items" :key="item.title">
              <span class="pp__avatar" aria-hidden="true"><UserRound :size="15" /></span>
              <span class="pp__msg">
                <span class="pp__bubble">{{ item.title }}</span>
                <span class="pp__answer">
                  <ArrowRight :size="13" aria-hidden="true" />
                  {{ t.shared.answeredBy }} <b>{{ item.text }}</b>
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pp__head {
  margin-bottom: clamp(32px, 4vw, 56px);
}

/* quotes */
.pp__quotes {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.pp__quotes li {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: clamp(24px, 3vw, 36px);
  border-radius: var(--sm-r-card);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
}
.pp__quote-mark {
  color: var(--sm-primary-200);
}
.pp__quote {
  font-family: var(--sm-display);
  font-size: clamp(21px, 2vw, 26px);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.022em;
  text-wrap: balance;
}
.pp__quotes p,
.pp__questions p,
.pp__topics p {
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--sm-muted);
}

/* finance questions */
.pp__questions {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 16px;
}
.pp__questions li {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 26px;
  border-radius: var(--sm-r-card);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
}
.pp__questions li:nth-child(n + 4) {
  grid-column: span 3;
}
.pp__tag {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sm-primary-ink);
}
.pp__question {
  font-family: var(--sm-display);
  font-size: 21px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

/* operations scenarios */
.pp--scenarios .pp__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: start;
}
.pp--scenarios .pp__head {
  position: sticky;
  top: calc(var(--sm-header-h) + 40px);
  margin-bottom: 0;
}
.pp__scenarios {
  list-style: none;
  border-top: 1px solid var(--sm-border-2);
}
.pp__scenarios li {
  display: flex;
  gap: 22px;
  padding: 26px 0;
  border-bottom: 1px solid var(--sm-border-2);
}
.pp__num {
  flex: none;
  width: 44px;
  font-family: var(--sm-display);
  font-size: 28px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--sm-primary-200);
}
.pp__scenarios h3 {
  font-size: 19px;
  font-weight: 650;
  line-height: 1.35;
  letter-spacing: -0.015em;
}
.pp__scenarios p {
  margin-top: 6px;
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--sm-muted);
}

/* IT topics */
.pp__topics {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  border-radius: var(--sm-r-card);
  overflow: hidden;
  background: var(--sm-border);
  border: 1px solid var(--sm-border);
}
.pp__topics li {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 28px;
  background: var(--sm-surface);
}
.pp__topic-num {
  font-family: var(--sm-mono);
  font-size: 12.5px;
  color: var(--sm-primary-ink);
}
.pp__topics h3 {
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -0.015em;
}

/* distributor support inbox */
.pp--member .pp__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: center;
}
.pp--member .pp__head {
  margin-bottom: 0;
}
.pp__inbox {
  padding: clamp(20px, 3vw, 32px);
  border-radius: var(--sm-r-shell);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  box-shadow: var(--sm-shadow-soft);
}
.pp__inbox-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 16px;
  margin-bottom: 18px;
  border-bottom: 1px solid var(--sm-border);
  font-size: 13px;
  font-weight: 600;
  color: var(--sm-muted);
}
.pp__inbox ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.pp__inbox li {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.pp__avatar {
  display: grid;
  place-items: center;
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--sm-surface-subtle);
  color: var(--sm-muted);
}
.pp__msg {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  min-width: 0;
}
.pp__bubble {
  padding: 10px 14px;
  border-radius: 4px 16px 16px 16px;
  background: var(--sm-surface-subtle);
  font-size: 15px;
  font-weight: 500;
  color: var(--sm-text);
}
.pp__answer {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12.5px;
  color: var(--sm-muted);
}
.pp__answer b {
  font-weight: 600;
  color: var(--sm-primary-ink);
}

@media (max-width: 1080px) {
  .pp__questions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .pp__questions li,
  .pp__questions li:nth-child(n + 4) {
    grid-column: auto;
  }
  .pp__topics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .pp--scenarios .pp__layout,
  .pp--member .pp__layout {
    grid-template-columns: minmax(0, 1fr);
  }
  .pp--scenarios .pp__head {
    position: static;
    margin-bottom: 8px;
  }
}
@media (max-width: 640px) {
  .pp__quotes,
  .pp__questions,
  .pp__topics {
    grid-template-columns: minmax(0, 1fr);
  }
  .pp__questions li,
  .pp__topics li {
    padding: 22px;
  }
  .pp__scenarios li {
    gap: 14px;
  }
  .pp__num {
    width: 34px;
    font-size: 22px;
  }
}
</style>
