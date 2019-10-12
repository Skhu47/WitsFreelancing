package com.wits.project.witsfreelancing;

import android.content.ContentValues;

public class BidManager {

    private static String LINK = "http://1627982.ms.wits.ac.za/~student/Bid.php";

    static void PostBid(int JOB_ID, int BIDDER_ID, int BID_SUGGESTED_AMOUNT, String BID_MESSAGE){
        ContentValues cv = new ContentValues();
        cv.put("ACTION", 0);
        cv.put("JOB_ID", JOB_ID);
        cv.put("BIDDER_ID", BIDDER_ID);
        cv.put("BID_SUGGESTED_AMOUNT", BID_SUGGESTED_AMOUNT);
        cv.put("BID_MESSAGE", BID_MESSAGE);

        new ServerCommunicator(cv) {
            @Override
            protected void onPostExecute(String output) {
            }
        }.execute(LINK);
    }

    public static void ViewAllBids(int JOB_ID){
        ContentValues cv = new ContentValues();
        cv.put("JOB_ID", JOB_ID);
        new ServerCommunicator(cv) {
            @Override
            protected void onPostExecute(String output) {
            }
        }.execute(LINK);
    }
}
