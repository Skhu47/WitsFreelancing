package com.wits.project.witsfreelancing;

import android.content.ContentValues;

public class AccountManager {

    public static void logIn(String user, String pass){
        ContentValues cv = new ContentValues();
        cv.put("USERNAME", user);
        cv.put("PASSWORD", pass);

        new ServerCommunicator(cv) {
            @Override
            protected void onPostExecute(String output) {
                System.out.println(output);
            }
        }.execute("http://1627982.ms.wits.ac.za/~student/auth.php");
    }
}
