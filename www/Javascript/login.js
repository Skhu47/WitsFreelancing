$(document).ready(function(){
    $("#login_btn").on("click", (e) =>{

        e.preventDefault();

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
                if(results.toString().length <= 2){
                    alert("empty");
                }
                else if(results.toString().length > 2){
                    let res = results.toString().split('"');
                    for(let i=0; i < results.toString().length; i++){
                        console.log(res[i]);
                    }
                    localStorage.setItem("Name",res[3] );
                    localStorage.setItem("Surname", res[7]);
                    localStorage.setItem("Stud_No", $("#Username").val());
                    //alert(res[3]); //- name
                    //alert(res[7]); //- surname
                    $("#div1").load("mainpage.html");
                }
            },
            function (response) {
                //fail

            },
            function (response) {
                //permission denied
            }
            )
    });
});