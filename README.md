# Datadog Plugin for Backstage

![preview of Datadog Widget](https://raw.githubusercontent.com/RoadieHQ/backstage-plugin-datadog/main/docs/datadog-widget.png)

<!-- [https://roadie.io/backstage/plugins/datadog](https://roadie.io/backstage/plugins/datadog) -->

## Features

- Embed public shared dashboard or screenboard
- Embed shared graph

## How to add datadog project dependency to Backstage app

If you have your own backstage application without this plugin, here it's how to add it:

1. In the `backstage/packages/app` project add the plugin as a `package.json` dependency:

```bash
yarn add @roadiehq/backstage-plugin-datadog
```

2. Add plugin to the list of plugins:

```ts
// packages/app/src/plugins.ts
export { plugin as Datadog } from '@roadiehq/backstage-plugin-datadog';
```

4. Add plugin to the `entityPage.tsx` source file:

```tsx
// packages/app/src/components/catalog/EntityPage.tsx
import {
  Router as DatadogRouter,
  GraphWidget as DatadogGraphWidget,
  isGraphAnnotation as isDatadogWidgetAvailable,
} from '@roadiehq/backstage-plugin-datadog';

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

...
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

## How to use datadog plugin in Backstage

The datadog plugin is a part of the Backstage sample app. To start using it for your component, you have to:

1. Add an annotation to the YAML config file of a component.
   - To display a dashboard/screenboard you have to paste its whole embed url:
     ```yml
     datadog/graph-url: <graph-url>
     ```
   - To display an embeddable graph as a widget you have to  paste its embed token from the share url:
     ```yml
     argo-cd/graph-token: <graph-token>
     ```
   - You can set the embeddable graph to any of the sizes provided by the datadog (defaults to 'medium' if not set):
     ```yml
     argo-cd/graph-size: 'small' | 'medium' | 'large' | 'x-large'
     ```

## Develop plugin locally

You can clone the plugin repo into the `plugins/` directory:

```sh
git clone https://github.com/RoadieHQ/backstage-plugin-datadog.git datadog
```

and run `yarn` in the root backstage directory - it will create a symbolic link so the dependency will be provided from the source code instead of node_modules package.

## Links

- [Backstage](https://backstage.io)
<!-- - [Further instructons](https://roadie.io/backstage/plugins/datadog/) -->
- Get hosted, managed Backstage for your company: https://roadie.io
