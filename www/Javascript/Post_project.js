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
        if(minRange > maxRange){
            $("#minLabel").show();
            $("#maxLabel").show();
        }else if(maxRange > minRange){
            $("#minLabel").hide();
            $("#maxLabel").hide();
            if(new Date(endDate) < (new Date($.now())) || endDate===""){
                $("#dateLabel").show();
            }else if(new Date(endDate) > (new Date($.now()))){
                $("#dateLabel").hide();
                sendDetails();
            }
        }else if(minRange==="" || maxRange === ""){ //if the input boxes are empty
            $("#minLabel").show();
            $("#maxLabel").show();
        }
    });
    //when you click reset
    $("#resetBtn").click(function () {
        //if it's for here, then code the clear function
    });
    function sendDetails(){ //here we post a project/job
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
            )
    }
    //going to viewJob
    $(document).ready(function (){
        $("#jobs").click(function () {
            $("#div1").load("viewJob.html");
        })
    });

}