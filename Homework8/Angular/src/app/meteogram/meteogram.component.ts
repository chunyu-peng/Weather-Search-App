import { Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import windbarb from 'highcharts/modules/windbarb.js';
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);
windbarb(Highcharts);

@Component({
  selector: 'app-meteogram',
  templateUrl: './meteogram.component.html',
  styleUrls: ['./meteogram.component.css']
})

export class MeteogramComponent implements OnInit {
  showmeteo: boolean = false;
  temperatures: any[] = [];
  humidity: any[] = [];
  winds: any[] = [];
  pressures: any[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      marginBottom: 70,
      marginRight: 40,
      marginTop: 50,
      plotBorderWidth: 1,
      height: 350,
      alignTicks: false,
      scrollablePlotArea: {
        minWidth: 720
      }
    },
    title: {
      text: 'Hourly Weather (For Next 5 Days)',
      align: 'center',
      style: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    },
    credits: {
      text: 'Forecast',
      href: 'https://yr.no',
      position: {
        x: -40
      }
    },
    tooltip: {
      shared: true,
      useHTML: true,
    },
    xAxis: [{
      type: 'datetime',
      tickInterval: 4 * 36e5,
      minorTickInterval: 36e5,
      tickLength: 0,
      gridLineWidth: 1,
      gridLineColor: 'rgba(128, 128, 128, 0.1)',
      startOnTick: false,
      endOnTick: false,
      minPadding: 0,
      maxPadding: 0,
      offset: 35,
      showLastLabel: true,
      labels: {
        format: '{value:%H}',
      },
      crosshair: true
    }, {
      linkedTo: 0,
      type: 'datetime',
      tickInterval: 24 * 3600 * 1000,
      labels: {
        format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
        align: 'left',
        x: 3,
        y: -5
      },
      opposite: true,
      tickLength: 20,
      gridLineWidth: 1
    }],
    yAxis: [{
      title: {
        text: null
      },
      labels: {
        format: '{value}°',
        step: 6,
        style: {
          fontSize: '10px'
        },
        x: -3
      },
      plotLines: [{
        value: 0,
        color: '#BBBBBB',
        width: 1,
        zIndex: 2
      }],
      maxPadding: 0.3,
      minRange: 8,
      tickInterval: 1,
      gridLineColor: 'rgba(128, 128, 128, 0.1)'
    }, {
      title: {
        text: null
      },
      labels: {
        enabled: false
      },
      gridLineWidth: 0,
      tickLength: 0,
      minRange: 10,
      min: 0
    }, {
      allowDecimals: false,
      title: {
        text: 'inHg',
        offset: 0,
        align: 'high',
        rotation: 0,
        style: {
          fontSize: '10px',
          color: "#FFA500"
        },
        textAlign: 'left',
        x: 3
      },
      labels: {
        style: {
          fontSize: '8px',
          color: "#FFA500"
        },
        y: 2,
        x: 3,
      },
      gridLineWidth: 0,
      opposite: true,
      showLastLabel: false
    }],
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        pointPlacement: 'between'
      }
    },
    series: [{
      name: 'Temperature',
      data: this.temperatures,
      type: 'spline',
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: true
          }
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
          '{series.name}: <b>{point.y}°F</b><br/>'
      },
      zIndex: 1,
      color: '#FF3333',
      negativeColor: '#48AFE8'
    },
      {
      name: 'Humidity',
      data: this.humidity,
      type: 'column',
      color: '#86ceff',
      yAxis: 1,
      groupPadding: 0,
      pointPadding: 0,
      grouping: false,
      dataLabels: {
        enabled: true,
        filter: {
          operator: '>',
          property: 'y',
          value: 0
        },
        style: {
          fontSize: '8px',
          color: 'gray'
        }
      },
      tooltip: {
        valueSuffix: ' %'
      }
    }, {
      name: 'Air pressure',
      color: "#FFA500",
      // @ts-ignore
      data: this.pressures,
      marker: {
        enabled: false
      },
      shadow: false,
      tooltip: {
        valueSuffix: ' inHg'
      },
      // @ts-ignore
      dashStyle: 'shortdot',
      yAxis: 2
    }, {
      name: 'Wind',
      type: 'windbarb',
      id: 'windbarbs',
      color: '#FF3333',
      lineWidth: 1.5,
      data: this.winds,
      vectorLength: 8,
      xOffset: -4.5,
      yOffset: -20,
      tooltip: {
        valueSuffix: ' mph'
      }
    }]
  };

  ngOnInit() {
    let weather = JSON.parse(localStorage.getItem('result') as any);
    let interv = weather.result.data.timelines[2].intervals;
    let pointStart;
    for (let i = 0; i < interv.length; i++) {
      let node = interv[i];
      const x = new Date(node.startTime).getTime(), to = x + 36e5;
      this.temperatures.push({
        x,
        y: Math.round(node.values.temperature),
        to
      });
      this.humidity.push({
        x,
        y: Math.round(node.values.humidity)
      });
      if (i % 2 === 0) {
        this.winds.push({
          x,
          value: node.values.windSpeed,
          direction: node.values.windDirection
        });
      }
      this.pressures.push({
        x,
        y: Math.round(node.values.pressureSeaLevel)
      });
      if (i === 0) {
        pointStart = (x + to) / 2;
      }
    }
  }
}
