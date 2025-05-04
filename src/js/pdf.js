var completeTransactionJson = {};

const shopItems = {
  1: "Kurta",
  2: "Nighty",
  3: "N.Suit",
  4: "Lower",
  5: "Capri",
  6: "Shorts",
  7: "Shirt",
  8: "T-shirt",
  9: "Trouser",
  10: "B.",
  11: "Panties",
  12: "U.W",
  13: "Vest",
  14: "Slip",
  15: "Hankey",
  16: "Socks",
  17: "Supporter",
  18: "Track Suit",
  19: "Towel",
  20: "Dhoti",
  21: "Patka",
  22: "Jacket",
  23: "Thermal",
};

var currentDiscountValue = 10;
window.onload = function () {
  $(function () {
    completeTransactionJson["shopname"] = localStorage.getItem("shopname");
    //window.localStorage.setItem('shopname','one')

    var x = document.getElementById("bigDiscountCheckbox");
    var bigDiscounttoggle = localStorage.getItem("bigDiscounttoggle");
    if (bigDiscounttoggle == null) bigDiscounttoggle = "unsetDiscount";

    var meriDiscountValue = document.getElementById("meriDiscountValue");

    if (bigDiscounttoggle === "setDiscount") {
      // for intial render
      x.checked = bigDiscounttoggle;
      meriDiscountValue.innerText = "15% DISCOUNT";
      currentDiscountValue = 15;
      document.body.style.background = "red";
    } else {
      document.body.style.background = "blue";
      currentDiscountValue = 10;
    }

    x.addEventListener("change", () => {
      if (x.checked) {
        localStorage.setItem("bigDiscounttoggle", "setDiscount");
        meriDiscountValue.innerText = "15% DISCOUNT";
        document.body.style.background = "red";
        currentDiscountValue = 15;
        window.location.reload();
      } else {
        localStorage.setItem("bigDiscounttoggle", "unsetDiscount");
        meriDiscountValue.innerText = "10% DISCOUNT";
        document.body.style.background = "blue";
        currentDiscountValue = 10;
        window.location.reload();
      }
    });

    document.getElementById("wild-input").style.background = "deeppink";
    document.getElementById("wild-input").style.color = "white";

    $("div.hindi").hide(); // hide it initially
    $(".rough").hide();

    document.getElementsByClassName("actual")[0].style.background = "#d5cdff";
    document.getElementsByClassName("english")[0].style.background = "blue";
    document.getElementsByClassName("english")[0].style.color = "white";
    document.getElementsByClassName("actual")[0].style.color = "black";
    $("#ttb").on("click", function () {
      $("div.english, div.hindi").toggle();
      if (
        document.getElementsByClassName("rough")[0].style.display === "none"
      ) {
        document.getElementsByClassName("rough")[0].style.display = "block";
        //document.body.style.background = "green";
        document.getElementsByClassName("rough")[0].style.background =
          "#b2d1b2";
        document.getElementsByClassName("rough")[0].style.color = "black";
        document.getElementsByClassName("hindi")[0].style.background = "green";
        document.getElementsByClassName("hindi")[0].style.color = "white";
        document.getElementsByClassName("actual")[0].style.display = "none";
      } else if (
        document.getElementsByClassName("rough")[0].style.display === "block"
      ) {
        document.getElementsByClassName("rough")[0].style.display = "none";
        document.getElementsByClassName("actual")[0].style.display = "block";
        document.getElementsByClassName("actual")[0].style.background =
          "#d5cdff";
        document.getElementsByClassName("actual")[0].style.color = "black";
        document.getElementsByClassName("english")[0].style.background = "blue";
        document.getElementsByClassName("english")[0].style.color = "white";
        //document.body.style.background = "blue";
      }
    });
  });

  $(function () {
    $("#datepicker").datepicker({
      dateFormat: "yy-mm-dd",
    }).val = "1";
  });

  var n = localStorage.getItem("on_load_counter");
  var m = localStorage.getItem("total_sale");
  if (n === null) {
    n = 0;
  }
  if (m === null) {
    m = 0;
  }
  completeTransactionJson = {};
  completeTransactionJson["transactionNumber"] = n;
  completeTransactionJson["purchases"] = [];
  //n++;
  // GET THE RECIPT NUMBER FROM LOCAL STORAGE
  localStorage.setItem("on_load_counter", n);
  localStorage.setItem("total_sale", m);
  document.getElementsByClassName("lucky-draw-number")[0].innerHTML = n;
  document.getElementsByClassName("lucky-draw-number")[1].innerHTML = n;
  document.getElementById("nichod").innerHTML = m;
  document.getElementById("last-transaction").innerHTML =
    localStorage.getItem("ltrs");

  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  // document.getElementById("page-date").innerText = datetime;
  var today = new Date();

  document.getElementById("page-date").value = today
    .toISOString()
    .substring(0, 10);
  var inputPair = document.querySelectorAll(".input-pair");
  inputPair[0].addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      inputPair[1].focus();
    }
  });
  inputPair[1].addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      inputPair[2].focus();
    }
  });
  inputPair[2].addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      inputPair[0].focus();
    }
  });

  for (let key in shopItems) {
    if (shopItems.hasOwnProperty(key)) {
      // console.log(key, shopItems[key]);
      var element = `<div>${key + " " + shopItems[key]}</div>`;
      document.getElementById("map-list").innerHTML += element;
    }
  }

  document.getElementById("download").addEventListener("click", () => {
    var transactionSum = document.getElementById(
      "paget-total-netTotal"
    ).innerText;
    transactionSum = parseInt(transactionSum);

    var deleteButtons = document.getElementsByClassName("item-delete");
    for (var i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].style = "display: none";
    }

    const invoice = this.document.getElementById("invoice");
    var keypads = document.getElementById("input-and-mapping-containing-div");

    // completeTransactionJson["transactionType"]
    if (document.getElementsByClassName("hindi")[0].style.display === "none") {
      completeTransactionJson["transactionType"] = "CARD/DIGITAL";
    } else {
      completeTransactionJson["transactionType"] = "CASH";
    }
    completeTransactionJson["remarks"] =
      document.getElementById("wild-input").value;
    completeTransactionJson["shopname"] = localStorage.getItem("shopname");
    completeTransactionJson["createdAt"] =
      document.getElementById("page-date").value;

    keypads.remove();
    const listContainer = document.querySelector(".item-table");
    listContainer.style.maxHeight = "unset";

    window.print();
    window.location.reload();

    // var form = document.getElementById("new-transaction-form");
    // form.completeTransactionJson.value = JSON.stringify(
    //   completeTransactionJson
    // );
    // form.submit();
    fetch("/transaction/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(completeTransactionJson),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
       // window.location.reload(); // Reload the page on success
      })
      .catch((error) => {
        // console.error("Error:", error);
      });

    console.log(JSON.stringify(completeTransactionJson));

    //////////////////////////////////////////////////////////////////////////

    var n = localStorage.getItem("on_load_counter");
    var m = localStorage.getItem("total_sale");

    if (n === null) {
      n = 0;
    }
    if (m === null) {
      m = 0;
    }
    n++;
    localStorage.setItem("on_load_counter", n); // increased recipt counter

    //localStorage.setItem("ltrs", "added " + transactionSum + " to " + m);
    localStorage.setItem("ltrs", transactionSum);

    m = parseInt(m) + parseInt(transactionSum);
    m = parseInt(m);
    localStorage.setItem("total_sale", m);

    // document.getElementById("nichod").innerHTML = m;
    // document.getElementById("lucky-draw-number").innerHTML = n;

    //console.log(window);
    // var opt = {
    //   margin: 1,
    //   filename: "perfectCollectionTotalEstimate.pdf",
    //   image: { type: "jpeg", quality: 0.98 },
    //   html2canvas: { scale: 2 },
    //   jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    // };
    // html2pdf().from(invoice).set(opt).save();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 5000);
  });

  document.addEventListener(
    "keyup",
    (event) => {
      var name = event.key;
      var code = event.code;
      // Alert the key name and key code on keydown
      if (name == "Shift")
        //alert(`Key pressed ${name} \r\n Key code value: ${code}`);
        document.getElementById("download").click();

      if (name == "z" || name == "Z") {
          document.getElementById("tbtn").click();
      }
      if (name == "c" || name == "C") {
        document.getElementById("ttb").click();
      }
      if (name == "m" || name == "M") {
        if (localStorage.getItem("shopname") == "one")
          location.href = "/users/month";
      }
    },
    false
  );
};
document.getElementById("wild-input").addEventListener("keyup", (e) => {
  console.log("hi");
  e.preventDefault();
  var inputPair = document.querySelectorAll(".input-pair");
  if (e.key === "Enter") {
    document.getElementById("wild-input").disabled = true;
    inputPair[0].focus();
  }
});

