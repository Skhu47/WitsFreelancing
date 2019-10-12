package com.wits.project.witsfreelancing;

import android.content.ContentValues;

public class ComplaintManager {

    private static String LINK = "http://1627982.ms.wits.ac.za/~student/Complaint.php";

    public static void postComplaint(int JOB_ID, int COMPLAINT_TYPE, String COMPLAINT_MESSAGE){
        ContentValues cv = new ContentValues();
        cv.put("ACTION", 0);
        cv.put("JOB_ID", JOB_ID);
        cv.put("COMPLAINT_TYPE", COMPLAINT_TYPE);
        cv.put("COMPLAINT_MESSAGE", COMPLAINT_MESSAGE);

        new ServerCommunicator(cv) {
            @Override
            protected void onPostExecute(String output) {
            }
        }.execute(LINK);
    }
}
