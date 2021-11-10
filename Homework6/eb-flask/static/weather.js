let pointcheck = false;
let dailydata = "";
let hourlydata = "";

async function showcard() {
    let streetcheck = document.getElementById("street").value;
    let citycheck = document.getElementById("city").value;
    let statecheck = document.getElementById("state").value;
    let boxcheck = document.getElementById("checkbox").checked;
    cleanparam();
    document.getElementById("street").value = streetcheck;
    document.getElementById("city").value = citycheck;
    document.getElementById("state").value = statecheck;
    document.getElementById("checkbox").checked = boxcheck;
    let jsonurl = "";
    if (boxcheck) {
        lockbox();
        let ipres= await fetch("https://ipinfo.io/?token=65c38dc00ac738");
        let ipjson = await ipres.json();
        // ?checkbox=on&submitform=&autolocation=&autocity=&autoregion=&autocountry=
        jsonurl = "/process?checkbox=on&autolocation=" + ipjson.loc + "&autocity=" + ipjson.city + "&autoregion=" + ipjson.region + "&autocountry=" + ipjson.country;
        jsonurl = jsonurl.replaceAll(" ", "+");
    }
    else if (streetcheck !== '' && citycheck !== '' && statecheck !== '') {
        jsonurl = "/process?" + "streetname=" + streetcheck + "&cityname=" + citycheck + "&statename=" + statecheck;
        jsonurl.replaceAll(" ", "+");
    }
    if (jsonurl === "") {
        return;
    }
    let response = await fetch(jsonurl);
    let jsondata = await response.json();
    if (jsondata.comb.result.code === 429001) {
        document.getElementById("noresult").style.display = "flex";
        return;
    }
    document.getElementById('loc').innerHTML = jsondata.comb.card_loc;
    let code = jsondata.comb.result.data.timelines[0].intervals[0].values.weatherCode;
    let mapout = codemap(code);
    document.getElementById('pic').style.backgroundImage = "url(\"" + mapout[0] + "\")";
    let temperature = jsondata.comb.result.data.timelines[0].intervals[0].values.temperature.toFixed(1);
    document.getElementById('temp').innerHTML = temperature + "°";
    document.getElementById('des').innerHTML = mapout[1];
    document.getElementById('valhum').innerHTML = jsondata.comb.result.data.timelines[0].intervals[0].values.humidity + "%";
    document.getElementById('valpress').innerHTML = jsondata.comb.result.data.timelines[0].intervals[0].values.pressureSeaLevel + "inHg";
    document.getElementById('valwind').innerHTML = jsondata.comb.result.data.timelines[0].intervals[0].values.windSpeed + "mph";
    document.getElementById('valvisi').innerHTML = jsondata.comb.result.data.timelines[0].intervals[0].values.visibility + "mi";
    document.getElementById('valcloud').innerHTML = jsondata.comb.result.data.timelines[0].intervals[0].values.cloudCover + "%";
    document.getElementById('valUV').innerHTML = jsondata.comb.result.data.timelines[0].intervals[0].values.uvIndex;
    let interv = jsondata.comb.result.data.timelines[1].intervals;
    let table = document.getElementById("table");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    for (let i = 0; i < 15; i++) {
        let row = table.insertRow();
        row.className = "tablerow";
        row.addEventListener("click", function() {
            document.getElementById("detail").style.display = "flex";
            document.getElementById("card").style.display = "none";
            document.getElementById("table").style.display = "none";
            clickevent(interv[row.rowIndex - 1]);
        });
        let date = row.insertCell(0);
        date.className = "longtd";
        let status = row.insertCell(1);
        status.className = "longtd";
        let temphi = row.insertCell(2);
        let templo = row.insertCell(3);
        let wind = row.insertCell(4);
        date.innerHTML = timeformat(interv[i].startTime);
        let weaurldes = codemap(interv[i].values.weatherCode);
        status.innerHTML = "<img src=\"" + weaurldes[0] + "\" alt=\"\" width=50px height=50px>" + "&nbsp&nbsp" + weaurldes[1];
        temphi.innerHTML = interv[i].values.temperatureMax;
        templo.innerHTML = interv[i].values.temperatureMin;
        wind.innerHTML = interv[i].values.windSpeed;
    }
    dailydata = interv;
    hourlydata = jsondata.comb.result.data.timelines[2].intervals;
    document.getElementById("card").style.display = "flex";
    document.getElementById("table").style.display = "block";
}

function cleanparam() {
    document.getElementById("form").reset();
    pointcheck = false;
    dailydata = "";
    hourlydata = "";
    document.getElementById("street").disabled = false;
    document.getElementById("city").disabled = false;
    document.getElementById("state").disabled = false;
    document.getElementById("card").style.display = "none";
    document.getElementById("table").style.display = "none";
    document.getElementById("detail").style.display = "none";
    document.getElementById('container1').style.display = "none";
    document.getElementById('container2').style.display = "none";
    document.getElementById("noresult").style.display = "none";
}

