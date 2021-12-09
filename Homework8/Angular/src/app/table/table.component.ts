import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { DailyDetailsComponent } from '../dailydetails/dailydetails.component';
import { AnimationsComponent } from '../animations/animations.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  showtable: boolean = false;
  headElements: string[] = [];
  elements: any;
  weather: any;
  constructor(
    private details: DailyDetailsComponent,
    private anim: AnimationsComponent
  ) { }

  ngOnInit() {
    this.weather = JSON.parse(localStorage.getItem('result') as any);
    this.maketable(this.weather);
  }

  private codemap(code: any) {
    let url = "";
    let descript = "";
    if (code === 4201) {
      url = "../../assets/images/rain_heavy.svg"
      descript = "Heavy Rain";
  }
    else if (code === 4001) {
      url = "../../assets/images/rain.svg";
      descript = "Rain";
    }
    else if (code === 4200) {
      url = "../../assets/images/rain_light.svg";
      descript = "Light Rain";
    }
    else if (code === 6201) {
      url = "../../assets/images/freezing_rain_heavy.svg";
      descript = "Heavy Freezing Rain";
    }
    else if (code === 6001) {
      url = "../../assets/images/freezing_rain.svg";
      descript = "Freezing Rain";
    }
    else if (code === 6200) {
      url = "../../assets/images/freezing_rain_light.svg";
      descript = "Light Freezing Rain";
    }
    else if (code === 6000) {
      url = "../../assets/images/freezing_drizzle.svg";
      descript = "Freezing Drizzle";
    }
    else if (code === 4000) {
      url = "../../assets/images/drizzle.svg";
      descript = "Drizzle";
    }
    else if (code === 7101) {
      url = "../../assets/images/ice_pellets_heavy.svg";
      descript = "Heavy Ice Pellets";
    }
    else if (code === 7000) {
      url = "../../assets/images/ice_pellets.svg";
      descript = "Ice Pellets";
    }
    else if (code === 7102) {
      url = "../../assets/images/ice_pellets_light.svg";
      descript = "Light Ice Pellets";
    }
    else if (code === 5101) {
      url = "../../assets/images/snow_heavy.svg";
      descript = "Heavy Snow";
    }
    else if (code === 5000) {
      url = "../../assets/images/snow.svg";
      descript = "Snow";
    }
    else if (code === 5100) {
      url = "../../assets/images/snow_light.svg";
      descript = "Light Snow";
    }
    else if (code === 5001) {
      url = "../../assets/images/flurries.svg";
      descript = "Flurries";
    }
    else if (code === 8000) {
      url = "../../assets/images/tstorm.svg";
      descript = "Thunderstorm";
    }
    else if (code === 2100) {
      url = "../../assets/images/fog_light.svg";
      descript = "Light Fog";
    }
    else if (code === 2000) {
      url = "../../assets/images/fog.svg";
      descript = "Fog";
    }
    else if (code === 1001) {
      url = "../../assets/images/cloudy.svg";
      descript = "Cloudy";
    }
    else if (code === 1102) {
      url = "../../assets/images/mostly_cloudy.svg";
      descript = "Mostly Cloudy";
    }
    else if (code === 1101) {
      url = "../../assets/images/partly_cloudy_day.svg";
      descript = "Partly Cloudy";
    }
    else if (code === 1100) {
      url = "../../assets/images/mostly_clear_day.svg";
      descript = "Mostly Clear";
    }
    else if (code === 1000) {
      url = "../../assets/images/clear_day.svg";
      descript = "Clear";
    }
    else if (code === 3000) {
      url = "../../assets/images/light_wind.svg";
      descript = "Light Wind";
    }
    else if (code === 3001) {
      url = "../../assets/images/wind.svg";
      descript = "Wind";
    }
    else if (code === 3002) {
      url = "../../assets/images/strong_wind.svg";
      descript = "Strong Wind";
    }
    return [url, descript];
  }

  private maketable(weather: any) {
    let interv = weather.result.data.timelines[1].intervals;
    this.headElements = ['#', 'Date', 'Status', 'Temp. High (° F)', 'Temp. Low (° F)', 'Wind Speed (mph)'];
    this.elements = [];
    for (let i = 0; i < 15; i++) {
      let weaurldes = this.codemap(interv[i].values.weatherCode);
      let weastatus = [];
      weastatus.push(weaurldes[0]);
      weastatus.push(weaurldes[1]);
      let row = {id: (i + 1).toString(), date: this.timeformat(interv[i].startTime), status: weastatus, temphi: interv[i].values.temperatureMax, templo: interv[i].values.temperatureMin, wind: interv[i].values.windSpeed};
      this.elements.push(row);
    }
  }

  private timeformat(t: any) {
    let unformdate = new Date(t);
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][unformdate.getMonth()];
    let weekday = unformdate.toLocaleString("default", { weekday: "long" })
    let day = unformdate.getDate() as any;
    if (day <= 9) {
      day = '0'+day;
    }
    return weekday + ", " + day + " " + month + " " + unformdate.getFullYear();
  }

  public clicktable(id: any, date: any) {
    localStorage.setItem('row', (id - 1) as unknown as string);
    localStorage.setItem('date', date);
    this.details.showdetails = true;
    this.anim.control = false;
  }
}
