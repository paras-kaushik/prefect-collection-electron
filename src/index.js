const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { createTransaction, createPurchase, getTodaysTransactions, getPurchases, updateTransaction, deleteTransaction } = require('./crud');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'pages/homePage.html'));
  //mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.handle('create-transaction', async (event, transaction) => {
  return await createTransaction(transaction);
});

ipcMain.handle('create-purchase', async (event, purchase) => {
  return await createPurchase(purchase);
});

ipcMain.handle('get-todays-transactions', async () => {
  return await getTodaysTransactions();
});

ipcMain.handle('get-todays-sales', async () => {
  try {
    const transactions = await getTodaysTransactions();
    const totalSales = transactions.reduce((sum, transaction) => sum + transaction.netPrice, 0);
    return totalSales;
  } catch (error) {
    console.error('Error fetching today\'s sales:', error);
    return 0;
  }
});

ipcMain.handle('get-purchases', async (event, transactionId) => {
  return await getPurchases(transactionId);
});

ipcMain.handle('update-transaction', async (event, id, update) => {
  return await updateTransaction(id, update);
});

ipcMain.handle('delete-transaction', async (event, id) => {
  return await deleteTransaction(id);
});

ipcMain.handle('print-invoice', async (event, invoiceHTML) => {
  //console.log(invoiceHTML);
  const printWindow = new BrowserWindow({ show: false });
  printWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(invoiceHTML));

  printWindow.webContents.on('did-finish-load', () => {
    printWindow.webContents.print({}, (success, errorType) => {
      if (!success) console.log(errorType);
      printWindow.close();
    });
  });
});