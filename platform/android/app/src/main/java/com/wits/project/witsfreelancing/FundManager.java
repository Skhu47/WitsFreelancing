package com.wits.project.witsfreelancing;

import android.content.ContentValues;

public class FundManager {

    private static String LINK = "http://1627982.ms.wits.ac.za/~student/Fund.php";

    public static void postFunds(int FUND_STUD_ID, int FUND_AMOUNT){
        ContentValues cv = new ContentValues();
        cv.put("ACTION", 0);
        cv.put("FUND_STUD_ID", FUND_STUD_ID);
        cv.put("FUND_AMOUNT", FUND_AMOUNT);

        new ServerCommunicator(cv) {
            @Override
            protected void onPostExecute(String output) {
            }
        }.execute(LINK);
    }

    public static void viewFunds(int FUND_STUD_ID){
        ContentValues cv = new ContentValues();
        cv.put("ACTION", 2);
        cv.put("FUND_STUD_ID", FUND_STUD_ID);

        new ServerCommunicator(cv) {
            @Override
            protected void onPostExecute(String output) {
            }
        }.execute(LINK);
    }

}
