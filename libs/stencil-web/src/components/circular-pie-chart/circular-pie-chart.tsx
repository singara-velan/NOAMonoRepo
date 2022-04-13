import { Element, Component, h, Prop } from '@stencil/core';
import { select } from 'd3-selection';
import { pie, arc } from 'd3-shape';
import * as d3 from 'd3';

@Component({
  tag: 'circular-pie-chart',
  styleUrl: 'circular-pie-chart.css',
  shadow: true,
})
export class CircularPieChart {
  @Element() element: HTMLElement;
  @Prop() width: number = 170;
  @Prop() height: number = 170;
  @Prop() data: string = "[]";
  @Prop() valueType: string;

  public chartData: any[];
  private colors: any;

  constructor() {
    this.initData();
  }

  initData() {
    console.log(this.data);
    this.chartData = typeof this.data === "object" ? this.data : JSON.parse(this.data);

    this.colors = d3.scaleSequential().domain([1, this.chartData.length])
    .interpolator(d3.interpolateViridis);

    console.log(this.colors);
  }

  componentDidLoad() {
    const svg = select(this.element.shadowRoot.querySelectorAll(".chart")[0])
      .attr("width", this.width)
      .attr("height", this.height);
    this.buildChart(svg);
  }

  buildChart(svg) {
    let radius = Math.min(this.width, this.height) / 2;
    let arcShape = arc().innerRadius(0).outerRadius(radius - 1);

    let pieDataStructure = pie().sort(null).value(d => d.value)(this.chartData);
    
    var group = svg.append("g")
      .attr("transform", `translate(${this.width / 2}, ${this.height / 2})`)
      .attr("stroke", "white");

    group.selectAll("path")
      .data(pieDataStructure)
      .join("path")
      .attr("fill", (d) => this.colors(d.index + 1))
      .attr("d", arcShape);
  }

  render() {
    return (
      <div class="container">
        <div><svg class="chart" /></div>
        <div class="legend-container">
          {this.chartData.map((d, i) => (
            <div class="legend-row">
              <span class="lengend-identifier" style={{ 'backgroundColor': this.colors(i + 1) }} ></span>
              <span>{d.label}</span>
              <span class="ml-auto ws-pre">{d.value}{this.valueType}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
