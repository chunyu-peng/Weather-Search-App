package com.example.weatherapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.cardview.widget.CardView;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.weatherapp.ui.main.FavoritesPagerAdapter;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

public class SearchResult extends AppCompatActivity {

    private String city;
    private String state;
    private JSONArray timelines;
    public static Map<String, String> states;
    private boolean isAddedToFav;
    private String title;
    static {
        states = new HashMap<>();
        states.put("AL", "Alabama");
        states.put("AK", "Alaska");
        states.put("AB", "Alberta");
        states.put("AZ", "Arizona");
        states.put("AR", "Arkansas");
        states.put("BC", "British Columbia");
        states.put("CA", "California");
        states.put("CO", "Colorado");
        states.put("CT", "Connecticut");
        states.put("DE", "Delaware");
        states.put("DC", "District Of Columbia");
        states.put("FL", "Florida");
        states.put("GA", "Georgia");
        states.put("GU", "Guam");
        states.put("HI", "Hawaii");
        states.put("ID", "Idaho");
        states.put("IL", "Illinois");
        states.put("IN", "Indiana");
        states.put("IA", "Iowa");
        states.put("KS", "Kansas");
        states.put("KY", "Kentucky");
        states.put("LA", "Louisiana");
        states.put("ME", "Maine");
        states.put("MB", "Manitoba");
        states.put("MD", "Maryland");
        states.put("MA", "Massachusetts");
        states.put("MI", "Michigan");
        states.put("MN", "Minnesota");
        states.put("MS", "Mississippi");
        states.put("MO", "Missouri");
        states.put("MT", "Montana");
        states.put("NE", "Nebraska");
        states.put("NV", "Nevada");
        states.put("NB", "New Brunswick");
        states.put("NH", "New Hampshire");
        states.put("NJ", "New Jersey");
        states.put("NM", "New Mexico");
        states.put("NY", "New York");
        states.put("NF", "Newfoundland");
        states.put("NC", "North Carolina");
        states.put("ND", "North Dakota");
        states.put("NT", "Northwest Territories");
        states.put("NS", "Nova Scotia");
        states.put("NU", "Nunavut");
        states.put("OH", "Ohio");
        states.put("OK", "Oklahoma");
        states.put("ON", "Ontario");
        states.put("OR", "Oregon");
        states.put("PA", "Pennsylvania");
        states.put("PE", "Prince Edward Island");
        states.put("PR", "Puerto Rico");
        states.put("QC", "Quebec");
        states.put("RI", "Rhode Island");
        states.put("SK", "Saskatchewan");
        states.put("SC", "South Carolina");
        states.put("SD", "South Dakota");
        states.put("TN", "Tennessee");
        states.put("TX", "Texas");
        states.put("UT", "Utah");
        states.put("VT", "Vermont");
        states.put("VI", "Virgin Islands");
        states.put("VA", "Virginia");
        states.put("WA", "Washington");
        states.put("WV", "West Virginia");
        states.put("WI", "Wisconsin");
        states.put("WY", "Wyoming");
        states.put("YT", "Yukon Territory");
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        String responseTitle = getIntent().getStringExtra("title");
        if (getSupportActionBar() != null) {
            getSupportActionBar().setTitle(responseTitle);
        }
        String[] splitTitle = responseTitle.split(", ");
        if (splitTitle.length <= 1) {
            city = splitTitle[0].replaceAll(" ", "+");
            state = splitTitle[0].replaceAll(" ", "+");
        }
        else {
            city = splitTitle[0].replaceAll(" ", "+");
            state = splitTitle[1].replaceAll(" ", "+");
        }
        setContentView(R.layout.activity_search_result);
        SearchResponse();
    }

