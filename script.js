// Clear localstorage and reload

const themeSwitch = document.getElementById("theme-switch");
const body = document.body;
const html = document.documentElement; // Get the root HTML element

themeSwitch.addEventListener("change", () => {
  if (themeSwitch.checked) {
    body.classList.add("dark-mode");
    html.classList.add("dark-mode"); 
  } else {
    body.classList.remove("dark-mode");
    html.classList.remove("dark-mode"); 
  }
});

function showSettings() {
  const flashMessage = document.createElement('div');
  flashMessage.textContent = 'Settings will be added soon!';
  flashMessage.style.position = 'fixed';
  flashMessage.style.top = '20px';
  flashMessage.style.right = '10px';
  flashMessage.style.transform = 'translateX(-50%)';
  flashMessage.style.padding = '10px';
  flashMessage.style.backgroundColor = '#0038ff';
  flashMessage.style.color = 'white';
  flashMessage.style.borderRadius = '5px';
  flashMessage.style.zIndex = '1000';
  
  document.body.appendChild(flashMessage);
  
  setTimeout(() => {
    flashMessage.remove();
  }, 3000);
}

function showStatistics() {
  const items = JSON.parse(localStorage.getItem("quantity-list")) || [];
  const totalQuantity = items.reduce((sum, item) => sum + parseFloat(item.value), 0);
  console.log("Total Quantity:", totalQuantity);
  const flashMessage = document.createElement('div');
  flashMessage.textContent = 'Check the console for the total quantity so far!';
  flashMessage.style.position = 'fixed';
  flashMessage.style.top = '20px';
  flashMessage.style.zIndex = '1000';
  flashMessage.style.right = '10px';
  flashMessage.style.transform = 'translateX(-50%)';
  flashMessage.style.padding = '10px';
  flashMessage.style.backgroundColor = '#0038ff';
  flashMessage.style.color = 'white';
  flashMessage.style.borderRadius = '5px';
  flashMessage.style.zIndex = '1000';
  
  document.body.appendChild(flashMessage);
  
  setTimeout(() => {
    flashMessage.remove();
  }, 3000);
}

function showLastFifteenItems() {
  const items = JSON.parse(localStorage.getItem("quantity-list")) || [];
  const lastFifteenItems = items.slice(-15);
  console.log(lastFifteenItems);
  
  // Flash message to check console
  const flashMessage = document.createElement('div');
  flashMessage.textContent = 'Check the console for the last 15 items!';
  flashMessage.style.position = 'fixed';
  flashMessage.style.top = '20px';
  flashMessage.style.right = '10px';
  flashMessage.style.transform = 'translateX(-50%)';
  flashMessage.style.padding = '10px';
  flashMessage.style.backgroundColor = '#0038ff';
  flashMessage.style.color = 'white';
  flashMessage.style.borderRadius = '5px';
  flashMessage.style.zIndex = '1000';
  
  document.body.appendChild(flashMessage);
  
  setTimeout(() => {
    flashMessage.remove();
  }, 3000);
}

function createDroplet() {
  const droplet = document.createElement('div');
  droplet.classList.add('droplet');
  droplet.style.left = Math.random() * 100 + 'vw';
  
  const size = Math.random() * 20 + 10;
  droplet.style.width = size + 'px';
  droplet.style.height = size * 1.3 + 'px'; 
  droplet.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
  droplet.style.transform = 'rotate(45deg)'; 
  
  // Check if dark mode is active
  if (document.body.classList.contains('dark-mode')) {
    droplet.style.backgroundColor = '#c4f0f0'; // Light color for dark mode
  } else {
    droplet.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'; // Dark color for light mode
  }
  
  document.body.appendChild(droplet);

  setTimeout(() => {
    droplet.remove();
  }, 4000);
}

setInterval(createDroplet, 200);


function clearstorage() {
  if (confirm("Do You Really Want to Clear All List?")) {
    localStorage.clear();
    window.location.reload();
  }
}
var slicedvalue;
// items array that contains all quantity items
// JSON.parse is used to parse the stringified items from localStorage
// if localStorage is empty, make the items variable an empty array
let items = JSON.parse(localStorage.getItem("quantity-list")) || [];

// svg icons veriables to import icon from html

let svg1 = document.getElementById("icon1").innerHTML;

// function to get days in month for showing count button when month complete

