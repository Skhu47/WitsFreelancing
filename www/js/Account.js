$(document).on("deviceready", () =>{
    let amount = $("#amountP");
    let user = $("#userP");
    let transactionHolder = $("#transactionHolder");
    populateFunds();

    $("#depositButton").on("click", ()=>{
        let deposit = prompt("Enter the amount you want to deposit", "0");
        if (isNumber(deposit)){
            depositFunds(parseInt(deposit));
        }
        else showToast("Input was incorrect");
    });

    function depositFunds(amount) {
        const options = {
            method: "post",
            timeout: 10000,
            data: {
                FUND_STUD_ID: localStorage.getItem("Stud_No"),
                ACTION: 0,
                FUND_AMOUNT: amount
            }
        };
        const url = "http://1627982.ms.wits.ac.za/~student/Fund.php";

        cordova.plugin.http.sendRequest(url, options,
            function (response) {
                //success
                let results = response.data;

                if(results === "0") showToast("The fund deposit was unsuccessful!");

                if(results === "1") {
                    showToast("The fund was successfully deposited!");
                    populateFunds();
                }
            },
            function (response) { // we get a respo
                //fail
                showToast("The fund deposit was unsuccessful!");
            },
            function (response) {
                showToast("The fund deposit was unsuccessful!");
            }
        );
    }

    function isNumber(deposit) {
        return $.isNumeric(deposit) & parseInt(deposit) > 0;
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

    function populateFunds() {
        const options = {
            method: "post",
            timeout: 10000,
            data: {
                ACTION: 2,
                FUND_STUD_ID: localStorage.getItem("Stud_No")
            }
        };

        const url = "http://1627982.ms.wits.ac.za/~student/Fund.php";

        cordova.plugin.http.sendRequest(url, options,
            function (response) {
                //success
                let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                let output = JSON.parse(results);
                let fundItem = output[0];

                amount.text("R" + fundItem["FUND_AMOUNT"]);
                user.text(fundItem["FUND_STUD_ID"]);

                //transactionHolder.empty();
                transactionHolder.html("");

                for (let i = 1; i < output.length; i++){
                    let transactionItem = output[i];
                    transactionHolder.append(
                        "<li>"+
                        "<div class='transactionsItem'>"+
                        "<p class='transactionDateTime'>" +
                        transactionItem["TRANSACTION_DATE_TIME"]+
                        "</p>"+
                        "<p class='transactionReason'>" +
                        transactionItem["TRANSACTION_REASON"]+
                        "</p>"+
                        "<p id='amount' class='transactionAmount'>" +
                        transactionItem["TRANSACTION_AMOUNT"]+
                        "</p>"+
                        "</div>"+
                        "</li>"
                    );
                }
            },
            function (response) {
                showToast("Failed to get account info");
            },
            function (response) {
                showToast("Failed to get account info");
            }
        );
    }
});