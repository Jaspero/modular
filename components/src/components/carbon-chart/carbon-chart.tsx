import {Component, Element, Event, EventEmitter, h, Host, Method, Prop, State} from '@stencil/core';
import {Chart, registerables} from 'chart.js';

export interface CarbonChartOptions {
  value?: {
    data: number[];
    labels: string[];
  };
  label?: string;
}

@Component({
  tag: 'carbon-chart',
  styleUrl: 'carbon-chart.css'
})
export class CarbonChart {

  chartInstance: Chart;

  @State() options: CarbonChartOptions = {};

  @Prop() value: {
    data: number[],
    labels: string[]
  } = this.options?.value;

  @Event({
    eventName: 'value',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Element()
  private element: HTMLElement;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  @Method()
  setOptions(options: CarbonChartOptions) {
    this.options = options;
  }

  @Method()
  setValue(value: any) {
    this.value = value;
  }

  handleChange(event) {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
    this.chartInstance.data.labels = this.value.labels;
    this.chartInstance.data.datasets[0].data = this.value.data;
  }

  componentDidLoad() {

    Chart.register(...registerables);

    this.canvas = this.element.querySelector('canvas');
    this.canvas.width = 400;
    this.canvas.height = 300;

    this.context = this.canvas.getContext('2d');

    const chartOptions: any = {
      type: 'line',
      data: {
        labels: this.value?.labels || [],
        datasets: [{
          label: this.options?.label,
          // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          data: this.value?.data || [],
          backgroundColor: [
            'rgba(0, 163, 218, 1.0)',
            'rgba(54, 162, 235, 1.0)',
            'rgba(255, 206, 86, 1.0)',
            'rgba(75, 192, 192, 1.0)',
            'rgba(153, 102, 255, 1.0)',
            'rgba(255, 159, 64, 1.0)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        animation: {
          duration: 0
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };

    this.chartInstance = new Chart(this.context, chartOptions);
  }

  render() {
    return (
      <Host>
        <div style={{position: 'relative', height: '65vh', width: '100%'}}>
          <canvas width="400" height="300"/>
        </div>
      </Host>
    );
  }
}
