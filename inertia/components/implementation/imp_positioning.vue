<script setup lang="ts">
import { ArrowRight, Check } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('implementation')
</script>

<template>
  <section class="ipo" aria-labelledby="ipo-title">
    <div class="sm-container">
      <div v-reveal class="ipo__panel">
        <div class="ipo__statement">
          <span class="sm-eyebrow">{{ t.positioning.eyebrow }}</span>
          <h2 id="ipo-title" class="sm-h2">{{ t.positioning.title }}</h2>
          <p class="sm-lead">{{ t.positioning.lead }}</p>
        </div>
        <div class="ipo__flow">
          <div class="ipo__col">
            <h3 class="ipo__col-title">{{ t.positioning.first.title }}</h3>
            <ul>
              <li v-for="item in t.positioning.first.items" :key="item" class="sm-check">
                <Check :size="18" aria-hidden="true" /> {{ item }}
              </li>
            </ul>
          </div>
          <span class="ipo__arrow" aria-hidden="true"><ArrowRight :size="20" /></span>
          <div class="ipo__col">
            <h3 class="ipo__col-title">{{ t.positioning.then.title }}</h3>
            <ul>
              <li v-for="item in t.positioning.then.items" :key="item" class="sm-check">
                <Check :size="18" aria-hidden="true" /> {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ipo {
  padding-block: clamp(24px, 4vw, 48px);
}
.ipo__panel {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.3fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
  padding: clamp(28px, 5vw, 64px);
  border-radius: var(--sm-r-shell);
  border: 1px solid var(--sm-inverse-edge);
  color: var(--sm-on-inverse);
  background:
    radial-gradient(60% 90% at 100% 0%, rgba(2, 200, 250, 0.16), transparent 60%),
    radial-gradient(50% 80% at 0% 100%, rgba(0, 93, 251, 0.28), transparent 60%),
    var(--sm-surface-inverse);
}
.ipo__statement {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.ipo__statement .sm-eyebrow {
  color: #7fc4ff;
}
.ipo__statement .sm-lead {
  color: var(--sm-on-inverse-muted);
}
.ipo__flow {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 16px;
  align-items: center;
}
.ipo__col {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding: 22px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
}
.ipo__col-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
}
.ipo__col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ipo__col .sm-check {
  color: rgba(255, 255, 255, 0.86);
  font-size: 15px;
}
.ipo__col .sm-check > svg {
  color: var(--sm-tech);
}
.ipo__arrow {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--sm-primary);
  color: #fff;
}
@media (max-width: 1080px) {
  .ipo__panel {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 720px) {
  .ipo__flow {
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
  }
  .ipo__col {
    width: 100%;
  }
  .ipo__arrow {
    transform: rotate(90deg);
  }
}
</style>
