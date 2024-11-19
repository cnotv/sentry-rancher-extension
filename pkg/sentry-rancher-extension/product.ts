import { IPlugin } from '@shell/core/types';

enum Product {
  name = 'sentry' // eslint-disable-line no-unused-vars
}

export const NAME = 'sentry';

export function init($plugin: IPlugin, store: any) {
  const {
    product,
  } = $plugin.DSL(store, Product.name);

  // registering a cluster-level product
  product({
    inStore: 'management',
    icon: 'trash',
    label: 'Sentry',
    removable: false,
    showClusterSwitcher: false,
    category: 'global',
    to: { name: 'sentry', params: { cluster: 'local' } }
  } as any);
}
