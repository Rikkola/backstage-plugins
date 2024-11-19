import { ChartData, ReportingData } from './types';

export class ChartDataFormer {
  result = new Map<string, ChartData[]>();
  max: number = 0;
  min: number = 0;

  formReportingDataFromMap(measureValue: Map<any, number>): ReportingData {
    this.result.set('Value', []);

    Object.keys(measureValue).forEach(key => {
      this.manageDataItem(key, measureValue[key]);
    });

    return {
      data: this.result,
      minValue: this.min,
      maxValue: this.max,
    };
  }

  formReportingDataFromList(measureValue: []): ReportingData {
    let i = 0;

    this.result.set('Value', []);
    measureValue.forEach(value => {
      this.manageDataItem(i++, value);
    });

    return {
      data: this.result,
      minValue: this.min,
      maxValue: this.max,
    };
  }

  private manageDataItem(key: any, value: number) {
    const numberValue = Number(value);

    this.result.get('Value')?.push({
      name: 'Value',
      x: key,
      y: numberValue,
    });
    if (this.max < numberValue) {
      this.max = numberValue;
    }
    if (this.min > numberValue) {
      this.min = numberValue;
    }
  }
}
