function hideContent() {
    $(document).ready(function (){
        $(".newBrowseJobs").hide(); // find a way to make this seem invisible. OR
        $(".myJob").hide();
        $(".offeredJobs1").hide();
        //show browse jobs?
        //handle all transitions
        //show jobs here
    });
}

function jobSection() { //look at the transitions
    $("#wrapper_main").load("jobsOverview.html");
}

function getJobs(){
    $(".newBrowseJobs").show(function () {
        //getJobs();
    });
    const options = {
        method: "post",
        timeout: 10000,
        data: {
            ACTION: 1
        }
    };
    const url = "http://1627982.ms.wits.ac.za/~student/Job.php";

    cordova.plugin.http.sendRequest(url, options,
        function (response) {
            //success
            let results = response.data; //data from server, it's a string, must be converted to an appropriate format
            //e.g. json
            let jobTable = document.getElementById("jobTable").getElementsByTagName("tbody")[0];

            let output = JSON.parse(results);
            //console.log(results);

            for(let i=0; i < output.length; i++){
                //console.log("inside loop");
                let jobItem = output[i];
                //console.log(jobItem);
                let row = jobTable.insertRow();
                let title = row.insertCell(0);
                let category = row.insertCell(1);
                let price_range = row.insertCell(2);
                let view_more = row.insertCell(3);


                title.innerHTML = jobItem["JOB_TITLE"]; //localStorage.getItem("Stud_No")   //localStorage.setItem("Stud_No", userNameInput.val());
                category.innerHTML = jobItem["JOB_CATEGORY"];
                price_range.innerHTML = jobItem["JOB_AMOUNT_RANGE_LOW"] + " - " + jobItem["JOB_AMOUNT_RANGE_HIGH"];


                let div = document.getElementById("modalBody");
                let test = document.createTextNode(jobItem["JOB_CATEGORY"]);
                div.appendChild(test);
                //Change this
                view_more.innerHTML = "<a id= \"bidId\" href=\"javascript:void(0);\"><i class=\"material-icons md-dark pmd-sm\" >View more</i></a>";
                view_more.addEventListener("click", function () {
                    localStorage.setItem("jobTitle", jobItem["JOB_TITLE"]);
                    localStorage.setItem("category", jobItem["JOB_CATEGORY"]);
                    localStorage.setItem("dueDate", jobItem["JOB_DUE_DATE_TIME"]);
                    localStorage.setItem("NumBids", jobItem["NUM_OF_BIDS"]);
                    localStorage.setItem("description", jobItem["JOB_DESCRIPTION"]);
                    localStorage.setItem("job_id", jobItem["JOB_ID"]);
                    //getBid(); //----------------- Check this out ------------------------

                    $(document).ready(function (){
                        $("#wrapper_main").load("viewSpecificJobPage.html");
                    });

                })
            }
        },
        function (response) {
            //fail
            let results = response.data;
            alert("Retrieval of jobs failed");
            //alert(results);

        },
        function (response) {
            //permission denied
            let results = response.data;
            alert("You do not have permission to access");
            //alert(results);
        });
}

