import { ChartDataFormer } from './ChartDataFormer';
import { ChartData } from './types';

describe('Data forming Test', () => {
  it('Should return data from list', () => {
    const list: any = [1, 4, -10, 3, 4];
    const data = new ChartDataFormer().formReportingDataFromList(list);

    expect(data.data.size).toEqual(1);
    expect(data.maxValue).toEqual(4);
    expect(data.minValue).toEqual(-10);
    const value = data.data.get('Value') as ChartData[];
    expect(value).toEqual([
      { name: 'Value', x: 0, y: 1 },
      { name: 'Value', x: 1, y: 4 },
      { name: 'Value', x: 2, y: -10 },
      { name: 'Value', x: 3, y: 3 },
      { name: 'Value', x: 4, y: 4 },
    ]);
  });

  it('Should return data from map', () => {
    const map = new Map<string, number>();
    map.set('A', 1);
    map.set('B', 10);
    map.set('C', -20);
    map.set('D', 5);

    const data = new ChartDataFormer().formReportingDataFromMap(map);

    expect(data.data.size).toEqual(1);
    expect(data.maxValue).toEqual(10);
    expect(data.minValue).toEqual(-20);
    const value = data.data.get('Value') as ChartData[];
    expect(value).toEqual([
      { name: 'Value', x: 'A', y: 1 },
      { name: 'Value', x: 'B', y: 10 },
      { name: 'Value', x: 'C', y: -20 },
      { name: 'Value', x: 'D', y: 5 },
    ]);
  });
});
