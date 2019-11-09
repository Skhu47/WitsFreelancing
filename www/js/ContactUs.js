$(document).ready(() => {

    let subject = $("#title");
    let message = $("#description");


    message.on("input", function () {
        let scrollHeight = message.get(0).scrollHeight;
        message.css("height", scrollHeight + "px");
    });


    let submitBtn = $("#Send");
    submitBtn.on("click", (e) =>{
        let sSubject = subject.val().trim();
        let sMessage = message.val().trim();

        if (sSubject.length === 0 || sMessage.length === 0) return;

        e.preventDefault();

        switchOnOverLay();

        const options = {
            method: "post",
            timeout: 10000,
            data: {
                SUBJECT: sSubject,
                MESSAGE: sMessage
            }
        };
        const url = "http://1627982.ms.wits.ac.za/~student/AdminCommunication.php";

        cordova.plugin.http.sendRequest(url, options,
            function (response) {
                //success
                let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                //e.g. json
                if(results === "Message has been sent"){
                    showSuccessDialog();
                }
                else {
                    showErrorDialog("Failed to send Message");
                }
            },
            function (response) {
                showErrorDialog("Failed to send Message");
            },
            function (response) {
                showErrorDialog("Failed to send Message");
            }
        );

    });
    
    function showSuccessDialog() {
        $("#progressDiv").css("display", "none");

        //show response dialog
        $("#serverResponseDiv").css("display", "block");

        $("#message").text("Message successfully sent");

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