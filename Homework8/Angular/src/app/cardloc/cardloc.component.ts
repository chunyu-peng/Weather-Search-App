import { Component, OnInit } from '@angular/core';
import { DetailsTabComponent } from '../detailstab/detailstab.component';
import { ChartTabComponent } from '../charttab/charttab.component';

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
  ) { }

  ngOnInit() {
    let weather = JSON.parse(localStorage.getItem('result') as any);
    (document.getElementById("cardloc") as HTMLInputElement).innerHTML = "Forecast at " + weather.title;
  }
}
