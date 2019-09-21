
function browseProj() {
    $(document).ready(function () {

        $(".myJob").hide();
        $(".offeredJobs1").hide();
        $(".newBrowseJobs").show(function () {
            //getJobs();
        });
        //call this after going to the job overview
        getBid();
    });

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
                    //set bid

                }
            },
            function (response) {
                //fail
                //let results = response.data;
                //alert("2");
                alert("Failed to retrieve bids");

            },
            function (response) {
                //permission denied
                // alert("3");
                //let results = response.data;
                //alert("2");
                alert("Permission to retrieve bids denied");
            }
        );
    }

}
function postBid() {
    const options = {
        method: "post",
        timeout: 10000,
        data: {
            ACTION: 0,
            JOB_ID: localStorage.getItem("job_id"),
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
            //alert(results);
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
        function (response) {
            //fail
            //let results = response.data;
            alert("Bid was posted unsuccessfully");

        },
        function (response) {
            //permission denied
            //alert("The bid was unsuccessful");
            //let results = response.data;
            //alert("2");
            alert("Permission to post bid was denied");
        }
    );
}
