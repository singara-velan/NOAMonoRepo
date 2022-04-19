import { Element, Component, h, Prop } from '@stencil/core';
import { select } from 'd3-selection';
import * as d3 from 'd3';
@Component({
  tag: 'line-chart',
  styleUrl: 'line-chart.css',
  shadow: true,
})
export class LineChart {
  @Element() element: HTMLElement;
  @Prop() width: number = 500;
  @Prop() height: number = 250;
  @Prop() data: string = "[]";

  private margin: any;
  private chartWidth: number;
  private chartHeight: number;
  private chartData: any[];

  constructor() {
    this.initData();
  }

  initData() {
    this.chartData = typeof this.data === "object" ? this.data : JSON.parse(this.data);
    console.log(this.chartData);
  }

  componentDidLoad() {
    console.log(this.element.shadowRoot.firstChild);
    this.width = this.element.shadowRoot.firstElementChild.clientWidth - 40;
    this.calculateDrawArea();
    const svg = select(this.element.shadowRoot.querySelectorAll(".chart")[0])
      .attr("viewBox", `0 0 ${this.width} ${this.height}`) //Testing responsive
      // .attr("width", this.width)
      // .attr("height", this.height);
      this.buildChartV2(svg);
  }

  calculateDrawArea() {
    this.margin = { top: 20, right: 20, bottom: 50, left: 50 };
    this.chartWidth = this.width - this.margin.left - this.margin.right;
    this.chartHeight = this.height - this.margin.top - this.margin.bottom;
  }

  buildChartV2(svg) {
    const groups = svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(this.chartData, d => d.x))
      .range([0, this.chartWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(this.chartData, d => +d.y)])
      .range([this.chartHeight, 0]);

    svg.append('text')
      .attr('x', this.chartWidth / 2)
      .attr('y', this.height)
      .attr("class", "axis-label")
      .attr('transform', 'translate(0,-5)')
      .text('Year');

    svg.append('text')
      .attr('transform', 'translate(10,' + this.chartHeight / 2 + ')rotate(-90)')
      .attr("class", "axis-label")
      .text('Classes');

    groups.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + this.chartHeight + ")")
      .call(d3.axisBottom(xScale).ticks(this.chartData.length));

    groups.append("g")
      .attr("class", "yAxis")
      .call(d3.axisLeft(yScale).ticks(this.chartData.length));

      groups.selectAll("g.yAxis g.tick")
      .append("line")
      .attr("class", "gridline")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", this.chartWidth)
      .attr("y2", 0);

      // Hide Yaxis grid lines
      // groups.selectAll("g.xAxis g.tick")
      // .append("line")
      // .attr("class", "gridline")
      // .attr("x1", 0)
      // .attr("y1", -this.chartHeight)
      // .attr("x2", 0)
      // .attr("y2", 0);

    svg.append('g')
      .selectAll("dot")
      .data(this.chartData)
      .enter()
      .append("circle")
      .attr("cx", function (d) { return xScale(d.x); })
      .attr("cy", function (d) { return yScale(d.y); })
      .attr("r", 3)
      .attr("transform", "translate(" + this.margin.bottom + "," + this.margin.right + ")")
      .style("fill", "#111e7f");

    const line = d3.line()
      .x(function (d) { return xScale(d.x); })
      .y(function (d) { return yScale(d.y); })


    svg.append("path")
      .datum(this.chartData)
      .attr("class", "line")
      .attr("transform", "translate(" + this.margin.bottom + "," + this.margin.right + ")")
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", "#111e7f")
      .style("stroke-width", "2");

  }

  render() {
    return <div><svg class="chart" /></div>;
  }
}
