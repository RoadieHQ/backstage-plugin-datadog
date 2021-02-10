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
import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Entity } from '@backstage/catalog-model';
import { MissingAnnotationEmptyState } from '@backstage/core';
import ErrorBoundary from './ErrorBoundary';
import { isDatadogGraphAvailable } from '../Router';
import {
  DATADOG_ANNOTATION_GRAPH_TOKEN,
  GraphSize,
  useDatadogAppData,
} from './useDatadogAppData';

const mapGraphSizeToDimensions = (graphSize: GraphSize) => {
  switch (graphSize) {
    case 'small':
      return { width: 400, height: 200 };
    case 'medium':
      return { width: 600, height: 300 };
    case 'large':
      return { width: 800, height: 400 };
    case 'x-large':
      return { width: 1000, height: 500 };
    default:
      return { width: 600, height: 300 };
  }
};

const DatadogGraph = ({ entity }: { entity: Entity }) => {
  const { graphToken, graphSize } = useDatadogAppData({ entity });
  const { width, height } = mapGraphSizeToDimensions(graphSize);
  return (
    <Card>
      <CardHeader title={<Typography variant="h5">Datadog</Typography>} />
      <CardContent>
        <iframe
          title="graph"
          src={`https://app.datadoghq.eu/graph/embed?token=${graphToken}&height=${height}&width=${width}&legend=true`}
          width={width}
          height={height}
          frameBorder="0"
        />
      </CardContent>
    </Card>
  );
};

/**
 * @deprecated since v0.2.0 you should use new composability API
 */
export const GraphWidget = ({ entity }: { entity: Entity }) => {
  return !isDatadogGraphAvailable(entity) ? (
    <MissingAnnotationEmptyState annotation={DATADOG_ANNOTATION_GRAPH_TOKEN} />
  ) : (
    <ErrorBoundary>
      <DatadogGraph entity={entity} />
    </ErrorBoundary>
  );
};
