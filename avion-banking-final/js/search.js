function filterTable() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();

    const table = document.getElementById('crudTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const nameColumn = rows[i].getElementsByTagName('td')[0]; // Assuming client names are in the first column
        if (nameColumn) {
            const nameValue = nameColumn.textContent || nameColumn.innerText;
            if (nameValue.toUpperCase().indexOf(filter) > -1) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

function filterExpenseTable() {
    // Get input value
    const input = document.getElementById('searchInputExpense');
    const filter = input.value.toUpperCase();

    const table = document.getElementById('expenseTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const nameColumn = rows[i].getElementsByTagName('td')[2]; // Assuming expense categories are in the third column
        if (nameColumn) {
            const nameValue = nameColumn.textContent || nameColumn.innerText;
            if (nameValue.toUpperCase().indexOf(filter) > -1) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

const searchInputExpense = document.getElementById('searchInputExpense');
searchInputExpense.addEventListener('keyup', filterExpenseTable);

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', filterTable);
