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
                alert(results);
            },
            function (response) {
                //fail
            },
            function (response) {
                //permission denied
            })
    });

    // $('#login_btn').click(function(){
    //     let stud_id = $('#Username').val(); //student_id
    //     console.log(stud_id);
    //     let stud_pass = $('#Password').val(); //student password
    //     console.log(stud_pass);
    //     let res = $.ajax({
    //         type: 'POST',
    //         url: 'http://1627982.ms.wits.ac.za/~student/auth.php',
    //         data:{USERNAME: stud_id,PASSWORD :stud_pass},
    //         dataType: "text",
    //         /*success: function (res) {
    //
    //             alert(res);}*/
    //     });
    //     res.done(function (msg) {
    //         console.log(msg);
    //     });
    //
    //     res.fail(function (jqXHR, status) {
    //         console.log(status);
    //     });
    //     //$("#div1").load("html/mainpage.html");
    //     //window.location.href="www/html/mainpage.html"; // upon validation we need to go to the home page
    //     /*$.post(
    //         "1627982.ms.wits.ac.za/~student/auth.php",
    //         {USERNAME: stud_id,PASSWORD :stud_pass},function (data) {
    //             alert(data);
    //         }
    //     );*/
    //     console.log("after the cond");
    // });
});