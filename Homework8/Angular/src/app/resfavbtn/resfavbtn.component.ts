import { Component, OnInit } from '@angular/core';
import { ChartTabComponent } from '../charttab/charttab.component';
import { DetailsTabComponent } from '../detailstab/detailstab.component';
import { CardLocComponent } from '../cardloc/cardloc.component';
import { TableComponent } from '../table/table.component';
import { ChartComponent } from '../dailytemp/dailytemp.component';
import { MeteogramComponent } from '../meteogram/meteogram.component';
import { DailyDetailsComponent } from '../dailydetails/dailydetails.component';
import { FavoriteComponent } from '../favorite/favorite.component';
import { GlobalConstants } from '../global/global.component';
import { AnimationsComponent } from '../animations/animations.component';
import { ProgressBarComponent } from '../progressbar/progressbar.componemt';

@Component({
  selector: 'app-resfavbtn',
  templateUrl: './resfavbtn.component.html',
  styleUrls: ['./resfavbtn.component.css']
})

export class ResFavbtnComponent implements OnInit {
  results: boolean = true;
  favorites: boolean = false;
  constructor(
    public loc: CardLocComponent,
    public table: TableComponent,
    public chart: ChartComponent,
    public meteo: MeteogramComponent,
    public dailydetails: DailyDetailsComponent,
    public charttab: ChartTabComponent,
    public detailstab: DetailsTabComponent,
    public favorite: FavoriteComponent,
    public anim: AnimationsComponent,
    public progress: ProgressBarComponent
  ) { }

  ngOnInit() {
    this.results = GlobalConstants.resultscheck;
    if (this.results) {
      let element: HTMLElement = document.getElementById('results') as HTMLElement;
      element.click();
    }
    this.favorites = GlobalConstants.favoritescheck;
    if (this.favorites) {
      let element: HTMLElement = document.getElementById('favorites') as HTMLElement;
      element.click();
    }
  }

  public resultsclick() {
    this.results = true;
    GlobalConstants.resultscheck = true;
    this.favorites = false;
    GlobalConstants.favoritescheck = false;
    this.dailydetails.showdetails = false;
    this.anim.control = true;
    this.loc.showcardloc = true;
    this.table.showtable = true;
    this.chart.showchart = false;
    this.meteo.showmeteo = false;
    this.charttab.showcharttab = true;
    this.detailstab.showdetailstab = true;
    this.favorite.showfavorite = false;
    this.progress.loadingerror = true;
  }

  public favoritesclick() {
    this.results = false;
    GlobalConstants.resultscheck = false;
    this.favorites = true;
    GlobalConstants.favoritescheck = true;
    this.anim.control = false;
    this.dailydetails.showdetails = false;
    this.loc.showcardloc = false;
    this.table.showtable = false;
    this.chart.showchart = false;
    this.meteo.showmeteo = false;
    this.charttab.showcharttab = false;
    this.detailstab.showdetailstab = false;
    this.favorite.showfavorite = true;
    this.progress.loadingerror = false;
  }

  public init() {
    this.results = true;
    GlobalConstants.resultscheck = true;
    this.favorites = false;
    GlobalConstants.favoritescheck = false;
    this.ngOnInit();
  }
}
