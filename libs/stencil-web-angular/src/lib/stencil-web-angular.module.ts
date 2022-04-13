import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircularChart } from '../generated/directives/proxies';

const WebComponents = [
  CircularChart
]

@NgModule({
  imports: [CommonModule],
  declarations: [WebComponents],
  exports: [WebComponents]
})
export class StencilWebAngularModule {}
