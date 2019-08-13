
$(document).ready(function(){
    $('#login_btn').click(function(){
        let stud_id = $('#Username').val(); //student_id
        console.log(stud_id);
        let stud_pass = $('#Password').val(); //student password
        console.log(stud_pass);
        let res = $.ajax({
            type: 'POST',
            url: 'http://1627982.ms.wits.ac.za/~student/auth.php',
            data:{USERNAME: stud_id,PASSWORD :stud_pass},
            dataType: "text",
            /*success: function (res) {
                alert(res);}*/
        });
        res.done(function (msg) {
            console.log(msg);
        });
        res.fail(function (jqXHR, status) {
            console.log(status);
        });
        /*$.post(
            "1627982.ms.wits.ac.za/~student/auth.php",
            {USERNAME: stud_id,PASSWORD :stud_pass},function (data) {
                alert(data);
            }
        );*/
        console.log("after the cond");
    });
});