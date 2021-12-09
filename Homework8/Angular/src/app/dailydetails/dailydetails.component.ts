import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AnimationsComponent } from '../animations/animations.component';

@Component({
  selector: 'app-dailydetails',
  templateUrl: './dailydetails.component.html',
  styleUrls: ['./dailydetails.component.css']
})

export class DailyDetailsComponent implements OnInit{
  showdetails: boolean = false;
  date: any;
  status: any;
  maxtemp: any;
  mintemp: any;
  apptemp: any;
  sunrise: any;
  sunset: any;
  humidity: any;
  windspd: any;
  visibility: any;
  cloud: any;
  lat: any;
  long: any;
  tweet: any;
  constructor(
    private anim: AnimationsComponent
  ) { }

  ngOnInit() {
    let row = localStorage.getItem('row') as any;
    let weather = JSON.parse(localStorage.getItem('result') as any);
    let interv = weather.result.data.timelines[1].intervals;
    this.date = localStorage.getItem('date') as any;
    this.status = this.codemap(interv[row].values.weatherCode);
    this.maxtemp = interv[row].values.temperatureMax;
    this.mintemp = interv[row].values.temperatureMin;
    this.apptemp = interv[row].values.temperatureApparent;
    this.sunrise = new Date(interv[row].values.sunriseTime).toTimeString().split(" ")[0];
    this.sunset = new Date(interv[row].values.sunsetTime).toTimeString().split(" ")[0];
    this.humidity = interv[row].values.humidity;
    this.windspd = interv[row].values.windSpeed;
    this.visibility = interv[row].values.visibility;
    this.cloud = interv[row].values.cloudCover;
    let loc = weather.loc.split(",");
    this.lat = parseFloat(loc[0]);
    this.long = parseFloat(loc[1]);
    this.tweet = `The temperature in ${weather.title} on ${this.date} is ${interv[row].values.temperature}°F. The weather conditions are ${this.status}`;
  }

  private codemap(code: any) {
    let descript = "";
    if (code === 4201) {
      descript = "Heavy Rain";
  }
    else if (code === 4001) {
      descript = "Rain";
    }
    else if (code === 4200) {
      descript = "Light Rain";
    }
    else if (code === 6201) {
      descript = "Heavy Freezing Rain";
    }
    else if (code === 6001) {
      descript = "Freezing Rain";
    }
    else if (code === 6200) {
      descript = "Light Freezing Rain";
    }
    else if (code === 6000) {
      descript = "Freezing Drizzle";
    }
    else if (code === 4000) {
      descript = "Drizzle";
    }
    else if (code === 7101) {
      descript = "Heavy Ice Pellets";
    }
    else if (code === 7000) {
      descript = "Ice Pellets";
    }
    else if (code === 7102) {
      descript = "Light Ice Pellets";
    }
    else if (code === 5101) {
      descript = "Heavy Snow";
    }
    else if (code === 5000) {
      descript = "Snow";
    }
    else if (code === 5100) {
      descript = "Light Snow";
    }
    else if (code === 5001) {
      descript = "Flurries";
    }
    else if (code === 8000) {
      descript = "Thunderstorm";
    }
    else if (code === 2100) {
      descript = "Light Fog";
    }
    else if (code === 2000) {
      descript = "Fog";
    }
    else if (code === 1001) {
      descript = "Cloudy";
    }
    else if (code === 1102) {
      descript = "Mostly Cloudy";
    }
    else if (code === 1101) {
      descript = "Partly Cloudy";
    }
    else if (code === 1100) {
      descript = "Mostly Clear";
    }
    else if (code === 1000) {
      descript = "Clear";
    }
    else if (code === 3000) {
      descript = "Light Wind";
    }
    else if (code === 3001) {
      descript = "Wind";
    }
    else if (code === 3002) {
      descript = "Strong Wind";
    }
    return descript;
  }

  public showtable() {
    this.anim.control = true;
  }
}
