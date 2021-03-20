# [Datadog Plugin for Backstage](https://roadie.io/backstage/plugins/)

With this plugin, you can embed Datadog graphs and dashboards into your instance of Backstage.

Datadog is a monitoring service for cloud-scale applications, providing monitoring of servers, databases, tools, and services through a SaaS-based data analytics platform. 

This readme will show you how to 

* Setup and integrate the plugin into Backstage.
* Obtain the dashboard URL and graph tokens from Datadog that you will need for your metadata. 
* Adding the annotations and the values from Datadog to your component's metadata file.

## Setup and integrate the plugin into Backstage.

1. In the [packages/app](https://github.com/backstage/backstage/blob/master/packages/app/) directory of your backstage instance, add the plugin as a package.json dependency:

```shell
$ yarn add @roadiehq/backstage-plugin-datadog
```
2. export the plugin in your app's [plugins.ts](https://github.com/backstage/backstage/blob/master/packages/app/src/plugins.ts) to enable the plugin:
```ts
export { plugin as Datadog } from '@roadiehq/backstage-plugin-datadog';
```

3. import the plugin to the [entityPage.tsx](https://github.com/backstage/backstage/blob/master/packages/app/src/components/catalog/EntityPage.tsx) source file:

```tsx
import {
  Router as DatadogRouter,
  GraphWidget as DatadogGraphWidget,
  isDatadogGraphAvailable as isDatadogWidgetAvailable,
} from '@roadiehq/backstage-plugin-datadog';
```

4. Add a Datadog card to the overview tab to the [entityPage.tsx](https://github.com/backstage/backstage/blob/master/packages/app/src/components/catalog/EntityPage.tsx) source file:

```tsx
const OverviewContent = ({ entity }: { entity: Entity }) => (
  <Grid container spacing={3} alignItems="stretch">
    ...
    {isDatadogWidgetAvailable(entity) && (
      <Grid item>
        <DatadogGraphWidget entity={entity} />
      </Grid>
    )}
    ...
  </Grid>
);
```

5. Add a Datadog tab to the [entityPage.tsx](https://github.com/backstage/backstage/blob/master/packages/app/src/components/catalog/EntityPage.tsx) source file:

```tsx
const ServiceEntityPage = ({ entity }: { entity: Entity }) => (
  <EntityPageLayout>
    <EntityPageLayout.Content
      path="/datadog/*"
      title="datadog"
      element={<DatadogRouter entity={entity} />}
    />
  </EntityPageLayout>
)
```

## Obtain the dashboard URL and graph tokens from Datadog that you will need for your metadata. 

* Login to your Datadog account.

### To get the dashboard URL.

* Navigate to the dashboards list by hovering over dashboards on the page's left-hand side and selecting the dashboard list.

* Select a dashboard from this list.

* Within the dashboard you have chosen, click the settings cog on the screen's right-hand side, circled in red.

![dashboard](./docs/dd-dashboard.png?raw=true)


* Copy the URL from the Sharing textbox.

* This URL is the value you need for the `datadoghq.com/dashboard-url` annotation.

![dashboard share](./docs/dd-dashboard-share.png?raw=true)


### To get the graph token.

* Click on the graph pencil, circled in red, from your dashboard.

![dashboard](./docs/dd-dashboard-2.png?raw=true)

* Click on the Share tab, choose a timeframe, graph size and legend. Click generate the embedded code. 

* Copy the token value that is circled in red.

* this token is the value you need for the `datadoghq.com/graph-token` annotation

![dashboard](./docs/dd-graph-share.png?raw=true)

## Adding the annotations and the values from Datadog to your component's metadata file.

1. Datadog dashboard.

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: sample-service
  description: |
    A sample service
  annotations:
    datadoghq.com/dashboard-url: <<DATADOGURL>>
```

2. Datadog graph.

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: sample-service
  description: |
    A sample service
  annotations:
    datadoghq.com/graph-token: <<TOKEN>
```

## What it looks like

### For the dashboard

Navigate to the Datadog tab, and you will see your dashboard.
![dashboard share](./docs/dd-backstage-tab.png?raw=true)

### For the graph

Navigate to the overview tab for your component. And you will see the graph.
![dashboard share](./docs/dd-graph-overview.png?raw=true)

## Contributing

Everyone is welcome to contribute to this repository. Feel free to raise [issues](https://github.com/RoadieHQ/backstage-plugin-datadog/issues) or to submit [Pull Requests](https://github.com/RoadieHQ/backstage-plugin-datadog/pulls).


Join us on Discord.

[![Join our Discord server!](https://invidget.switchblade.xyz/chuePWkM?theme=light)](https://discord.gg/chuePWkM)


## Links

- [Backstage](https://backstage.io)
<!-- - [Further instructons](https://roadie.io/backstage/plugins/datadog/) -->
- Get hosted, managed Backstage for your company: https://roadie.io