import { Component } from '@angular/core';
import { ProgressBarComponent } from './progressbar/progressbar.componemt';
import { CardLocComponent } from './cardloc/cardloc.component';
import { ChartComponent } from './dailytemp/dailytemp.component';
import { MeteogramComponent } from './meteogram/meteogram.component';
import { DailyDetailsComponent } from './dailydetails/dailydetails.component';
import { AnimationsComponent } from './animations/animations.component';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
import { FavoriteComponent } from './favorite/favorite.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';

const left = [
  query(':enter, :leave', style({ position: 'absolute' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('5s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('5s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'absolute' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('5s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('5s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slide1', [
      transition(':enter', left),
      transition(':leave', right),
    ]),
    trigger('slide2', [
      transition(':enter', right),
      transition(':leave', left),
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
    this.animator1 = 'out';
    this.animator2 = 'in';
  }

  public slidetable() {
    this.animator1 = 'in';
    this.animator2 = 'out';
  }
}
