import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ResFavbtnComponent } from './resfavbtn/resfavbtn.component';
import { ProgressBarComponent } from './progressbar/progressbar.componemt';
import { CardLocComponent } from './cardloc/cardloc.component';
import { DetailsTabComponent } from './detailstab/detailstab.component';
import { ChartTabComponent } from './charttab/charttab.component';
import { TableComponent } from './table/table.component';
import { ChartComponent } from './dailytemp/dailytemp.component';
import { MeteogramComponent } from './meteogram/meteogram.component';
import { DailyDetailsComponent } from './dailydetails/dailydetails.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { AnimationsComponent } from './animations/animations.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ResFavbtnComponent,
    ProgressBarComponent,
    CardLocComponent,
    DetailsTabComponent,
    ChartTabComponent,
    TableComponent,
    ChartComponent,
    MeteogramComponent,
    DailyDetailsComponent,
    AnimationsComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighchartsChartModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB_b0epYhWcyachc5ndOGEDJIgkH0P2unw',
      libraries: ['places']
    })
  ],
  providers: [
    ProgressBarComponent,
    CardLocComponent,
    TableComponent,
    ChartComponent,
    MeteogramComponent,
    DailyDetailsComponent,
    AnimationsComponent,
    DetailsTabComponent,
    ChartTabComponent,
    FavoriteComponent,
    ResFavbtnComponent,
    FormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
