import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AnimationsComponent } from '../animations/animations.component';
import{ GlobalConstants } from "../global/global.component";
import { CardLocComponent } from '../cardloc/cardloc.component';
import { TableComponent } from '../table/table.component';
import { ChartTabComponent } from '../charttab/charttab.component';
import { DetailsTabComponent } from '../detailstab/detailstab.component';
import { ProgressBarComponent } from '../progressbar/progressbar.componemt';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})

export class FavoriteComponent implements OnInit {
  showfavorite: boolean = false;
  hasfavorite: boolean = false;
  headElements: string[] = [];
  elements: any;
  @Output() favclicked: EventEmitter<any> = new EventEmitter();
  constructor(
    private loc: CardLocComponent,
    private table: TableComponent,
    private charttab: ChartTabComponent,
    private detailstab: DetailsTabComponent,
    private anim: AnimationsComponent,
    private progress: ProgressBarComponent
  ) { }

  ngOnInit() {
    this.hasfavorite = GlobalConstants.hasfavoritecheck;
    this.maketable();
  }

  private maketable() {
    let favorite = JSON.parse(localStorage.getItem('favorite') as any);
    if (favorite == null || favorite.length == 0) {
      GlobalConstants.hasfavoritecheck = false;
      this.hasfavorite = false;
      return;
    }
    GlobalConstants.hasfavoritecheck = true;
    this.headElements = ['#', 'City', 'State', ''];
    this.elements = [];
    for (let i = 0; i < favorite.length; i++) {
      let favoriteloc = favorite[i].title.split(", ");
      let row = {id: (i + 1).toString(), city: favoriteloc[0], state: favoriteloc[1]};
      this.elements.push(row);
    }
  }

  public showdayview(id: any) {
    let clickedrow = id - 1;
    let favorite = JSON.parse(localStorage.getItem('favorite') as any);
    localStorage.setItem('result', JSON.stringify(favorite[clickedrow]));
    this.showfavorite = false;
    this.anim.control = true;
    this.progress.finished = true;
    GlobalConstants.favoritescheck = false;
    GlobalConstants.resultscheck = true;
    GlobalConstants.starclickedcheck = false;
    this.charttab.showcharttab = true;
    this.detailstab.showdetailstab = true;
    this.loc.showcardloc = true;
    this.table.showtable = true;
    this.favclicked.emit();
  }

  public toss(id: any) {
    let clickedrow = id - 1;
    let favorite = JSON.parse(localStorage.getItem('favorite') as any);
    if (clickedrow == favorite.length - 1) {
      GlobalConstants.starclickedcheck = false;
    }
    let revisedfavorite = [];
    for (let i = 0; i < favorite.length; i++) {
      if (i != clickedrow) {
        revisedfavorite.push(favorite[i]);
      }
    }
    localStorage.setItem('favorite', JSON.stringify(revisedfavorite));
    favorite = JSON.parse(localStorage.getItem('favorite') as any);
    if (favorite == null || favorite.length == 0) {
      GlobalConstants.hasfavoritecheck = false;
      this.hasfavorite = false;
      return;
    }
    GlobalConstants.hasfavoritecheck = true;
    this.headElements = ['#', 'City', 'State', ''];
    this.elements = [];
    for (let i = 0; i < favorite.length; i++) {
      let favoriteloc = favorite[i].title.split(", ");
      let row = {id: (i + 1).toString(), city: favoriteloc[0], state: favoriteloc[1]};
      this.elements.push(row);
    }
  }
}
