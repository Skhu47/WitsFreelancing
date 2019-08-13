
function Login() {
    $(document).ready(function(){
        $('form[id=Login_form]').submit(function(event){
            var stud_id = $('#Username').val(); //student number
            var stud_pass = $('#Password').val(); //student password
            if (stud_id ==" " || stud_pass ==" ") {
                alert("username or password required !");
                event.preventDefault(); //prevent default submit action
            }
            //check received output
        });
        $.get('1627982.ms.wits.ac.za/~student/auth.php', function (data) {
            var response = data; //must it be global or html will access this?
            if(response.val() !== " "){
                alert("0"); // login failed
                //nothing should happen
            }else{
                alert("1"); //login success
                // call the home page of Wits freeelancer
            }
        })
    });
}