package com.example.weatherapp;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;

import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Field;
import java.util.Objects;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link Current#newInstance} factory method to
 * create an instance of this fragment.
 */
public class Current extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private JSONObject tomorrowAutoResponse;

    public Current() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment Current.
     */
    // TODO: Rename and change types and number of parameters
    public static Current newInstance(String param1, String param2) {
        Current fragment = new Current();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View inf = inflater.inflate(R.layout.fragment_current, container, false);
        String temperature = "";
        String windSpeed = "";
        String humidity = "";
        String pressure = "";
        String visibility = "";
        String weatherCode = "";
        JSONArray timelines = new JSONArray();
        if (getActivity() != null) {
            tomorrowAutoResponse = ((Global) getActivity().getApplication()).getTomorrowResponses().get(0);
        }
        try {
            TextView autoCity = (TextView) inf.findViewById(R.id.city);
            autoCity.setText(tomorrowAutoResponse.getString("title"));
            timelines = tomorrowAutoResponse.getJSONObject("result").getJSONObject("data").getJSONArray("timelines");
            JSONObject values = timelines.getJSONObject(0).getJSONArray("intervals").getJSONObject(0).getJSONObject("values");
            temperature = Math.round(Double.parseDouble(values.getString("temperature")))  + "°F";
            windSpeed = values.getString("windSpeed") + "mph";
            humidity = values.getString("humidity") + "%";
            pressure = values.getString("pressureSeaLevel") + "inHg";
            visibility = values.getString("visibility") + "mi";
            weatherCode = values.getString("weatherCode");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ImageView currentWeather = (ImageView) inf.findViewById(R.id.current_weather);
        currentWeather.setImageResource(urlCode(weatherCode));
        TextView currentTemperature = (TextView) inf.findViewById(R.id.current_temperature);
        currentTemperature.setText(temperature);
        TextView currentStatus = (TextView) inf.findViewById(R.id.current_status);
        currentStatus.setText(descriptCode(weatherCode));
        TextView currentHumidity = (TextView) inf.findViewById(R.id.humidity_data);
        currentHumidity.setText(humidity);
        TextView currentWind = (TextView) inf.findViewById(R.id.wind_data);
        currentWind.setText(windSpeed);
        TextView currentVisibility = (TextView) inf.findViewById(R.id.visibility_data);
        currentVisibility.setText(visibility);
        TextView currentPressure = (TextView) inf.findViewById(R.id.pressure_data);
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
            TextView tableDate = (TextView) inf.findViewById(getResId("date" + (i + 1), R.id.class));
            tableDate.setText(date);
            ImageView tableStatus = (ImageView) inf.findViewById(getResId("status" + (i + 1), R.id.class));
            tableStatus.setImageResource(urlCode(statusCode));
            TextView tableLow = (TextView) inf.findViewById(getResId("temp_low" + (i + 1), R.id.class));
            tableLow.setText(tempLow);
            TextView tableHi = (TextView) inf.findViewById(getResId("temp_high" + (i + 1), R.id.class));
            tableHi.setText(tempHi);

            CardView goToDetails = (CardView) inf.findViewById(R.id.card1);
            goToDetails.setOnClickListener(v -> {
                Intent intent = new Intent(getActivity().getApplicationContext(), Details.class);
                intent.putExtra("tomorrowResponse", tomorrowAutoResponse.toString());
                startActivity(intent);
            });
        }
        return inf;
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
}