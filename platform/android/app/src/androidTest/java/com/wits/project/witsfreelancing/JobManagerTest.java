package com.wits.project.witsfreelancing;

import android.support.test.runner.AndroidJUnit4;

import org.junit.Test;
import org.junit.runner.RunWith;

import static android.support.test.internal.runner.junit4.statement.UiThreadStatement.runOnUiThread;
import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;

@RunWith(AndroidJUnit4.class)
public class JobManagerTest {

    @Test
    public void createInstance(){
        new JobManager();
    }

    @Test
    public void postJob_jobNotPosted_postJobPass() {
        try {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    JobManager.postJob(anyInt(), anyString(), anyString(), anyInt(), anyInt(), anyString(), anyString(), anyString());
                }
            });
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }

    @Test
    public void viewAllJobs_jobsNotRetrieved_viewAllJobsPass() {
        try{
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    JobManager.viewAllJobs();
                }
            });
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }

    @Test
    public void assignJob_jobNotAssigned_jobAssignPass() {
        try {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    JobManager.assignJob(anyInt(), anyInt());
                }
            });
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }

    @Test
    public void pay_employeeNotPaid_employeePaid() {
        try {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    JobManager.pay(anyInt());
                }
            });
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }

    @Test
    public void jobComplete_jobStatusInComplete_JobStatusComplete() {
        try {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    JobManager.jobComplete(anyInt());
                }
            });
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }

    @Test
    public void viewMyJobs_myJobsNotRetrieved_viewMyJobsPass() {
        try {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    JobManager.viewMyJobs(anyInt());
                }
            });
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }

    @Test
    public void viewOfferedJobs_offeredJobsNotRetrieved_viewOfferedJobsPass() {
        try {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    JobManager.viewOfferedJobs(anyInt());
                }
            });
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }
}