    private void SearchResponse() {
        startProgressBar();
        RequestQueue queue = Volley.newRequestQueue(this);
        String urlTomorrowSearch = "http://angular-env.eba-8zitj2n7.us-west-1.elasticbeanstalk.com/api/products/tomorrow?checkbox=false&street=" + city +"&city=" + city + "&state=" + state;
        JsonObjectRequest tomorrowSearchRequest = new JsonObjectRequest(Request.Method.GET, urlTomorrowSearch, null,
                tomorrowSearchResponse -> {
                    String temperature = "";
                    String windSpeed = "";
                    String humidity = "";
                    String pressure = "";
                    String visibility = "";
                    String weatherCode = "";
                    title = "";
                    FloatingActionButton favorite = (FloatingActionButton) findViewById(R.id.fab);
                    try {
                        TextView searchCity = (TextView) findViewById(R.id.city_search);
                        title = tomorrowSearchResponse.getString("title");
                        title = title.split(", ")[0] + ", " + states.get(title.split(", ")[1]);
                        searchCity.setText(title);
                        if (((Global) this.getApplication()).getTomorrowTitle().contains(title)) {
                            isAddedToFav = true;
                        }

                        if (isAddedToFav) {
                            favorite.setImageDrawable(getResources().getDrawable(R.drawable.map_marker_minus));
                        }

                        if (getSupportActionBar() != null) {
                            getSupportActionBar().setTitle(title);
                            getSupportActionBar().setBackgroundDrawable(new ColorDrawable(Color.parseColor("#282424")));
                            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
                        }
                        timelines = tomorrowSearchResponse.getJSONObject("result").getJSONObject("data").getJSONArray("timelines");
                        JSONObject values = timelines.getJSONObject(0).getJSONArray("intervals").getJSONObject(0).getJSONObject("values");
                        temperature = Math.round(Double.parseDouble(values.getString("temperature"))) + "°F";
                        windSpeed = values.getString("windSpeed") + "mph";
                        humidity = values.getString("humidity") + "%";
                        pressure = values.getString("pressureSeaLevel") + "inHg";
                        visibility = values.getString("visibility") + "mi";
                        weatherCode = values.getString("weatherCode");
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    ImageView currentWeather = (ImageView) findViewById(R.id.current_weather_search);
                    currentWeather.setImageResource(urlCode(weatherCode));
                    TextView currentTemperature = (TextView) findViewById(R.id.current_temperature_search);
                    currentTemperature.setText(temperature);
                    TextView currentStatus = (TextView) findViewById(R.id.current_status_search);
                    currentStatus.setText(descriptCode(weatherCode));
                    TextView currentHumidity = (TextView) findViewById(R.id.humidity_data_search);
                    currentHumidity.setText(humidity);
                    TextView currentWind = (TextView) findViewById(R.id.wind_data_search);
                    currentWind.setText(windSpeed);
                    TextView currentVisibility = (TextView) findViewById(R.id.visibility_data_search);
                    currentVisibility.setText(visibility);
                    TextView currentPressure = (TextView) findViewById(R.id.pressure_data_search);
                    currentPressure.setText(pressure);
                    for (int i = 0; i < 7; i++) {
                        String date = "";
                        String statusCode = "";
                        String tempLow = "";
                        String tempHi = "";
                        try {
                            JSONArray intervals = timelines.getJSONObject(1).getJSONArray("intervals");
                            date = intervals.getJSONObject(i).getString("startTime").split("T")[0];
                            statusCode = intervals.getJSONObject(i).getJSONObject("values").getString("weatherCode");
                            tempLow = String.valueOf(Math.round(Double.parseDouble(intervals.getJSONObject(i).getJSONObject("values").getString("temperatureMin"))));
                            tempHi = String.valueOf(Math.round(Double.parseDouble(intervals.getJSONObject(i).getJSONObject("values").getString("temperatureMax"))));
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        TextView tableDate = (TextView) findViewById(getResId("date" + (i + 1) + "_search", R.id.class));
                        tableDate.setText(date);
                        ImageView tableStatus = (ImageView) findViewById(getResId("status" + (i + 1) + "_search", R.id.class));
                        tableStatus.setImageResource(urlCode(statusCode));
                        TextView tableLow = (TextView) findViewById(getResId("temp_low" + (i + 1) + "_search", R.id.class));
                        tableLow.setText(tempLow);
                        TextView tableHi = (TextView) findViewById(getResId("temp_high" + (i + 1) + "_search", R.id.class));
                        tableHi.setText(tempHi);

                        CardView goToDetails = (CardView) findViewById(R.id.card1_search);
                        goToDetails.setOnClickListener(v -> {
                            Intent intent = new Intent(SearchResult.this, Details.class);
                            intent.putExtra("tomorrowResponse", tomorrowSearchResponse.toString());
                            startActivity(intent);
                        });

                        favorite.setOnClickListener(v -> {
                            if (isAddedToFav) {
                                favorite.setImageDrawable(getResources().getDrawable(R.drawable.map_marker_plus));
                                isAddedToFav = false;
                                Toast.makeText(this, title + " was removed from favorites", Toast.LENGTH_SHORT).show();
                                int index = ((Global)  this.getApplication()).getTomorrowTitle().indexOf(title);
                                ((Global) this.getApplication()).getTomorrowTitle().remove(title);
                                ((Global) this.getApplication()).getTomorrowResponses().remove(index);
                            }
                            else {
                                favorite.setImageDrawable(getResources().getDrawable(R.drawable.map_marker_minus));
                                isAddedToFav = true;
                                Toast.makeText(this, title + " was added to favorites", Toast.LENGTH_SHORT).show();
                                ((Global) this.getApplication()).getTomorrowTitle().add(title);
                                ((Global) this.getApplication()).getTomorrowResponses().add(tomorrowSearchResponse);
                            }
                        });
                        stopProgressBar();
                    }
                }, TomorrowAutoError -> Log.e("tomorrow search error", TomorrowAutoError.toString()));
        queue.add(tomorrowSearchRequest);
    }

    private int urlCode(String code) {
        int url = R.drawable.clear_day;
        if (code.equals("4201")) {
            url = R.drawable.rain_heavy;
        }
        else if (code.equals("4001")) {
            url = R.drawable.rain;
        }
        else if (code.equals("4200")) {
            url = R.drawable.rain_light;
        }
        else if (code.equals("6201")) {
            url = R.drawable.freezing_rain_heavy;
        }
        else if (code.equals("6001")) {
            url = R.drawable.freezing_rain;
        }
        else if (code.equals("6200")) {
            url = R.drawable.freezing_rain_light;
        }
        else if (code.equals("6000")) {
            url = R.drawable.freezing_drizzle;
        }
        else if (code.equals("4000")) {
            url = R.drawable.drizzle;
        }
        else if (code.equals("7101")) {
            url = R.drawable.ice_pellets_heavy;
        }
        else if (code.equals("7000")) {
            url = R.drawable.ice_pellets;
        }
        else if (code.equals("7102")) {
            url = R.drawable.ice_pellets_light;
        }
        else if (code.equals("5101")) {
            url = R.drawable.snow_heavy;
        }
        else if (code.equals("5000")) {
            url = R.drawable.snow;
        }
        else if (code.equals("5100")) {
            url = R.drawable.snow_light;
        }
        else if (code.equals("5001")) {
            url = R.drawable.flurries;
        }
        else if (code.equals("8000")) {
            url = R.drawable.tstorm;
        }
        else if (code.equals("2100")) {
            url = R.drawable.fog_light;
        }
        else if (code.equals("2000")) {
            url = R.drawable.fog;
        }
        else if (code.equals("1001")) {
            url = R.drawable.cloudy;
        }
        else if (code.equals("1102")) {
            url = R.drawable.mostly_cloudy;
        }
        else if (code.equals("1101")) {
            url = R.drawable.partly_cloudy_day;
        }
        else if (code.equals("1100")) {
            url = R.drawable.mostly_clear_day;
        }
        else if (code.equals("1000")) {
            url = R.drawable.clear_day;
        }
        else if (code.equals("3000")) {
            url = R.drawable.light_wind;
        }
        else if (code.equals("3001")) {
            url = R.drawable.wind;
        }
        else if (code.equals("3002")) {
            url = R.drawable.strong_wind;
        }
        return url;
    }

    private String descriptCode(String code) {
        String descript = "";
        if (code.equals("4201")) {
            descript = "Heavy Rain";
        }
        else if (code.equals("4001")) {
            descript = "Rain";
        }
        else if (code.equals("4200")) {
            descript = "Light Rain";
        }
        else if (code.equals("6201")) {
            descript = "Heavy Freezing Rain";
        }
        else if (code.equals("6001")) {
            descript = "Freezing Rain";
        }
        else if (code.equals("6200")) {
            descript = "Light Freezing Rain";
        }
        else if (code.equals("6000")) {
            descript = "Freezing Drizzle";
        }
        else if (code.equals("4000")) {
            descript = "Drizzle";
        }
        else if (code.equals("7101")) {
            descript = "Heavy Ice Pellets";
        }
        else if (code.equals("7000")) {
            descript = "Ice Pellets";
        }
        else if (code.equals("7102")) {
            descript = "Light Ice Pellets";
        }
        else if (code.equals("5101")) {
            descript = "Heavy Snow";
        }
        else if (code.equals("5000")) {
            descript = "Snow";
        }
        else if (code.equals("5100")) {
            descript = "Light Snow";
        }
        else if (code.equals("5001")) {
            descript = "Flurries";
        }
        else if (code.equals("8000")) {
            descript = "Thunderstorm";
        }
        else if (code.equals("2100")) {
            descript = "Light Fog";
        }
        else if (code.equals("2000")) {
            descript = "Fog";
        }
        else if (code.equals("1001")) {
            descript = "Cloudy";
        }
        else if (code.equals("1102")) {
            descript = "Mostly Cloudy";
        }
        else if (code.equals("1101")) {
            descript = "Partly Cloudy";
        }
        else if (code.equals("1100")) {
            descript = "Mostly Clear";
        }
        else if (code.equals("1000")) {
            descript = "Clear";
        }
        else if (code.equals("3000")) {
            descript = "Light Wind";
        }
        else if (code.equals("3001")) {
            descript = "Wind";
        }
        else if (code.equals("3002")) {
            descript = "Strong Wind";
        }
        return descript;
    }

    public static int getResId(String resName, Class<?> c) {
        try {
            Field idField = c.getDeclaredField(resName);
            return idField.getInt(idField);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    private void startProgressBar() {
        findViewById(R.id.result_search).setVisibility(View.GONE);
        findViewById(R.id.card1_search).setVisibility(View.GONE);
        findViewById(R.id.card2_search).setVisibility(View.GONE);
        findViewById(R.id.card3_search).setVisibility(View.GONE);
        findViewById(R.id.fab).setVisibility(View.GONE);
    }

    private void stopProgressBar() {
        findViewById(R.id.progress_layout_search).setVisibility(View.GONE);
        findViewById(R.id.progress_search).setVisibility(View.GONE);
        findViewById(R.id.progress_text_search).setVisibility(View.GONE);
        findViewById(R.id.result_search).setVisibility(View.VISIBLE);
        findViewById(R.id.card1_search).setVisibility(View.VISIBLE);
        findViewById(R.id.card2_search).setVisibility(View.VISIBLE);
        findViewById(R.id.card3_search).setVisibility(View.VISIBLE);
        findViewById(R.id.fab).setVisibility(View.VISIBLE);
    }
}