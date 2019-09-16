
function browseProj() {
    $(document).ready(function () {

        /*$(".jumbotron1").show(function () { //show the bidding page
            $(".jumbotron1").slideDown(1000);
        });*/
        $(".myJob").hide();
        $(".offeredJobs1").hide();
        $(".newBrowseJobs").show(function () {
            getJobs();
        });
        //call this after going to the job overview
        //getBid();
    });
    function getJobs(){
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
                    console.log("inside loop");
                    let jobItem = output[i];
                    console.log(jobItem);
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
                        getBid();

                        $(document).ready(function (){
                            /*$("#wrapper_main").hide(function () {
                                $("#wrapper_main").slideUp(1000);
                            });

                            $("#bidder_page").show(function () {
                                $("#bidder_page").slideDown(1000);
                            });*/
                            $("#wrapper_main").load("viewSpecificJobPage.html");
                        });

                        /**/

                    })
                    /*view_more.addEventListener("click", function () { //data-toggle="modal" data-target="#myModal" --this stuff shades the entire page
                        let modalTitle = document.getElementById("modalTitle");
                        modalTitle.innerHTML = jobItem["JOB_TITLE"];
                        let modalPara = document.getElementById("modalBodyText");
                        modalPara.innerHTML = jobItem["JOB_DESCRIPTION"] + "<br>Job Category: " + jobItem["JOB_CATEGORY"] + "<br> Job payment range: " + jobItem["JOB_AMOUNT_RANGE_LOW"] + " - " + jobItem["JOB_AMOUNT_RANGE_HIGH"];

                        $("#bid_btn1").click(function () {
                            postBid(jobItem["JOB_ID"]);
                        });
                    })*/

                }



                //alert(results);
                //alert(results.toString().length);
                //alert(results.toString()[0]);
            },
            function (response) { // we get a respo
                //fail
                let results = response.data;
                alert("1");
                //alert(results);

            },
            function (response) {
                //permission denied
                let results = response.data;
                alert("2");
                //alert(results);
            });
    }
    //go home
    $("#home").click(function () { // when you click going to home
        $("#post_job_cont").hide(function () {
            $("#post_job_cont").slideUp(1000);
        });
        $(".jumbotron1").hide(function () {
            $(".jumbotron1").slideUp(1000);
        });
        $("#header").show(function () {
            $("#header").slideDown(1000);
        });

    });

    $("#postProject").click(function () {
        postProject();
    });


    function postBid(id) {
        const options = {
            method: "post",
            timeout: 10000,
            data: {
                ACTION: 0,
                JOB_ID: id,
                BIDDER_ID: localStorage.getItem("Stud_No"),          //$("#Username").val(),
                BID_SUGGESTED_AMOUNT: $('#bidAmt').val() ,
                BID_MESSAGE: $('#bidMsg').val(),

            }
        };
        const url = "http://1627982.ms.wits.ac.za/~student/Bid.php";

        cordova.plugin.http.sendRequest(url, options,
            function (response) {
                //success
                let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                //e.g. json
                alert(results);
                if(results === "0"){
                    alert("The bid was unsuccessful!");
                }
                if(results === "1"){
                    alert("The bid was successful!");
                }
                if(results === "3"){
                    alert("You have bid!");
                }
            },
            function (response) { // we get a respo
                //fail
                let results = response.data;
                //alert("2");
                alert(results);

            },
            function (response) {
                //permission denied
                // alert("3");
                let results = response.data;
                //alert("2");
                alert(results);
            }
        );
    }

    function getBid(){

        const options = {
            method: "post",
            timeout: 10000,
            data: {
                ACTION: 1,
                JOB_ID: localStorage.getItem("job_id"),
            }
        };
        const url = "http://1627982.ms.wits.ac.za/~student/Bid.php";

        cordova.plugin.http.sendRequest(url, options,
            function (response) {
                //success
                let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                //e.g. json
                let output = JSON.parse(results);
                for(let i=0; i < output.length; i++) {

                    let bidItem = output[i];
                    localStorage.setItem("bidderID", bidItem["BIDDER_ID"]);
                    localStorage.setItem("sug_amt", bidItem["BID_SUGGESTED_AMOUNT"]);
                    localStorage.setItem("bid_msg", bidItem["BID_MESSAGE"]);

                }
            },
            function (response) { // we get a respo
                //fail
                let results = response.data;
                //alert("2");
                alert(results);

            },
            function (response) {
                //permission denied
                // alert("3");
                let results = response.data;
                //alert("2");
                alert(results);
            }
        );
    }

}