function lockbox() {
    if (document.getElementById("checkbox").checked) {
        document.getElementById("form").reset();
        document.getElementById("checkbox").checked = true;
        document.getElementById("street").disabled = true;
        document.getElementById("city").disabled = true;
        document.getElementById("state").disabled = true;
    } else {
        document.getElementById("street").disabled = false;
        document.getElementById("city").disabled = false;
        document.getElementById("state").disabled = false;
    }
}

function codemap(code) {
    let url = "";
    let descript = "";
    if (code === 4201) {
        url = "Images/rain_heavy.svg"
        descript = "Heavy Rain";
    }
    else if (code === 4001) {
        url = "Images/rain.svg";
        descript = "Rain";
    }
    else if (code === 4200) {
        url = "Images/rain_light.svg";
        descript = "Light Rain";
    }
    else if (code === 6201) {
        url = "Images/freezing_rain_heavy.svg";
        descript = "Heavy Freezing Rain";
    }
    else if (code === 6001) {
        url = "Images/freezing_rain.svg";
        descript = "Freezing Rain";
    }
    else if (code === 6200) {
        url = "Images/freezing_rain_light.svg";
        descript = "Light Freezing Rain";
    }
    else if (code === 6000) {
        url = "Images/freezing_drizzle.svg";
        descript = "Freezing Drizzle";
    }
    else if (code === 4000) {
        url = "Images/drizzle.svg";
        descript = "Drizzle";
    }
    else if (code === 7101) {
        url = "Images/ice_pellets_heavy.svg";
        descript = "Heavy Ice Pellets";
    }
    else if (code === 7000) {
        url = "Images/ice_pellets.svg";
        descript = "Ice Pellets";
    }
    else if (code === 7102) {
        url = "Images/ice_pellets_light.svg";
        descript = "Light Ice Pellets";
    }
    else if (code === 5101) {
        url = "Images/snow_heavy.svg";
        descript = "Heavy Snow";
    }
    else if (code === 5000) {
        url = "Images/snow.svg";
        descript = "Snow";
    }
    else if (code === 5100) {
        url = "Images/snow_light.svg";
        descript = "Light Snow";
    }
    else if (code === 5001) {
        url = "Images/flurries.svg";
        descript = "Flurries";
    }
    else if (code === 8000) {
        url = "Images/tstorm.svg";
        descript = "Thunderstorm";
    }
    else if (code === 2100) {
        url = "Images/fog_light.svg";
        descript = "Light Fog";
    }
    else if (code === 2000) {
        url = "Images/fog.svg";
        descript = "Fog";
    }
    else if (code === 1001) {
        url = "Images/cloudy.svg";
        descript = "Cloudy";
    }
    else if (code === 1102) {
        url = "Images/mostly_cloudy.svg";
        descript = "Mostly Cloudy";
    }
    else if (code === 1101) {
        url = "Images/partly_cloudy_day.svg";
        descript = "Partly Cloudy";
    }
    else if (code === 1100) {
        url = "Images/mostly_clear_day.svg";
        descript = "Mostly Clear";
    }
    else if (code === 1000) {
        url = "Images/clear_day.svg";
        descript = "Clear";
    }
    else if (code === 3000) {
        url = "Images/light_wind.svg";
        descript = "Light Wind";
    }
    else if (code === 3001) {
        url = "Images/wind.svg";
        descript = "Wind";
    }
    else if (code === 3002) {
        url = "Images/strong_wind.svg";
        descript = "Strong Wind";
    }
    return [url, descript];
}

function clickevent(interval) {
    document.getElementById('dt').innerHTML = timeformat(interval.startTime);
    let weatherinfo = codemap(interval.values.weatherCode);
    document.getElementById('st').innerHTML = weatherinfo[1];
    document.getElementById('tp').innerHTML = interval.values.temperatureMin + "°F/" + interval.values.temperatureMax + "°F";
    document.getElementById('restpic').style.backgroundImage = "url(\"" + weatherinfo[0] + "\")";
    document.getElementById('valprec').innerHTML = precipitation(interval.values.precipitationType);
    document.getElementById('valcor').innerHTML = interval.values.precipitationProbability + "%";
    document.getElementById('valws').innerHTML = interval.values.windSpeed + " mph";
    document.getElementById('valhumm').innerHTML = interval.values.humidity + "%";
    document.getElementById('valvisibi').innerHTML = interval.values.visibility + " mi";
    let rise = new Date(interval.values.sunriseTime);
    let set = new Date(interval.values.sunsetTime);
    let risetime = rise.getHours();
    let settime = set.getHours() - 12;
    if (rise.getMinutes() >= 30) {
        risetime += 1;
    }
    if (set.getMinutes() >= 30) {
        settime += 1;
    }
    document.getElementById('valss').innerHTML = risetime + "AM/" + settime + "PM";
}