function myJobs() { //look at the transitions
    $(document).ready(function (){
        $(".newBrowseJobs").hide();
        $(".offeredJobs1").hide();
        $(".myJob").show();
        getMyJobs();
    });

    function getMyJobs(){
        const options = {
            method: "post",
            timeout: 10000,
            data: {
                ACTION: 6,
                JOB_EMPLOYER_ID: localStorage.getItem("Stud_No")
            }
        };
        const url = "http://1627982.ms.wits.ac.za/~student/Job.php";

        cordova.plugin.http.sendRequest(url, options,
            function (response) {
                //success
                let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                //e.g. json
                let jobTable = document.getElementById("jobTableMyJobs").getElementsByTagName("tbody")[0];

                let output = JSON.parse(results);
                //console.log(results);


                for(let i=0; i < output.length; i++){
                    //console.log("inside loop");
                    let jobItem = output[i];
                    console.log(jobItem);
                    let row = jobTable.insertRow();
                    let title = row.insertCell(0);
                    let category = row.insertCell(1);
                    let price_range = row.insertCell(2);
                    let status = row.insertCell(3);
                    let view_bidders = row.insertCell(4);
                    let make_payment = row.insertCell(5);
                    let complaint = row.insertCell(6);
                    let rating = row.insertCell(7);

                    let job_status = jobItem["JOB_STATUS"];
                    console.log("Job status = " + job_status);
                    let buttonText;
                    if (job_status === "0") buttonText = "Open";
                    else if(job_status === "1") buttonText = "Assigned";
                    else if(job_status === "2") buttonText = "Complete";
                    else if(job_status === "3") buttonText = "Paid";


                    title.innerHTML = jobItem["JOB_TITLE"]; //localStorage.getItem("Stud_No")   //localStorage.setItem("Stud_No", userNameInput.val());
                    category.innerHTML = jobItem["JOB_CATEGORY"];
                    price_range.innerHTML = jobItem["JOB_AMOUNT_RANGE_LOW"] + " - " + jobItem["JOB_AMOUNT_RANGE_HIGH"];



                    let div = document.getElementById("modalBodyMyJob");
                    let test = document.createTextNode(jobItem["JOB_CATEGORY"]);
                    //let sendRating = document.getElementById("sendRateBtn");
                    div.appendChild(test);
                    //add view bidders and make payment binding
                    if(job_status !== "0"){
                        complaint.innerHTML = "<td id=\"messageBox\" data-title=\"dispute\"><a data-toggle=\"modal\" href=\"\" data-target=\"#myModal\"> Not satisfied? </a></td>";
                        if(job_status === "2"){
                            make_payment.innerHTML = "<td id=\"makePayments\" data-title=\"make payments\"><a href=\"\"> Make payment </a></td>";
                            rating.innerHTML = "<td id=\"RateEmployer\" data-title=\"rate\"><a data-toggle=\"modal\" href=\"\" data-target=\"#myModal4\"> Rate </a></td>";
                        }
                    }
                    view_bidders.innerHTML = "<td id=\"viewBidders\" data-title=\"VIEW_BIDDERS\"><a href=\"assignBidderPage.html\"> View Bidders </a></td>";
                    status.innerHTML = "<button type=\"button\" class=\"btn btn-success\">"+ buttonText + "</button>";

                    complaint.addEventListener("click", function () {
                        localStorage.setItem("job_id", jobItem["JOB_ID"]);
                    });

                    view_bidders.addEventListener("click", function () {
                        localStorage.setItem("jobTitle", jobItem["JOB_TITLE"]);
                        localStorage.setItem("category", jobItem["JOB_CATEGORY"]);
                        localStorage.setItem("dueDate", jobItem["JOB_DUE_DATE_TIME"]);
                        localStorage.setItem("NumBids", jobItem["NUM_OF_BIDS"]);
                        localStorage.setItem("description", jobItem["JOB_DESCRIPTION"]);
                        localStorage.setItem("job_id", jobItem["JOB_ID"]);
                        //getBid();
                        let job_id = jobItem["JOB_ID"];

                        //retrieve bids for job
                        const options = {
                            method: "post",
                            timeout: 10000,
                            data: {
                                ACTION: 1,
                                JOB_ID: job_id,
                            }
                        };
                        const url = "http://1627982.ms.wits.ac.za/~student/Bid.php";
                        cordova.plugin.http.sendRequest(url, options,
                            function (response) {
                                //success
                                let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                                let bids = JSON.parse(results);
                                console.log(bids);
                                localStorage.setItem("job_bids", JSON.stringify(bids));

                            },
                            function (response) { // we get a respo
                                //fail
                               // alert(results);
                            },
                            function (response) {
                                //permission denied
                                //alert(results);
                            }
                        );

                    });


                }

            },
            function (response) { // we get a respo
                //fail
                let results = response.data;
                alert("You have not posted any jobs");
                //alert(results);

            },
            function (response) {
                //permission denied
                let results = response.data;
                alert("Permission denied");
                //alert(results);
            });
    }
}

