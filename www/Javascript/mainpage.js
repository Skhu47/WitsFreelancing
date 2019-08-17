function hid(){
    $(document).ready(function (){
        $("#post_job_cont").hide(); // find a way to make this seem invisible. OR
        $(".jumbotron1").hide();
        $(".container_account").hide();
        //$("#sidebar-wrapper").toggle(); //we need the toggling button here too
    });
}
function tog(){
    $("#menu-toggle").click(function() { // what is the button for the toggling menu? we need it here
        //$("#sidebar-wrapper").show();
    });
}
