<script setup lang="ts">
import { DatabaseZap, FileQuestion, MessagesSquare } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('implementation')
const icons = [FileQuestion, MessagesSquare, DatabaseZap]
</script>

<template>
  <section class="sm-section sm-section--compact ipb" aria-labelledby="ipb-title">
    <div class="sm-container">
      <div class="sm-heading">
        <span v-reveal class="sm-eyebrow">{{ t.problem.eyebrow }}</span>
        <h2 id="ipb-title" v-reveal="60" class="sm-h2">{{ t.problem.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.problem.lead }}</p>
      </div>
      <ol class="ipb__causes">
        <li
          v-for="(cause, i) in t.problem.causes"
          :key="cause.title"
          v-reveal="i * 70"
          class="sm-card ipb__cause"
        >
          <span class="ipb__top">
            <span class="sm-icon-tile" aria-hidden="true"
              ><component :is="icons[i]" :size="20"
            /></span>
            <span class="ipb__num" aria-hidden="true">0{{ i + 1 }}</span>
          </span>
          <h3 class="sm-h4">{{ cause.title }}</h3>
          <p class="sm-body">{{ cause.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.ipb__causes {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.ipb__cause {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.ipb__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}
.ipb__num {
  font-family: var(--sm-display);
  font-size: 15px;
  font-weight: 700;
  color: var(--sm-subtle);
}
@media (max-width: 900px) {
  .ipb__causes {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
