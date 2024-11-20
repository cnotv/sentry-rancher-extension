<script>
import AsyncButton from '@shell/components/AsyncButton.vue';
import LabeledInput from '@components/Form/LabeledInput/LabeledInput.vue';
import InstallView from '../components/InstallView';
import { mapState } from 'vuex';
import { SENTRY_CONFIGURATION_TYPE } from '../types/sentry';

export default {
  name: 'SentryConfig',
  layout: 'plain',
  components: {
    InstallView,
    LabeledInput,
    AsyncButton,
  },
  inheritAttrs: false,
  data() {
    const { dsn, target } = this.$store.getters['sentry/config'];
    return {
      dsn,
      target,
    };
  },
  async fetch() {
    const schema = this.$store.getters['management/schemaFor'](SENTRY_CONFIGURATION_TYPE);
    // Set resource if missing
    if (schema) {
      await this.$store.dispatch('sentry/setCrd', true);
    } else {
      // Set existing settings if missing
      const settings = await this.$store.dispatch('management/findAll', { type: SENTRY_CONFIGURATION_TYPE });
      if (settings) {
        const config = settings.find((setting) => (setting.metadata.name = 'sentry')).spec;
        await this.$store.dispatch('sentry/setConfig', config);
      }
    }
  },
  computed: {
    ...mapState('sentry', ['crd']),
  },
  methods: {
    async onSave(btnCb) {
      const k8sConfig = {
        metadata: { name: `sentry`, namespace: 'default' },
        spec:     {},
        type:     SENTRY_CONFIGURATION_TYPE,
      };
      const config = {
        dsn: this.dsn,
        target: this.target,
      }
      const settings = await this.$store.dispatch('management/findAll', { type: SENTRY_CONFIGURATION_TYPE });
      const steveModel = settings ?
        settings.find(setting => (setting.metadata.name = 'sentry')) :
        await this.$store.dispatch('management/create', k8sConfig);

      steveModel.spec = config
      steveModel.save();

      await this.$store.dispatch('sentry/setConfig', config);

      btnCb(true);
    }
  },
};

</script>
<template>
  <InstallView v-if="!crd" />

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

  <br>

  <AsyncButton @click="onSave">{{ t('sentry.edit.button') }}</AsyncButton>
</template>

