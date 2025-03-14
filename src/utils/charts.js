import * as echarts from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';
import { TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([BarChart, PieChart, TooltipComponent, GridComponent, CanvasRenderer]);

export const createBarChart = (el, data) => {
  const chart = echarts.init(el);
  const option = {
    xAxis: {
      type: 'category',
      data: data.map(item => item.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: data.map(item => item.value),
      type: 'bar'
    }]
  };
  chart.setOption(option);
  return chart;
};

export const createPieChart = (el, data) => {
  const chart = echarts.init(el);
  const option = {
    series: [{
      type: 'pie',
      radius: '50%',
      data: data.map(item => ({ value: item.value, name: item.name }))
    }]
  };
  chart.setOption(option);
  return chart;
};
