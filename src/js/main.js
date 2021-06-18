let list = [
  {
    "desc": "rice",
    "amount": "1",
    "value": "5.40"
  },
  {
    "desc": "beer",
    "amount": "12",
    "value": "1.99"
  },
  {
    "desc": "meat",
    "amount": "1",
    "value": "15.00"
  }
];

/**
 * Get List
 */
/* function getTotal(param) {
  let total = 0;
  for (let key in param) {
    total += param[key].value * param[key].amount;
  };
  return total;
};

console.log(getTotal(list)); */

/**
 * Também poderia ser feito dessa forma
 */
function listList(a) {
  let total = 0
  for (let i of a.entries()) {
    total += i[1].value * i[1].amount;
    // console.log(i)
  }
  document.getElementById("totalValue").innerHTML = formatValue(total);
  // return total;
};

/**
 * Set List on HTML
 */
function setList(params) {
  let table = `<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>`;
  for (let i in params) {
    table += `<tr><td>${formatDesc(params[i].desc)}</td><td>${formatAmount(params[i].amount)}</td><td>${formatValue(params[i].value)}</td><td><button class="btn btn-info" onclick="setUpdate(${i});">Edit</button><button class="btn btn-danger" onclick="deleteData(${i});">Delete</button></td></tr></tbody>`
  };
  document.getElementById("listTable").innerHTML = table;
  listList(list);
  saveListStorage(list);
};

// setList(list);

/**
 * Format Description to first letter Uppercase
 */
function formatDesc(desc) {
  let str = desc.toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str;
};

/**
 * Format Value in BR
 */
function formatValue(value) {
  var str = parseFloat(value).toFixed(2) + "";
  str = str.replace(".", ",");
  str = `R$ ${str}`;
  return str;
};

/**
 * Format Value in BR
 */
function formatAmount(amount) {
  return parseInt(amount);
};

/**
 * CRUD
 */

function addData() {
  let desc = document.getElementById("desc").value;
  let amount = document.getElementById("amount").value;
  let value = document.getElementById("value").value;

  if (!validation()) {
    return;
  }

  list.unshift({ "desc": desc, "amount": amount, "value": value });
  setList(list);
};

function setUpdate(id) {
  let obj = list[id];
  document.getElementById("desc").value = obj.desc;
  document.getElementById("amount").value = obj.amount;
  document.getElementById("value").value = obj.value;
  document.getElementById("btnUpdate").style.display = "inline-block";
  document.getElementById("btnAdd").style.display = "none";

  document.getElementById("inputIdUpdate").innerHTML = `<input type="hidden" id="idUpdate" value="${id}">`;
};

function resetForm() {
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("value").value = "";
  document.getElementById("btnUpdate").style.display = "none";
  document.getElementById("btnAdd").style.display = "inline-block";

  document.getElementById("inputIdUpdate").innerHTML = "";
  document.getElementById("error").style.display = "none";
};

function updateData() {
  let id = document.getElementById("idUpdate").value;
  let desc = document.getElementById("desc").value;
  let amount = document.getElementById("amount").value;
  let value = document.getElementById("value").value;

  if (!validation()) {
    return;
  }

  list[id] = { "desc": desc, "amount": amount, "value": value };

  resetForm();
  setList(list);
};

function deleteData(id) {
  if (confirm("Are you sure you want to delete?")) {
    if (id === list.length - 1) {
      list.pop();
    } else if (id === 0) {
      list.shift();
    } else {
      let arrAuxIni = list.slice(0, id);
      let arrAuxend = list.slice(id + 1);
      list = arrAuxIni.concat(arrAuxend);
    }

    setList(list);
  };
};

function validation() {
  let desc = document.getElementById("desc").value;
  let amount = document.getElementById("amount").value;
  let value = document.getElementById("value").value;
  let error = "";

  document.getElementById("error").style.display = "none";

  if (desc === "") {
    error += `<p>Fill out description</p>`;
  }

  if (amount === "") {
    error += `<p>Fill out a quantity</p>`;
  } else if (amount != parseInt(amount)) {
    error += `<p>Fill out a valid amount</p>`;
  };

  if (value === "") {
    error += `<p>Fill out a value</p>`;
  } else if (value != parseFloat(value)) {
    error += `<p>Fill out a valid value</p>`;
  };

  if (error != "") {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").style.backgroundColor = "rgba(85, 85, 85, 0.5)";
    document.getElementById("error").style.color = "white";
    document.getElementById("error").style.padding = "10px";
    document.getElementById("error").style.margin = "10px";
    document.getElementById("error").style.borderRadius = "15px";

    document.getElementById("error").innerHTML = `<h3>Error: ${error}</h3>`;
    return 0;
  } else {
    return 1;
  };
};

/**
   * Delete All List
   */
function deleteList() {
  if (confirm("Are you delete this list?")) {
    list = [];
    setList(list);
  };
};

function saveListStorage(list) {
  let jsonStr = JSON.stringify(list);
  localStorage.setItem("list", jsonStr);
};

function initListStorage() {
  let testList = localStorage.getItem("list");
  if (testList) {
    list = JSON.parse(testList);
  };
  setList(list);
};

initListStorage();
