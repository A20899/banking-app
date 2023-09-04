function showData() {
    var clientlist;
    if (localStorage.getItem("clientlist") === null) {
        clientlist = [];
    } else {
        clientlist = JSON.parse(localStorage.getItem("clientlist"));
    }

    var optionsWithdraw = "";

    clientlist.forEach(function (element) {

        optionsWithdraw += "<option>" + element.name + "</option>";

    });
    var accountNameSelectWithdraw = document.querySelector("#account-name-withdraw");
    accountNameSelectWithdraw.innerHTML = optionsWithdraw;
}

function withdraw() {
    var accountNameSelectWithdraw = document.getElementById("account-name-withdraw");
    var selectedAccountIndex = accountNameSelectWithdraw.selectedIndex;
    var witdrawnAmount = parseFloat(document.getElementById("withdraw-amount").value);

    if (selectedAccountIndex === -1) {
        alert("Please select an account.");
        return;
    }

    var clientlist = JSON.parse(localStorage.getItem("clientlist"));


    if (!isNaN(witdrawnAmount) && witdrawnAmount > 0) {
        var currentBalance = parseFloat(clientlist[selectedAccountIndex].balance);
        clientlist[selectedAccountIndex].balance = currentBalance - witdrawnAmount;

        localStorage.setItem("clientlist", JSON.stringify(clientlist));

        showData();

        document.getElementById("withdraw-amount").value = "";

        alert("Withdrawal successful.");
    } else {
        alert("Please enter a valid withdrawal amount.");
    }
}

     

document.onload = showData();
