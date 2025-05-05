const db = require('./database');

// Create Transaction
const createTransaction = (transaction) => {
  return new Promise((resolve, reject) => {
    const { transactionNumber, totalItems, totalPrice, netPrice, transactionType, remarks } = transaction;
    const createdAt = new Date().toISOString(); // Automatically set the current date and time
    db.run(`INSERT INTO transactions (transactionNumber, totalItems, totalPrice, netPrice, transactionType, remarks, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [transactionNumber, totalItems, totalPrice, netPrice, transactionType, remarks, createdAt],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
  });
};

// Create Purchase
const createPurchase = (purchase) => {
  return new Promise((resolve, reject) => {
    const { transactionId, itemNumber, itemName, itemPrice, itemQuantity, itemTotalPrice } = purchase;
    db.run(`INSERT INTO purchases (transactionId, itemNumber, itemName, itemPrice, itemQuantity, itemTotalPrice) VALUES (?, ?, ?, ?, ?, ?)`,
      [transactionId, itemNumber, itemName, itemPrice, itemQuantity, itemTotalPrice],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
  });
};

// Helper function to format date to YYYY-MM-DD
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

// Read Transactions by Date
const getTransactionsByDate = (date) => {
  return new Promise((resolve, reject) => {
    const formattedDate = formatDate(date);
    db.all(`SELECT * FROM transactions WHERE DATE(createdAt) = ? ORDER BY createdAt DESC`, [formattedDate], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Read Today's Transactions
const getTodaysTransactions = () => {
  return getTransactionsByDate(new Date());
};

// Read Purchases for a Transaction
const getPurchases = (transactionId) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM purchases WHERE transactionId = ?`, [transactionId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Update Transaction
const updateTransaction = (id, update) => {
  return new Promise((resolve, reject) => {
    const { transactionNumber, totalItems, totalPrice, netPrice, transactionType, remarks, createdAt } = update;
    db.run(`UPDATE transactions SET transactionNumber = ?, totalItems = ?, totalPrice = ?, netPrice = ?, transactionType = ?, remarks = ?, createdAt = ? WHERE id = ?`,
      [transactionNumber, totalItems, totalPrice, netPrice, transactionType, remarks, createdAt, id],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
  });
};

// Delete Transaction and its Purchases
const deleteTransaction = (id) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`DELETE FROM purchases WHERE transactionId = ?`, id, function(err) {
        if (err) {
          reject(err);
        }
      });

      db.run(`DELETE FROM transactions WHERE id = ?`, id, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  });
};

module.exports = { createTransaction, createPurchase, getTodaysTransactions, getTransactionsByDate, getPurchases, updateTransaction, deleteTransaction };