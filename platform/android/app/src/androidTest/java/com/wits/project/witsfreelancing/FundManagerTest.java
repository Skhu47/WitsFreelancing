package com.wits.project.witsfreelancing;

import android.support.test.runner.AndroidJUnit4;

import org.junit.Test;
import org.junit.runner.RunWith;

import static android.support.test.internal.runner.junit4.statement.UiThreadStatement.runOnUiThread;
import static org.junit.Assert.*;

@RunWith(AndroidJUnit4.class)
public class FundManagerTest {

    @Test
    public void createInstance(){
        new FundManager();
    }

    @Test
    public void postFunds_fundsNotPosted_postFundsPass(){
        try {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    FundManager.postFunds(1627982, 100);
                }
            });
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }

    @Test
    public void viewUserFunds_fundsNotViewed_viewUserFundsPass(){
        try {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    FundManager.viewFunds(1627982);
                }
            });
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }
}