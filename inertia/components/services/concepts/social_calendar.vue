<script setup lang="ts">
/**
 * Social media concept: one month's direction, its themes and a week of
 * planned posts with their review status. Fictional content, no
 * engagement figures.
 */
import { computed } from 'vue'
import { useCopy } from '~/i18n'

const t = useCopy('services')
const v = computed(() => t.value.pages.social_media.visual)
const statusTone = ['ok', 'warn', 'plain', 'ok', 'warn']
</script>

<template>
  <figure class="ui scal">
    <div class="scal__head">
      <div>
        <div class="ui-label">{{ v.month }}</div>
        <div class="scal__title">{{ v.direction }}</div>
      </div>
      <span class="ui-badge ui-badge--plain">{{ t.shared.concept }}</span>
    </div>
    <div class="scal__themes">
      <span class="ui-label">{{ v.themes }}</span>
      <ul>
        <li v-for="(theme, i) in v.themeList" :key="theme" :class="`scal__theme--${i}`">
          {{ theme }}
        </li>
      </ul>
    </div>
    <ol class="scal__week">
      <li v-for="(post, i) in v.posts" :key="post.title" class="scal__day">
        <span class="scal__dow">{{ v.days[i] }}</span>
        <div class="scal__post" :class="`scal__post--${i % 3}`">
          <span class="scal__thumb" aria-hidden="true" />
          <span class="scal__type">{{ post.type }}</span>
          <span class="scal__post-title">{{ post.title }}</span>
          <span class="ui-badge" :class="`ui-badge--${statusTone[i]}`">{{ post.status }}</span>
        </div>
      </li>
    </ol>
    <figcaption class="scal__caption">{{ v.label }}</figcaption>
  </figure>
</template>

<style scoped>
.scal {
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
.scal__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.scal__title {
  font-size: 17px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.scal__themes {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 14px;
  background: var(--sm-surface-subtle);
}
.scal__themes ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.scal__themes li {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: var(--sm-text-2);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
}
.scal__themes li::before {
  content: '';
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 6px;
  border-radius: 50%;
  background: var(--sm-primary);
}
.scal__themes .scal__theme--1::before {
  background: var(--sm-accent);
}
.scal__themes .scal__theme--2::before {
  background: var(--sm-tech);
}
.scal__week {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
}
.scal__day {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}
.scal__dow {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--sm-muted);
}
.scal__post {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 8px;
  border-radius: 12px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.scal__thumb {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--sm-primary-100), var(--sm-primary-200));
}
.scal__post--1 .scal__thumb {
  background: linear-gradient(135deg, rgba(0, 152, 247, 0.18), rgba(6, 200, 245, 0.35));
}
.scal__post--2 .scal__thumb {
  background: linear-gradient(135deg, var(--sm-surface-hover), var(--sm-border-2));
}
.scal__type {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--sm-primary-ink);
}
.scal__post-title {
  font-size: 12px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--sm-text);
}
.scal__post .ui-badge {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.scal__caption {
  font-size: 12px;
  color: var(--sm-muted);
}
@media (max-width: 560px) {
  .scal__week {
    grid-template-columns: minmax(0, 1fr);
  }
  .scal__day {
    flex-direction: row;
    align-items: stretch;
    gap: 10px;
  }
  .scal__dow {
    width: 32px;
    padding-top: 10px;
  }
  .scal__post {
    flex: 1;
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr) auto;
    grid-template-areas:
      'thumb type badge'
      'thumb title badge';
    align-items: center;
    column-gap: 10px;
    row-gap: 2px;
  }
  .scal__thumb {
    grid-area: thumb;
  }
  .scal__type {
    grid-area: type;
  }
  .scal__post-title {
    grid-area: title;
  }
  .scal__post .ui-badge {
    grid-area: badge;
  }
}
</style>
