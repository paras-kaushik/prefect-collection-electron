const completeTransactionJson = {
  purchases: []
};

const shopItems = {
  1: "Kurta", 2: "Nighty", 3: "N.Suit", 4: "Lower", 5: "Capri",
  6: "Shorts", 7: "Shirt", 8: "T-shirt", 9: "Trouser", 10: "U.W",
  11: "Vest", 12: "Dhoti", 13: "Patka", 14: "Jacket", 15: "Sherwani"
};

let currentDiscountValue = 10;

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupEventListeners();
  loadShopItems();
});

function handleDiscountValue(){
  const bigDiscountCheckbox = document.getElementById("bigDiscountCheckbox");
  const bigDiscountToggle = localStorage.getItem("bigDiscounttoggle") || "unsetDiscount";
  const discountValueDisplayElem = document.getElementById("discount-value-display-elem");

  if (bigDiscountToggle === "setDiscount") {
    bigDiscountCheckbox.checked = true;
    discountValueDisplayElem.innerText = "15% DISCOUNT";
    currentDiscountValue = 15;
    //document.body.style.background = "red";
  } else {
    //document.body.style.background = "blue";
    currentDiscountValue = 10;
  }
}

function handleLocalStorageTransactionNumber(){
  const transactionNumber = localStorage.getItem("on_load_counter") || 0;
  completeTransactionJson.transactionNumber = transactionNumber;

  localStorage.setItem("on_load_counter", transactionNumber);

  $(".rough-estimate-number").text(transactionNumber);

}

function setTodaysDateForDatePicker(){
  const today = new Date();
  $("#page-date").val(today.toISOString().substring(0, 10));
}

function setupInputNavigation() {
  const inputPair = $(".input-pair");
  inputPair.eq(0).keypress(event => { if (event.key === "Enter") inputPair.eq(1).focus(); });
  inputPair.eq(1).keypress(event => { if (event.key === "Enter") inputPair.eq(2).focus(); });
  inputPair.eq(2).keypress(event => { if (event.key === "Enter") inputPair.eq(0).focus(); });
}

function initializeApp() {
  handleDiscountValue();
  handleLocalStorageTransactionNumber();
  setTodaysDateForDatePicker();
  setupInputNavigation();
}

function setupEventListeners() {
  $("#bigDiscountCheckbox").change(toggleDiscount);

  document.addEventListener("keyup", handleKeyPress);

  $("#wild-input").keyup((e) => {
    if (e.key === "Enter") {
      ///$("#wild-input").prop("disabled", true); wtf was this for ?
      $(".input-pair").first().focus();
    }
  });
}

function toggleDiscount() {
  const isChecked = $("#bigDiscountCheckbox").is(":checked");
  const discountValue = isChecked ? 15 : 10;
  const discountText = `${discountValue}% DISCOUNT`;
  const backgroundColor = isChecked ? "red" : "blue";

  localStorage.setItem("bigDiscounttoggle", isChecked ? "setDiscount" : "unsetDiscount");
  $("#discount-value-display-elem").text(discountText);
  //document.body.style.background = backgroundColor;
  currentDiscountValue = discountValue;
  location.reload();
}

function loadShopItems() {
  const mapList = $("#map-list");
  for (const [key, value] of Object.entries(shopItems)) {
    mapList.append(`<div>${key} ${value}</div>`);
  }
}

