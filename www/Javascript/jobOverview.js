function hideContent() {
    $(document).ready(function (){
        $(".newBrowseJobs").hide(); // find a way to make this seem invisible. OR
        $(".myJob").hide();
        $(".offeredJobs1").hide();
        //show browse jobs?
        //handle all transitions
        //show jobs here
    });
}

function jobSection() { //look at the transitions
    $("#wrapper_main").load("jobsOverview.html");
}

function myJobs() { //look at the transitions
    $(document).ready(function (){
        $(".newBrowseJobs").hide();
        $(".offeredJobs1").hide();
        $(".myJob").show();
    });
}

function offers() { //look at the transitions
    $(document).ready(function (){
        $(".newBrowseJobs").hide();
        $(".myJob").hide();
        $(".offeredJobs1").show();
    });
function goHome(){ //call home
    $(document).ready(function () { // when you click going to home
            $("#post_job_cont").hide(function () {
                $("#post_job_cont").slideUp(1000);
            });
            $(".jumbotron1").hide(function () {
                $(".jumbotron1").slideUp(1000);
            });
            $("#header").show(function () {
                $("#header").slideDown(1000);
            });

    });
}
}