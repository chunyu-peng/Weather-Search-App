import { Component } from '@angular/core';
import { ProgressBarComponent } from './progressbar/progressbar.componemt';
import { CardLocComponent } from './cardloc/cardloc.component';
import { ChartComponent } from './dailytemp/dailytemp.component';
import { MeteogramComponent } from './meteogram/meteogram.component';
import { DailyDetailsComponent } from './dailydetails/dailydetails.component';
import { AnimationsComponent } from './animations/animations.component';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { FavoriteComponent } from './favorite/favorite.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slide1', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slide2', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ],
})

export class AppComponent {
  title = 'Angular';
  animator1: string = 'in';
  animator2: string = 'out';
  constructor(
    public progress: ProgressBarComponent,
    public loc: CardLocComponent,
    public chart: ChartComponent,
    public meteo: MeteogramComponent,
    public dailydetails: DailyDetailsComponent,
    public anim: AnimationsComponent,
    public favorite: FavoriteComponent,
    public form: FormComponent,
    public table: TableComponent
  ) { }

  public slidedetails() {
    this.animator1 = this.animator1 = 'out';
    this.animator2 = this.animator2 = 'in';
  }

  public slidetable() {
    this.animator1 = this.animator1 = 'in';
    this.animator2 = this.animator2 = 'out';
  }
}
