function openAccount() {
    $(document).ready(function () {
        $(".container_account").show(function () { //show the bidding page
            $(".container_account").slideDown(1000);
        });
        $("#post_job_cont").hide(function () {
            $("#post_job_cont").slideUp(1000);
        });
        $("#header").hide(function () {
            $("#header").slideUp(1000);
        });
        $(".jumbotron1").hide(function () { //show the bidding page
            $(".jumbotron1").slideUp(1000);
        });
        getFunds();
    });

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
        $(".container_account").hide(function () { //show the bidding page
            $(".container_account").slideUp(1000);
        });
    });
    $("#postProject").click(function () {
        postProject();
    });


}
    function  getFunds() { //we are getting funds
        const options = {
            method: "post",
            timeout: 10000,
            data: {
                FUND_STUD_ID: localStorage.getItem("Stud_No"),
                ACTION: 2
            }
        };
        const url = "http://1627982.ms.wits.ac.za/~student/Fund.php";

        cordova.plugin.http.sendRequest(url, options,
            function (response) {
                //success
                let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                let output = JSON.parse(results);
                let fundItem = output[0];
                let transactItem = output[1];
                let bidCard = document.createElement("div");
                bidCard.className = "cardAccount";

                console.log(transactItem);
                let amount = document.getElementById("FUND_AMOUNT");
                amount.innerHTML = "Available amount: R" + fundItem["FUND_AMOUNT"];
                //create the parent
                let TransactParent = document.getElementById("transactionHolder");
                //create the card holder
                let cardHolder = document.createElement("card-body"); //align left?
                //create the italics points
                let italicPoints = document.createElement("fa-genderless");
                //create an unordered list
                let unorderedList = document.createElement("transactCont");

                //fix this below
               /* let bidCardMessage = document.createElement("div");
                bidCardMessage.className = "card-transactDate";
                bidCardMessage.innerText = transactItem["TRANSACTION_DATE_TIME"];
                bidCard.appendChild(bidCardMessage);*/

            },
            function (response) {
                //fail
                alert("failed to retrieve funds");
            },
            function (response) {
                //permission denied
                alert("You do not have permission to get the funds");
            }
        )
    }

    function postF() {
        const options = {
            method: "post",
            timeout: 10000,
            data: {
                FUND_STUD_ID: localStorage.getItem("Stud_No"),
                ACTION: 0,
                FUND_AMOUNT: $("#fund").val()
            }
        };
        const url = "http://1627982.ms.wits.ac.za/~student/Fund.php";

        cordova.plugin.http.sendRequest(url, options,
            function (response) {
                //success
                let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                //e.g. json
                //alert(results);
                //alert(results.toString().length);
                //alert(results.toString()[0]);

                if(results === "0"){
                    alert("The fund deposit was unsuccessful!");
                }
                if(results === "1"){
                    alert("The fund was successfully deposited!");
                    $("#fund").val("");
                }
                if(results === "2"){
                    alert("You could not deposit, try again");
                }

            },
            function (response) { // we get a respo
                //fail
                let results = response.data;
                //alert("2");
                alert(results);

            },
            function (response) {
                //permission denied
                // alert("3");
                let results = response.data;
                alert(results);
            }
        )
}


