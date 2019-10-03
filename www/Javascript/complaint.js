
function postComplaint() {
    const options = {
        method: "post",
        timeout: 10000,
        data: {
            ACTION: 0,
            JOB_ID: localStorage.getItem("job_id"),
            COMPLAINT_TYPE: localStorage.getItem("Stud_No"),
            COMPLAINT_MESSAGE: $('#COMPLAINT_MESSAGE').val()
        }
    };
    const url = "http://1627982.ms.wits.ac.za/~student/Complaint.php";

    cordova.plugin.http.sendRequest(url, options,
        function (response) {
            //success
            let results = response.data; //data from server, it's a string, must be converted to an appropriate format
            alert("Posted complaint successfully");
        },
        function (response) { // we get a respo
            //fail
            let results = response.data;
            alert("You do not have any offers");
        },
        function (response) {
            let results = response.data;
            alert("Permission was denied");
        });
}