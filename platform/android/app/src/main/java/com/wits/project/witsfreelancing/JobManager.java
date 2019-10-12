package com.wits.project.witsfreelancing;

import android.content.ContentValues;

public class JobManager {

    public static String LINK = "http://1627982.ms.wits.ac.za/~student/Job.php";

    public static void postJob(int JOB_EMPLOYER_ID, String JOB_TITLE, String JOB_DESCRIPTION,
                               int JOB_AMOUNT_RANGE_LOW, int JOB_AMOUNT_RANGE_HIGH, String JOB_DUE_DATE_TIME,
                               String JOB_LOCATION, String JOB_CATEGORY){

        ContentValues cv = new ContentValues();
        cv.put("ACTION", 0);
        cv.put("JOB_EMPLOYER_ID", 1627982);
        cv.put("JOB_TITLE", JOB_TITLE);
        cv.put("JOB_DESCRIPTION", JOB_DESCRIPTION);
        cv.put("JOB_AMOUNT_RANGE_LOW", JOB_AMOUNT_RANGE_LOW);
        cv.put("JOB_AMOUNT_RANGE_HIGH", JOB_AMOUNT_RANGE_HIGH);
        cv.put("JOB_DUE_DATE_TIME", JOB_DUE_DATE_TIME);
        cv.put("JOB_LOCATION", JOB_LOCATION);
        cv.put("JOB_CATEGORY", JOB_CATEGORY);

        new ServerCommunicator(cv) {
            @Override
            protected void onPostExecute(String output) {

            }
        }.execute(LINK);
    }

    public static void viewAllJobs(){
        ContentValues cv = new ContentValues();
        cv.put("ACTION", 1);
        new ServerCommunicator(cv) {
            @Override
            protected void onPostExecute(String output) {

            }
        }.execute(LINK);
    }

    public static void assignJob(int JOB_ID, int JOB_EMPLOYEE_ID){
        ContentValues cv = new ContentValues();
        cv.put("ACTION", 3);
        cv.put("JOB_ID", JOB_ID);
        cv.put("JOB_EMPLOYEE_ID", JOB_EMPLOYEE_ID);
        new ServerCommunicator(cv) {
            @Override
            protected void onPostExecute(String output) {

            }
        }.execute(LINK);
    }

    public static void pay(int JOB_ID){
        ContentValues cv = new ContentValues();
        cv.put("ACTION", 4);
        cv.put("JOB_ID", JOB_ID);
        new ServerCommunicator(cv) {
            @Override
            protected void onPostExecute(String output) {

            }
        }.execute(LINK);
    }

    public static void jobComplete(int JOB_ID){
        ContentValues cv = new ContentValues();
        cv.put("ACTION", 5);
        cv.put("JOB_ID", JOB_ID);
        new ServerCommunicator(cv) {
            @Override
            protected void onPostExecute(String output) {

            }
        }.execute(LINK);
    }

    public static void viewMyJobs(int JOB_EMPLOYER_ID){
        ContentValues cv = new ContentValues();
        cv.put("ACTION", 6);
        cv.put("JOB_EMPLOYER_ID", JOB_EMPLOYER_ID);
        new ServerCommunicator(cv) {
            @Override
            protected void onPostExecute(String output) {

            }
        }.execute(LINK);
    }

    public static void viewOfferedJobs(int JOB_EMPLOYEE_ID){
        ContentValues cv = new ContentValues();
        cv.put("ACTION", 7);
        cv.put("JOB_EMPLOYEE_ID", JOB_EMPLOYEE_ID);
        new ServerCommunicator(cv) {
            @Override
            protected void onPostExecute(String output) {

            }
        }.execute(LINK);
    }
}
