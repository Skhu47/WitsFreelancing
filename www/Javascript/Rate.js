function validateRating() {
    let choice = document.getElementsByName("rating");
    for(let i=0; i < choice.length; i++) {
        if(choice[i].checked){
            return choice[i].value;
        }
    }
}
function postRating(typeOfRater) {
    let rating = validateRating();
    console.log(typeOfRater);
    const options = {
        method: "post",
        timeout: 10000,
        data: {
            ACTION: 0,
            JOB_ID: localStorage.getItem("job_id"), //where can we get it?
            RATER: typeOfRater,
            RATING: rating

        }
    };
    const url = "http://1627982.ms.wits.ac.za/~student/Rate.php";

    cordova.plugin.http.sendRequest(url, options,
        function (response) {
            //success
            let res = response.data;
            if(res === "1"){
                alert("The rating was posted successfully");
            }else{
                alert("The rating was unsuccessful");
            }
            },
        function (response) {
            //fail
            alert("The rating was unsuccessful");
            },
        function (response) {
            //permission denied
            alert("Permission denied");
        }
    );

}

/*
function postRatingEmployee(){
    let employeeRating = $('#starRating');
    const options = {
        method: "post",
        timeout: 10000,
        data: {
            ACTION: 1,
            JOB_ID: localStorage.getItem("job_id"), //where can we get it?
            RATER: 0,
            RATING: employeeRating.val()
            //JOB_EMPLOYER_ID: localStorage.getItem("Stud_No"),

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

}*/