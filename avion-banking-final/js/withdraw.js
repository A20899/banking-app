function showData() {
    var clientlist;
    if (localStorage.getItem("clientlist") === null) {
        clientlist = [];
    } else {
        clientlist = JSON.parse(localStorage.getItem("clientlist"));
    }

    var optionsWithdraw = "";

    clientlist.forEach(function (element) {

        // Generate HTML for select options
        optionsWithdraw += "<option>" + element.name + "</option>";

    });
    // Update the select element with account names - withdraw
    var accountNameSelectWithdraw = document.querySelector("#account-name-withdraw");
    accountNameSelectWithdraw.innerHTML = optionsWithdraw;
}

function withdraw() {
    var accountNameSelectWithdraw = document.getElementById("account-name-withdraw");
    var selectedAccountIndex = accountNameSelectWithdraw.selectedIndex;
    var witdrawnAmount = parseFloat(document.getElementById("withdraw-amount").value);

    // Ensure a valid account is selected
    if (selectedAccountIndex === -1) {
        alert("Please select an account.");
        return;
    }

    // Get the client list from localStorage
    var clientlist = JSON.parse(localStorage.getItem("clientlist"));

    // Update the balance of the selected account
    // Update the balance of the selected account
    if (!isNaN(witdrawnAmount) && witdrawnAmount > 0) {
        // Parse the balance to ensure it's a number
        var currentBalance = parseFloat(clientlist[selectedAccountIndex].balance);
        clientlist[selectedAccountIndex].balance = currentBalance - witdrawnAmount;

        // Update the client list data in localStorage
        localStorage.setItem("clientlist", JSON.stringify(clientlist));

        // Refresh the displayed data
        showData();

        // Clear the deposit amount input field
        document.getElementById("withdraw-amount").value = "";

        alert("Withdrawal successful.");
    } else {
        alert("Please enter a valid withdrawal amount.");
    }
}

     

//loads all data when document or page loaded 
document.onload = showData();
