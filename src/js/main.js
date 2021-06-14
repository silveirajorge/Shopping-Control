const list = [
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
    table += `<tr><td>${formatDesc(params[i].desc)}</td><td>${params[i].amount}</td><td>${formatValue(params[i].value)}</td><td>Edit | Delete</td></tr></tbody>`
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
