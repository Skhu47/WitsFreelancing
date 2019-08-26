$(document).ready(function () {

    let jobTitle = document.getElementById("bid_job_title");
    console.log(localStorage.getItem("jobTitle"));
    jobTitle.innerHTML = "Job Title: " + localStorage.getItem("jobTitle");
    //let name = document.getElementById("bid_name");
    //name.innerHTML = jobItem["JOB_TITLE"];
    let category = document.getElementById("job_cat");
    console.log(localStorage.getItem("category"));
    category.innerHTML = "Category: " + localStorage.getItem("category");
    let description = document.getElementById("job_desc");
    console.log(localStorage.getItem("description"));
    description.innerHTML = "Description: " + localStorage.getItem("description");
    let dueDate = document.getElementById("job_due_date");
    dueDate.innerHTML = "Due Date: " + localStorage.getItem("dueDate");
    let NumBids = document.getElementById("job_numBid");
    NumBids.innerHTML = "Num of bids: "+localStorage.getItem("NumBids");

    $("#bid_btn1").click(function () {
        postBid(jobItem["JOB_ID"]);
    });
});