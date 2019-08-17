function openAccount() {
    $(document).ready(function () {
        $(".container_account").show(function () { //show the bidding page
            $(".container_account").slideDown(1000);
        });
        $("#post_job_cont").hide(function () {
            $("#post_job_cont").slideUp(1000);
        });
        $("#header").hide(function () {
            $("#header").slideUp(1000);
        });
        $(".jumbotron1").hide(function () { //show the bidding page
            $(".jumbotron1").slideUp(1000);
        });
    });

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
            $(".container_account").hide(function () { //show the bidding page
                $(".container_account").slideUp(1000);
            });
        });
    $("#postProject").click(function () {
        postProject();
    });
    $("#seeJobs").click(function () {
        browseProj();
    });


}

$(document).ready(function () {
        $("#account").on("click", (e) =>{ //getting the funds +++++++++++++++++++++++++++++++++++!!!!!!!!!!!!!!!!!!!!!!!!
            e.preventDefault();

            const options = {
                method: "post",
                timeout: 10000,
                data: {
                    FUND_STUD_ID: 1699140,
                    ACTION: 2
                }
            };
            const url = "http://1627982.ms.wits.ac.za/~student/Fund.php";

            cordova.plugin.http.sendRequest(url, options,
                function (response) {
                    //success
                    console.log(response.status);
                    console.log(response.error(e));
                    let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                    //e.g. json
                    //alert(results.toString().length);
                    //alert(results.toString()[0]);
                    alert(results);
                },
                function (response) {
                    //fail
                    alert("empty1");
                },
                function (response) {
                    //permission denied
                    alert("empty3");
                }
            )
        });
         //Posting funds
            $("#postFundbtn").on("click", (e) =>{

            e.preventDefault();

            const options = {
                method: "post",
                timeout: 10000,
                data: {
                    FUND_STUD_ID: localStorage.getItem("Stud_No"),          //$("#Username").val(),
                    ACTION: 0,
                    FUND_AMOUNT: $("#fund").val()
                }
            };
            const url = "http://1627982.ms.wits.ac.za/~student/Fund.php";

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
                    alert(results);
                }
            )
        });

    });

