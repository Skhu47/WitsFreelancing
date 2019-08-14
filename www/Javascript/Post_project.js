//when a user clicks post project
function  postProject() {
    $(document).ready(function (){
        $("#header").hide();
        $("#minLabel").hide();
        $("#maxLabel").hide();
        $("#dateLabel").hide();
        $("#post_job_cont").show(function () {
            $("#post_job_cont").slideDown(1000);

        });
        //$("#sidebar-wrapper").toggle(); //we need the toggling button here too
    });
    //when user clicks home
    $("#home").click(function () {
        $("#post_job_cont").hide(function () {
            $("#post_job_cont").slideUp(1000);
        });
        $("#header").show(function () {
            $("#header").slideDown(1000);
        });
    });
    //when user clicks Post Job
    $("#post_job_btn").click(function () {
        let minRange = $('#min_range').val();
        let maxRange = $('#max_range').val();
        let endDate = $('#date').val();
        if(minRange > maxRange || minRange==="" || maxRange === ""){
            $("#minLabel").show();
            $("#maxLabel").show();
        }else if(minRange < maxRange){
            $("#minLabel").hide();
            $("#maxLabel").hide();
        }
        if(new Date(endDate) < (new Date($.now())) || endDate===""){
            $("#dateLabel").show();
        }else if(new Date(endDate) > (new Date($.now()))){
            $("#dateLabel").hide();
        }
    });
    //when you click reset
    $("#resetBtn").click(function () {
        //if it's for here, then code the clear function
    })

}