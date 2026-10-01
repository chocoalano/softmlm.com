<script setup lang="ts">
/**
 * The cookies the site sets, by purpose (Privacy Notice). The names are
 * listed in a small second line for those who look them up in the browser;
 * keep them in step with config/marketing_tracking.ts, shared/locales.ts
 * and config/session.ts.
 */
import { useCopy } from '~/i18n'

const t = useCopy('legal')
</script>

<template>
  <div class="ckt">
    <table>
      <caption>
        {{
          t.cookies.caption
        }}
      </caption>
      <thead>
        <tr>
          <th scope="col">{{ t.cookies.headers.name }}</th>
          <th scope="col">{{ t.cookies.headers.purpose }}</th>
          <th scope="col">{{ t.cookies.headers.duration }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in t.cookies.rows" :key="row.cookies">
          <th scope="row">
            {{ row.name }}
            <code>{{ row.cookies }}</code>
          </th>
          <td :data-label="t.cookies.headers.purpose">{{ row.purpose }}</td>
          <td :data-label="t.cookies.headers.duration">{{ row.duration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.ckt {
  border: 1px solid var(--sm-border);
  border-radius: var(--sm-r-md);
  overflow: hidden;
  background: var(--sm-surface);
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  line-height: 1.55;
}
caption {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
thead th {
  text-align: left;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-muted);
  background: var(--sm-surface-subtle);
  padding: 12px 16px;
}
tbody th,
tbody td {
  vertical-align: top;
  padding: 14px 16px;
  border-top: 1px solid var(--sm-border);
  color: var(--sm-text-2);
}
tbody th {
  text-align: left;
  font-weight: 600;
  color: var(--sm-text);
  width: 28%;
}
code {
  display: block;
  margin-top: 4px;
  font-family: var(--sm-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--sm-subtle);
  overflow-wrap: anywhere;
}
tbody td:last-child {
  width: 24%;
}

@media (max-width: 640px) {
  thead {
    display: none;
  }
  tbody tr {
    display: block;
    border-top: 1px solid var(--sm-border);
    padding: 14px 16px;
  }
  tbody tr:first-child {
    border-top: 0;
  }
  tbody th,
  tbody td {
    display: block;
    width: auto;
    padding: 0;
    border: 0;
  }
  tbody td,
  tbody td:last-child {
    width: auto;
    margin-top: 8px;
  }
  tbody td::before {
    content: attr(data-label);
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--sm-muted);
  }
}
</style>
