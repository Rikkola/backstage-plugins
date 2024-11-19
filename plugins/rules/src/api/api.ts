import { createApiRef } from '@backstage/core-plugin-api';

import {
  Card,
  CardConfig,
  CardData,
  CardResult,
  Job,
  RawData,
  RawDataDetail,
} from './types';

export interface ScoreCardApi {
  createCard(card: Card, config: CardConfig): Promise<Response>;

  deleteCard(id: number): Promise<Response>;

  getCardData(cardId: number): Promise<CardData>;

  listCardResults(): Promise<{ results: CardResult[] }>;

  listCardResultHistory(cardId: number): Promise<{ results: CardResult[] }>;

  listScoreCards(): Promise<{ results: Card[] }>;

  getJobs(): Promise<{ results: Job[] }>;

  getRawData(jobId: number): Promise<{ results: RawData[] }>;

  getRawDataDetail(
    jobId: number,
    rawDataId: number,
  ): Promise<{ results: RawDataDetail }>;

  testJob(jobId: number): Promise<Response>;

  activate(jobId: number): Promise<Response>;

  deleteJob(jobId: number): Promise<Response>;

  createJob(cron: string, type: string, endpoint: string): Promise<Response>;
}

export const scoreCardApiRef = createApiRef<ScoreCardApi>({
  id: 'plugin.rules.api',
});
