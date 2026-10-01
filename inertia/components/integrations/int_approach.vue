<script setup lang="ts">
/**
 * Expectation setting: some integrations are configuration, others are
 * development, and some meet a limitation on the other side. Then who
 * owns each side, and what is established before development.
 */
import { computed } from 'vue'
import { Blocks, Building2, CircleCheck, Handshake, UsersRound } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('integrations')
const partyIcons = [Blocks, UsersRound, Building2, Handshake]
const parties = computed(() =>
  t.value.ownership.parties.map((party, i) => ({ ...party, icon: partyIcons[i] }))
)
</script>

<template>
  <section class="sm-section sm-section--compact nappr" aria-labelledby="nappr-title">
    <div class="sm-container">
      <div class="nappr__head">
        <span v-reveal class="sm-eyebrow">{{ t.approach.eyebrow }}</span>
        <h2 id="nappr-title" v-reveal="60" class="sm-h2">{{ t.approach.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.approach.lead }}</p>
      </div>

      <ol v-reveal class="nappr__scale" :aria-label="t.approach.label">
        <li v-for="(step, i) in t.approach.steps" :key="step.title" :data-step="i">
          <b>{{ step.title }}</b>
          <span>{{ step.text }}</span>
        </li>
      </ol>

      <section class="nappr__owners" aria-labelledby="nown-title">
        <div class="nappr__owners-head">
          <span v-reveal class="sm-eyebrow">{{ t.ownership.eyebrow }}</span>
          <h2 id="nown-title" v-reveal="60" class="sm-h2">{{ t.ownership.title }}</h2>
          <p v-reveal="120" class="sm-lead">{{ t.ownership.lead }}</p>
        </div>
        <div class="nappr__owners-grid">
          <ul class="nappr__parties">
            <li
              v-for="(party, i) in parties"
              :key="party.title"
              v-reveal="(i % 2) * 60"
              class="nappr__party"
            >
              <span class="sm-icon-tile sm-icon-tile--sm"
                ><component :is="party.icon" :size="18"
              /></span>
              <div>
                <h3 class="sm-h4">{{ party.title }}</h3>
                <p>{{ party.text }}</p>
              </div>
            </li>
          </ul>
          <div v-reveal="120" class="nappr__checks">
            <h3 class="nappr__label">{{ t.ownership.questionsTitle }}</h3>
            <ul>
              <li v-for="question in t.ownership.questions" :key="question" class="sm-check">
                <CircleCheck :size="18" aria-hidden="true" /> {{ question }}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.nappr__head,
.nappr__owners-head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
  margin-bottom: clamp(28px, 4vw, 44px);
}
/* from "already there" to "outside our control": one bar, four stops */
.nappr__scale {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  overflow: hidden;
}
.nappr__scale li {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 26px 22px 22px;
}
.nappr__scale li + li {
  border-left: 1px solid var(--sm-border);
}
.nappr__scale li::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--sm-primary);
}
.nappr__scale li[data-step='0']::before {
  background: var(--sm-tech);
}
.nappr__scale li[data-step='1']::before {
  background: #0098f7;
}
.nappr__scale li[data-step='3']::before {
  background: var(--sm-strong);
}
.nappr__scale b {
  font-size: 16px;
  font-weight: 650;
}
.nappr__scale span {
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--sm-muted);
}
.nappr__owners {
  margin-top: clamp(56px, 7vw, 96px);
}
.nappr__owners-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 16px;
  align-items: start;
}
.nappr__parties {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.nappr__party {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  height: 100%;
  padding: 22px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.nappr__party > div {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.nappr__party p {
  font-size: 15px;
  line-height: 1.55;
  color: var(--sm-muted);
}
.nappr__checks {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px;
  border-radius: var(--sm-r-card);
  background: var(--sm-primary-50);
  border: 1px solid var(--sm-primary-100);
}
.nappr__checks ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.nappr__label {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-primary-ink);
}
@media (max-width: 1000px) {
  .nappr__owners-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 860px) {
  .nappr__scale {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .nappr__scale li:nth-child(3) {
    border-left: 0;
  }
  .nappr__scale li:nth-child(n + 3) {
    border-top: 1px solid var(--sm-border);
  }
}
@media (max-width: 560px) {
  .nappr__scale,
  .nappr__parties {
    grid-template-columns: minmax(0, 1fr);
  }
  .nappr__scale li + li {
    border-left: 0;
    border-top: 1px solid var(--sm-border);
  }
}
</style>
