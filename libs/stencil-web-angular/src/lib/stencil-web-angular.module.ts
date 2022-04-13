import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircularChart, CircularPieChart, LineChart } from '../generated/directives/proxies';

const WebComponents = [
  CircularChart,
  CircularPieChart,
  LineChart
]

@NgModule({
  imports: [CommonModule],
  declarations: [WebComponents],
  exports: [WebComponents]
})
export class StencilWebAngularModule {}
