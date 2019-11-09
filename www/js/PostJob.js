$(document).ready(() => {

    let title = $("#title");
    let description = $("#description");
    let minimumRange = $("#minimumRange");
    let maximumRange = $("#maximumRange");
    let endDate = $("#endDate");
    let jobLocation = $("#jobLocation");
    let category = $("#category");

    description.on("input", function () {
        let scrollHeight = description.get(0).scrollHeight;
        description.css("height", scrollHeight + "px");
    });


    let submitBtn = $("#postJob");
    submitBtn.on("click", (e) =>{
        let sTitle = title.val().trim();
        let sDescription = description.val().trim();
        let sMinimum = minimumRange.val();
        let sMaximum = maximumRange.val();
        let sEndDate = endDate.val();
        let sJobLocation = jobLocation.val().trim();
        let sCategory = category.val();
        
        if (sTitle.length === 0 || sDescription.length === 0 || sMinimum.length === 0 || sMaximum.length === 0 
        || sEndDate.length === 0 || sJobLocation.length === 0) return;


        let min = parseInt(minimumRange.val());
        let max = parseInt(maximumRange.val());

        if (min > max){
            e.preventDefault();
            switchOnOverLay();
            showErrorDialog("Minimum Range cannot be greater than maximum");
        }

        else{
            e.preventDefault();

            switchOnOverLay();

            const options = {
                method: "post",
                timeout: 10000,
                data: {
                    ACTION: 0,
                    JOB_EMPLOYER_ID: localStorage.getItem("Stud_No"),          //$("#Username").val(),
                    JOB_TITLE: sTitle,
                    JOB_DESCRIPTION: sDescription,
                    JOB_AMOUNT_RANGE_LOW: sMinimum,
                    JOB_AMOUNT_RANGE_HIGH: sMaximum,
                    JOB_DUE_DATE_TIME: sEndDate,
                    JOB_LOCATION: sJobLocation,
                    JOB_CATEGORY: sCategory
                }
            };
            const url = "http://1627982.ms.wits.ac.za/~student/Job.php";

            cordova.plugin.http.sendRequest(url, options,
                function (response) {
                    //success
                    let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                    //e.g. json
                    if(results === "0"){
                        showErrorDialog("Failed to post job");
                    }
                    if(results === "1"){
                        showSuccessDialog();
                    }
                    if(results === "2"){
                        showErrorDialog("You have insufficient funds to post a job with the specified maximum range");
                    }
                },
                function (response) {
                    showErrorDialog("Failed to post job");
                },
                function (response) {
                    showErrorDialog("Failed to post job");
                }
            );
        }


    });
    
    function showSuccessDialog() {
        $("#progressDiv").css("display", "none");

        //show response dialog
        $("#serverResponseDiv").css("display", "block");

        $("#message").text("The job post was successfully posted!");

        //add event to close the overlay
        $("#serverResponseButton").on("click", () => {
            switchOffOverLay();
            history.back();
        });
    }
    function showErrorDialog(message) {
        //close loading dialog
        $("#progressDiv").css("display", "none");

        //show response dialog
        $("#serverResponseDiv").css("display", "block");

        $("#message").text(message);

        //add event to close the overlay
        $("#serverResponseButton").on("click", () => {
            switchOffOverLay();
        });
    }


    function switchOnOverLay() {
        $("#progressDiv").css("display", "block");
        $("#serverResponseDiv").css("display", "none");
        $('#overlay').css("display", "block");
    }

    function switchOffOverLay() {
        $('#overlay').css("display", "none");
    }
});