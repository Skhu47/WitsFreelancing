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
                        console.log(jsonResults["name"]);
                        console.log(jsonResults["surname"]);

                        localStorage.setItem("Name", jsonResults["name"]);
                        localStorage.setItem("Surname", jsonResults["surname"]);
                        localStorage.setItem("Stud_No", userNameInput.val());

                        $("#div1").load("mainpage.html");
                    }

                    /*else if(results.toString().length > 2){
                        let res = results.toString().split('"');
                        for(let i=0; i < results.toString().length; i++){
                            console.log(res[i]);
                        }
                        localStorage.setItem("Name",res[3] );
                        localStorage.setItem("Surname", res[7]);
                        localStorage.setItem("Stud_No", $("#Username").val());
                        //alert(res[3]); //- name
                        //alert(res[7]); //- surname

                    }*/
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