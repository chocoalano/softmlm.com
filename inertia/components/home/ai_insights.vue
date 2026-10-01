<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Activity,
  Bot,
  ChartSpline,
  MessageCircle,
  ScanSearch,
  Sparkles,
  TrendingUp,
  UserRoundX,
} from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import VisualNote from '~/components/site/visual_note.vue'
import { useCopy } from '~/i18n'

const t = useCopy('homePlatform')
const common = useCopy('common')

/** Sample chart values per example question; labels and units come from the copy. */
const breakdowns = [
  [164, 92, 30],
  [12.6, 6.2, 18.4],
  [13.1, 13.5, 13.9],
]
const conversations = computed(() =>
  t.value.ai.conversations.map((item, i) => ({
    ...item,
    breakdown: item.labels.map((label, j) => ({ label, value: breakdowns[i][j] })),
  }))
)

const capabilityIcons = [MessageCircle, TrendingUp, UserRoundX, ScanSearch, Activity, ChartSpline]
const capabilities = computed(() =>
  t.value.ai.capabilities.map((item, i) => ({ ...item, icon: capabilityIcons[i] }))
)

const active = ref(0)
const conversation = computed(() => conversations.value[active.value])
const max = computed(() => Math.max(...conversation.value.breakdown.map((item) => item.value)))
</script>

<template>
  <section id="ai" class="sm-section ai">
    <div class="sm-container ai__grid">
      <div class="ai__copy">
        <span v-reveal class="sm-eyebrow"
          >{{ t.ai.eyebrow }} <span class="ai__badge">{{ t.ai.badge }}</span></span
        >
        <h2 v-reveal="60" class="sm-h2">{{ t.ai.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.ai.lead }}</p>
        <ul class="ai__caps">
          <li v-for="(item, i) in capabilities" :key="item.title" v-reveal="(i % 2) * 60">
            <span class="sm-icon-tile sm-icon-tile--sm"
              ><component :is="item.icon" :size="18"
            /></span>
            <span>
              <b>{{ item.title }}</b>
              <span>{{ item.text }}</span>
            </span>
          </li>
        </ul>
      </div>

      <div v-reveal="120" class="ai__visual">
        <div class="ui ai__chat">
          <div class="ai__chat-head">
            <span class="ai__bot"><Sparkles :size="16" /></span>
            <div>
              <div class="ui-title">{{ t.ai.chatTitle }}</div>
            </div>
          </div>

          <Transition name="ai-swap" mode="out-in">
            <div :key="active" class="ai__thread" aria-live="polite">
              <div class="ai__q">{{ conversation.question }}</div>
              <div class="ai__a">
                <span class="ai__a-icon"><Bot :size="15" /></span>
                <div class="ai__a-body">
                  <p>{{ conversation.answer }}</p>
                  <div class="ai__mini">
                    <div class="ui-label">{{ conversation.unit }}</div>
                    <ul>
                      <li v-for="item in conversation.breakdown" :key="item.label">
                        <span>{{ item.label }}</span>
                        <span class="ai__bar"
                          ><span :style="{ width: `${(item.value / max) * 100}%` }"
                        /></span>
                        <b class="sm-num">{{ item.value }}</b>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <div class="ai__prompts" role="group" :aria-label="t.ai.promptsLabel">
            <button
              v-for="(item, i) in conversations"
              :key="i"
              type="button"
              :aria-pressed="active === i"
              @click="active = i"
            >
              {{ item.question }}
            </button>
          </div>
        </div>
        <VisualNote :label="common.visualNote.concept" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.ai {
  background:
    radial-gradient(50% 50% at 90% 20%, rgba(0, 93, 251, 0.08), transparent 70%),
    radial-gradient(40% 40% at 10% 90%, rgba(2, 200, 250, 0.08), transparent 70%), var(--sm-surface);
}
.ai__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: center;
}
.ai__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.ai__badge {
  margin-left: 4px;
  padding: 3px 9px;
  border-radius: 999px;
  background: var(--sm-primary-50);
  font-size: 11px;
  letter-spacing: 0.04em;
}
.ai__caps {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 28px;
  margin-top: 12px;
}
.ai__caps li {
  display: flex;
  gap: 12px;
}
.ai__caps b {
  display: block;
  font-size: 15.5px;
  font-weight: 650;
}
.ai__caps li > span:last-child > span {
  display: block;
  margin-top: 2px;
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--sm-muted);
}
.ai__visual {
  min-width: 0;
}
.ai__chat {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 22px;
  border-radius: var(--sm-r-shell);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-product);
}
.ai__chat-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--sm-border);
}
.ai__bot {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 11px;
  color: #fff;
  background: linear-gradient(135deg, var(--sm-primary), var(--sm-accent));
}
.ai__thread {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 300px;
}
.ai__q {
  align-self: flex-end;
  max-width: 82%;
  padding: 12px 16px;
  border-radius: 16px 16px 4px 16px;
  border: 1px solid var(--sm-inverse-edge);
  background: var(--sm-surface-inverse);
  color: var(--sm-on-inverse);
  font-size: 14px;
  font-weight: 500;
}
.ai__a {
  display: flex;
  gap: 10px;
}
.ai__a-icon {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  flex: none;
  border-radius: 50%;
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
}
.ai__a-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 4px 16px 16px 16px;
  background: var(--sm-surface-subtle);
  font-size: 14px;
  line-height: 1.6;
}
.ai__mini {
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
}
.ai__mini ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}
.ai__mini li {
  display: grid;
  grid-template-columns: 96px 1fr 44px;
  align-items: center;
  gap: 10px;
  font-size: 12.5px;
}
.ai__mini b {
  text-align: right;
}
.ai__bar {
  height: 10px;
}
.ai__bar span {
  display: block;
  height: 100%;
  border-radius: 0 4px 4px 0;
  background: var(--sm-primary);
}
.ai__prompts {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.ai__prompts button {
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--sm-border);
  font-size: 13px;
  font-weight: 500;
  color: var(--sm-text-2);
  text-align: left;
  transition:
    border-color 0.15s,
    background 0.15s;
}
.ai__prompts button:hover {
  border-color: var(--sm-primary-200);
}
.ai__prompts button[aria-pressed='true'] {
  border-color: var(--sm-primary-ink);
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
}
.ai-swap-enter-active,
.ai-swap-leave-active {
  transition:
    opacity 0.25s var(--sm-ease),
    transform 0.25s var(--sm-ease);
}
.ai-swap-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.ai-swap-leave-to {
  opacity: 0;
}

@media (max-width: 1080px) {
  .ai__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 560px) {
  .ai__caps {
    grid-template-columns: minmax(0, 1fr);
  }
  .ai__chat {
    padding: 16px;
    border-radius: var(--sm-r-card);
  }
  .ai__q {
    max-width: 92%;
  }
}
</style>
