package com.wits.project.witsfreelancing;

import android.support.test.runner.AndroidJUnit4;

import org.junit.Test;
import org.junit.runner.RunWith;

import static android.support.test.InstrumentationRegistry.getInstrumentation;
import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.anyInt;

@RunWith(AndroidJUnit4.class)
public class RateManagerTest {

    @Test
    public void createInstance(){
        new RateManager();
    }

    @Test
    public void rate(){
        getInstrumentation().runOnMainSync(new Runnable() {
            @Override
            public void run() {
                RateManager.rate(anyInt(), anyInt(), anyInt());
            }
        });
    }

}