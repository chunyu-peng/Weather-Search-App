package com.example.weatherapp;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.tabs.TabLayout;

import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;
import androidx.viewpager.widget.ViewPager;
import androidx.appcompat.app.AppCompatActivity;

import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.weatherapp.ui.main.SectionsPagerAdapter;
import com.example.weatherapp.databinding.ActivityDetailsBinding;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class Details extends AppCompatActivity {

    private ActivityDetailsBinding binding;
    private JSONObject tomorrowResponse;
    public static Map<String, String> states;
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

        String responseTitle = "";
        String temperature = "";
        try {
            tomorrowResponse = new JSONObject(getIntent().getStringExtra("tomorrowResponse"));
            JSONArray timelines = tomorrowResponse.getJSONObject("result").getJSONObject("data").getJSONArray("timelines");
            JSONObject values = timelines.getJSONObject(0).getJSONArray("intervals").getJSONObject(0).getJSONObject("values");
            temperature = values.getString("temperature");
            responseTitle = tomorrowResponse.getString("title");
            String responseState = responseTitle.split(", ")[1];
            responseTitle = responseTitle.split(", ")[0] + ", " + ((responseState.length() == 2) ? states.get(responseState) : responseState);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        binding = ActivityDetailsBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        SectionsPagerAdapter sectionsPagerAdapter = null;
        try {
            sectionsPagerAdapter = new SectionsPagerAdapter(this, getSupportFragmentManager(), tomorrowResponse.toString());
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ViewPager viewPager = binding.viewPager;
        viewPager.setAdapter(sectionsPagerAdapter);
        TabLayout tabs = binding.tabs;
        tabs.setupWithViewPager(viewPager);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setTitle(responseTitle);
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        }

        ImageButton twitter = (ImageButton) findViewById(R.id.twitter);
        String tweet = "Check out " + responseTitle + "'s weather! It's " + temperature + "°F!\n";
        twitter.setOnClickListener(v -> {
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://twitter.com/intent/tweet?text=" + tweet + "&hashtags=CSCI571WeatherSearch"));
            startActivity(browserIntent);
        });
    }
}