function increaseTotalItemsCount() {
  // document.getElementById("page-total-items").innerText =
  //   document.querySelectorAll("#table-body >tr").length;
  var x = document.querySelectorAll("#table-body .item-quantity");
  var tot = 0;
  for (var i = 0; i < x.length; i++) {
    if (Number.isNaN(parseInt(x[i].innerText))) {
      tot = 0;
      break;
    }
    tot += parseInt(x[i].innerText);
  }
  if (tot >= 0) {
    document.getElementById("page-total-items").innerText = tot;
  }
  completeTransactionJson["totalItems"] = tot;
}
function updatePageTotals() {
  //updating the page total
  var x = document.querySelectorAll("#table-body .item-total");
  var y = document.querySelectorAll("#table-body .item-quantity");
  var tot = 0;
  var totabovethousand = 0;
  var totbelowthousand = 0;

  for (var i = 0; i < x.length; i++) {
    if (Number.isNaN(parseInt(x[i].innerText))) {
      tot = 0;
      break;
    }
    var thisinc = parseInt(x[i].innerText);
    var thisqty = parseInt(y[i].innerText);

    if (thisinc / thisqty >= 1000) {
      totabovethousand += thisinc;
    } else {
      totbelowthousand += thisinc;
    }

    tot += parseInt(x[i].innerText);
  }

  if (tot >= 0) {
    document.getElementById("page-total-sum").innerText = tot;
    var discount = tot / 10;
    if (currentDiscountValue === 15) {
      discount = (tot * 15) / 100;
    }
    document.getElementById("page-total-discountMinus").innerText =
      "-" + discount;
    tot = tot - discount;

    // var sgst = (tot * 2.5) / 100;
    // document.getElementById("page-total-taxaddsgst").innerText = "+" + sgst;
    // document.getElementById("page-total-taxaddcgst").innerText = "+" + sgst;
    // tot += 2 * sgst;
    var badagst = 0;
    if (totabovethousand > 0) {
      var discount_bada = totabovethousand / 10;
      if (currentDiscountValue === 15) {
        discount_bada = (totabovethousand * 15) / 100;
      }
      totabovethousand -= discount_bada;
      // badagst = totabovethousand * (12 / 112);
      badagst = totabovethousand * (5 / 105);
      // var eachbada = badagst / 2;
      // eachbada = eachbada.toFixed(1);
      // document.getElementsByClassName("bada-gst")[0].textContent = eachbada;
      // document.getElementsByClassName("bada-gst")[1].textContent = eachbada;
      // completeTransactionJson["gstAsPertwel"] = badagst;
      completeTransactionJson["gstAsPertwel"] = 0;
      completeTransactionJson["gstAsPerfive"] = 0;
      completeTransactionJson["gstAsPerfive"] += badagst;
    } else {
      // var eachbada = badagst / 2;
      // eachbada = eachbada.toFixed(1);
      // document.getElementsByClassName("bada-gst")[0].textContent = eachbada;
      // document.getElementsByClassName("bada-gst")[1].textContent = eachbada;
      // completeTransactionJson["gstAsPertwel"] = badagst;
      completeTransactionJson["gstAsPerfive"] = 0;
      completeTransactionJson["gstAsPertwel"] = 0;
    }

    var chotagst = 0;
    if (totbelowthousand > 0) {
      var discount_chota = totbelowthousand / 10;
      if (currentDiscountValue === 15) {
        discount_chota = (totbelowthousand * 15) / 100;
      }
      totbelowthousand -= discount_chota;
      chotagst = totbelowthousand * (5 / 105);
      // var eachchota = chotagst / 2;
      // eachchota = eachchota.toFixed(1);
      // document.getElementsByClassName("chota-gst")[0].textContent = eachchota;
      // document.getElementsByClassName("chota-gst")[1].textContent = eachchota;
      completeTransactionJson["gstAsPerfive"] += chotagst;
    } else {
      // var eachchota = chotagst / 2;
      // eachchota = eachchota.toFixed(1);
      // document.getElementsByClassName("chota-gst")[0].textContent = eachchota;
      // document.getElementsByClassName("chota-gst")[1].textContent = eachchota;
      completeTransactionJson["gstAsPerfive"] += chotagst;
    }

    tot = Math.round(tot);
    document.getElementById("paget-total-netTotal").innerText = tot;
  }
  completeTransactionJson["totalPrice"] = tot;
  completeTransactionJson["netPrice"] = tot;
}
function additemNumberToListOnEnter(event) {
  console.log(event.key);
  if (event.key === "Enter") {
    additemNumberToList();
  }
}
function additemNumberToList() {
  var newItemNumber = document.getElementById("new-item-number").value;
  var newItemPrice = document.getElementById("new-item-price-input").value;
  var newItemQuantity = document.getElementById(
    "new-item-quantity-input"
  ).value;
  //var newItemQuantity = 1;
  if (
    !(
      newItemNumber &&
      newItemPrice &&
      newItemQuantity &&
      newItemNumber > 0 &&
      newItemPrice > 0 &&
      newItemQuantity > 0
    )
  )
    return;

  document.getElementById("new-item-number").value = "";
  document.getElementById("new-item-price-input").value = "";
  document.getElementById("new-item-quantity-input").value = "";

  var newRowTotal = newItemPrice * newItemQuantity;

  //----------------------------**.   Making List Item Card
  var unqiueId = document.querySelectorAll("#table-body >tr").length;
  unqiueId = "id_" + unqiueId;
  var itemName = shopItems[newItemNumber];
  if (typeof itemName === "undefined") return;

  var listItem = `<tr id=${unqiueId} class="item-row">
   <td> <span class="item-name">${itemName}</span> </td>
   <td> <span class="item-price">${newItemPrice}</span> </td>
   <td><span class="item-quantity">${newItemQuantity}</span></td>
   <td>
   <span class="font-weight-semibold item-total">${newRowTotal}</span>
    <button class="item-delete btn btn-danger" class="item-delete" style="margin-left: 1rem" onclick="handleDelete(event)" > X </button>
    </td>
    </tr>`;

  var newPurchase = {};
  newPurchase["itemNumber"] = unqiueId;
  newPurchase["itemName"] = itemName;
  newPurchase["itemPrice"] = newItemPrice;
  newPurchase["itemQuantity"] = newItemQuantity;
  newPurchase["itemTotalPrice"] = newRowTotal;
  completeTransactionJson["purchases"].push(newPurchase);

  document.getElementById("table-body").innerHTML += listItem;
  // increase total items count
  increaseTotalItemsCount();
  updatePageTotals();

  const listContainer = document.querySelector(".item-table");
  const listItemToScroll = document.getElementById(unqiueId);
  const scrollPosition = listItemToScroll.offsetTop;
  listContainer.scrollTop = scrollPosition;
}
function removeNode(id) {
  return completeTransactionJson["purchases"].filter(function (emp) {
    if (emp.itemNumber == id) {
      return false;
    }
    return true;
  });
}
function handleDelete(event) {
  var changedId = event.target.parentNode.parentNode.id;
  console.log(changedId);
  console.log("->>>>", JSON.stringify(completeTransactionJson["purchases"]));
  document.getElementById(changedId).remove();
  completeTransactionJson["purchases"] = removeNode(changedId);
  console.log("->>>>", JSON.stringify(completeTransactionJson["purchases"]));
  increaseTotalItemsCount();
  updatePageTotals();
}

var toggle = 0;
function movetoinputpairs(event) {
  if (event.key == "Enter") {
    var pairs = document.querySelectorAll(".input-pair");
    console.log(pairs);
    //pairs[0].focus();
  }
}
