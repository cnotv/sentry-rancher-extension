<script>
import { LabeledInput } from '@components/Form/LabeledInput';
import CruResource from '@shell/components/CruResource';
import CreateEditView from '@shell/mixins/create-edit-view';

export default {
  name: 'SentryConfig',
  layout: 'plain',
  mixins:       [CreateEditView],
  components: {
    CruResource,
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
  <!-- <CruResource
    :can-yaml="!isCreate"
    :mode="mode"
    :resource="value"
    :cancel-event="true"
    @error="e=>errors = e"
    @finish="save"
    @cancel="done()"
  > -->
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
  <!-- </CruResource> -->
</template>

<style lang="scss" scoped>
</style>