async function handleDownload() {
  if(completeTransactionJson.purchases.length==0) return;

  //$(".item-delete").hide();

  const transactionType = $(".hindi").is(":visible") ? "CASH" : "CARD/DIGITAL";
  completeTransactionJson.transactionType = transactionType;
  completeTransactionJson.remarks = $("#wild-input").val();
  completeTransactionJson.createdAt = $("#page-date").val();
  incrementTransactionNumber();

  //$("#input-and-mapping-container").remove();
  //$(".item-table").css("max-height", "unset");
  location.reload();
    // Generate HTML from completeTransactionJson
 // Generate HTML from completeTransactionJson
    const invoiceHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f9fa;
                margin: 0;
            }
            .invoice {
                background: white;
                padding: 10px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header, .footer {
                text-align: center;
                margin-bottom: 20px;
            }
            .header h1, .footer h3 {
                margin: 0;
            }
            .details, .summary {
                margin-bottom: 20px;
            }
            .details h4, .summary h4 {
                margin: 5px 0;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
                font-weight: bolder;
            }
            th {
                background-color: #f2f2f2;
            }
            .total {
                font-weight: bold;
            }
            .net-total {
                font-size: 3rem;
            }
            h3 {
                margin: 4px;
            }
            p {
              font-weight: 900;
              }
        </style>
    </head>
    <body>
    <div class="invoice">
        <div class="header">
            <h1>Perfect Collection (9899258797)</h1>
            <p>SC-190, Jaipuria Sunrise Plaza, Indirapuram, GIZB, UP</p>
        </div>
        <div class="details">
            <h4>Rough Estimate No. ${completeTransactionJson.transactionNumber}</h4>
            <h4>Date: ${completeTransactionJson.createdAt}</h4>
        </div>
        <table>
            <thead>
                <tr>
                    <th>ITEM</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL PRICE</th>
                </tr>
            </thead>
            <tbody>
                ${completeTransactionJson.purchases.map(purchase => `
                    <tr>
                        <td>${purchase.itemName}</td>
                        <td>${purchase.itemPrice}</td>
                        <td>${purchase.itemQuantity}</td>
                        <td>${purchase.itemTotalPrice}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <div class="summary" style="display: flex; flex-direction: column; gap: 10px;width: 80%; margin: 0 auto 20px;">
            <div class="summary-item" style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1rem;">
                <span>Total Items:</span>
                <span id="total-items">${completeTransactionJson.totalItems}</span>
            </div>
            <div class="summary-item" style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1rem;">
                <span>Total:</span>
                <span id="total-amount">${completeTransactionJson.totalPrice}</span>
            </div>
            <div class="summary-item" style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1rem;">
                <span>${currentDiscountValue}% DISCOUNT:</span>
                <span id="discount">-${(completeTransactionJson.totalPrice * (currentDiscountValue / 100)).toFixed(2)}</span>
            </div>
            <div class="summary-item net-total" style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1rem;">
                <span>Net Total:</span>
                <span id="net-total">${completeTransactionJson.netPrice}</span>
            </div>
        </div>
        <div class="footer">
            <h3>FIXED PRICE SHOP</h3>
        </div>
    </div>
    </body>
    </html>
    `;

  // Send the HTML to the main process to print
  //await window.api.printInvoice(invoiceHTML);
  window.api.printInvoice(invoiceHTML);
  
  console.log(JSON.stringify(completeTransactionJson));
  try {
    const purchases=completeTransactionJson.purchases;

    delete completeTransactionJson.purchases;
    // Create a transaction in SQLite
    const transactionId = await window.api.createTransaction(completeTransactionJson);
    purchases.map((purchase)=>purchase.transactionId=transactionId);
    console.log('Transaction created with ID:', transactionId);

    for (const purchase of purchases) {
      await window.api.createPurchase(purchase);
    }

    console.log("Transaction and purchases successfully saved to SQLite.");
  } catch (error) {
    console.error("Error:", error);
  }
 
  
}

function incrementTransactionNumber() {
  let transactionNumber = parseInt(localStorage.getItem("on_load_counter") || 0);

  transactionNumber++;
  localStorage.setItem("on_load_counter", transactionNumber);
}

function handleKeyPress(event) {
  const key = event.key.toLowerCase();
  console.log(key);
  if (key === "shift"){
    handleDownload();
  }
  if (key === "z"){
    window.location.href = 'transactionsPage.html';
  }
  if (key === "c") $("#ttb").click();
  if (key === "m" ) {
    window.location.href = 'dataChartPage.html';
  }
  if (key === "r") {
    localStorage.clear();
    window.location.reload();
    console.log('LocalStorage has been reset.');
  }
}

function increaseTotalItemsCount() {
  var quantities = document.querySelectorAll("#table-body .item-quantity");
  var totalItems = 0;

  // Loop through each quantity element and add its value to totalItems
  for (var i = 0; i < quantities.length; i++) {
    var quantityText = quantities[i].textContent || quantities[i].innerText;
    var quantity = parseInt(quantityText) || 0;
    totalItems += quantity;
  }

  // Update the total items count in the UI
  document.getElementById("page-total-items").textContent = totalItems;

  // Update the total items in the transaction JSON
  completeTransactionJson.totalItems = totalItems;
}

function updatePageTotals() {
  var totals = document.querySelectorAll("#table-body .item-total");
  var totalSum = 0;

  // Loop through each total element and add its value to totalSum
  for (var i = 0; i < totals.length; i++) {
    var totalText = totals[i].textContent || totals[i].innerText;
    var total = parseInt(totalText) || 0;
    totalSum += total;
  }

  // Calculate discount and net total
  var discount = (totalSum * (currentDiscountValue / 100)).toFixed(1);
  var netTotal = Math.round((totalSum - discount).toFixed(1));

  // Update the totals in the UI
  document.getElementById("page-total-sum").textContent = totalSum;// should be int
  document.getElementById("page-total-discountMinus").textContent = "-" + discount;// fixed to 1 decimal
  document.getElementById("paget-total-netTotal").textContent = netTotal;// rounded off

  // Update the transaction JSON
  completeTransactionJson.totalPrice = totalSum;
  completeTransactionJson.netPrice = netTotal;
}

function additemToListOnEnter(event) {
  if (event.key === "Enter") {
    handleAddItemToList();
  }
}

function handleAddItemToList() {
  const newItemNumber = $("#new-item-number").val();
  const newItemPrice = $("#new-item-price-input").val();
  const newItemQuantity = $("#new-item-quantity-input").val();

  if (!(newItemNumber && newItemPrice && newItemQuantity && newItemNumber > 0 && newItemPrice > 0 && newItemQuantity > 0)) return;

  $("#new-item-number, #new-item-price-input, #new-item-quantity-input").val("");

  const newRowTotal = newItemPrice * newItemQuantity;
  const uniqueId = `id_${$("#table-body >tr").length}`;
  const itemName = shopItems[newItemNumber];

  if (!itemName) return;

  const listItem = `
    <tr id="${uniqueId}" class="item-row">
      <td><span class="item-name">${itemName}</span></td>
      <td><span class="item-price">${newItemPrice}</span></td>
      <td><span class="item-quantity">${newItemQuantity}</span></td>
      <td style="
    display: flex;
    justify-content: space-between;
">
        <span class="font-weight-semibold item-total">${newRowTotal}</span>
        <button class="item-delete" style="margin-left: 0.5rem; border: 0.25px solid red;" onclick="handleDeleteItemFromList(event)">X</button>
      </td>
    </tr>`;

  completeTransactionJson.purchases.push({
    itemNumber: uniqueId,// itemNumber of every purchase contains the uniqueId it uses on the UI
    itemName,
    itemPrice: newItemPrice,
    itemQuantity: newItemQuantity,
    itemTotalPrice: newRowTotal
  });

  $("#table-body").append(listItem);
  increaseTotalItemsCount();
  updatePageTotals();

  const listContainer = $(".item-table");
  const listItemToScroll = $(`#${uniqueId}`);
  listContainer.scrollTop(listItemToScroll.offset().top);
  console.log('---------------------->',completeTransactionJson);
}

function handleDeleteItemFromList(event) {
  const changedId = $(event.target).closest("tr").attr("id");
  $(`#${changedId}`).remove();
  completeTransactionJson.purchases = completeTransactionJson.purchases.filter(item => item.itemNumber !== changedId);
  console.log('---------------------->',completeTransactionJson);
  increaseTotalItemsCount();
  updatePageTotals();
}