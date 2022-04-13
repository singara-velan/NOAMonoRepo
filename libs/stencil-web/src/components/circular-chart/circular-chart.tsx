import { Element, Component, h, Prop } from '@stencil/core';
import { select } from 'd3-selection';
import { pie, arc } from 'd3-shape';

@Component({
  tag: 'circular-chart',
  styleUrl: 'circular-chart.css',
  shadow: true,
})
export class CircularChart {
  @Element() element: HTMLElement;
  @Prop() width: number = 170;
  @Prop() height: number = 170;
  @Prop() label: string;
  @Prop() data: string = "[]";
  @Prop() type: string;

  public chartData: any[];
  public total: number;

  constructor() {
    this.initData();
  }

  initData() {
    console.log(this.data);
    this.chartData = typeof this.data === "object" ? this.data : JSON.parse(this.data);
    this.total = this.chartData.reduce((i, d) => (d.value + i), 0);
  }

  componentDidLoad() {
    const svg = select(this.element.shadowRoot.querySelectorAll(".chart")[0])
      .attr("width", this.width)
      .attr("height", this.height);
    this.buildChart(svg);
  }

  buildChart(svg) {
    let radius = Math.min(this.width, this.height) / 2;
    let arcShape = arc().innerRadius(radius * 0.8).outerRadius(radius - 1);

    let pieDataStructure = pie().sort(null).value(d => d.value)(this.chartData);
    
    var group = svg.append("g")
      .attr("transform", `translate(${this.width / 2}, ${this.height / 2})`)
      .attr("stroke", "white");

    group.selectAll("path")
      .data(pieDataStructure)
      .join("path")
      .attr("fill", d => this.getColor(d.data.code))
      .attr("d", arcShape);

    group.append("svg:text")
      .classed('chart-middle-text', true)
      .attr("dy", "0.1em")
      .text(this.total);

    group.append("svg:text")
      .classed('chart-middle-text secondary', true)
      .attr("dy", "1.8em")
      .text(this.label);
  }

  getColor(code: string) :string {
    if(this.type === 'BENCHMARK') {
      return this.getBenchMarkColor(code);
    }
    else {
      //To do Random color based on data length
    }
  }

  getBenchMarkColor(code: string) : string {
    let color: string;
    switch (code) {
      case 'SAME':
        color = '#acc0c4';
        break;
      case 'DIFFERENT':
        color = 'orange';
        break;
      case 'ABOVE':
        color = '#51a98b';
        break;
      case 'BELOW':
        color = 'red';
        break;
      default: 
        color = '#acc0c4';
        break;
    }
    return color;
  }

  getPercentage(value: number) {
    return (value*100/this.total).toFixed(0);
  }

  render() {
    return (
      <div class="container">
        <div><svg class="chart" /></div>
        <div class="legend-container">
          <div class="legend-row header">
            <span>Total {this.label}</span>
            <span class="ml-auto">{this.total}</span>
          </div>
          {this.chartData.map(d => (
            <div class="legend-row">
              <span class="lengend-identifier" style={{ 'backgroundColor': this.getColor(d.code) }} ></span>
              <span>{d.label}</span>
              <span class="ml-auto">{this.getPercentage(d.value)}% | {d.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
