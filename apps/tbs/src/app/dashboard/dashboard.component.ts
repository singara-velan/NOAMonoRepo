import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'myorg-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  productProportion: any = [];
  attributeProportion: any = [];

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
  }
}
