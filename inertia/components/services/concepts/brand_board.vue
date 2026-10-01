<script setup lang="ts">
/**
 * Branding concept: an identity board for a fictional "YOUR BRAND", with
 * its colours, type and three applications. Captioned as an example
 * creative direction: not client work.
 */
import { computed } from 'vue'
import { useCopy } from '~/i18n'

const t = useCopy('services')
const v = computed(() => t.value.pages.branding.visual)

/** The fictional brand's palette: in the same navy / blue family as the site. */
const swatches = [
  { name: 'Night', hex: '#0B1B33' },
  { name: 'Ocean', hex: '#1F5FAF' },
  { name: 'Mist', hex: '#D8E6F3' },
  { name: 'Sand', hex: '#EDE6DA' },
  { name: 'Ink', hex: '#1C2230' },
]
</script>

<template>
  <figure class="ui bbd">
    <div class="bbd__lockup">
      <span class="bbd__mark" aria-hidden="true">Y</span>
      <span class="bbd__word">
        <b>{{ v.brand }}</b>
        <span>{{ v.tagline }}</span>
      </span>
    </div>

    <div class="bbd__grid">
      <div class="bbd__panel">
        <span class="ui-label">{{ v.palette }}</span>
        <ul class="bbd__swatches">
          <li v-for="swatch in swatches" :key="swatch.name">
            <span class="bbd__chip" :style="{ background: swatch.hex }" aria-hidden="true" />
            <span class="bbd__name">{{ swatch.name }}</span>
            <span class="bbd__hex">{{ swatch.hex }}</span>
          </li>
        </ul>
      </div>
      <div class="bbd__panel">
        <span class="ui-label">{{ v.type }}</span>
        <span class="bbd__aa" aria-hidden="true">Aa</span>
        <span class="bbd__fonts">Manrope · Inter</span>
      </div>
    </div>

    <div class="bbd__panel">
      <span class="ui-label">{{ v.applications }}</span>
      <ul class="bbd__apps">
        <li>
          <span class="bbd__pack" aria-hidden="true">
            <span class="bbd__pack-mark">Y</span>
            <span class="bbd__pack-name">{{ v.brand }}</span>
          </span>
          {{ v.items[0] }}
        </li>
        <li>
          <span class="bbd__post" aria-hidden="true">
            <span class="bbd__post-band" />
            <span class="bbd__post-name">{{ v.tagline }}</span>
          </span>
          {{ v.items[1] }}
        </li>
        <li>
          <span class="bbd__card" aria-hidden="true">
            <span class="bbd__card-mark">Y</span>
            <span class="bbd__card-lines"><i /><i /></span>
          </span>
          {{ v.items[2] }}
        </li>
      </ul>
    </div>
    <figcaption class="bbd__caption">{{ v.caption }}</figcaption>
  </figure>
</template>

<style scoped>
.bbd {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: clamp(16px, 2.4vw, 24px);
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-product);
}
.bbd__lockup {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  border-radius: 16px;
  background: #0b1b33;
  color: #edf2f8;
}
.bbd__mark {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: #1f5faf;
  font-family: var(--sm-display);
  font-size: 24px;
  font-weight: 800;
}
.bbd__word {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.bbd__word b {
  font-family: var(--sm-display);
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.12em;
}
.bbd__word span {
  font-size: 12.5px;
  color: #b9cbe2;
}
.bbd__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 12px;
}
.bbd__panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface-subtle);
}
.bbd__swatches {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 6px;
}
.bbd__swatches li {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}
.bbd__chip {
  height: 38px;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px rgba(128, 128, 128, 0.25);
}
.bbd__name {
  font-size: 11px;
  font-weight: 600;
  color: var(--sm-text);
}
.bbd__hex {
  font-family: var(--sm-mono);
  font-size: 9.5px;
  color: var(--sm-muted);
}
.bbd__aa {
  font-family: var(--sm-display);
  font-size: 44px;
  font-weight: 800;
  line-height: 1;
  color: var(--sm-text);
}
.bbd__fonts {
  font-size: 12px;
  color: var(--sm-muted);
}
.bbd__apps {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.bbd__apps li {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--sm-text-2);
}
.bbd__pack {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 58px;
  height: 78px;
  border-radius: 10px 10px 6px 6px;
  background: #ede6da;
  box-shadow: inset 0 -14px 0 #1f5faf;
}
.bbd__pack-mark {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 7px;
  background: #0b1b33;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
}
.bbd__pack-name {
  font-size: 6.5px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #0b1b33;
}
.bbd__post {
  position: relative;
  width: 78px;
  height: 78px;
  overflow: hidden;
  border-radius: 10px;
  background: #d8e6f3;
}
.bbd__post-band {
  position: absolute;
  inset: auto 0 0;
  height: 30px;
  background: #0b1b33;
}
.bbd__post-name {
  position: absolute;
  left: 8px;
  bottom: 9px;
  font-size: 8px;
  font-weight: 700;
  color: #edf2f8;
}
.bbd__card {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 92px;
  height: 56px;
  margin-block: 11px;
  padding: 0 10px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 6px 16px -8px rgba(4, 24, 54, 0.45);
}
.bbd__card-mark {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  flex: none;
  border-radius: 6px;
  background: #1f5faf;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
}
.bbd__card-lines {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}
.bbd__card-lines i {
  height: 4px;
  border-radius: 2px;
  background: #cfd9e7;
}
.bbd__card-lines i:last-child {
  width: 60%;
}
.bbd__caption {
  font-size: 12px;
  color: var(--sm-muted);
}
@media (max-width: 520px) {
  .bbd__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .bbd__swatches {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
</style>