function offers() { //look at the transitions
    $(document).ready(function () {
        $(".newBrowseJobs").hide();
        $(".myJob").hide();
        $(".offeredJobs1").show();
        getMyOffers();
    });

    function getMyOffers(){
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
                //success
                let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                //e.g. json
                let jobTable = document.getElementById("jobTableMyOffers").getElementsByTagName("tbody")[0];

                let output = JSON.parse(results);
                //console.log(results);


                for(let i=0; i < output.length; i++){
                    console.log("inside loop");
                    let jobItem = output[i];
                    console.log(jobItem);
                    let row = jobTable.insertRow();
                    let title = row.insertCell(0);
                    let category = row.insertCell(1);
                    let price_range = row.insertCell(2);
                    let accept_job_btn = row.insertCell(3);
                    let complete_btn = row.insertCell(4);
                    let complaintEmployee =  row.insertCell(5);
                    let rate = row.insertCell(6);


                    title.innerHTML = jobItem["JOB_TITLE"]; //localStorage.getItem("Stud_No")   //localStorage.setItem("Stud_No", userNameInput.val());
                    category.innerHTML = jobItem["JOB_CATEGORY"];
                    price_range.innerHTML = jobItem["JOB_AMOUNT_RANGE_LOW"] + " - " + jobItem["JOB_AMOUNT_RANGE_HIGH"];

                    let job_status = jobItem["JOB_STATUS"];
                    let div = document.getElementById("modalBody");
                    let test = document.createTextNode(jobItem["JOB_CATEGORY"]);
                    //let sendRating = document.getElementById("sendRateBtn");
                    div.appendChild(test);
                    //what appears
                    if(job_status === "1"){
                        accept_job_btn.innerHTML = "<button type=\"button\" class=\"btn btn-primary\"> Accept Job Offer</button>";
                        complete_btn.innerHTML = "<button type=\"button\" class=\"btn btn-success\">Job Complete</button>";
                        complaintEmployee.innerHTML = "<td id=\"messageBox\" data-title=\"dispute\"><a data-toggle=\"modal\" href=\"\" data-target=\"#myModal\"> Not satisfied? </a></td>";
                        if(job_status === "2"){
                            rate.innerHTML = "<td id=\"Rate\" data-title=\"rate\"><a data-toggle=\"modal\" href=\"\" data-target=\"#myModal4\"> Rate </a></td>";
                        }
                    }
                    complaintEmployee.addEventListener("click", function () {
                        localStorage.setItem("job_id", jobItem["JOB_ID"]);
                    });
                    complete_btn.addEventListener("click", function () { //complete to database
                        //completed the job
                        let job_id = jobItem["JOB_ID"];

                        //retrieve bids for job
                        const options = {
                            method: "post",
                            timeout: 10000,
                            data: {
                                ACTION: 5,
                                JOB_ID: job_id,
                            }
                        };
                        const url = "http://1627982.ms.wits.ac.za/~student/Job.php";
                        cordova.plugin.http.sendRequest(url, options,
                            function (response) {
                                //success
                                let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                                //let bids = JSON.parse(results);
                                //console.log(bids);
                                //localStorage.setItem("job_bids", JSON.stringify(bids));
                                alert("Update was successful");
                            },
                            function (response) { // we get a respo
                                //fail
                                let results = response.data;
                                //alert("2");
                                alert("Update was unsuccessful");
                            },
                            function (response) {
                                //permission denied
                                // alert("3");
                                let results = response.data;
                                //alert("2");
                                alert("Permission was denied, please try again");
                            }
                        );
                    });
                    accept_job_btn.addEventListener("click", function () {
                        //call script too update that shandis that i accepted
                        //getBid();
                        $(document).ready(function (){
                            $("#wrapper_main").load("viewSpecificJobPage.html");
                        });

                        /**/

                    })

                }
            },
            function (response) { // we get a respo
                //fail
                let results = response.data;
                alert("You do not have any offers");
                //alert(results);

            },
            function (response) {
                //permission denied
                let results = response.data;
                alert("Permission was denied");
                //alert(results);
            });
    }

}
