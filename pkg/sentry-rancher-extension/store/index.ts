import { CoreStoreConfig, CoreStoreSpecifics } from '@rancher/shell/core/types';
import { PRODUCT_NAME } from '../types/sentry';

const factory = (config: any): CoreStoreSpecifics => ({
  state: () => ({ ...config }),
  getters: { },
  mutations: {
    setCrd: (state: any, config: { dsn: string, target: string }) => (state.config = config)
  },
  actions: {
    setCrd: ({ commit }: any, crd: boolean) => commit('setCrd', crd),
    setConfig: ({ commit }: any, config: { dsn: string, target: string }) => commit('setCrd', config)
  },
});

export default {
  specifics: factory({
    crd: false,
    dsn: process.env.VUE_APP_SENTRY_DSN,
    target: process.env.VUE_APP_SENTRY_TARGET,
  }),
  config: { namespace: PRODUCT_NAME } as CoreStoreConfig,
};