function getdaysinmonth(year, month) {
  return new Date(year, month, 0).getDate();
}
const date = new Date();
const currentyear = date.getFullYear();
const currentmonth = date.getMonth() + 1;
const daysincurrentmonth = getdaysinmonth(currentyear, currentmonth);
const dayslength = daysincurrentmonth;
document.getElementById("clear").textContent = date.getDate();
// mix function run when page open to reset values and perform other functions
document
  .getElementById("custom-date-input")
  .setAttribute("min", currentyear + "-" + "0" + currentmonth + "-" + "01");
document
  .getElementById("custom-date-input")
  .setAttribute(
    "max",
    currentyear + "-" + "0" + currentmonth + "-" + dayslength
  );

// custom date slection
function showcustomdatepopup() {
  if (
    document.getElementById("custom-date-input").value === "" ||
    document.getElementById("custom-date-popup").style.display === ""
  ) {
    document.getElementById("custom-date-popup").style.display = "none";
  }
  if (document.getElementById("custom-date-popup").style.display === "none") {
    document.getElementById("custom-date-popup").style.display = "";
  } else {
    document.getElementById("custom-date-input").value = "";
    document.getElementById("custom-date-popup").style.display = "none";
  }
}

// cancel button on cudtom date picker pop up

function cancelbtn() {
  document.getElementById("custom-date-input").value = "";
  document.getElementById("custom-date-popup").style.display = "none";
}
// done button on cudtom date picker pop up
function donebtn() {
  if (document.getElementById("custom-date-input").value === "") {
    alert("Put date");
  }
  if (document.getElementById("custom-date-input").value != "") {
    document.getElementById("custom-date-popup").style.display = "none";
    let customdatevalue = document.getElementById("custom-date-input").value;
    slicedvalue = customdatevalue.slice(8, 10);
    document.getElementById("clear").textContent = `${slicedvalue}`;
  }
}

function mixfun() {
  let comp = items.length <= 0;

  if (document.getElementById("add").value != "") {
    document.getElementById("add").value = "";
  }

  if (document.getElementById("price-input").value != "") {
    document.getElementById("price-input").value = "";
  }

  if ((document.getElementById("countbtn").style.display = "")) {
    document.getElementById("clearstorage").style.display = "none";
  }

  // shows count butoon and hide other buttons when month completed

  if (items.length < dayslength) {
    document.getElementById("countbtn").style.display = "none";
    document.getElementById("cbmbtn").style.display = "";
    document.getElementById("clearstorage").style.display = "";
    document.getElementById("nothing").style.display = "none";
    document.getElementById("price-input").style.display = "none";
  } else {
    document.getElementById("price-input").style.display = "";
    document.getElementById("cbmbtn").style.display = "none";
    document.getElementById("clearstorage").style.display = "";
    document.getElementById("countbtn").style.display = "";
  }
  if (comp === true) {
    document.getElementById("cbmbtn").style.display = "none";
    document.getElementById("nothing").style.display = "";
    document.getElementById("clearstorage").style.display = "none";
  }
}

// function to perform and shows count button before completing month

function countbeforemonth() {
  if (confirm("Do you really want to count before completing month?")) {
    document.getElementById("countbtn").style.display = "";
    document.getElementById("price-input").style.display = "";
    document.getElementById("clearstorage").style.display = "none";
    document.getElementById("cbmbtn").style.display = "none";
  }
  if (document.getElementById("custom-date-input").value === "") {
    document.getElementById("custom-date-popup").style.display = "none";
  }
}
// function to add item to the items array

function addItem() {
  // get the value of the input box with querySelector
  var item = document.getElementById("add").value;
  var unit = document.getElementById("unit").value;
  // If input box is empty, return and alert the user
  // You can also do some more validation if here if you want
  if (item === "0") {
    return alert("You need to put a value more than zero");
  }
  if (
    item === "" &&
    document.getElementById("custom-date-input").value === "" &&
    document.getElementById("custom-date-popup").style.display === ""
  ) {
    return alert("Put Date and Quantity");
  }
  if (
    document.getElementById("custom-date-input").value === "" &&
    document.getElementById("custom-date-popup").style.display === ""
  ) {
    return alert("Put Date");
  }
  if (item === "") {
    return alert("Put Quantity");
  }
  if (slicedvalue !== date.getDate()) {
    document.getElementById("clear").textContent = date.getDate();
  }
  // if custom date is empty put today date if not than put custom date
  let datevalue = new Date(document.getElementById("custom-date-input").value);
  if (document.getElementById("custom-date-input").value === "") {
    items.push({
      value: item,
      unit: unit,
      date: new Date().toLocaleDateString("en-US"),
    });
  } else {
    document.getElementById("custom-date-input").value = "";
    document.getElementById("custom-date-popup").style.display = "none";
    items.push({
      value: item,
      unit: unit,
      date: datevalue.toLocaleDateString("en-US"),
    });
  }

  // then convert to a string with JSON.stringify and save to localStorage
  localStorage.setItem("quantity-list", JSON.stringify(items));

  // call function to list all items
  listItems();

  // clear input box
  item = "";
}

