import { CoreStoreConfig, CoreStoreSpecifics } from '@rancher/shell/core/types';
import { PRODUCT_NAME } from '../types/sentry';

const factory = (factoryConfig: any): CoreStoreSpecifics => ({
  state: () => ({ ...factoryConfig }),
  getters: {
    config: (state: any) => ({ dsn: state.dsn, target: state.target }),
  },
  mutations: {
    setCrd: (state: any, crd: string) => (state.crd = crd),
    setConfig: async (state: any, { dsn, target }: { dsn: string, target: string }) => {
      state.dsn = dsn;
      state.target = target;
    }
  },
  actions: {
    setCrd: ({ commit }: any, crd: boolean) => commit('setCrd', crd),
    setConfig: ({ commit }: any, sentryConfig: { dsn: string, target: string }) => commit('setConfig', sentryConfig)
  },
});

export default {
  specifics: factory({
    crd: false,
    dsn: null,
    target: null,
  }),
  config: { namespace: PRODUCT_NAME } as CoreStoreConfig,
};
