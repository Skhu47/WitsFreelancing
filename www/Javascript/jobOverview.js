$(document).ready(function (){
     //show browse jobs?
    //handle all transitions
    $("#seeJobs").click(function () {
        $(".myJob").hide();
        $(".offeredJobs").hide();
    });
//handle myJobs
    $(".myJob").click(function () {
        $("#seeJobs").hide();
        $(".offeredJobs").hide();
    });
//handle offered jobs
    $(".offeredJobs").click(function () {
        $("#seeJobs").hide();
        $(".myJob").hide();
    });


    //$("#sidebar-wrapper").toggle(); //we need the toggling button here too
});
