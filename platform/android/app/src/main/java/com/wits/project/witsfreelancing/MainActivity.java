package com.wits.project.witsfreelancing;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        WebView browser = findViewById(R.id.webView);
        loadHomePage(browser);
    }

    public static void loadHomePage(WebView browser){
        browser.loadUrl("www/html/index.html");
    }

}
