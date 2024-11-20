import { CoreStoreConfig, CoreStoreSpecifics } from '@rancher/shell/core/types';
import { PRODUCT_NAME } from '../types/sentry';

const factory = (config: any): CoreStoreSpecifics => ({
  state: () => ({ ...config }),
  getters: { },
  mutations: {
    setRepo: (state: any, repo: boolean) => (state.repo = repo),
    setCrd: (state: any, config: { dsn: string, target: string }) => (state.config = config)
  },
  actions: {
    setRepo: ({ commit }: any, repo: boolean) => commit('setRepo', repo),
    setCrd: ({ commit }: any, crd: boolean) => commit('setCrd', crd),
    setConfig: ({ commit }: any, config: { dsn: string, target: string }) => commit('setCrd', config)
  },
});

export default {
  specifics: factory({
    crd: false,
    repo: null,
    dsn: process.env.VUE_APP_SENTRY_DSN,
    target: process.env.VUE_APP_SENTRY_TARGET,
  }),
  config: { namespace: PRODUCT_NAME } as CoreStoreConfig,
};
