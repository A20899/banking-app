function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var balance = parseFloat(document.getElementById("balance").value);

    if (name === "") {
        alert("Name is required");
        return false;
    }

    if (email === "") {
        alert("Email is required");
        return false;
    }
    else if (!email.includes("@")) {
        alert("Invalid email address");
        return false;
    }

    if (password === "") {
        alert("Password is required");
        return false;
    }

    if (isNaN(balance) || balance < 0) {
        alert("Balance must be a non-negative number");
        return false;
    }

    if (userAlreadyExists(name, email)) {
        alert("This user already exists");
        return false;
    }

    if (/^\d/.test(name)) {
        alert("Name cannot start with a number");
        return false;
    }

    return true;
}


function createClient() {
    document.querySelector(".create-user-container").style.display = "block";
}

function showData() {
    var clientlist;
    if (localStorage.getItem("clientlist") === null) {
        clientlist = [];
    } else {
        clientlist = JSON.parse(localStorage.getItem("clientlist"));
    }

    var html = "";
    var options = "";
    var optionsWithdraw = "";
    var optionsSender = "";
    var optionsRecipient = "";


    clientlist.forEach(function (element, index) {
        // Generate HTML for table rows
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.password + "</td>";
        html += "<td>" + "Php " + parseFloat(element.balance) + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button>  <button onclick="userProfile(' + index + ')"class="btn btn-success m-2">Budget</button></td>';

        html += "</tr>";

        // Generate HTML for select options
        options += "<option>" + element.name + "</option>";
        optionsWithdraw += "<option>" + element.name + "</option>";
        optionsSender += "<option>" + element.name + "</option>";
        optionsRecipient += "<option>" + element.name + "</option>";
    });

    var crudTableBody = document.querySelector("#crudTable tbody");
    crudTableBody.innerHTML = html;

    var accountNameSelect = document.querySelector("#account-name");
    accountNameSelect.innerHTML = options;

    var accountNameSelectWithdraw = document.querySelector("#account-name-withdraw");
    accountNameSelectWithdraw.innerHTML = optionsWithdraw;

    var accountNameSelectTransferSender = document.querySelector("#account-name-sender");
    accountNameSelectTransferSender.innerHTML = optionsSender;

    var accountNameSelectTransferRecipient = document.querySelector("#account-name-recipient");
    accountNameSelectTransferRecipient.innerHTML = optionsRecipient;
}

    
document.onload = showData();

function AddData() {
    if (validateForm() === true) {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var balance = parseFloat(document.getElementById("balance").value);

        var clientlist;
        if (localStorage.getItem("clientlist") === null) {
        clientlist = [];
        }

        else {
            clientlist = JSON.parse(localStorage.getItem("clientlist"));
        }
        
        clientlist.push({
            name: name,
            email: email,
            password: password,
            balance: balance,
        });

        localStorage.setItem("clientlist", JSON.stringify(clientlist));

        showData();
        
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("balance").value = "";
    }
}



function deleteData(index) {
    var clientlist;

    if (localStorage.getItem("clientlist") == null) {
        clientlist = [];
    } else {
        clientlist = JSON.parse(localStorage.getItem("clientlist"));
    }

    clientlist.splice(index, 1);
    
    localStorage.setItem("clientlist", JSON.stringify(clientlist));
    showData();
    showOptionData();

}


function updateData(index) {
    var clientlist;

    createClient();

    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    if (localStorage.getItem("clientlist") == null) {
        clientlist = [];
    } else {
        clientlist = JSON.parse(localStorage.getItem("clientlist"));
    }

    document.getElementById("name").value = clientlist[index].name;
    document.getElementById("email").value = clientlist[index].email;
    document.getElementById("password").value = clientlist[index].password;
    document.getElementById("balance").value = clientlist[index].balance;

    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) {
            clientlist[index].name = document.getElementById("name").value; 
            clientlist[index].email = document.getElementById("email").value; 
            clientlist[index].password = document.getElementById("password").value; 
            clientlist[index].balance = document.getElementById("balance").value; 

            localStorage.setItem("clientlist", JSON.stringify(clientlist));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("balance").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}
function userProfile(index) {
    var clientlist;
    if (localStorage.getItem("clientlist") == null) {
        clientlist = [];
    } else {
        clientlist = JSON.parse(localStorage.getItem("clientlist"));
    }

    // Check if the index is valid
    if (index >= 0 && index < clientlist.length) {
        // Get the user's data
        var user = clientlist[index];

        // Store the selected user's data in localStorage
        localStorage.setItem("selectedUser", JSON.stringify(user));

        // Redirect to userprofile.html
        window.location.href = "/html/userprofile.html";
    }
}

