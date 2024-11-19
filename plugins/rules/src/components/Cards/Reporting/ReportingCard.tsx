import React from 'react';

import { Button, Card, CardActions, CardContent } from '@material-ui/core';
import {
  Chart,
  ChartGroup,
  ChartLine,
  ChartVoronoiContainer,
} from '@patternfly/react-charts';
import { CodeEditor } from '@patternfly/react-code-editor';
import { Modal, ModalVariant } from '@patternfly/react-core';

import { CardResult } from '../../../api';
import { darkStyles, ReportingData } from './types';

type Props = {
  scorecard: CardResult;
  measureValue: ReportingData;
};

export const ReportingCard = ({ scorecard, measureValue }: Props) => {
  const [isSourceModalOpen, setIsSourceModalOpen] = React.useState(false);
  const handleSourceModalToggle = (
    _event: KeyboardEvent | React.MouseEvent,
  ) => {
    setIsSourceModalOpen(!isSourceModalOpen);
  };

  return (
    <Card style={{ height: '100%', width: '100%' }}>
      <CardContent>
        <b>{scorecard.measureName}</b>

        <div className="pf-v5-theme-dark">
          <Modal
            className="pf-v5-theme-dark"
            variant={ModalVariant.medium}
            title={scorecard.measureName}
            isOpen={isSourceModalOpen}
            onClose={handleSourceModalToggle}
            actions={[]}
          >
            <CodeEditor
              height="400px"
              isDarkTheme
              readOnly
              code={scorecard.yaml}
              contentEditable={false}
            />
          </Modal>
        </div>

        <div style={darkStyles}>
          <Chart
            ariaDesc="Data over time."
            ariaTitle="Data"
            containerComponent={
              <ChartVoronoiContainer
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                constrainToVisibleArea
              />
            }
            legendOrientation="vertical"
            legendPosition="right"
            height={280}
            maxDomain={{ y: measureValue.maxValue }}
            minDomain={{ y: measureValue.minValue }}
            name="chart1"
            padding={{
              bottom: 30,
              left: 50,
              right: 40, // Adjusted to accommodate legend
              top: 20,
            }}
            width={600}
          >
            <ChartGroup>
              {Array.from(measureValue.data.values()).map(g => (
                <ChartLine data={g} />
              ))}
            </ChartGroup>
          </Chart>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleSourceModalToggle}>
          Source
        </Button>
      </CardActions>
    </Card>
  );
};
