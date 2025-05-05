// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  createTransaction: (transaction) => ipcRenderer.invoke('create-transaction', transaction),
  createPurchase: (purchase) => ipcRenderer.invoke('create-purchase', purchase),
  getTransactions: () => ipcRenderer.invoke('get-transactions'),
  getPurchases: (transactionId) => ipcRenderer.invoke('get-purchases', transactionId),
  updateTransaction: (id, update) => ipcRenderer.invoke('update-transaction', id, update),
  deleteTransaction: (id) => ipcRenderer.invoke('delete-transaction', id)
});