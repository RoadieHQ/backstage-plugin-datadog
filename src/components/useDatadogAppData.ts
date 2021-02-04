/*
 * Copyright 2020 RoadieHQ
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Entity } from '@backstage/catalog-model';

export const DATADOG_ANNOTATION_DASHBOARD_URL = 'datadog/dashboard-url';
export const DATADOG_ANNOTATION_GRAPH_TOKEN = 'datadog/graph-token';
export const DATADOG_ANNOTATION_GRAPH_SIZE = 'datadog/graph-size';

export type GraphSize = 'small' | 'medium' | 'large' | 'x-large';

export const useDatadogAppData = ({ entity }: { entity: Entity }) => {
  const dashboardUrl =
    entity?.metadata.annotations?.[DATADOG_ANNOTATION_DASHBOARD_URL] ?? '';
  const graphToken =
    entity?.metadata.annotations?.[DATADOG_ANNOTATION_GRAPH_TOKEN] ?? '';
  const graphSize: GraphSize =
    (entity?.metadata.annotations?.[
      DATADOG_ANNOTATION_GRAPH_SIZE
    ] as GraphSize) ?? 'medium';
  if (!dashboardUrl && !graphToken) {
    throw new Error("'datadog' annotation is missing");
  }
  return { dashboardUrl, graphToken, graphSize };
};
