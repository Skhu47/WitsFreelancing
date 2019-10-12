package com.wits.project.witsfreelancing;

import android.support.test.runner.AndroidJUnit4;

import org.junit.Test;
import org.junit.runner.RunWith;

import static android.support.test.internal.runner.junit4.statement.UiThreadStatement.runOnUiThread;
import static org.mockito.ArgumentMatchers.anyString;

@RunWith(AndroidJUnit4.class)
public class BidManagerTest {

    @Test
    public void createInstance(){
        new BidManager();
    }

    @Test
    public void postBid_bidNotPosted_postBidPass(){
        try {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    BidManager.PostBid(1, 1627982, 200, anyString());
                }
            });
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }

    @Test
    public void viewAllBids_bidsNotViewed_viewBidsPass(){
        try {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    BidManager.ViewAllBids(1);
                }
            });
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }
}