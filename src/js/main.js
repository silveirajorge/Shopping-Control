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
function getTotal(param) {
  let total = 0;
  for (let key in param) {
    total += param[key].value * param[key].amount;
  };
  return total;
};

console.log(getTotal(list));

/**
 * Também poderia ser feito dessa forma
 */
function listList(a) {
  let total = 0
  for (let i of a.entries()) {
    total += i[1].value * i[1].amount;
    // console.log(i)
  }
  return total;
};

console.log(listList(list));

/**
 * Set List on HTML
 */
function setList(params) {
  let table = `<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>`;
  for (let i in params) {
    table += `<tr><td>${formatDesc(params[i].desc)}</td><td>${params[i].amount}</td><td>${formatValue(params[i].value)}</td><td><button class="btn btn-default" onclick="setUpdate(${i});">Edit</button> | <button class="btn btn-default" onclick="deleteData(${i});">Delete</button></td></tr></tbody>`
  };
  document.getElementById("listTable").innerHTML = table;
};

setList(list);

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

function addData() {
  let desc = document.getElementById("desc").value;
  let amount = document.getElementById("amount").value;
  let value = document.getElementById("value").value;

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
};

function updateData() {
  let id = document.getElementById("idUpdate").value;
  let desc = document.getElementById("desc").value;
  let amount = document.getElementById("amount").value;
  let value = document.getElementById("value").value;

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
