import { IPlugin } from '@shell/core/types';
import { PRODUCT_NAME, BLANK_CLUSTER, CUSTOM_PAGE_NAME, K8S_RESOURCE_NAME } from './types/sentry';

export function init($plugin: IPlugin, store: any) {
  const { 
    product,
    virtualType,
    basicType
  } = $plugin.DSL(store, PRODUCT_NAME);

  // registering a top-level product
  product({
    icon: 'trash',
    inStore: 'management',
    weight: 100,
    to: {
      name: `${ PRODUCT_NAME }-c-cluster-${ CUSTOM_PAGE_NAME }`,
      params: {
        product: PRODUCT_NAME,
        cluster: BLANK_CLUSTER
      }
    }
  });

  // creating a custom page
  virtualType({
    labelKey: 'some.translation.key',
    name:     CUSTOM_PAGE_NAME,
    route:    {
      name:   `${ PRODUCT_NAME }-c-cluster-${ CUSTOM_PAGE_NAME }`,
      params: {
        product: PRODUCT_NAME,
        cluster: BLANK_CLUSTER
      }
    }
  });

  // registering the defined pages as side-menu entries
  basicType([K8S_RESOURCE_NAME]);
}
