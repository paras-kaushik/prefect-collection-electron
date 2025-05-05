async function loadTodaysTransactions() {
  try {
    const transactions = await window.api.getTodaysTransactions();
    console.log('Transactions:', transactions);

    const transactionsList = document.getElementById('transactionsList');
    transactionsList.innerHTML = '';

    // Create a single table for all transactions
    const transactionTable = document.createElement('table');
    transactionTable.style.width = '100%';
    transactionTable.style.borderCollapse = 'collapse';

    // Create table header
    const headerRow = transactionTable.insertRow();
    headerRow.innerHTML = `
      <th style="border: 1px solid #ddd; padding: 8px;">Transaction Number</th>
      <th style="border: 1px solid #ddd; padding: 8px;">Net Price</th>
      <th style="border: 1px solid #ddd; padding: 8px;">Actions</th>
    `;
    headerRow.style.backgroundColor = '#f2f2f2';

    for (const transaction of transactions) {
      const purchases = await window.api.getPurchases(transaction.id);
      console.log(`Purchases for Transaction ${transaction.transactionNumber}:`, purchases);

      // Format purchases as a string
      const purchasesText = purchases.map(purchase => 
        `${purchase.itemName}: ${purchase.itemPrice} * ${purchase.itemQuantity}`
      ).join(', ');

      // Create a row for each transaction
      const transactionRow = transactionTable.insertRow();
      transactionRow.innerHTML = `
        <td style="border: 1px solid #ddd; padding: 8px;">${transaction.transactionNumber}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${transaction.netPrice}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">
          <button onclick="deleteTransaction(${transaction.id})" style="padding: 5px 10px; background-color: red; color: white; border: none; cursor: pointer;">Delete</button>
        </td>
      `;
    }

    transactionsList.appendChild(transactionTable);
  } catch (error) {
    console.error('Error loading transactions:', error);
  }
}

async function deleteTransaction(id) {
  try {
    await window.api.deleteTransaction(id);
    console.log(`Transaction ${id} deleted successfully.`);
    loadTodaysTransactions(); // Refresh the list after deletion
  } catch (error) {
    console.error('Error deleting transaction:', error);
  }
}

function handleKeyPress(event) {
  const key = event.key.toLowerCase();

  if (key === "z") {
    window.location.href = 'homePage.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener("keyup", handleKeyPress);
  loadTodaysTransactions();
});