
const balanceElement = document.getElementById('cs21_balam');
const incomeElement = document.getElementById('cs21_incam');
const expenseElement = document.getElementById('cs21_expam');
const transactionTypeElement = document.getElementById('cs21_ty');
const categoryInput = document.getElementById('cs21_inp');
const amountInput = document.getElementById('cs21_aminp');
const submitButton = document.getElementById('cs21_submitbt');
const historyList = document.getElementById('cs21_historylist');


let balance = 0;
let income = 0;
let expense = 0;


submitButton.addEventListener('click', () => {
  const transactionType = transactionTypeElement.value;
  const category = categoryInput.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount)) {
    alert('Please enter a valid amount.');
    return;
  }

  if (transactionType === 'income') {
    income += amount;
  } else if (transactionType === 'expense') {
    expense += amount;
  }

  balance = income - expense;

  balanceElement.textContent = balance.toFixed(2);
  incomeElement.textContent = income.toFixed(2);
  expenseElement.textContent = expense.toFixed(2);

  
  const transactionItem = document.createElement('div');
  transactionItem.classList.add('cs21_listind');
  transactionItem.innerHTML = `
    <div class="cs21_historynm">${category}</div>
    <div class="cs21_historyamount">${amount.toFixed(2)}</div>
  `;
  historyList.appendChild(transactionItem);


  categoryInput.value = '';
  amountInput.value = '';
});
