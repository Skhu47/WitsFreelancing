$(document).on("deviceready", function () {
    let jobString = localStorage.getItem("SELECTED_JOB");
    let assign = localStorage.getItem("ADD_ASSIGN");

    let jobJson = JSON.parse(jobString);
    let jobId = jobJson["JOB_ID"];

    let title = $("#head");
    let description = $("#description");
    let numOfBids = $("#numOfBids");
    let modal = document.getElementById("myModal");

    title.text(jobJson["JOB_TITLE"]);
    description.text(jobJson["JOB_DESCRIPTION"]);
    numOfBids.text("Number of bids: " + jobJson["NUM_OF_BIDS"]);

    let bidButton = $("#bidButton");
    let paymentRange = $("#paymentRange");
    paymentRange.text("Payment range: R"+ jobJson["JOB_AMOUNT_RANGE_LOW"] + " - R" + jobJson["JOB_AMOUNT_RANGE_HIGH"]);

    let bidderAmountInput = $("#bidderAmount");
    bidderAmountInput.attr(
        {
            "max": parseInt(jobJson["JOB_AMOUNT_RANGE_HIGH"]),
            "min": parseInt(jobJson["JOB_AMOUNT_RANGE_LOW"])
        }

    );

    let bidMessage = $("#bidMessage");
    bidMessage.on("input", function () {
        let scrollHeight = bidMessage.get(0).scrollHeight;
        bidMessage.css("height", scrollHeight + "px");
    });

    if (assign === "0") {
        bidButton.show();
        //TODO: MAKE BID HERE

        let close = document.getElementsByClassName("close")[0];

        close.addEventListener("click", function () {
            modal.style.display = "none";
        });

        bidButton.on("click", () =>{
            modal.style.display = "block";
        });

        let postBidButton = $("#postBid");
        postBidButton.on("click", (e) => {
            if (bidderAmountInput.val().length === 0) return;
            if (bidMessage.val().trim().length === 0) return;

            let bidA = parseInt(bidderAmountInput.val());
            let lowBound = parseInt(jobJson["JOB_AMOUNT_RANGE_LOW"]);
            let upperBound = parseInt(jobJson["JOB_AMOUNT_RANGE_HIGH"]);

            if (bidA > upperBound || bidA < lowBound) return;

            e.preventDefault();

            showToast("Placing bid");

            let bidderAmount = bidderAmountInput.val();
            let bidderMessage = bidMessage.val();
            postBid(jobId, localStorage.getItem("Stud_No"), bidderAmount, bidderMessage);

        });
    }




    populateWithBids();

    function postBid(jobId, stdNo, amount, message) {
        const options = {
            method: "post",
            timeout: 10000,
            data: {
                ACTION: 0,
                JOB_ID: jobId,
                BIDDER_ID: stdNo,
                BID_SUGGESTED_AMOUNT: amount,
                BID_MESSAGE: message,

            }
        };
        const url = "http://1627982.ms.wits.ac.za/~student/Bid.php";

        cordova.plugin.http.sendRequest(url, options,
            function (response) {
                //success
                let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                //e.g. json
                //alert(results);
                if(results === "0"){
                    showToast("Failed to place bid");
                }
                if(results === "1"){
                    showToast("Bid was successfully placed");
                    modal.style.display = "none";
                    populateWithBids();
                }
                if(results === "3"){
                    showToast("You have already placed a bid!");
                    modal.style.display = "none";
                }
            },
            function (response) {
                showToast("Failed to place bid");

            },
            function (response) {
                showToast("Failed to place bid");
            }
        );
    }

    function populateWithBids(){
        const options = {
            method: "post",
            timeout: 10000,
            data: {
                ACTION: 1,
                JOB_ID: jobId,
            }
        };

        const url = "http://1627982.ms.wits.ac.za/~student/Bid.php";
        cordova.plugin.http.sendRequest(url, options,
            function (response) {
                //success
                let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                //e.g. json
                let bids = JSON.parse(results);
                let jobsHolder = document.getElementById("jobsHolder");
                jobsHolder.innerHTML ="";

                for (let i = 0; i < bids.length; i++){
                    let bid = bids[i];

                    let li = document.createElement("li");
                    let div = document.createElement("div");
                    div.classList.add("card");
                    div.innerHTML =
                        "<p class='title'>" + bid["BIDDER_ID"] +
                        "</p>"+
                        "<p class='payment'>" + bid["BID_MESSAGE"]+
                        "</p>"+
                        "<p class='category'>Suggested amount: " + bid["BID_SUGGESTED_AMOUNT"]+"</p>";

                    if (assign === "1"){
                        let assignButton = document.createElement("button");
                        assignButton.classList.add("assign");
                        assignButton.innerText = "Assign";
                        div.appendChild(assignButton);

                        assignButton.addEventListener("click", function () {
                            assignJob(bid["JOB_ID"], bid["BIDDER_ID"]);
                        });
                    }

                    li.appendChild(div);

                    jobsHolder.appendChild(li);
                }

            },
            function (response) {
                showToast("Failed to retrieve bids");
            },
            function (response) {
                showToast("Failed to retrieve bids");
            }
        );
    }

    function assignJob(job_id, bidder_id) {
        showToast("assigning job, please wait...");
        console.log(job_id);
        console.log(bidder_id);

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

                if(results === "Message has been sent1") showToast("Job successfully assigned to " + bidder_id);
                else showToast("Failed to assign job to " + bidder_id);

            },
            function (response) {
                showToast("Failed to assign job to " + bidder_id);
            },
            function (response) {
                showToast("Failed to assign job to " + bidder_id);
            }
        );
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