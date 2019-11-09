/*$(document).on("deviceready", () => {
    function checkConnection() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        alert('Connection type: ' + states[networkState]);
    }

    checkConnection();
});*/

$(document).ready(function(){

    let stdNo = localStorage.getItem("Stud_No");

    if (stdNo !== null && stdNo !==""){
        console.log(stdNo);
        window.location.href = "html/MainPage.html";
    }

    let logInButton = $("#logIn");
    logInButton.on("click", (e) => {

        //window.location.href = "html/MainPage.html";

        let usernameInput = $('#username');
        let userPassInput = $('#password');

        let username = usernameInput.val().trim();
        let userPass = userPassInput.val().trim();

        if (username.length === 0 || userPass.length === 0) return;


        e.preventDefault();
        switchOnOverLay();

        const serverArgs = {
            method: "post",
            timeout: 10000,
            data: {
                USERNAME: username,
                PASSWORD: userPass
            }
        };

        const url = "http://1627982.ms.wits.ac.za/~student/auth.php";
        cordova.plugin.http.sendRequest(url, serverArgs,
            function (response) { //success
                let results = response.data;
                if (results === null || results.length <= 2){
                    //incorrect credentials or server not responding
                    showResponseDialog();
                }
                else{
                    switchOffOverLay();
                    console.log("in");
                    let jsonResults = JSON.parse(results);

                    localStorage.setItem("Name", jsonResults["name"]);
                    localStorage.setItem("Surname", jsonResults["surname"]);
                    localStorage.setItem("Stud_No", username);

                    window.location.href = "html/MainPage.html";
                }
            },
            function () { //failed
                console.log("failed");
                showResponseDialog();
            },
            function () {//permission denied
                console.log("permission denied");
                showResponseDialog();
            });
    });

    function showResponseDialog() {
        console.log("show response dialog");
        //close loading dialog
        let progressView = $("#progressDiv");
        progressView.css("display", "none");

        //show response dialog
        let responseView = $("#serverResponseDiv");
        responseView.css("display", "block");

        //add event to close the overlay
        let closeButton = $("#serverResponseButton");
        closeButton.on("click", () => {
            switchOffOverLay();
        });
    }

    function switchOnOverLay() {
        $('#overlay').css("display", "block");
    }

    function switchOffOverLay() {
        $('#overlay').css("display", "none");
    }
});