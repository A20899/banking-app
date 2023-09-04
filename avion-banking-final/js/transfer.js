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

    var accountNameSelectTransferSender = document.querySelector("#account-name-sender");
    accountNameSelectTransferSender.innerHTML = optionsSender;

    var accountNameSelectTransferRecipient = document.querySelector("#account-name-recipient");
    accountNameSelectTransferRecipient.innerHTML = optionsRecipient;

}

     
document.onload = showData();



// transfer to different accounts 

function transfer() {
    var accountNameSelectTransferSender = document.getElementById("account-name-sender");
    var accountNameSelectTransferRecipient = document.getElementById("account-name-recipient");
    var selectedAccountIndexSender = accountNameSelectTransferSender.selectedIndex;
    var selectedAccountIndexRecipient = accountNameSelectTransferRecipient.selectedIndex;
    var transferAmount = parseFloat(document.getElementById("transfer-amount").value);

    if (selectedAccountIndexSender === -1 || selectedAccountIndexRecipient === -1) {
        alert("Please select sender and recipient accounts.");
        return;
    }

    var clientlist = JSON.parse(localStorage.getItem("clientlist"));

    var senderBalance = parseFloat(clientlist[selectedAccountIndexSender].balance);
    if (isNaN(transferAmount) || transferAmount <= 0 || transferAmount > senderBalance) {
        alert("Invalid transfer amount or insufficient balance.");
        return;
    }

    clientlist[selectedAccountIndexSender].balance = senderBalance - transferAmount;

    var recipientBalance = parseFloat(clientlist[selectedAccountIndexRecipient].balance);
    clientlist[selectedAccountIndexRecipient].balance = recipientBalance + transferAmount;

    localStorage.setItem("clientlist", JSON.stringify(clientlist));

    showData();

    document.getElementById("transfer-amount").value = "";

    alert("Transfer successful.");
}
