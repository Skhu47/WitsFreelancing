package com.wits.project.witsfreelancing;

import android.support.test.runner.AndroidJUnit4;

import org.junit.Test;
import org.junit.runner.RunWith;

import static android.support.test.InstrumentationRegistry.getInstrumentation;
import static android.support.test.internal.runner.junit4.statement.UiThreadStatement.runOnUiThread;
import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;

@RunWith(AndroidJUnit4.class)
public class ComplaintManagerTest {

    @Test
    public void createInstance(){
        new ComplaintManager();
    }

    @Test
    public void postComplaint_complaintNotPosted_ComplaintPostPass() {
        getInstrumentation().runOnMainSync(new Runnable() {
            @Override
            public void run() {
                ComplaintManager.postComplaint(anyInt(), anyInt(), anyString());
            }
        });
    }
}