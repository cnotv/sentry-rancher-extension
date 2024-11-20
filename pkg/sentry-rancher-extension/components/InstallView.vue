<script>
import Banner from '@components/Banner/Banner';
import { mapState, mapActions } from 'vuex';
import { SENTRY_CRD } from '../types/sentry';

export default {
  name: 'InstallView',
  components: {
    Banner,
  },
  inheritAttrs: false,
  computed: {
    ...mapState('sentry', ['crd']),
    ...mapActions('sentry', ['setCrd']),
  },
  methods: {
    handleGrowl(store, { type, message }) {
      store.dispatch(`growl/${ type }`, {
        title:   'Error',
        message,
        timeout: 5000,
      }, { root: true });
    },

    async install() {
      await this.installCrd();
    },

    async installCrd() {
      if (!this.crd) {
        return;
      }

      try {
        await this.$store.dispatch('management/request', {
          url:    '/v1/apiextensions.k8s.io.customresourcedefinitions',
          method: 'POST',
          data:   SENTRY_CRD,
        });
        
        await this.setCrd(true);
      } catch (err) {
        this.handleGrowl(this.$store, {
          message: `${ this.t('sentry.edit.crd-missing') } ${
            err.message ? `: ${ err.message }` : ''
          }`,
          type: 'error',
        });
      }
    },
  },
};

</script>
<template>
  <Banner class="mt-20 mb-40" color="warning">
    <div class="install-crd">
      <span class="mb-20">{{
        t("sentry.edit.crd-missing")
      }}</span>
      <button class="btn role-primary" @click="install">
        {{ t("sentry.edit.crd-install") }}
      </button>
    </div>
  </Banner>
</template>
