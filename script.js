

// Clear localstorage and reload 
function clearstorage() {
  if (confirm("Do You Really Want to Clear All List?")) {
    localStorage.clear();
    window.location.reload();
  }
}


// items array that contains all quantity items
// JSON.parse is used to parse the stringified items from localStorage
// if localStorage is empty, make the items variable an empty array
let items = JSON.parse(localStorage.getItem('quantity-list')) || [];
console.log(items)
// svg icons veriables to import icon from html 

let svg1 = document.getElementById("icon1").innerHTML;
let svg2 = document.getElementById("icon2").innerHTML;

// function to get days in month for showing count button when month complete 


function getdaysinmonth(year, month) {
  return new Date(year, month, 0).getDate()
}
const date = new Date();
const currentyear = date.getFullYear();
const currentmonth = date.getMonth() + 1;
const daysincurrentmonth = getdaysinmonth(currentyear, currentmonth);
const dayslength = daysincurrentmonth;


// mix function run when page open to reset values and perform other functions

function mixfun() {
  let comp = items.length <= 0;

  if (document.getElementById("add").value != "") {
    document.getElementById("add").value = "";
  }

  if (document.getElementById("price-input").value != "") {
    document.getElementById("price-input").value = "";
  }


  if (document.getElementById("countbtn").style.display = "") {
    document.getElementById("clearstorage").style.display = "none";
  }




  // shows count butoon and hide other buttons when month completed

  if (items.length < dayslength) {

    document.getElementById("countbtn").style.display = "none";
    document.getElementById("cbmbtn").style.display = "";
    document.getElementById("clearstorage").style.display = "";
    document.getElementById("price-input").style.display = "none"
  }
  else {
    document.getElementById("price-input").style.display = "";
    document.getElementById("cbmbtn").style.display = "none";
    document.getElementById("clearstorage").style.display = "none";
    document.getElementById("countbtn").style.display = "";

  }
  if (comp === true) {
    document.getElementById("cbmbtn").style.display = "none";
    document.getElementById("clearstorage").style.display = "none";
  }
}

// custom date slection 

function showcustomdatepopup() {
  if (document.getElementById("custom-date-input").value === "" || document.getElementById("custom-date-popup").style.display === "") {
    document.getElementById("custom-date-popup").style.display = "none";
  }
  if (document.getElementById("custom-date-popup").style.display === "none") {
    document.getElementById("custom-date-popup").style.display = "";
  }
  else {
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
    alert("Put date")

  }
  if (document.getElementById("custom-date-input").value != "") {
    document.getElementById("custom-date-popup").style.display = "none";

  }

}

// function to perform and shows count button before completing month 

function countbeforemonth() {
  if (confirm("Do you really want to count before month?")) {

    document.getElementById("countbtn").style.display = "";
    document.getElementById("price-input").style.display = "";
    document.getElementById("clearstorage").style.display = "none";
    document.getElementById("cbmbtn").style.display = "none";
  }
  if (document.getElementById("custom-date-input").value === "") {

    document.getElementById("custom-date-popup").style.display = "none"
  }

}
// function to add item to the items array


function addItem() {
  // get the value of the input box with querySelector
  var item = document.getElementById("add").value;
  // If input box is empty, return and alert the user
  // You can also do some more validation if here if you want
  if (item === "0") {
    return alert("You need to put a value more than zero");
  }
  if (item === "" && document.getElementById("custom-date-input").value === "" && document.getElementById("custom-date-popup").style.display === "") {

    return alert("Put Date and Quantity");
  }
  if (document.getElementById("custom-date-input").value === "" && document.getElementById("custom-date-popup").style.display === "") {
    return alert("Put Date");
  }
  if (item === "") {
    return alert("Put Quantity");
  }

  // if custom date is empty put today date if not than put custom date
  let datevalue = new Date(document.getElementById("custom-date-input").value);
  if (document.getElementById("custom-date-input").value === "") {
    items.push({
      value: item,
      date: new Date().toLocaleDateString("en-US")
    })
  }
  else {
    document.getElementById("custom-date-input").value = "";
    document.getElementById("custom-date-popup").style.display = "none";
    items.push({
      value: item,
      date: datevalue.toLocaleDateString("en-US")
    })

  }


  // then convert to a string with JSON.stringify and save to localStorage
  localStorage.setItem('quantity-list', JSON.stringify(items));

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
    localStorage.setItem('quantity-list', JSON.stringify(items))
    listItems();
  }
}



// function that generates list of items and populates the html


function listItems() {
  var list = "";
  for (var i = 0; i < items.length; i++) {




    list += "<div class='button-wrap'><button class='button-long-list'><div class='date'><small>" + items[i].date + "</small></div> ";

    list += "<center><div class='measure'>" + items[i].value + " " + "Ltr. </div></center>";



    list += "<div class='del'><div class='icon-bg'><span class='label alert' onclick='deleteItem(" + i + "),mixfun()'>" + svg1 + "</span></div</div></button></div>";
  }
  document.querySelector("#list-items").innerHTML = list;

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
  for (let c = 0; c < items.length; c++) {
    summery += "<tr><td>" + items[c].date + "</td><td>" + items[c].value + " " + "Litre" + "</td></tr>";
    let a = items[c].value;
    sum += parseInt(a);
  }

  if (price === "") {
    return alert("Enter Price");
  }
  if (sum === 0) {
    return alert("Put Something In List")
  }
  else {
    document.getElementById("reportcard").style.display = "";
    document.getElementById("final").innerHTML = "  <table><tr><th>Date</th><th>Quantity</th></tr>" + summery + "</table>" + "<table><tr><th class='pd'>Total Quantity</th><th>Total Price</th></tr><tr><td>" + sum + " " + "Litres" + "</td><td>" + sum * price + " " + "Rupes" + "</td></tr>";

  }

}


function closebtn() {
  if (document.getElementById("reportcard").style.display === "") {
    document.getElementById("reportcard").style.display = "none";
  }
}