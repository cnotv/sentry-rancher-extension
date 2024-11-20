<script>
import { LabeledInput } from '@components/Form/LabeledInput';
import { InstallView } from '../components/InstallView.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SentryConfig',
  layout: 'plain',
  components: {
    InstallView,
    LabeledInput,
  },
  data: {
    dsn: process.env.VUE_APP_SENTRY_DSN,
    target: process.env.VUE_APP_SENTRY_TARGET,
  },
  methods: {
    async onSave() {
      await setConfig({
        dsn: this.dsn,
        target: this.target,
      });
    }
  },
  computed: {
    ...mapState('sentry', ['crd', 'repo']),
    ...mapActions('sentry', ['setConfig']),
  },
};

</script>
<template>
  <InstallView />

  <h1>{{ t('sentry.edit.title') }}</h1>

  <br>
  <form @submit.prevent="onSave">
    <LabeledInput
      v-model:value="dsn"
      label-key="sentry.edit.dsn-label"
      placeholder-key="sentry.edit.dsn-placeholder"
      type="text"
    />

    <br>

    <LabeledInput
      v-model:value="target"
      label-key="sentry.edit.dsn-label"
      placeholder-key="sentry.edit.dsn-placeholder"
      type="text"
    />

    <button
      type="submit"
      class="btn role-link"
    >{{ t('sentry.edit.button') }}</button>
  </form>
</template>

<style lang="scss" scoped>
</style>
