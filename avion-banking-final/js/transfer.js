function showData() {
    var clientlist;
    if (localStorage.getItem("clientlist") === null) {
        clientlist = [];
    } else {
        clientlist = JSON.parse(localStorage.getItem("clientlist"));
    }
    var optionsSender = "";
    var optionsRecipient = "";

    clientlist.forEach(function (element, index) {
        optionsSender += "<option>" + element.name + "</option>";
        optionsRecipient += "<option>" + element.name + "</option>";

    });
    // Update the select element with account names - transfer sender
    var accountNameSelectTransferSender = document.querySelector("#account-name-sender");
    accountNameSelectTransferSender.innerHTML = optionsSender;

    // Update the select element with account names - transfer recipient
    var accountNameSelectTransferRecipient = document.querySelector("#account-name-recipient");
    accountNameSelectTransferRecipient.innerHTML = optionsRecipient;

}

     

//loads all data when document or page loaded 
document.onload = showData();



// transfer to different accounts 

function transfer() {
    var accountNameSelectTransferSender = document.getElementById("account-name-sender");
    var accountNameSelectTransferRecipient = document.getElementById("account-name-recipient");
    var selectedAccountIndexSender = accountNameSelectTransferSender.selectedIndex;
    var selectedAccountIndexRecipient = accountNameSelectTransferRecipient.selectedIndex;
    var transferAmount = parseFloat(document.getElementById("transfer-amount").value);

    // Ensure valid sender and recipient accounts are selected
    if (selectedAccountIndexSender === -1 || selectedAccountIndexRecipient === -1) {
        alert("Please select sender and recipient accounts.");
        return;
    }

    // Get the client list from localStorage
    var clientlist = JSON.parse(localStorage.getItem("clientlist"));

    // Ensure the sender has sufficient balance for the transfer
    var senderBalance = parseFloat(clientlist[selectedAccountIndexSender].balance);
    if (isNaN(transferAmount) || transferAmount <= 0 || transferAmount > senderBalance) {
        alert("Invalid transfer amount or insufficient balance.");
        return;
    }

    // Deduct the transfer amount from the sender's balance
    clientlist[selectedAccountIndexSender].balance = senderBalance - transferAmount;

    // Add the transfer amount to the recipient's balance
    var recipientBalance = parseFloat(clientlist[selectedAccountIndexRecipient].balance);
    clientlist[selectedAccountIndexRecipient].balance = recipientBalance + transferAmount;

    // Update the client list data in localStorage
    localStorage.setItem("clientlist", JSON.stringify(clientlist));

    // Refresh the displayed data
    showData();

    // Clear the transfer amount input field
    document.getElementById("transfer-amount").value = "";

    alert("Transfer successful.");
}