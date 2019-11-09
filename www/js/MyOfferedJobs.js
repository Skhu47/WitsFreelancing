$(document).on("deviceready", () =>{

    let modal, close;

    initRateBar();

    populateWithMyOfferedJobs();

    function initRateBar() {
        modal = document.getElementById("rateBar");
        close = document.getElementsByClassName("close")[0];

        close.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    function populateWithMyOfferedJobs() {
        let jobsHolder = document.getElementById("jobsHolder");
        jobsHolder.innerHTML = "";

        const options = {
            method: "post",
            timeout: 10000,
            data: {
                ACTION: 7,
                JOB_EMPLOYEE_ID: localStorage.getItem("Stud_No")
            }
        };

        const url = "http://1627982.ms.wits.ac.za/~student/Job.php";

        cordova.plugin.http.sendRequest(url, options,
            function (response) {
                let results = response.data;

                let output = JSON.parse(results);

                for (let i = 0; i < output.length; i++){
                    let job = output[i];

                    let jobStatus = "";
                    let className = "";

                    if(job["JOB_STATUS"] === "1") {
                        jobStatus = "Assigned";
                        className = "brownTag";
                    }
                    else if(job["JOB_STATUS"] === "2") {
                        jobStatus = "Complete";
                        className = "greenTag";
                    }
                    else if(job["JOB_STATUS"] === "3") {
                        jobStatus = "Paid";
                        className= "redTag";
                    }

                    let li = document.createElement("li");
                    let div = document.createElement("div");

                    div.classList.add("card");

                    div.innerHTML =
                        "<p class='title'>" + job["JOB_TITLE"] +
                        "</p>"+
                        "<p class='category'>Job Category: " + job["JOB_CATEGORY"]+
                        "</p>"+
                        "<p class='payment'>Job Description:<br/>" + job["JOB_DESCRIPTION"]+
                        "</p>"+
                        "<p class='payment'>Payment Range: " + "R"+job["JOB_AMOUNT_RANGE_LOW"]+" - R" + job["JOB_AMOUNT_RANGE_HIGH"]+
                        "</p>"+
                        "<p class='deadLine'>Job Deadline: " + job["JOB_DUE_DATE_TIME"] +
                        "</p>";

                    if(job["JOB_STATUS"] === "1") {
                        let complete = document.createElement("button");
                        complete.innerText = "Complete";
                        div.appendChild(complete);
                        complete.addEventListener("click", function () {
                            jobComplete(job["JOB_ID"]);
                        });
                    }

                    if (className === "redTag"){

                        let complaint = document.createElement("button");
                        complaint.innerText = "Complaint";
                        complaint.style.marginLeft = "10px";
                        div.appendChild(complaint);

                        complaint.addEventListener("click", function () {
                            postComplaint(job["JOB_ID"], localStorage.getItem("Stud_No"));
                        });

                        let rate = document.createElement("button");
                        rate.innerText = "Rate";
                        rate.style.marginLeft = "10px";
                        div.appendChild(rate);
                        rate.addEventListener("click", () => {
                            modal.style.display = "block";
                            handleRating(job["JOB_ID"], localStorage.getItem("Stud_No"));
                        });

                    }
                    li.appendChild(div);
                    jobsHolder.appendChild(li);
                }
            },
            function (response) {
                showToast("Failed to retrieve jobs");
            },
            function (response) {
                showToast("Failed to retrieve jobs");
            });
    }

    function handleRating(jobId, stdNo) {
        let star = 0;
        let rateButton = document.getElementById("rateButton");

        let starButton1 = document.getElementById("star1");
        let starButton2 = document.getElementById("star2");
        let starButton3 = document.getElementById("star3");
        let starButton4 = document.getElementById("star4");
        let starButton5 = document.getElementById("star5");

        starButton1.addEventListener("click", () => {star = 1});
        starButton2.addEventListener("click", () => {star = 2});
        starButton3.addEventListener("click", () => {star = 3});
        starButton4.addEventListener("click", () => {star = 4});
        starButton5.addEventListener("click", () => {star = 5});

        rateButton.addEventListener("click", () =>{
            if (star === 0) showToast("Rating is required");
            else{
                const options = {
                    method: "post",
                    timeout: 10000,
                    data: {
                        ACTION: 0,
                        JOB_ID: jobId, //where can we get it?
                        RATER: stdNo,
                        RATING: star

                    }
                };

                const url = "http://1627982.ms.wits.ac.za/~student/Rate.php";

                cordova.plugin.http.sendRequest(url, options,
                    function (response) {
                        //success
                        let res = response.data;
                        if(res === "1"){
                            showToast("The rating was posted successfully");
                            modal.style.display = "none";
                        }else{
                            showToast("The rating was unsuccessful");
                        }
                    },
                    function (response) {
                        //fail
                        showToast("The rating was unsuccessful");
                    },
                    function (response) {
                        //permission denied
                        showToast("Permission denied");
                    }
                );

            }
        });


    }
    function postComplaint(jobId, studNo) {
        let complaintMessage = prompt("What is your complaint?", "");
        complaintMessage = complaintMessage.trim();
        if (complaintMessage.length === 0) showToast("Please enter a complaint");
        else {
            showToast("Sending Complaint...");
            const options = {
                method: "post",
                timeout: 10000,
                data: {
                    ACTION: 0,
                    JOB_ID: jobId,
                    COMPLAINT_TYPE: studNo,
                    COMPLAINT_MESSAGE: complaintMessage
                }
            };
            const url = "http://1627982.ms.wits.ac.za/~student/Complaint.php";

            cordova.plugin.http.sendRequest(url, options,
                function (response) {
                    response = response.data;
                    if (response === "Message has been sent1") showToast("Complaint Sent");
                    else showToast("Failed to send complaint");

                },
                function (response) {
                    showToast("Failed to send complaint");
                },
                function (response) {
                    showToast("Failed to send complaint");
                });
        }
    }

    function jobComplete(jobId) {
        showToast("Please Wait...");
        const options = {
            method: "post",
            timeout: 10000,
            data: {
                ACTION: 5,
                JOB_ID: jobId
            }
        };
        const url = "http://1627982.ms.wits.ac.za/~student/Job.php";
        cordova.plugin.http.sendRequest(url, options,function (response) {
                let outcome = response.data;
                if (outcome === "0") showToast("Failed to send an email");
                else {
                    populateWithMyOfferedJobs();
                    showToast("An email will be sent to employer");
                }
            },
            function (response) {
                showToast("Payment Failed");
            },
            function (response) {
                showToast("Payment Failed");
            });
    }

    function showToast(message) {
        let snackBar = $("#snackbar");
        snackBar.text(message);
        snackBar.addClass("show");
        setTimeout(function(){
                snackBar.removeClass("show");
            },
            3000);
    }

});