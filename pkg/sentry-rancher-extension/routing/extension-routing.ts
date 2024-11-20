// ./routing/extension-routing.ts
import MyCustomPage from '../pages/Config.vue';
import { PRODUCT_NAME, BLANK_CLUSTER, CUSTOM_PAGE_NAME } from '../types/sentry';

const routes = [
  // this covers the "custom page"
  {
    name:      `${ PRODUCT_NAME }-c-cluster-${ CUSTOM_PAGE_NAME }`,
    path:      `/${ PRODUCT_NAME }/c/:cluster/${ CUSTOM_PAGE_NAME }`,
    component: MyCustomPage,
    meta:      {
      product: PRODUCT_NAME,
      cluster: BLANK_CLUSTER
    },
  },
];

export default routes;
