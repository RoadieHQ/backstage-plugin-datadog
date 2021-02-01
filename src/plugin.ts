import {
  createApiFactory,
  createPlugin,
  discoveryApiRef,
} from '@backstage/core';
import { DatadogApiClient, datadogApiRef } from './api';

export const plugin = createPlugin({
  id: 'datadog',
  apis: [
    createApiFactory({
      api: datadogApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }) => new DatadogApiClient({ discoveryApi }),
    }),
  ],
});
