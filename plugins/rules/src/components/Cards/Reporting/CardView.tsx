import React from 'react';

import { CardResult, ScoreMeasureValue } from '../../../api/types';
import { ChartDataFormer } from './ChartDataFormer';
import { ReportingCard } from './ReportingCard';
import { ScorecardCard } from './ScorecardCard';

type Props = {
  scorecard: CardResult;
};

enum Type {
  SCORE,
  LIST,
  MAP,
  VALUE,
}

function getType(x: any): Type {
  if ('score' in x) {
    return Type.SCORE;
  } else if (Array.isArray(x)) {
    return Type.LIST;
  } else if (x instanceof Map) {
    return Type.MAP;
  }
  return Type.VALUE;
}

export const CardView = ({ scorecard }: Props) => {
  const measureValue = scorecard.measureValue;

  switch (getType(measureValue)) {
    case Type.SCORE:
      return (
        <ScorecardCard
          scorecard={scorecard}
          measureValue={measureValue as ScoreMeasureValue}
        />
      );
    case Type.LIST:
      return (
        <ReportingCard
          scorecard={scorecard}
          measureValue={new ChartDataFormer().formReportingDataFromList(
            measureValue as [],
          )}
        />
      );
    default:
      return (
        <ReportingCard
          scorecard={scorecard}
          measureValue={new ChartDataFormer().formReportingDataFromMap(
            measureValue,
          )}
        />
      );
  }
};
