// to achieve naming consistency throughout the extension
// we recommend this to be defined on a config file and exported
// so that the developer can import it wherever it needs to be used
export const PRODUCT_NAME = 'sentry';
export const K8S_RESOURCE_NAME = 'configurations.sentry.rancher.io';
export const CUSTOM_PAGE_NAME = 'config';
export const BLANK_CLUSTER = '_';
export const SENTRY_CRD = {
  apiVersion: 'apiextensions.k8s.io/v1',
  kind:       'CustomResourceDefinition',
  metadata:   { name: 'configurations.sentry.rancher.io' },
  spec:       {
    group:    'sentry.rancher.io',
    versions: [
      {
        name:    'v1beta1',
        served:  true,
        storage: true,
        schema:  {
          openAPIV3Schema: {
            type:       'object',
            properties: {
              spec: {
                type:       'object',
                properties: {
                  url:          { type: 'string' },
                  serviceToken: { type: 'string' },
                  apiToken:     { type: 'string' },
                },
              },
            },
          },
        },
      },
    ],
    scope: 'Namespaced',
    names: {
      plural:   'configurations',
      singular: 'configuration',
      kind:     'Configuration',
      listKind: 'ConfigurationList',
    },
  },
};
