function postRating() {

    const options = {
        method: "post",
        timeout: 10000,
        data: {
            ACTION: 0,
            JOB_ID: localStorage.getItem("job_id"),
            RATER: 0,
            RATING: localStorage.getItem("rating"),
            JOB_EMPLOYER_ID: localStorage.getItem("Stud_No"),          //$("#Username").val(),

        }
    };
    const url = "http://1627982.ms.wits.ac.za/~student/Job.php";

    cordova.plugin.http.sendRequest(url, options,
        function (response) {
            //success
            let results = response.data;
        },
        function (response) {
            //fail
            let results = response.data;
        },
        function (response) {
            //permission denied
            let results = response.data;
        }
    );

}

function getRating(){

}