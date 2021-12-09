package com.example.weatherapp;

import android.content.Intent;
import android.os.Bundle;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.RequestFuture;
import com.android.volley.toolbox.Volley;
import com.example.weatherapp.ui.main.FavoritesPagerAdapter;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.tabs.TabLayout;

import androidx.appcompat.widget.SearchView;
import androidx.appcompat.widget.Toolbar;
import androidx.cardview.widget.CardView;
import androidx.viewpager.widget.ViewPager;
import androidx.appcompat.app.AppCompatActivity;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import com.example.weatherapp.ui.main.SectionsPagerAdapter;
import com.example.weatherapp.databinding.ActivityMainBinding;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class MainActivity extends AppCompatActivity {

    private ActivityMainBinding binding;
    private ListView listView;
    private HashMap<String, String> autoComplete;
    private ArrayAdapter<String> arrayAdapter;
    public static Map<String, String> states;
    private FavoritesPagerAdapter favoritesPagerAdapter;
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

        autoResponse();

        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        Toolbar toolbar = findViewById(R.id.bar);
        setSupportActionBar(toolbar);
    }

    private void autoResponse() {
        RequestQueue queue = Volley.newRequestQueue(getApplicationContext());
        String urlIpinfo = "https://ipinfo.io/?token=65c38dc00ac738";
        JsonObjectRequest ipinfoRequest = new JsonObjectRequest(Request.Method.GET, urlIpinfo, null,
                ipinfoResponse -> {
                    String loc = "";
                    String city = "";
                    String region = "";
                    String country = "";
                    try {
                        loc = ipinfoResponse.getString("loc");
                        city = ipinfoResponse.getString("city").replaceAll(" ", "+");
                        region = ipinfoResponse.getString("region").replaceAll(" ", "+");
                        country = ipinfoResponse.getString("country");
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    String urlTomorrowAuto = "http://csci571hw8.us-west-1.elasticbeanstalk.com/api/products/tomorrow?checkbox=true&loc=" + loc + "&autocity=" + city + "&region=" + region + "&country=" + country;
                    JsonObjectRequest tomorrowAutoRequest = new JsonObjectRequest(Request.Method.GET, urlTomorrowAuto, null,
                            tomorrowAutoResponse -> {
                                if (((Global) this.getApplication()).getNumTabs() == 0) {
                                    ((Global) this.getApplication()).getTomorrowTitle().add("Auto Location");
                                    ((Global) this.getApplication()).getTomorrowResponses().add(tomorrowAutoResponse);
                                }
                                else {
                                    ((Global) this.getApplication()).getTomorrowTitle().set(0, "Auto Location");
                                    ((Global) this.getApplication()).getTomorrowResponses().set(0, tomorrowAutoResponse);
                                }
                                favoritesPagerAdapter = new FavoritesPagerAdapter(this, getSupportFragmentManager());
                                ViewPager viewPager = binding.viewPager;
                                viewPager.setOffscreenPageLimit(10);
                                viewPager.setAdapter(favoritesPagerAdapter);
                                TabLayout tabs = (TabLayout) findViewById(R.id.fav_tabs);
                                tabs.setupWithViewPager(viewPager);
                                stopProgressBar();
                            }, TomorrowAutoError -> Log.e("tomorrow auto error", TomorrowAutoError.toString()));
                    queue.add(tomorrowAutoRequest);
                }, ipinfoError -> Log.e("ipinfo error", ipinfoError.toString()));
        queue.add(ipinfoRequest);
    }

    private void stopProgressBar() {
        findViewById(R.id.progress_layout).setVisibility(View.GONE);
        findViewById(R.id.progress).setVisibility(View.GONE);
        findViewById(R.id.progress_text).setVisibility(View.GONE);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu, menu);
        MenuItem menuItem = menu.findItem(R.id.search);
        SearchView searchView = (SearchView) menuItem.getActionView();
        searchView.setQueryHint("Search...");

        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                Intent intent = new Intent(MainActivity.this, SearchResult.class);
                intent.putExtra("title", query);
                startActivity(intent);
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                autoComplete = new HashMap<>();
                listView = (ListView) findViewById(R.id.listView);
                RequestQueue queue = Volley.newRequestQueue(MainActivity.this);
                String urlAutoComplete = "http://csci571hw8.us-west-1.elasticbeanstalk.com/api/products/autocomplete?city=" + newText;
                JsonObjectRequest autoCompleteRequest = new JsonObjectRequest(Request.Method.GET, urlAutoComplete, null,
                        autoCompleteResponse -> {
                            int length = 0;
                            try {
                                length = autoCompleteResponse.getJSONArray("predictions").length();
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                            for (int i = 0; i < length; i++) {
                                String city = "";
                                String state = "";
                                try {
                                    city = autoCompleteResponse.getJSONArray("predictions").getJSONObject(i).getJSONArray("terms").getJSONObject(0).getString("value");
                                    state = autoCompleteResponse.getJSONArray("predictions").getJSONObject(i).getJSONArray("terms").getJSONObject(1).getString("value");
                                    state = states.get(state);
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                if (!autoComplete.containsKey(city)) {
                                    boolean check = false;
                                    String autoList = city + ", " + autoComplete.get(city);
                                    for (int j = 0; j < newText.length(); j++) {
                                        if (Character.toLowerCase(autoList.charAt(j)) == Character.toLowerCase(newText.charAt(j))) {
                                            check = true;
                                        }
                                        else {
                                            check = false;
                                            break;
                                        }
                                    }
                                    if (check) {
                                        autoComplete.put(city, state);
                                    }
                                }
                                String[] cities = new String[autoComplete.size()];
                                int index = 0;
                                for (String key : autoComplete.keySet()) {
                                    cities[index] = key + ", " + autoComplete.get(key);
                                    index++;
                                }
                                arrayAdapter = new ArrayAdapter<>(MainActivity.this, R.layout.text, cities);
                                listView.setAdapter(arrayAdapter);
                                listView.setOnItemClickListener((parent, view, position, id) -> {
                                    searchView.setQuery(cities[position], false);
                                    arrayAdapter = new ArrayAdapter<>(MainActivity.this, R.layout.text, new String[0]);
                                    listView.setAdapter(arrayAdapter);
                                });
                            }
                        }, autoCompleteError -> Log.e("autocomplete error", autoCompleteError.toString()));
                queue.add(autoCompleteRequest);
                return false;
            }
        });
        return super.onCreateOptionsMenu(menu);
    }

    public FavoritesPagerAdapter getAdapter() {
        return favoritesPagerAdapter;
    }
}
