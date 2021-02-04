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
import { Entity } from '@backstage/catalog-model';
import { Routes, Route } from 'react-router-dom';
import { DatadogDashboardPage } from './components/DatadogDashboardPage';
import {
  DATADOG_ANNOTATION_DASHBOARD_URL,
  DATADOG_ANNOTATION_GRAPH_TOKEN,
} from './components/useDatadogAppData';
import { MissingAnnotationEmptyState } from '@backstage/core';

type Props = { entity: Entity };

export const isDashboardAnnotation = (entity: Entity) =>
  Boolean(entity?.metadata.annotations?.[DATADOG_ANNOTATION_DASHBOARD_URL]);
export const isGraphAnnotation = (entity: Entity) =>
  Boolean(entity?.metadata.annotations?.[DATADOG_ANNOTATION_GRAPH_TOKEN]);
export const isPluginApplicableToEntity = (entity: Entity) =>
  isDashboardAnnotation(entity) || isGraphAnnotation(entity);
export const Router: React.FC<Props> = ({ entity }) =>
  !isDashboardAnnotation(entity) ? (
    <MissingAnnotationEmptyState
      annotation={DATADOG_ANNOTATION_DASHBOARD_URL}
    />
  ) : (
    <Routes>
      <Route path="/" element={<DatadogDashboardPage entity={entity} />} />
    </Routes>
  );
