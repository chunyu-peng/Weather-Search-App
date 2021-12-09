import { Component, OnInit } from '@angular/core';
import { DetailsTabComponent } from '../detailstab/detailstab.component';
import { ChartTabComponent } from '../charttab/charttab.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-cardloc',
  templateUrl: './cardloc.component.html',
  styleUrls: ['./cardloc.component.css']
})

export class CardLocComponent implements OnInit {
  showcardloc: boolean = false;
  constructor(
    public detailstab: DetailsTabComponent,
    public charttab: ChartTabComponent,
    public table: TableComponent
  ) { }

  ngOnInit() {
    let weather = JSON.parse(localStorage.getItem('result') as any);
    (document.getElementById("cardloc") as HTMLInputElement).innerHTML = "Forecast at " + weather.title;
  }
}
