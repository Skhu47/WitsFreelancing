function browseProj() {
    $(document).ready(function () {

            $(".jumbotron1").show(function () { //show the bidding page
                $(".jumbotron1").slideDown(1000);
            });
            $("#post_job_cont").hide(function () {
                $("#post_job_cont").slideUp(1000);
            });
            $("#header").hide(function () {
                $("#header").slideUp(1000);
            });
            $(".container_account").hide(function () { //show the bidding page
                 $(".container_account").slideUp(1000);
             });
    });
    //go home
        $("#home").click(function () { // when you click going to home
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

    $("#postProject").click(function () {
        postProject();
    });
        //


}
