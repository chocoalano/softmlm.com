<script setup lang="ts">
/**
 * Maklon concept: a product journey from concept to launch plan, with
 * neutral "YOUR BRAND / PRODUCT CONCEPT" packaging drawn in CSS. No real
 * or look-alike product, no production, certification or capacity claim.
 */
import { computed } from 'vue'
import { useCopy } from '~/i18n'

const t = useCopy('services')
const v = computed(() => t.value.pages.product_maklon.visual)
</script>

<template>
  <figure class="ui pjn">
    <div class="pjn__stage" aria-hidden="true">
      <div class="pjn__bottle">
        <span class="pjn__cap" />
        <span class="pjn__label">
          <b>{{ v.brand }}</b>
          <span>{{ v.product }}</span>
        </span>
      </div>
      <div class="pjn__box">
        <span class="pjn__box-top" />
        <span class="pjn__label pjn__label--box">
          <b>{{ v.brand }}</b>
          <span>{{ v.product }}</span>
        </span>
      </div>
    </div>
    <ol class="pjn__steps">
      <li v-for="(stage, i) in v.stages" :key="stage" :class="{ 'is-current': i === 0 }">
        <span class="pjn__dot" aria-hidden="true">{{ i + 1 }}</span>
        {{ stage }}
      </li>
    </ol>
    <figcaption class="pjn__caption">{{ v.caption }}</figcaption>
  </figure>
</template>

<style scoped>
.pjn {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: clamp(16px, 2.4vw, 24px);
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-product);
}
.pjn__stage {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 28px;
  min-height: 250px;
  padding: 28px 16px 22px;
  border-radius: 18px;
  border: 1.5px dashed var(--sm-primary-200);
  background:
    radial-gradient(60% 70% at 50% 60%, var(--sm-glow), transparent 70%), var(--sm-canvas);
}
.pjn__bottle {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 96px;
  height: 196px;
  padding-top: 64px;
  border-radius: 26px 26px 18px 18px;
  background: linear-gradient(90deg, #e9eef5, #ffffff 45%, #dfe6ef);
  box-shadow:
    inset -6px 0 12px rgba(4, 24, 54, 0.08),
    0 18px 30px -18px rgba(4, 24, 54, 0.45);
}
.pjn__cap {
  position: absolute;
  top: -22px;
  width: 46px;
  height: 30px;
  border-radius: 8px 8px 4px 4px;
  background: #0b1b33;
}
.pjn__box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 118px;
  height: 138px;
  border-radius: 8px;
  background: linear-gradient(135deg, #1f5faf, #0b1b33);
  box-shadow: 0 18px 30px -18px rgba(4, 24, 54, 0.55);
}
.pjn__box-top {
  position: absolute;
  top: -10px;
  left: 6px;
  right: 6px;
  height: 12px;
  border-radius: 6px 6px 0 0;
  background: #2b6cc0;
}
.pjn__label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  width: 80%;
  padding: 10px 4px;
  border-radius: 6px;
  background: #0b1b33;
  color: #edf2f8;
  text-align: center;
}
.pjn__label b {
  font-family: var(--sm-display);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
}
.pjn__label span {
  font-size: 6.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  opacity: 0.8;
}
.pjn__label--box {
  background: rgba(255, 255, 255, 0.12);
}
.pjn__steps {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}
.pjn__steps li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface-subtle);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--sm-text-2);
}
.pjn__steps li.is-current {
  border-color: var(--sm-primary-200);
  background: var(--sm-primary-50);
  color: var(--sm-text);
}
.pjn__dot {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  flex: none;
  border-radius: 50%;
  background: var(--sm-primary);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}
.pjn__caption {
  font-size: 12px;
  color: var(--sm-muted);
}
@media (max-width: 560px) {
  .pjn__steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .pjn__stage {
    min-height: 220px;
    gap: 18px;
  }
}
</style>
