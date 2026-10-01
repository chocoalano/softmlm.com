<script setup lang="ts">
/**
 * Hub hero visual: the network orb with the software at its centre and
 * the five services around it, each labelled in text.
 */
import { computed } from 'vue'
import { Blocks } from 'lucide-vue-next'
import NetworkOrb from '~/components/site/network_orb.vue'
import { services } from '@shared/services'
import { serviceIcons } from '~/content/services'
import { useCopy } from '~/i18n'

const t = useCopy('services')
const common = useCopy('common')
const chips = computed(() =>
  services.map((service) => ({
    key: service.key,
    label: common.value.nav.serviceLinks[service.key].label,
    icon: serviceIcons[service.key],
  }))
)
</script>

<template>
  <div class="hv">
    <div class="hv__orb" aria-hidden="true"><NetworkOrb :nodes="110" /></div>
    <div class="hv__core">
      <Blocks :size="26" aria-hidden="true" />
      <span>{{ t.hub.ecosystem.nodes.software }}</span>
      <em>{{ t.hub.ecosystem.core }}</em>
    </div>
    <ul class="hv__chips" :aria-label="t.home.cardsLabel">
      <li v-for="(chip, i) in chips" :key="chip.key" class="hv__chip" :class="`hv__chip--${i}`">
        <component :is="chip.icon" :size="16" aria-hidden="true" />
        {{ chip.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.hv {
  position: relative;
  aspect-ratio: 1;
  width: 100%;
  max-width: 540px;
  margin: 0 auto;
}
.hv__orb {
  position: absolute;
  inset: 6%;
}
.hv__core {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 128px;
  padding: 16px 10px;
  transform: translate(-50%, -50%);
  border-radius: 24px;
  background: linear-gradient(135deg, var(--sm-primary), var(--sm-accent));
  color: #fff;
  font-family: var(--sm-display);
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  box-shadow:
    0 0 0 8px var(--sm-surface-glass),
    var(--sm-shadow-float);
}
.hv__core em {
  font-family: var(--sm-sans);
  font-size: 11.5px;
  font-style: normal;
  font-weight: 600;
  opacity: 0.85;
}
.hv__chips {
  list-style: none;
}
.hv__chip {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 220px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface-glass);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: var(--sm-shadow-float);
  font-size: 14px;
  font-weight: 600;
  color: var(--sm-text);
}
.hv__chip svg {
  flex: none;
  color: var(--sm-primary-ink);
}
.hv__chip--0 {
  top: 4%;
  left: 0;
}
.hv__chip--1 {
  top: 17%;
  right: 0;
}
.hv__chip--2 {
  top: 68%;
  right: 0;
}
.hv__chip--3 {
  bottom: 2%;
  left: 30%;
}
.hv__chip--4 {
  top: 64%;
  left: -2%;
}
@media (prefers-reduced-motion: no-preference) {
  .hv__chip--0 {
    animation: sm-float 9s ease-in-out infinite;
  }
  .hv__chip--2 {
    animation: sm-float 10s ease-in-out -3s infinite;
  }
  .hv__chip--4 {
    animation: sm-float 8s ease-in-out -5s infinite;
  }
}
@media (max-width: 560px) {
  .hv {
    aspect-ratio: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    padding-top: 10px;
  }
  .hv__orb {
    inset: -20px auto auto 50%;
    width: 220px;
    height: 220px;
    margin-left: -110px;
  }
  .hv__core {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    margin: 36px 0 20px;
  }
  .hv__chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }
  .hv__chip {
    position: static;
    animation: none !important;
    font-size: 13.5px;
  }
}
</style>