// function to remove item from array with Array.splice()
// removes item, then saves new items array to localStorage
function deleteItem(index) {
  if (confirm("Do you really want to Delete?")) {
    if (document.getElementById("custom-date-popup").style.display === "") {
      document.getElementById("custom-date-popup").style.display = "none";
      document.getElementById("custom-date-input").value = "";
    }
    items.splice(index, 1);
    localStorage.setItem("quantity-list", JSON.stringify(items));
    listItems();
  }
}

// function that generates list of items and populates the html
function listItems() {
  var list = "";
  for (var i = 0; i < items.length; i++) {
    list +=
      "<div class='button-wrap' draggable='true' ondragstart='dragStart(event)' ondragover='allowDrop(event)' ondrop='dropItem(event)' id='item-" +
      i +
      "'><button class='button-long-list'><div class='measure'>" +
      items[i].value +
      " " + 
      items[i].unit +
      " </div>";

    list +=
      "<div class='right'><div class='date'><small>" +
      items[i].date +
      "</small></div>";

    list +=
      "<div class='del'><div class='icon-bg'><span class='label alert' onclick='deleteItem(" +
      i +
      "),mixfun()'>" +
      svg1 +
      "</span></div></div></div></button></div>";
  }
  document.querySelector("#list-items").innerHTML = list;
}

// Function to handle dragging
let draggedItem = null;

function dragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.setData('text', event.target.id);
}

function allowDrop(event) {
  event.preventDefault(); // Prevent default to allow drop
}

function dropItem(event) {
  event.preventDefault();
  const draggedItemId = event.dataTransfer.getData('text');
  const droppedItem = document.getElementById(draggedItemId);
  const dropTarget = event.target.closest('.button-wrap'); // Drop target should be the full div

  if (dropTarget && draggedItem !== dropTarget) {
   
    dropTarget.before(draggedItem);
  }
}


// function to run when page loads

(function () {
  listItems();
  mixfun();
})();

//  function to prepare final monthly report

function countall() {
  if (document.getElementById("custom-date-popup").style.display === "") {
    document.getElementById("custom-date-popup").style.display = "none";
    document.getElementById("custom-date-input").value = "";
  }

  let sum = 0; 
  let summery = "";
  let price = document.getElementById("price-input").value;

  // Conversion factors for units to liters
  const conversionFactors = {
    ml: 0.001,     // 1 ml = 0.001 liters
    l: 1,          // 1 liter = 1 liter
    oz: 0.0295735, // 1 oz = 0.0295735 liters
    gal: 3.78541   // 1 gallon = 3.78541 liters
  };

 
  for (let c = 0; c < items.length; c++) {
    let unit = items[c].unit; 
    let value = parseFloat(items[c].value);
    let convertedValue = value * conversionFactors[unit];

    
    sum += convertedValue;

   
    summery +=
      "<tr><td>" +
      items[c].date +
      "</td><td>" +
      items[c].value +
      " " +
      items[c].unit +
      "</td></tr>";
  }

  // Check if price is entered
  if (price === "") {
    return alert("Enter Price");
  }

  // Check if there are any items in the list
  if (sum === 0) {
    return alert("Put Something In List");
  } else {
    
    document.getElementById("reportcard").style.display = "";
    document.getElementById("final").innerHTML =
      "  <table><tr><th>Date</th><th>Quantity</th></tr>" +
      summery +
      "</table>" +
      "<table><tr><th class='pd'>Total Quantity</th><th>Total Price</th></tr><tr><td>" +
      sum.toFixed(2) + 
      " liters</td><td>" +
      (sum * price).toFixed(2) + 
      " Rupees</td></tr>";
  }
}


function closebtn() {
  if (document.getElementById("reportcard").style.display === "") {
    document.getElementById("reportcard").style.display = "none";
  }
}
