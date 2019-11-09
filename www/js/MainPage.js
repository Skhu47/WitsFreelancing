$(document).ready(() => {

    $("#openNavToggle").on("click", () => {
        $("#navView").css("width", "100%");
    });

    $("#closeNav").on("click", () =>{
        $("#navView").css("width", "0");
    });

    $("#postJob").on("click", () => {
        window.location.href = "PostJob.html";
    });

    $("#availableJobs").on("click", () => {
        window.location.href = "AvailableJobs.html";
    });

    $("#logOUt").on("click", () => {
        localStorage.clear();
        window.location.replace("index.html");
    });

    $("#logOut2").on("click", () => {
        localStorage.clear();
        window.location.replace("/www/index.html");
    });
});