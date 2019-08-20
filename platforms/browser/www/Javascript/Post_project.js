//when a user clicks post project
function  postProject() {
    $(document).ready(function (){
        $("#header").hide();
        $("#minLabel").hide();
        $("#maxLabel").hide();
        $("#dateLabel").hide();
        $(".container_account").hide(function () { //show the bidding page
            $(".container_account").slideUp(1000);
        });
        $(".jumbotron1").hide(function () { //show the bidding page
            $(".jumbotron1").slideUp(1000);
        });
        $("#post_job_cont").show(function () {
            $("#post_job_cont").slideDown(1000);

        });
        //$("#sidebar-wrapper").toggle(); //we need the toggling button here too
    });
    //when user clicks home
    $("#home").click(function () {
        $("#post_job_cont").hide(function () {
            $("#post_job_cont").slideUp(1000);
        });
        $("#header").show(function () {
            $("#header").slideDown(1000);
        });
    });
    //when user clicks Post Job
    $("#post_job_btn").click(function () {
        $('#Employer_id').val(localStorage.getItem("Stud_No")); //remove this textbox because we have the value
        let minRange = $('#min_range').val();
        let maxRange = $('#max_range').val();
        let endDate = $('#date').val();
        //there is a bug in the code below
        let minLabel = $("#minLabel");
        let maxLabel = $("#maxLabel");

        minLabel.hide();
        maxLabel.hide();
        sendDetails();
        /*if(minRange >= maxRange || (minRange==="" || maxRange === "")){
            minLabel.show();
            maxLabel.show();
        }
        else if(new Date(endDate) < (new Date($.now())) || endDate===""){
            $("#dateLabel").show();
        }
        else if(new Date(endDate) > (new Date($.now()))){
            $("#dateLabel").hide();
            sendDetails();
            clearPage();
        }*/

    });
    //when you click reset
    $("#resetBtn").click(function () {
        //if it's for here, then code the clear function
        $('#Job_title').val("");
        $('#Job_desc').val("");
        $('#min_range').val("");
        $('#max_range').val("");
        $('#date').val("");
        $('#location').val("");
        $('#category').val("");
    });
    function sendDetails(){
        //here we post a project/job
        const options = {
            method: "post",
            timeout: 10000,
            data: {
                ACTION: 0,
                JOB_EMPLOYER_ID: localStorage.getItem("Stud_No"),          //$("#Username").val(),
                JOB_TITLE: $('#Job_title').val() ,
                JOB_DESCRIPTION: $('#Job_desc').val() ,
                JOB_AMOUNT_RANGE_LOW: $('#min_range').val(),
                JOB_AMOUNT_RANGE_HIGH: $('#max_range').val() ,
                JOB_DUE_DATE_TIME: $('#date').val() ,
                JOB_LOCATION: $('#location').val() ,
                JOB_CATEGORY: $('#category').val()

            }
        };
        const url = "http://1627982.ms.wits.ac.za/~student/Job.php";

        cordova.plugin.http.sendRequest(url, options,
            function (response) {
                //success
                let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                //e.g. json
                if(results === "0"){
                    alert("The job post was unsuccessful!");
                }
                if(results === "1"){
                    alert("The job post was successfully posted!");
                    clearPage();
                }
                if(results === "2"){
                    alert("You have insufficient funds");
                    $('#min_range').val("");
                    $('#max_range').val("");
                }
            },
            function (response) { // we get a respo
                //fail
                let results = response.data;
                //alert("2");
                //alert(results);

            },
            function (response) {
                //permission denied
                // alert("3");
                let results = response.data;
                //alert("2");
                //alert(results);
            }
        );
    }
    //remove the shanis
    function clearPage() {
        $('#Job_title').val("");
        $('#Job_desc').val("");
        $('#min_range').val("");
        $('#max_range').val("");
        $('#date').val("");
        $('#location').val("");
        $('#category').val("");
    }
    //going to viewJob
    $(document).ready(function (){
        $("#jobs").click(function () {
            $("#div1").load("viewJob.html");
        })
    });

}