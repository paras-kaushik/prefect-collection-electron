const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'billing.db');

// Create the directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database.');

    db.run(`CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      transactionNumber TEXT,
      totalItems INTEGER,
      totalPrice REAL,
      netPrice REAL,
      transactionType TEXT,
      remarks TEXT,
      createdAt TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      transactionId INTEGER,
      itemNumber TEXT,
      itemName TEXT,
      itemPrice REAL,
      itemQuantity INTEGER,
      itemTotalPrice REAL,
      FOREIGN KEY (transactionId) REFERENCES transactions(id)
    )`);
  }
});

module.exports = db;