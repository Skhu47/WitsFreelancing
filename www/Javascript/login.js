$(document).ready(function(){
    $("#login_btn").on("click", (e) =>{

        e.preventDefault();

        let userNameInput = $('#Username');
        let userPassInput = $('#Password');
        let everythingOkay = true;


        if (userNameInput.val().trim().length === 0) everythingOkay = false;
        if (userPassInput.val().trim().length === 0) everythingOkay = false;


        if (everythingOkay){
            const options = {
                method: "post",
                timeout: 10000,
                data: {
                    USERNAME: $("#Username").val(),
                    PASSWORD: $("#Password").val()
                }
            };
            const url = "http://1627982.ms.wits.ac.za/~student/auth.php";

            cordova.plugin.http.sendRequest(url, options,
                function (response) {
                    //success
                    let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                    //e.g. json
                    //alert(results.toString().length);
                    //alert(results.toString()[0]);
                    if(results === null || results.toString().length <= 2){
                        alert("Login Failed due to Incorrect credentials");
                    }
                    else{
                        let jsonResults = JSON.parse(results);

                        localStorage.setItem("Name", jsonResults["name"]);
                        localStorage.setItem("Surname", jsonResults["surname"]);
                        localStorage.setItem("Stud_No", userNameInput.val());

                        $("#div1").load("mainpage.html");
                    }
                },
                function (response) {
                    alert("Login Failed due to Incorrect credentials");
                },
                function (response) {
                    //permission denied
                }
            );
        }
        //e.preventDefault();


    });
});