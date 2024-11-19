import React from 'react';

export type ReportingData = {
  data: Map<string, ChartData[]>;
  minValue: number;
  maxValue: number;
};

export interface ChartData {
  name: string;
  y: number;
  x: any;
}

export const darkStyles = {
  '--pf-v5-chart-global--label--Fill': 'white',
} as React.CSSProperties;
