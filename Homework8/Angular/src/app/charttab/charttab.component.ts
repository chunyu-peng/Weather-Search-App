import { Component } from '@angular/core';
import { ChartComponent } from '../dailytemp/dailytemp.component';
import { TableComponent } from '../table/table.component';
import { MeteogramComponent } from '../meteogram/meteogram.component';

@Component({
  selector: 'app-charttab',
  templateUrl: './charttab.component.html',
  styleUrls: ['./charttab.component.css']
})

export class ChartTabComponent {
  table: boolean = true;
  chart: boolean = false;
  meteo: boolean = false;
  showcharttab: boolean = false;
  constructor(
    private dailytemp: ChartComponent,
    private dayview: TableComponent,
    private meteogram: MeteogramComponent
  ) { }

  public tableclick() {
    this.table = true;
    this.chart = false;
    this.meteo = false;
    this.dailytemp.showchart = false;
    this.dayview.showtable = true;
    this.meteogram.showmeteo = false;
  }

  public chartclick() {
    this.table = false;
    this.chart = true;
    this.meteo = false;
    this.dailytemp.showchart = true;
    this.dayview.showtable = false;
    this.meteogram.showmeteo = false;
  }

  public meteoclick() {
    this.table = false;
    this.chart = false;
    this.meteo = true;
    this.dailytemp.showchart = false;
    this.dayview.showtable = false;
    this.meteogram.showmeteo = true;
  }
}