function timeformat(t) {
        let unformdate = new Date(t);
        let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][unformdate.getMonth()];
        let weekday = unformdate.toLocaleString("default", { weekday: "long" })
        let day = unformdate.getDate();
        if (day <= 9) {
            day = '0'+day;
        }
        return weekday + ", " + day + " " + month + " " + unformdate.getFullYear();
}

function precipitation(precip) {
    if (precip === 0) {
        precip = "N/A";
    }
    else if (precip === 1) {
        precip = "Rain";
    }
    else if (precip === 2) {
        precip = "Snow";
    }
    else if (precip === 3) {
        precip = "Freezing Rain";
    }
    else {
        precip = "Ice Pellets";
    }
    return precip;
}

function pointclick() {
    pointcheck = !pointcheck;
    if (!pointcheck) {
        document.getElementById('point').style.backgroundImage = "url(" + "Images/point-down-512.png" + ")";
        document.getElementById('container1').style.display = "none";
        document.getElementById('container2').style.display = "none";
    }
    else {
        document.getElementById('point').style.backgroundImage = "url(" + "Images/point-up-512.png" + ")";
        document.getElementById('container1').style.display = "flex";
        document.getElementById('container2').style.display = "flex";
        document.getElementById('point').scrollIntoView(true);
        highchart(dailydata);
        new Meteogram(hourlydata, 'container2');
    }
}

function highchart(data) {
	let chartdata = [];
	for (let i = 0; i < 15; i++) {
		chartdata.push([new Date(data[i].startTime).getTime(), data[i].values.temperatureMin, data[i].values.temperatureMax]);
	}
	Highcharts.chart('container1', {
		plotOptions: {
			series: {
				marker: {
					enabled: true,
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
						[0, Highcharts.Color('#FFA500').setOpacity(0.7).get('rgba')],
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
			borderColor: Highcharts.getOptions().colors[0],
			crosshairs: true,
			shared: true,
			valueSuffix: '°F',
			xDateFormat: '%A, %b %e',
			pointFormat: '<span style="color:' + Highcharts.getOptions().colors[0] + '">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
		},
		legend: {
			enabled: false
		},
		series: [{
			name: 'Temperatures',
			data: chartdata
		}]
	});
}

function Meteogram(json, container) {
	this.humidity = [];
	this.winds = [];
	this.temperatures = [];
	this.pressures = [];
	this.json = json;
	this.container = container;
	this.parseYrData();
}

Meteogram.prototype.drawBlocksForWindArrows = function(chart) {
	const xAxis = chart.xAxis[0];
	for (
		let pos = xAxis.min, max = xAxis.max, i = 0; pos <= max + 36e5; pos += 36e5,
		i += 1
	) {
		const isLast = pos === max + 36e5,
			x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

		const isLong = this.resolution > 36e5 ?
			pos % this.resolution === 0 :
			i % 2 === 0;
		chart.renderer
			.path([
				'M', x, chart.plotTop + chart.plotHeight + (isLong ? 0 : 28),
				'L', x, chart.plotTop + chart.plotHeight + 32,
				'Z'
			])
			.attr({
				stroke: chart.options.chart.plotBorderColor,
				'stroke-width': 1
			})
			.add();
	}
	chart.get('windbarbs').markerGroup.attr({
		translateX: chart.get('windbarbs').markerGroup.translateX + 8
	});
};

Meteogram.prototype.getChartOptions = function() {
	return {
		chart: {
			renderTo: this.container,
			marginBottom: 70,
			marginRight: 40,
			marginTop: 50,
			plotBorderWidth: 1,
			height: 320,
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
			data: this.pressures,
			marker: {
				enabled: false
			},
			shadow: false,
			tooltip: {
				valueSuffix: ' inHg'
			},
			dashStyle: 'shortdot',
			yAxis: 2
		}, {
			name: 'Wind',
			type: 'windbarb',
			id: 'windbarbs',
			color: Highcharts.getOptions().colors[1],
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
};

Meteogram.prototype.onChartLoad = function(chart) {
	this.drawBlocksForWindArrows(chart);
};

Meteogram.prototype.createChart = function() {
	this.chart = new Highcharts.Chart(this.getChartOptions(), chart => {
		this.onChartLoad(chart);
	});
};

Meteogram.prototype.error = function() {
	document.getElementById('loading').innerHTML =
		'<i class="fa fa-frown-o"></i> Failed loading data, please try again later';
};

Meteogram.prototype.parseYrData = function() {
	let pointStart;
	if (!this.json) {
		return this.error();
	}
	for (let i = 0; i < this.json.length; i++) {
        let node = this.json[i];
		const x = new Date(node.startTime).getTime(),
			to = x + 36e5;
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
	this.createChart();
};

if (!location.hash) {
	location.hash = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=51.50853&lon=-0.12574&altitude=25';
}

const url = location.hash.substr(1);
Highcharts.ajax({
	url,
	dataType: 'json',
	success: json => {
		window.meteogram = new Meteogram(json, 'container2');
	},
	error: Meteogram.prototype.error,
	headers: {
		'Content-Type': 'text/plain'
	}
});
