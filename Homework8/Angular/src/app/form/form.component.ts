import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProgressBarComponent } from '../progressbar/progressbar.componemt';
import { HttpClient } from '@angular/common/http';
import { CardLocComponent } from '../cardloc/cardloc.component';
import { TableComponent } from '../table/table.component';
import { ChartTabComponent } from '../charttab/charttab.component';
import { DetailsTabComponent } from '../detailstab/detailstab.component';
import { GlobalConstants } from '../global/global.component';
import { DailyDetailsComponent } from '../dailydetails/dailydetails.component';
import { FavoriteComponent } from '../favorite/favorite.component';
import { ResFavbtnComponent } from '../resfavbtn/resfavbtn.component';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  streetcontrol = new FormControl();
  citycontrol = new FormControl();
  streetvalid = false;
  cityvalid = false;
  cities: string[] = [];
  citiestatesMap: Map<string, string> = new Map<string, string>();
  checkipinfo = false;
  filteredCities: string[] = [];
  ipinforesponse: any;
  constructor(
    private http: HttpClient,
    private progress: ProgressBarComponent,
    private loc: CardLocComponent,
    private table: TableComponent,
    private charttab: ChartTabComponent,
    private detailstab: DetailsTabComponent,
    private dailydetails: DailyDetailsComponent,
    private favorite: FavoriteComponent,
    private resfav: ResFavbtnComponent
  ) { }

  ngOnInit() {
    this.citycontrol.valueChanges.subscribe(async value => {
      await this._getData(value);
      this._filter(value);
    });
    this.http.get<any>("https://ipinfo.io/?token=65c38dc00ac738").subscribe(
      value => this.ipinforesponse = value,
    );
    this.favorite.ngOnInit();
  }

  private async _getData(value: string) {
    let url = "http://csci571hw8.us-west-1.elasticbeanstalk.com/api/products/autocomplete?city=" + value;
    let autoresponse = await this.http.get<any>(url).toPromise();
    let autocomplete = JSON.parse(autoresponse);
    let predictionsLength = autocomplete.predictions.length;
    this.citiestatesMap.clear();
    for (let i = 0; i < predictionsLength; i++) {
      let terms = autocomplete.predictions[i].terms;
      if (!this.citiestatesMap.has(terms[0].value)) {
        this.citiestatesMap.set(terms[0].value, terms[1].value);
      }
    }
    this.cities = Array.from(this.citiestatesMap.keys());
  }

  private _filter(value: string) {
    const filterValue = this._normalizeValue(value);
    this.filteredCities = this.cities.filter(city => this._normalizeValue(city).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/^\s+/g, '').replace(/  +/g, ' ');
  }

  public getCity(value: string) {
    let stateValue = this.citiestatesMap.get(value);
    let stateSelect = document.getElementById("state") as HTMLSelectElement;
    let index = 0;
    for (let i = 0; i < stateSelect.length; i++){
        if ((<HTMLInputElement><unknown>stateSelect[i]).value == stateValue){
            index = i;
            break;
        }
    }
    stateSelect.selectedIndex = index;
  }

  public lockbox() {
    if ((document.getElementById("autocheck") as HTMLInputElement).checked) {
      (document.getElementById("street") as HTMLInputElement).disabled = true;
      (document.getElementById("city") as HTMLInputElement).disabled = true;
      (document.getElementById("state") as HTMLInputElement).disabled = true;
      if (!this.ipinforesponse) {
        return;
      }
      else {
        this.checkipinfo = true;
      }
    }
    else {
      (document.getElementById("street") as HTMLInputElement).disabled = false;
      (document.getElementById("city") as HTMLInputElement).disabled = false;
      (document.getElementById("state") as HTMLInputElement).disabled = false;
      this.checkipinfo = false;
    }
  }

  public streettrimvalid() {
    if (this.streetcontrol.value != null) {
      this.streetcontrol.setValue(this.streetcontrol.value.replace(/^\s+/g, '').replace(/  +/g, ' '));
    }
    if (!this.streetcontrol.value) {
      this.streetvalid = true;
    }
    else {
      this.streetvalid = false;
    }
  }

  public citytrimvalid() {
    if (this.citycontrol.value != null) {
      this.citycontrol.setValue(this.citycontrol.value.replace(/^\s+/g, '').replace(/  +/g, ' '));
    }
    if (!this.citycontrol.value) {
      this.cityvalid = true;
    }
    else {
      this.cityvalid = false;
    }
  }

  public allclear() {
    (document.getElementById("form") as HTMLFormElement).reset();
    (document.getElementById("street") as HTMLInputElement).disabled = false;
    (document.getElementById("city") as HTMLInputElement).disabled = false;
    (document.getElementById("state") as HTMLInputElement).disabled = false;
    this.streetvalid = false;
    this.cityvalid = false;
    this.streetcontrol.setValue("");
    this.citycontrol.setValue("");
    this.cities = [];
    this.citiestatesMap.clear();
    this.checkipinfo = false;
    this.filteredCities = [];
    this.loc.showcardloc = false;
    this.progress.loading = false;
    this.progress.finished = false;
    this.charttab.showcharttab = false;
    this.charttab.table = true;
    this.charttab.chart = false;
    this.charttab.meteo = false;
    this.detailstab.showdetailstab = false;
    this.loc.showcardloc = false;
    this.table.showtable = false;
    this.dailydetails.showdetails = false;
    GlobalConstants.favoritescheck = false;
    this.resfav.favorites = false;
    GlobalConstants.resultscheck = true;
    this.resfav.results = true;
    this.resfav.ngOnInit();
    this.progress.loadingerror = false;
  }

  public showresult() {
    this.favorite.showfavorite = false;
    this.loc.showcardloc = false;
    this.progress.loading = true;
    this.progress.finished = false;
    let streetcheck = (document.getElementById("street") as HTMLInputElement).value;
    let citycheck = (document.getElementById("city") as HTMLInputElement).value;
    let statecheck = (document.getElementById("state") as HTMLInputElement).value;
    let boxcheck = (document.getElementById("autocheck") as HTMLInputElement).checked;
    let loc = this.ipinforesponse.loc;
    let city = this.ipinforesponse.city;
    let region = this.ipinforesponse.region;
    let country = this.ipinforesponse.country;
    let url = "http://csci571hw8.us-west-1.elasticbeanstalk.com/api/products/tomorrow?street=" + streetcheck + "&city=" + citycheck + "&state=" + statecheck + "&checkbox=" + boxcheck + "&loc=" + loc + "&autocity=" + city + "&region=" + region + "&country=" + country;
    url = url.replace(/\s/g, "+");
    this.http.get<any>(url).subscribe(value => {
      if (value == "failed") {
        this.progress.loading = false;
        this.progress.loadingerror = true;
        return;
      }
      localStorage.setItem('result', JSON.stringify(value));
      this.progress.loading = false;
      this.progress.finished = true;
      GlobalConstants.favoritescheck = false;
      GlobalConstants.resultscheck = true;
      GlobalConstants.starclickedcheck = false;
      this.resfav.ngOnInit();
      this.charttab.showcharttab = true;
      this.detailstab.showdetailstab = true;
      this.loc.showcardloc = true;
      this.table.showtable = true;
    });
  }
}
