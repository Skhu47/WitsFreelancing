package com.wits.project.witsfreelancing;

import android.content.ContentValues;

public class RateManager {

    private static String LINK = "http://1627982.ms.wits.ac.za/~student/Rate.php";

    public static void rate(int JOB_ID, int RATER, int RATING){
        ContentValues cv = new ContentValues();
        cv.put("ACTION", 0);
        cv.put("JOB_ID", JOB_ID);
        cv.put("RATER", RATER);
        cv.put("RATING", RATING);

        new ServerCommunicator(cv) {
            @Override
            protected void onPostExecute(String output) {

            }
        }.execute(LINK);
    }
}
