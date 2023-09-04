function showData() {
    var clientlist;
    if (localStorage.getItem("clientlist") === null) {
        clientlist = [];
    } else {
        clientlist = JSON.parse(localStorage.getItem("clientlist"));
    }

    var options = "";
    clientlist.forEach(function (element) {
        options += "<option>" + element.name + "</option>";

    });


    var accountNameSelect = document.querySelector("#account-name");
    accountNameSelect.innerHTML = options;

}

//loads all data when document or page loaded 
document.onload = showData();


function deposit() {
    var accountNameSelect = document.getElementById("account-name");
    var selectedAccountIndex = accountNameSelect.selectedIndex;
    var depositAmount = parseFloat(document.getElementById("deposit-amount").value);

    if (selectedAccountIndex === -1) {
        alert("Please select an account.");
        return;
    }

    var clientlist = JSON.parse(localStorage.getItem("clientlist"));
    if (!isNaN(depositAmount) && depositAmount > 0) {
        var currentBalance = parseFloat(clientlist[selectedAccountIndex].balance);
        clientlist[selectedAccountIndex].balance = currentBalance + depositAmount;

        localStorage.setItem("clientlist", JSON.stringify(clientlist));

        showData();

        document.getElementById("deposit-amount").value = "";

        alert("Deposit successful.");
    } else {
        alert("Please enter a valid deposit amount.");
    }
}