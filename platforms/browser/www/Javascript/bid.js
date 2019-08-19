function browseProj() {
    $(document).ready(function () {

        $(".jumbotron1").show(function () { //show the bidding page
            $(".jumbotron1").slideDown(1000);
        });
        $("#post_job_cont").hide(function () {
            $("#post_job_cont").slideUp(1000);
        });
        $("#header").hide(function () {
            $("#header").slideUp(1000);
        });
        $(".container_account").hide(function () { //show the bidding page
            $(".container_account").slideUp(1000);
        });
        getJobs();
        getBid();
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
                let output = JSON.parse(response);
                $("#jobCat").html(response);
                alert(results);
                //alert(results.toString().length);
                //alert(results.toString()[0]);
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

    $("#bid_btn1").click(function () {
        postBid();
    });
    function postBid() {
        const options = {
            method: "post",
            timeout: 10000,
            data: {
                ACTION: 0,
                JOB_ID: 1,
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
                //alert(results.toString().length);
                //alert(results.toString()[0]);
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
                JOB_ID: 1,
            }
        };
        const url = "http://1627982.ms.wits.ac.za/~student/Bid.php";

        cordova.plugin.http.sendRequest(url, options,
            function (response) {
                //success
                let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                //e.g. json
                alert(results);
                //alert(results.toString().length);
                //alert(results.toString()[0]);
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
