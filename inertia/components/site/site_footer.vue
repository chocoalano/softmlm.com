<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUp } from 'lucide-vue-next'
import Logo from '~/components/logo.vue'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import type { WhatsappContext } from '@shared/whatsapp'
import { WHO_WE_SERVE_PATH } from '@shared/personas'
import { FEATURES_PATH, featurePath, findFeature } from '@shared/features'
import { HOW_WE_DO_IT_PATH } from '@shared/implementation'
import { INTEGRATIONS_PATH } from '@shared/integrations'
import { SERVICES_PATH, servicePath, services } from '@shared/services'
import { useCopy, useI18n } from '~/i18n'
import { useLeadTarget } from '~/composables/lead_target'

withDefaults(defineProps<{ trackingPage?: string; context?: WhatsappContext }>(), {
  trackingPage: 'homepage',
  context: 'general',
})

const t = useCopy('common')
const { lp } = useI18n()
const leadTarget = useLeadTarget()

const columns = computed(() => {
  const links = t.value.footer.links
  const nav = t.value.nav
  return [
    {
      title: t.value.footer.platform,
      links: [
        { label: links.overview, href: lp('/#platform') },
        { label: links.commandCenter, href: lp('/#command-center') },
        { label: links.network, href: lp('/#network') },
        { label: links.intelligence, href: lp('/#ai') },
        { label: links.distributorExperience, href: lp(`${WHO_WE_SERVE_PATH}/distributors`) },
      ],
    },
    {
      title: t.value.footer.features,
      links: [
        { label: nav.featureLinks.compensation.label, href: lp('/compensation-plans') },
        { label: nav.featureLinks.network.label, href: lp(featurePath(findFeature('network'))) },
        {
          label: nav.featureLinks.ecommerce.label,
          href: lp(featurePath(findFeature('ecommerce'))),
        },
        { label: nav.featureLinks.wallet.label, href: lp(featurePath(findFeature('wallet'))) },
        { label: nav.featureLinks.integrations.label, href: lp(INTEGRATIONS_PATH) },
        { label: nav.allFeatures.title, href: lp(FEATURES_PATH) },
      ],
    },
    {
      title: t.value.footer.services,
      links: [
        ...services.map((service) => ({
          label: nav.serviceLinks[service.key].label,
          href: lp(servicePath(service)),
        })),
        { label: links.servicesOverview, href: lp(SERVICES_PATH) },
      ],
    },
    {
      title: t.value.footer.company,
      links: [
        { label: links.whoWeServe, href: lp(WHO_WE_SERVE_PATH) },
        { label: links.implementation, href: lp(HOW_WE_DO_IT_PATH) },
        { label: links.security, href: lp('/#security') },
        { label: links.pricing, href: lp('/pricing') },
        { label: links.faq, href: lp('/#faq') },
        { label: leadTarget.label.value, href: leadTarget.href },
      ],
    },
  ]
})

const year = new Date().getFullYear()
</script>

<template>
  <footer class="ftr">
    <div class="sm-container">
      <div class="ftr__top">
        <div class="ftr__brand">
          <Logo :size="56" wordmark tagline :href="lp('/')" :label="t.brand.homeLabel" />
          <p>{{ t.brand.tagline }}</p>
          <div class="ftr__ctas">
            <MarketingWhatsappCta
              :context="context"
              :page="trackingPage"
              section="footer"
              variant="primary"
              size="sm"
            />
            <a :href="leadTarget.href" class="sm-link ftr__demo">{{ leadTarget.label.value }}</a>
          </div>
        </div>
        <nav
          v-for="column in columns"
          :key="column.title"
          class="ftr__col"
          :aria-label="column.title"
        >
          <p class="ftr__title">{{ column.title }}</p>
          <ul>
            <li v-for="link in column.links" :key="link.label + link.href">
              <a :href="link.href">{{ link.label }}</a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="ftr__bottom">
        <span>© {{ year }} mlmsoft. {{ t.brand.rights }}</span>
        <span class="ftr__bottom-links">
          <a href="/login" class="ftr__staff">{{ t.footer.staffLogin }}</a>
          <a href="#top" class="ftr__top-link">{{ t.footer.backToTop }} <ArrowUp :size="14" /></a>
        </span>
      </div>
    </div>
    <div class="ftr__word" aria-hidden="true">mlmsoft</div>
  </footer>
</template>

<style scoped>
.ftr {
  position: relative;
  overflow: hidden;
  padding-top: clamp(64px, 8vw, 104px);
  background: var(--sm-surface-subtle);
  border-top: 1px solid var(--sm-border);
}
.ftr__top {
  display: grid;
  grid-template-columns: 1.5fr repeat(4, 1fr);
  gap: 40px 32px;
}
.ftr__brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  max-width: 320px;
}
.ftr__brand p {
  font-size: 15px;
  line-height: 1.6;
  color: var(--sm-muted);
}
.ftr__title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-text);
  margin-bottom: 16px;
}
.ftr__ctas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 18px;
}
.ftr__demo {
  font-size: 14.5px;
  color: var(--sm-text-2);
}
.ftr__bottom-links {
  display: inline-flex;
  gap: 20px;
}
.ftr__staff {
  color: var(--sm-subtle);
}
.ftr__staff:hover {
  color: var(--sm-text-2);
}
.ftr__col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.ftr__col a {
  display: inline-block;
  padding: 4px 0;
  font-size: 15px;
  color: var(--sm-muted);
  transition: color 0.15s;
}
.ftr__col a:hover {
  color: var(--sm-primary-ink);
}
.ftr__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  margin-top: 64px;
  padding: 24px 0;
  border-top: 1px solid var(--sm-border);
  font-size: 14px;
  color: var(--sm-muted);
}
.ftr__top-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  color: var(--sm-text-2);
}
.ftr__top-link:hover {
  color: var(--sm-primary-ink);
}
.ftr__word {
  font-family: var(--sm-display);
  font-weight: 800;
  font-size: clamp(88px, 19vw, 300px);
  line-height: 0.8;
  letter-spacing: -0.06em;
  text-align: center;
  white-space: nowrap;
  margin-bottom: -0.12em;
  background: linear-gradient(180deg, rgba(0, 93, 251, 0.14), rgba(0, 93, 251, 0));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  user-select: none;
}

@media (max-width: 1080px) {
  .ftr__top {
    grid-template-columns: repeat(2, 1fr);
  }
  .ftr__brand {
    grid-column: 1 / -1;
  }
}
</style>
