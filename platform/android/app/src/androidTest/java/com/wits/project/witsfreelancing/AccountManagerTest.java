package com.wits.project.witsfreelancing;

import android.support.test.runner.AndroidJUnit4;

import org.junit.Test;
import org.junit.runner.RunWith;

import static android.support.test.InstrumentationRegistry.getInstrumentation;
import static android.support.test.internal.runner.junit4.statement.UiThreadStatement.runOnUiThread;

@RunWith(AndroidJUnit4.class)
public class AccountManagerTest {

    @Test
    public void createInstance(){
        new AccountManager();
    }

    @Test
    public void logIn_notLoggedIn_loginFails(){
        getInstrumentation().runOnMainSync(new Runnable() {
            @Override
            public void run() {
                AccountManager.logIn("wrong user", "wrong pass");
            }
        });
        /*
        try{
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    AccountManager.logIn("wrong user", "wrong pass");
                }
            });
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }*/
    }

    @Test
    public void login_notLoggedIn_loginPass(){
        try {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    AccountManager.logIn("1627982", "mulisa6854727");
                }
            });
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }

}