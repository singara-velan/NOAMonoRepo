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
  @Prop() height: number = 300;
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
    this.margin = { top: 20, right: 20, bottom: 50, left: 50 };
    this.chartWidth = this.width - this.margin.left - this.margin.right;
    this.chartHeight = this.height - this.margin.top - this.margin.bottom;
    console.log(this.chartData);
  }

  componentDidLoad() {
    const svg = select(this.element.shadowRoot.querySelectorAll(".chart")[0])
      .attr("width", this.width)
      .attr("height", this.height);
    this.buildChartV2(svg);
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
      .domain([0, d3.max(this.chartData, d => d.y)])
      .range([this.chartHeight, 0]);

    svg.append('text')
      .attr('x', this.chartWidth / 2)
      .attr('y', this.height)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Helvetica')
      .style('font-size', 12)
      .text('Year');

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate(10,' + this.chartHeight/2 + ')rotate(-90)')
      .style('font-family', 'Helvetica')
      .style('font-size', 12)
      .text('Classes');

    groups.append("g")
      .attr("transform", "translate(0," + this.chartHeight + ")")
      .call(d3.axisBottom(xScale));

    groups.append("g")
      .call(d3.axisLeft(yScale));

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

  buildChart(svg) {
    const groups = svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    const yAccessor = (d) => d.y;
    const xAccessor = (d) => d.x;

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(this.chartData, yAccessor))
      .range([this.chartHeight, 0]);

    const referenceBandPlacement = yScale(2018);

    groups
      .append("rect")
      .attr("x", 0)
      .attr("width", this.chartWidth)
      .attr("y", referenceBandPlacement)
      .attr("height", this.chartHeight - referenceBandPlacement)
      .attr("fill", "#ffece6");

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(this.chartData, xAccessor))
      .range([0, this.chartWidth]);

    const lineGenerator = d3
      .line()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)))
      .curve(d3.curveBasis);

    groups
      .append("path")
      .attr("d", lineGenerator(this.chartData))
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2);

    const yAxisGenerator = d3.axisLeft().scale(yScale);
    groups.append("g").call(yAxisGenerator);

    const xAxisGenerator = d3.axisBottom().scale(xScale);
    groups
      .append("g")
      .call(xAxisGenerator)
      .style("transform", `translateY(${this.chartHeight}px)`);

    // const xArray = this.chartData.map(m => m.x).sort();
    // const yArray = this.chartData.map(m => m.y).sort();
    // const xScale = d3.scaleLinear().domain([xArray[0], xArray[xArray.length-1]]).range([0, this.chartWidth]);
    // const yScale = d3.scaleLinear().domain([yArray[0], yArray[yArray.length-1]]).range([this.chartHeight, 0]);

    // svg.append('text')
    //   .attr('x', this.chartWidth / 2 + 100)
    //   .attr('y', this.chartHeight - 15 + 150)
    //   .attr('text-anchor', 'middle')
    //   .style('font-family', 'Helvetica')
    //   .style('font-size', 12)
    //   .text('Year');

    //   svg.append('text')
    //   .attr('text-anchor', 'middle')
    //   .attr('transform', 'translate(60,' + this.chartHeight + ')rotate(-90)')
    //   .style('font-family', 'Helvetica')
    //   .style('font-size', 12)
    //   .text('Classes');

    // group.append("g")
    //   .attr("transform", "translate(0," + this.chartHeight + ")")
    //   .call(d3.axisBottom(xScale));

    // group.append("g")
    //   .call(d3.axisLeft(yScale));

    // svg.append('g')
    //   .selectAll("dot")
    //   .data(this.chartData)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", function (d) { return xScale(d.x); } )
    //   .attr("cy", function (d) { return yScale(d.y); } )
    //   .attr("r", 3)
    //   .attr("transform", "translate(" + 100 + "," + 100 + ")")
    //   .style("fill", "#CC0000");

    // const line = d3.line()
    // .x(function(d) { return xScale(d.x); }) 
    // .y(function(d) { return yScale(d.y); }) 
    // .curve(d3.curveMonotoneX)

    // svg.append("path")
    // .datum(this.chartData) 
    // .attr("class", "line") 
    // .attr("transform", "translate(" + 100 + "," + 100 + ")")
    // .attr("d", line)
    // .style("fill", "none")
    // .style("stroke", "#CC0000")
    // .style("stroke-width", "2");
  }



  render() {
    return <div><svg class="chart" /></div>;
  }
}
