package com.example.weatherapp;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.highsoft.highcharts.common.*;
import com.highsoft.highcharts.common.hichartsclasses.*;
import com.highsoft.highcharts.core.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link Weekly#newInstance} factory method to
 * create an instance of this fragment.
 */
public class Weekly extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private JSONObject tomorrowResponse;

    public Weekly() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment Weekly.
     */
    // TODO: Rename and change types and number of parameters
    public static Weekly newInstance(String param1, String param2) {
        Weekly fragment = new Weekly();
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
        // Inflate the layout for this fragment
        View inf = inflater.inflate(R.layout.fragment_weekly, container, false);
        if (getArguments() != null) {
            JSONArray intervals = new JSONArray();
            try {
                tomorrowResponse = new JSONObject(getArguments().getString("tomorrowResponse"));
                JSONArray timelines = tomorrowResponse.getJSONObject("result").getJSONObject("data").getJSONArray("timelines");
                intervals = timelines.getJSONObject(1).getJSONArray("intervals");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            HIChartView chartView = (HIChartView) inf.findViewById(R.id.hc);
            HIOptions options = new HIOptions();
            HIChart chart = new HIChart();
            chart.setType("arearange");
            chart.setZoomType("x");
            options.setChart(chart);

            HIPlotOptions plotOptions = new HIPlotOptions();
            HIArearange arearange = new HIArearange();

            HIGradient gradient = new HIGradient(0, 0.5f, 1, 1);

            LinkedList<HIStop> stops = new LinkedList<>();
            stops.add(new HIStop(0, HIColor.initWithRGBA(215,178,136,0.7)));
            stops.add(new HIStop(1, HIColor.initWithRGBA(47, 126, 216, 0.7)));

            arearange.setColor((HIColor.initWithLinearGradient(gradient, stops)));
            plotOptions.setArearange(arearange);
            options.setPlotOptions(plotOptions);

            HITitle title = new HITitle();
            title.setText("Temperature variation by day");
            options.setTitle(title);

            HIXAxis xaxis = new HIXAxis();
            xaxis.setTickInterval(2);
            options.setXAxis(new ArrayList<HIXAxis>() {{
                add(xaxis);
            }});

            HIYAxis yaxis = new HIYAxis();
            yaxis.setTitle(new HITitle());
            yaxis.setTickInterval(5);
            options.setYAxis(new ArrayList<HIYAxis>() {{
                add(yaxis);
            }});

            HITooltip tooltip = new HITooltip();
            tooltip.setShadow(true);
            tooltip.setValueSuffix("°F");
            options.setTooltip(tooltip);

            HILegend legend = new HILegend();
            legend.setEnabled(false);
            options.setLegend(legend);

            HIArearange series = new HIArearange();
            series.setName("Temperatures");

            Object[][] seriesData = new Object[15][];

            for (int i = 0; i < 15; i++) {
                try {
                    String date = intervals.getJSONObject(i).getString("startTime").split("T")[0];
                    double tempLow = Double.parseDouble(intervals.getJSONObject(i).getJSONObject("values").getString("temperatureMin"));
                    double tempHi = Double.parseDouble(intervals.getJSONObject(i).getJSONObject("values").getString("temperatureMax"));
                    seriesData[i] = new Object[]{date, tempLow, tempHi};
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            series.setData(new ArrayList<>(Arrays.asList(seriesData)));
            options.setSeries(new ArrayList<>(Arrays.asList(series)));

            chartView.setOptions(options);
        }
        return inf;
    }
}