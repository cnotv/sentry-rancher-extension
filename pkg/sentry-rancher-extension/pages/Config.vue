<script>
import { LabeledInput } from '@components/Form/LabeledInput';

export default {
  name: 'SentryConfig',
  layout: 'plain',
  components: {
    LabeledInput,
  },
  data: {
    dsn: process.env.VUE_APP_SENTRY_DSN,
    target: process.env.VUE_APP_SENTRY_TARGET,
  },
  props: {
    value: {
      type:     Object,
      required: true,
      default:  () => {}
    },
    mode: {
      type:     String,
      required: true,
    },
  },
  methods: {
    save() {
      // throw new Error('Not implemented');
      console.log('Save');
    }
  },
};

</script>
<template>
  <h1>{{ t('sentry.edit.title') }}</h1>

  <br>

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
    type="button"
    class="btn role-link"
    @click="save"
  >{{ t('sentry.edit.button') }}</button>
</template>

<style lang="scss" scoped>
</style>
