import { Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);

@Component({
  selector: 'app-dailytemp',
  templateUrl: './dailytemp.component.html',
  styleUrls: ['./dailytemp.component.css']
})

export class ChartComponent implements OnInit {
  showchart: boolean = false;
  chartdata: any[] = [];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    plotOptions: {
			series: {
				marker: {
					enabled: true,
          // @ts-ignore
					fillColor: Highcharts.getOptions().colors[0]
				}
			},
			arearange: {
				color: {
					linearGradient: {
						x1: 0,
						y1: 0,
						x2: 0,
						y2: 1
					},
					stops: [
            // @ts-ignore
						[0, Highcharts.Color('#FFA500').setOpacity(0.7).get('rgba')],
            // @ts-ignore
						[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.7).get('rgba')]
					]
				},
				lineColor: '#FFA500'
			}
		},
		chart: {
			type: 'arearange',
			zoomType: 'x',
			scrollablePlotArea: {
				minWidth: 600,
				scrollPositionX: 1
			}
		},
		title: {
			text: 'Temperature Ranges (Min, Max)'
		},
		xAxis: {
			tickInterval: 24 * 3600 * 1000,
			type: 'datetime',
			dateTimeLabelFormats: {
				day: '%e %b'
			}
		},
		yAxis: {
			tickInterval: 5,
			title: {
				text: null
			}
		},
		tooltip: {
      // @ts-ignore
			borderColor: Highcharts.getOptions().colors[0],
      // @ts-ignore
			crosshairs: true,
			shared: true,
			valueSuffix: '°F',
			xDateFormat: '%A, %b %e',
      // @ts-ignore
			pointFormat: '<span style="color:' + Highcharts.getOptions().colors[0] + '">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
		},
		legend: {
			enabled: false
		},
    // @ts-ignore
		series: [{
			name: 'Temperatures',
			data: this.chartdata
		}]
  };

  ngOnInit() {
    let weather = JSON.parse(localStorage.getItem('result') as any);
    let interv = weather.result.data.timelines[1].intervals;
    for (let i = 0; i < 15; i++) {
      this.chartdata.push([new Date(interv[i].startTime).getTime(), interv[i].values.temperatureMin, interv[i].values.temperatureMax]);
    }
  }
}
