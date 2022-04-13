import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'myorg-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  productProportion: any = [];
  attributeProportion: any = [];
  benfitProportion: any = [];
  attributeTrends: any = [];

  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.productProportion = [
      { label: "Same as Benchmark", value: 5, code: 'SAME' },
      { label: "Different from Benchmark", value: 4, code: 'DIFFERENT' },
      { label: "Above Benchmark", value: 2, code: 'ABOVE' },
      { label: "Below Benchmark", value: 1, code: 'BELOW' }
    ]
    this.attributeProportion = [
      { label: "Same as Benchmark", value: 74, code: 'SAME' },
      { label: "Different from Benchmark", value: 38, code: 'DIFFERENT' },
      { label: "Above Benchmark", value: 23, code: 'ABOVE' },
      { label: "Below Benchmark", value: 21, code: 'BELOW' }
    ]

    this.benfitProportion = [
      { label: "Multiple of Monthly Earnings: 24x", value: 27.7 },
      { label: "Multiple of Monthly Earnings: 36x", value: 25.8 },
      { label: "Monetary Amount", value: 19.8},
      { label: "Multiple of Annual Earnings", value: 9.5 },
      { label: "Other", value: 8.3 }
    ]
    this.attributeTrends = [
      { x: 2017, y: 1 },
      { x: 2018, y: 4 },
      { x: 2019, y: 3 },
      { x: 2020, y: 5 },
      { x: 2021, y: 3 }
    ]
  }
}
