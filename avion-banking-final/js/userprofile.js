var selectedUserData = localStorage.getItem("selectedUser");
var user;

if (selectedUserData) {
    user = JSON.parse(selectedUserData);
    var userProfileContainer = document.querySelector(".user-profile-container");
    var nameElement = document.createElement("h2");
    nameElement.textContent = "Name: " + user.name;
    var emailElement = document.createElement("h2");
    emailElement.textContent = "Email: " + user.email;
    var balanceElement = document.createElement("h2");
    balanceElement.textContent = "Balance: Php " + user.balance.toFixed(2);

    userProfileContainer.appendChild(nameElement);
    userProfileContainer.appendChild(emailElement);
    userProfileContainer.appendChild(balanceElement);
}

function updateDisplayedBalance() {
    if (user) {
        balanceElement.textContent = "Balance: Php " + user.balance.toFixed(2);
    }
}

function updateBalance(newBalance) {
    if (user) {
        user.balance = newBalance;
        localStorage.setItem("selectedUser", JSON.stringify(user));
        updateDisplayedBalance();
    }

    var clientlist;
    if (localStorage.getItem("clientlist") === null) {
        clientlist = [];
    } else {
        clientlist = JSON.parse(localStorage.getItem("clientlist"));
    }

    clientlist.forEach(function (element, index) {
        if (element.name === user.name) {
            element.balance = newBalance;
            return;
        }
    });

    localStorage.setItem("clientlist", JSON.stringify(clientlist));
}

function addExpense() {
    document.querySelector(".expense-table").style.display = "block";

    const expenseDate = document.getElementById('expenseDate').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value); // Parse amount as a float
    const expenseCategory = document.getElementById('expenseCategory').value;

    const expense = {
        date: expenseDate,
        amount: expenseAmount,
        category: expenseCategory,
    };

    const selectedUserData = localStorage.getItem('selectedUser');

    if (!selectedUserData) {
        alert('No user selected. Please select a user first.');
        return;
    }

    const selectedUser = JSON.parse(selectedUserData);

    let userExpenses = JSON.parse(localStorage.getItem(selectedUser.name + '_expenses')) || [];

    userExpenses.push(expense);

    selectedUser.balance -= expenseAmount;
    updateBalance(selectedUser.balance); // Update the balance

    localStorage.setItem(selectedUser.name + '_expenses', JSON.stringify(userExpenses));

    displayExpensesTable();
    clearExpenseForm();

    updateExpenseCategories();
    drawChart();
}

function clearExpenseForm() {
    document.getElementById('expenseDate').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseCategory').value = '';
}

function displayExpensesTable() {
    const selectedUserData = localStorage.getItem('selectedUser');
    if (!selectedUserData) {
        alert('No user selected. Please select a user first.');
        return;
    }
    const selectedUser = JSON.parse(selectedUserData);
    const userExpenses = JSON.parse(localStorage.getItem(selectedUser.name + '_expenses')) || [];

    const table = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';

    userExpenses.forEach((expense, index) => {
        const newRow = table.insertRow(table.rows.length);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);

        cell1.textContent = expense.date;
        cell2.textContent = expense.amount;
        cell3.textContent = expense.category;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn', 'btn-warning');
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger');
        
        editButton.onclick = function () {
            const editForm = document.createElement('form');

            const dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.value = expense.date;

            const amountInput = document.createElement('input');
            amountInput.type = 'number';
            amountInput.value = expense.amount;

            const categoryInput = document.createElement('input');
            categoryInput.type = 'text';
            categoryInput.value = expense.category;

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.addEventListener('click', function () {
                const newAmount = parseFloat(amountInput.value);
                const difference = newAmount - expense.amount;

                expense.date = dateInput.value;
                expense.amount = newAmount;
                expense.category = categoryInput.value;

                cell1.textContent = expense.date;
                cell2.textContent = expense.amount;
                cell3.textContent = expense.category;

                const userExpenses = JSON.parse(localStorage.getItem(selectedUser.name + '_expenses')) || [];
                const index = userExpenses.indexOf(expense);
                if (index !== -1) {
                    userExpenses[index] = expense;
                    localStorage.setItem(selectedUser.name + '_expenses', JSON.stringify(userExpenses));
                }

                selectedUser.balance -= difference;
                updateBalance(selectedUser.balance);

                // Show the edit and delete buttons again
                editButton.style.display = 'inline-block';
                deleteButton.style.display = 'inline-block'; // Use the local deleteButton

                cell4.innerHTML = '';
                cell4.appendChild(editButton);
                cell4.appendChild(deleteButton); // Use the local deleteButton
            });

            editForm.appendChild(dateInput);
            editForm.appendChild(amountInput);
            editForm.appendChild(categoryInput);
            editForm.appendChild(saveButton);

            // Hide the edit and delete buttons while editing
            editButton.style.display = 'none';

            cell4.innerHTML = '';
            cell4.appendChild(editForm);
            cell4.appendChild(deleteButton);
        };
        
        deleteButton.onclick = function () {
            userExpenses.splice(index, 1); // Remove the expense from the array
            localStorage.setItem(selectedUser.name + '_expenses', JSON.stringify(userExpenses)); // Update local storage
            displayExpensesTable(); // Refresh the table
            updateExpenseCategories();
            drawChart();
        };


        cell4.appendChild(editButton);
        cell4.appendChild(deleteButton);
    });
}

var expenseCategories = {};

function updateExpenseCategories() {
    const selectedUserData = localStorage.getItem('selectedUser');

    if (!selectedUserData) {
        return;
    }

    const selectedUser = JSON.parse(selectedUserData);
    const userExpenses = JSON.parse(localStorage.getItem(selectedUser.name + '_expenses')) || [];

    expenseCategories = {};

    userExpenses.forEach((expense) => {
        const category = expense.category;
        const amount = expense.amount;

        if (!expenseCategories[category]) {
            expenseCategories[category] = 0;
        }

        expenseCategories[category] += amount;
    });
}

updateExpenseCategories();
function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Total Amount');

    var dataArray = [];
    for (var category in expenseCategories) {
        dataArray.push([category, expenseCategories[category]]);
    }
    data.addRows(dataArray);

    var options = {
        title: 'Expense Categories',
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
}


window.onload = function () {
    updateDisplayedBalance();
    displayExpensesTable();
};
