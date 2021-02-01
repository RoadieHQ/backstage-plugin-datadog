import { createApiRef, DiscoveryApi } from '@backstage/core';

export const datadogApiRef = createApiRef<DatadogApi>({
  id: 'plugin.datadog.service',
  description: 'Used by the Datadog plugin to make requests',
});

export interface DatadogApi {}

export type Options = {
  discoveryApi: DiscoveryApi;
  proxyPath?: string;
};

export class DatadogApiClient implements DatadogApi {
  private readonly discoveryApi: DiscoveryApi;

  constructor(options: Options) {
    this.discoveryApi = options.discoveryApi;
  }

  private async getProxyUrl() {
    return await this.discoveryApi.getBaseUrl('proxy');
  }
}
