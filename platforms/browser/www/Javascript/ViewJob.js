$(document).ready(function () {
    console.log("new page");
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

    //view bids
    console.log("View bids");
    let bidSection = $("#biddersSection");
    bidSection.hide();

    if(localStorage.getItem("NumBids") !== "0") {
        bidSection.hide();
        console.log("Populating bids");

        let bids = JSON.parse(localStorage.getItem("job_bids"));
        //console.log(bids);
        //e.g. json
        //return JSON.parse(results);
        let bidder_holder = document.getElementById("bids_holder");

        //create an individual div for each bid then apply data binding
        for (let i = 0; i < bids.length; i++){
            let bidItem = bids[i];
            let bidCard = document.createElement("div");
            bidCard.className = "card";

            let bidCardHeader = document.createElement("div");
            //bidCardHeader.id = "bidder_id";
            bidCardHeader.className = "card-header";
            bidCardHeader.innerText = bidItem["BIDDER_ID"];
            bidCard.appendChild(bidCardHeader);

            let bidCardMessage = document.createElement("div");
            bidCardMessage.className = "card-body";
            bidCardMessage.innerText = bidItem["BID_MESSAGE"];
            bidCard.appendChild(bidCardMessage);

            let bidCardSuggestedAmnt = document.createElement("div");
            bidCardSuggestedAmnt.className = "card-body";
            bidCardSuggestedAmnt.innerText = bidItem["BID_SUGGESTED_AMOUNT"];
            bidCard.append(bidCardSuggestedAmnt);

            let bidCardFooter = document.createElement("div");
            bidCardFooter.className = "card-footer";
            let assignButton = document.createElement("button");
            assignButton.type = "button";
            assignButton.className = "btn btn-outline-info";
            assignButton.innerText = "Assign Job";

            assignButton.addEventListener("click", function () {
                //console.log("assign");
                assignJob(bidItem["JOB_ID"], bidItem["BIDDER_ID"]);
            });

            bidCardFooter.append(assignButton);
            bidCard.append(bidCardFooter);
            bidder_holder.append(bidCard);
        }
    }
    $("#bid_btn1").click(function () {
        postBid(jobItem["JOB_ID"]); //what was mojo doing?
    });
});

function assignJob(job_id, bidder_id) {
    const options = {
        method: "post",
        timeout: 10000,
        data: {
            ACTION: 3,
            JOB_ID: job_id,
            JOB_EMPLOYEE_ID: bidder_id
        }
    };

    const url = "http://1627982.ms.wits.ac.za/~student/Job.php";
    cordova.plugin.http.sendRequest(url, options,
        function (response) {
            let results = response.data;
            console.log("response = " + results);
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////TO BE FIXED, REMIND MOJO ABT THIS, RELATED TO PHP TOO
            if (results === "Message has been sent0") alert("Failed to assign job to " + bidder_id);
            else if(results === "Message has been sent1") alert("Job successfully assigned to " + bidder_id);

        },
        function (response) { // we get a respo
            //fail
            alert("Failed to assign job to " + bidder_id);
        },
        function (response) {
            //permission denied
            // alert("3");
            alert("Failed to assign job to " + bidder_id);
        }
    );
}

function getBids(id) {
    const options = {
        method: "post",
        timeout: 10000,
        data: {
            ACTION: 1,
            JOB_ID: id,
        }
    };
    const url = "http://1627982.ms.wits.ac.za/~student/Bid.php";
    cordova.plugin.http.sendRequest(url, options,
        function (response) {
            //success
            let results = response.data; //data from server, it's a string, must be converted to an appropriate format
            //e.g. json
            return JSON.parse(results);

        },
        function (response) { // we get a respo
            //fail
            let results = response.data;
            //alert("2");
            alert(results);
            return JSON.parse("[]");
        },
        function (response) {
            //permission denied
            // alert("3");
            let results = response.data;
            //alert("2");
            alert(results);
            return JSON.parse("[]");
        }
    );
}