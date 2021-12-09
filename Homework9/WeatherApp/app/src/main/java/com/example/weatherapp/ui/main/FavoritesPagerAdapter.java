package com.example.weatherapp.ui.main;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.style.DynamicDrawableSpan;
import android.text.style.ImageSpan;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.StringRes;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;
import androidx.fragment.app.FragmentStatePagerAdapter;
import androidx.viewpager.widget.PagerAdapter;

import com.example.weatherapp.Current;
import com.example.weatherapp.Favorites;
import com.example.weatherapp.Global;
import com.example.weatherapp.MainActivity;
import com.example.weatherapp.R;
import com.example.weatherapp.Today;
import com.example.weatherapp.WeatherData;
import com.example.weatherapp.Weekly;
import com.google.android.material.tabs.TabLayout;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.TreeSet;

public class FavoritesPagerAdapter extends FragmentStatePagerAdapter {

    @StringRes
    private static final int[] TAB_TITLES = new int[]{R.string.tab_text_4};
    private final Context mContext;
    private final FragmentManager fm;

    public FavoritesPagerAdapter(Context context, FragmentManager fm) {
        super(fm);
        this.fm = fm;
        mContext = context;
    }

    @Override
    public int getItemPosition(Object object){
        return PagerAdapter.POSITION_NONE;
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        // getItem is called to instantiate the fragment for the given page.
        // Return a PlaceholderFragment (defined as a static inner class below).
        Fragment fragment = new Fragment();
        Bundle bundle = new Bundle();
        bundle.putInt("position", position);
        switch (position) {
            case 0:
                fragment = new Current();
                break;
            default:
                fragment = new Favorites();
                fragment.setArguments(bundle);
                break;
        }
        return fragment;
    }

    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
        return mContext.getResources().getString(TAB_TITLES[0]);
    }

    @Override
    public int getCount() {
        return ((Global) mContext.getApplicationContext()).getNumTabs();
    }
}