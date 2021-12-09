package com.example.weatherapp;

import android.app.Application;

import org.json.JSONObject;

import java.util.ArrayList;

public class Global extends Application {
    private final ArrayList<String> tomorrowTitle = new ArrayList<>();
    private final ArrayList<JSONObject> tomorrowResponses = new ArrayList<>();

    public ArrayList<String> getTomorrowTitle() {
        return tomorrowTitle;
    }

    public int getNumTabs() {
        return tomorrowTitle.size();
    }

    public ArrayList<JSONObject> getTomorrowResponses() {
        return tomorrowResponses;
    }
}
