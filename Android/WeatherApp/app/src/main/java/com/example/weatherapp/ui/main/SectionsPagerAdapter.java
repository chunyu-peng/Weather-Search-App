package com.example.weatherapp.ui.main;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.style.DynamicDrawableSpan;
import android.text.style.ImageSpan;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.annotation.StringRes;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

import com.example.weatherapp.R;
import com.example.weatherapp.Today;
import com.example.weatherapp.WeatherData;
import com.example.weatherapp.Weekly;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * A [FragmentPagerAdapter] that returns a fragment corresponding to
 * one of the sections/tabs/pages.
 */
public class SectionsPagerAdapter extends FragmentPagerAdapter {

    @StringRes
    private static final int[] TAB_TITLES = new int[]{R.string.tab_text_1, R.string.tab_text_2, R.string.tab_text_3};
    private final Context mContext;
    private JSONObject tomorrowResponse;
    private Drawable drawable;
    private String title;

    public SectionsPagerAdapter(Context context, FragmentManager fm, String res) throws JSONException {
        super(fm);
        mContext = context;
        tomorrowResponse = new JSONObject(res);
    }

    @Override
    public Fragment getItem(int position) {
        // getItem is called to instantiate the fragment for the given page.
        // Return a PlaceholderFragment (defined as a static inner class below).
        Fragment fragment = new Fragment();
        Bundle bundle = new Bundle();
        bundle.putString("tomorrowResponse", String.valueOf(tomorrowResponse));
        switch (position) {
            case 0:
                fragment = new Today();
                fragment.setArguments(bundle);
                break;
            case 1:
                fragment = new Weekly();
                fragment.setArguments(bundle);
                break;
            case 2:
                fragment = new WeatherData();
                fragment.setArguments(bundle);
                break;
        }
        return fragment;
    }

    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
        switch (position) {
            case 0:
                drawable = mContext.getResources().getDrawable(R.drawable.calendar_today);
                title = mContext.getResources().getString(TAB_TITLES[position]);
                break;
            case 1:
                drawable = mContext.getResources().getDrawable(R.drawable.trending_up);
                title = mContext.getResources().getString(TAB_TITLES[position]);
                break;
            case 2:
                drawable = mContext.getResources().getDrawable(R.drawable.thermometer_low_white);
                title = mContext.getResources().getString(TAB_TITLES[position]);
                break;
        }
        SpannableStringBuilder sb = new SpannableStringBuilder(" \n" + title);
        try {
            drawable.setBounds(5, 5, drawable.getIntrinsicWidth(), drawable.getIntrinsicHeight());
            ImageSpan span = new ImageSpan(drawable, DynamicDrawableSpan.ALIGN_CENTER);
            sb.setSpan(span, 0, 1, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sb;
    }

    @Override
    public int getCount() {
        return 3;
    }
}