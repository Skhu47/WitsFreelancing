$(document).on("deviceready", () =>{

    let sorter = "";

    let jobsHolder = document.getElementById("jobsHolder");

    populateListWithJobs();

    $('#sorterSelect').on("change", function () {
        let val = $(this).val();
        console.log("value is: " + val);
        if (val === "") return;
        sorter = val;
        populateListWithJobs();
    });

    function populateListWithJobs() {
        const options = {
            method: "post",
            timeout: 10000,
            data: {
                ACTION: 1
            }
        };
        const url = "http://1627982.ms.wits.ac.za/~student/Job.php";

        cordova.plugin.http.sendRequest(url, options,
            function (response) {
                jobsHolder.innerHTML = "";
                let results = response.data;

                let output = JSON.parse(results);
                if (sorter === 'category'){
                    output.sort(function (a, b) {
                        let cat1 = a["JOB_CATEGORY"];
                        let cat2 = b["JOB_CATEGORY"];
                        return cat1.localeCompare(cat2);
                    });
                }
                else if (sorter === 'price_range'){
                    output.sort(function (a, b) {
                        //a["JOB_AMOUNT_RANGE_LOW"];
                        //return parseInt(a["JOB_AMOUNT_RANGE_LOW"]) - parseInt(b["JOB_AMOUNT_RANGE_LOW"]);
                        let price1 = parseInt(a["JOB_AMOUNT_RANGE_LOW"]);
                        let price2 = parseInt(b["JOB_AMOUNT_RANGE_LOW"]);
                        return price1 - price2;
                    });
                }
                else if (sorter === 'title'){
                    output.sort(function (a, b) {
                        let title1 = a["JOB_TITLE"];
                        let title2 = b["JOB_TITLE"];
                        return title1.localeCompare(title2);
                    });
                }

                for (let i = 0; i < output.length; i++){
                    let job = output[i];

                    if(parseInt(job["JOB_EMPLOYER_ID"]) === parseInt(localStorage.getItem("Stud_No"))) continue;

                    let li = document.createElement("li");
                    li.innerHTML="<div class='card'>" +
                        "<p class='title'>" + job["JOB_TITLE"] +
                        "</p>"+
                        "<p class='category'>Job Category: " + job["JOB_CATEGORY"]+
                        "</p>"+
                        "<p class='payment'>Payment Range: " + "R"+job["JOB_AMOUNT_RANGE_LOW"]+" - R" + job["JOB_AMOUNT_RANGE_HIGH"]+
                        "</p>"+
                        "<p class='deadLine'>Job Deadline: " + job["JOB_DUE_DATE_TIME"] +
                        "</p>"+
                        "</div>";
                    jobsHolder.appendChild(li);
                    li.addEventListener("click", function () {
                        localStorage.setItem("SELECTED_JOB", JSON.stringify(job));
                        localStorage.setItem("ADD_ASSIGN", "0");
                        window.location.href = "ViewJob.html";
                        //console.log(localStorage.getItem("SELECTED_JOB"));
                    });
                }
            },
            function (response) {
                showToast("Failed to retrieve jobs");
            },
            function (response) {
                showToast("Failed to retrieve jobs");
            });
    }

    function showToast(message) {
        let snackBar = $("#snackbar");
        snackBar.text(message);
        snackBar.addClass("show");
        setTimeout(function(){
                snackBar.removeClass("show");
            },
            3000);
    }

});