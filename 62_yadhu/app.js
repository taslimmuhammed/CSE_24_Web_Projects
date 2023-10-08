document.addEventListener("DOMContentLoaded", function () {
    let cs62_score = 0;
    const expenses = [];
    const expensesList = document.getElementById("expenses");
    const totalExpenses = document.getElementById("total-expenses");

    const addExpenseButton = document.getElementById("add-expense");
    addExpenseButton.addEventListener("click", function () {
        const description = document.getElementById("expense-description").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);

        if (!description || isNaN(amount)) {
            alert("Please enter a valid description and amount.");
            return;
        }

        const expense = {
            description,
            amount
        };

        expenses.push(expense);
        cs62UpdateScore();
        updateExpenseList();
        clearInputFields();
    });

    function cs62UpdateScore() {
        let total = 0;

        expenses.forEach((expense, index) => {
            total += expense.amount;
        });

        cs62_score = total.toFixed(2);
        totalExpenses.textContent = cs62_score;
    }

    function updateExpenseList() {
        expensesList.innerHTML = "";

        expenses.forEach((expense, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${expense.description}: ₹${expense.amount}`;
            expensesList.appendChild(listItem);
        });
    }

    function clearInputFields() {
        document.getElementById("expense-description").value = "";
        document.getElementById("expense-amount").value = "";
    }
});
