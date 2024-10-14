console.log("first");
//global variables
let selectedCurrency = "USD"; //default value for currency

// Theme toggle functionality
const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
const themeToggleBtn = document.getElementById("theme-toggle");

// Function to set the theme
function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.style.setProperty("--bg-color", "#2c2f33"); // Dark background
    document.documentElement.style.setProperty("--text-color", "#f5f5f5"); // Light text
    document.documentElement.style.setProperty("--input-bg-color", "#4e545c"); // Dark input background
    document.documentElement.style.setProperty("--input-text-color", "#f5f5f5"); // Light input text
    themeToggleLightIcon.classList.remove("hidden");
    themeToggleDarkIcon.classList.add("hidden");
    localStorage.setItem("color-theme", "dark");
  } else {
    document.documentElement.style.setProperty("--bg-color", "#f9f9f9"); // Light background
    document.documentElement.style.setProperty("--text-color", "#00274d"); // Dark text
    document.documentElement.style.setProperty("--input-bg-color", "#ffffff"); // Light input background
    document.documentElement.style.setProperty("--input-text-color", "#00274d"); // Dark input text
    themeToggleDarkIcon.classList.remove("hidden");
    themeToggleLightIcon.classList.add("hidden");
    localStorage.setItem("color-theme", "light");
  }
  applyTheme();
}

// Apply theme to all relevant elements
function applyTheme() {
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--bg-color"
  );
  const textColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--text-color"
  );
  const inputBgColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--input-bg-color");
  const inputTextColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--input-text-color");

  document.body.style.backgroundColor = bgColor;
  document.body.style.color = textColor;

  const inputs = document.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.style.backgroundColor = inputBgColor;
    input.style.color = inputTextColor;
  });

  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  if (header) {
    header.style.backgroundColor =
      bgColor === "#f9f9f9" ? "#e0e0e0" : "#23272a"; // Light gray or dark slate gray
    header.style.color = textColor;
  }

  if (footer) {
    footer.style.backgroundColor =
      bgColor === "#f9f9f9" ? "#e0e0e0" : "#23272a"; // Light gray or dark slate gray
    footer.style.color = textColor;
  }
}
// Toggle theme when button is clicked
themeToggleBtn.addEventListener("click", function () {
  if (localStorage.getItem("color-theme") === "light") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
});
// Call applyTheme on page load and whenever the theme changes
document.addEventListener("DOMContentLoaded", function () {
  setTheme();
  applyTheme();
});

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });
});

function showFlashMessage(message) {
  const flashMessage = document.createElement("div");
  flashMessage.textContent = message;
  flashMessage.classList.add(
    "fixed",
    "top-5",
    "right-2",
    "transform",
    "translate-x-[-50%]",
    "p-2",
    "bg-blue-600",
    "text-white",
    "rounded",
    "z-50",
    "opacity-0",
    "transition-opacity",
    "duration-500"
  );

  document.body.appendChild(flashMessage);

  // Show the flash message
  setTimeout(() => {
    flashMessage.classList.remove("opacity-0");
    flashMessage.classList.add("opacity-100");
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    flashMessage.classList.remove("opacity-100");
    setTimeout(() => {
      flashMessage.remove();
    }, 500);
  }, 3000);
}

function showSettings() {
  const flashMessage = document.createElement("div");
  flashMessage.textContent = "Settings will be added soon!";
  flashMessage.classList.add(
    "fixed",
    "top-5",
    "right-2",
    "transform",
    "translate-x-[-50%]",
    "p-2",
    "bg-blue-600",
    "text-white",
    "rounded",
    "z-50"
  );

  document.body.appendChild(flashMessage);

  setTimeout(() => {
    flashMessage.remove();
  }, 3000);
}

function showStatistics() {
  const items = JSON.parse(localStorage.getItem("quantity-list")) || [];
  const totalQuantity = items.reduce(
    (sum, item) => sum + parseFloat(item.value),
    0
  );
  console.log("Total Quantity:", totalQuantity);

  // Create a toast container if it doesn't exist
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.classList.add(
      "fixed",
      "top-5",
      "right-5",
      "z-50",
      "space-y-3",
      "max-w-xs",
      "w-full"
    );
    document.body.appendChild(toastContainer);
  }

  // Create the toast message
  const toastMessage = document.createElement("div");
  toastMessage.textContent = "Check the console for the total quantity so far!";
  toastMessage.classList.add(
    "bg-green-500", // Green color to indicate stats/info
    "text-white",
    "p-4",
    "rounded-lg",
    "shadow-lg",
    "opacity-0",
    "transform",
    "translate-y-5",
    "transition",
    "duration-500",
    "ease-in-out",
    "hover:bg-green-600"
  );

  // Add the toast message to the container
  toastContainer.appendChild(toastMessage);

  // Trigger animation for the toast to appear
  setTimeout(() => {
    toastMessage.classList.remove("opacity-0", "translate-y-5");
    toastMessage.classList.add("opacity-100", "translate-y-0");
  }, 100); // Delay for animation to start

  // Remove the toast after a timeout
  setTimeout(() => {
    toastMessage.classList.add("opacity-0", "translate-y-5");
    setTimeout(() => {
      toastMessage.remove();
    }, 500); // Delay removal for transition
  }, 3000); // Toast duration
}

function showLastFifteenItems() {
  const items = JSON.parse(localStorage.getItem("quantity-list")) || [];
  const lastFifteenItems = items.slice(-15);
  console.log(lastFifteenItems);

  // Create a toast container if it doesn't exist
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.classList.add(
      "fixed",
      "top-5",
      "right-5",
      "z-50",
      "space-y-3",
      "max-w-xs",
      "w-full"
    );
    document.body.appendChild(toastContainer);
  }

  // Create the toast message
  const toastMessage = document.createElement("div");
  toastMessage.textContent = "Check the console for the last 15 items!";
  toastMessage.classList.add(
    "bg-blue-600",
    "text-white",
    "p-4",
    "rounded-lg",
    "shadow-lg",
    "opacity-0",
    "transform",
    "translate-y-5",
    "transition",
    "duration-500",
    "ease-in-out",
    "hover:bg-blue-700"
  );

  // Add the toast message to the container
  toastContainer.appendChild(toastMessage);

  // Trigger animation
  setTimeout(() => {
    toastMessage.classList.remove("opacity-0", "translate-y-5");
    toastMessage.classList.add("opacity-100", "translate-y-0");
  }, 100); // Delay for animation to start

  // Remove the toast after a timeout
  setTimeout(() => {
    toastMessage.classList.add("opacity-0", "translate-y-5");
    setTimeout(() => {
      toastMessage.remove();
    }, 500); // Delay removal for transition
  }, 3000); // Toast duration
}

function clearstorage() {
  if (confirm("Do You Really Want to Clear All List?")) {
    localStorage.clear();
    showFlashMessage("Successfully cleared.");
    window.location.reload();
  }
}

var slicedvalue;
// items array that contains all quantity items
// JSON.parse is used to parse the stringified items from localStorage
// if localStorage is empty, make the items variable an empty array
let items = JSON.parse(localStorage.getItem("quantity-list")) || [];
// svg icons veriables to import icon from html
let svg1 =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';

// function to get days in month for showing count button when month complete

const date = new Date();
const currentyear = date.getFullYear();
const currentmonth = date.getMonth() + 1;
const daysincurrentmonth = new Date(currentyear, currentmonth, 0).getDate();
document.getElementById("clear").textContent = date.getDate();

document
  .getElementById("custom-date-input")
  .setAttribute("min", `${currentyear}-0${currentmonth}-01`);
document
  .getElementById("custom-date-input")
  .setAttribute("max", `${currentyear}-0${currentmonth}-${daysincurrentmonth}`);

function showcustomdatepopup() {
  const popup = document.getElementById("custom-date-popup");
  const input = document.getElementById("custom-date-input");

  popup.classList.toggle("block");
  popup.classList.toggle("hidden");
  input.value = "";
}

// cancel button on custom date picker pop-up
function cancelbtn() {
  document.getElementById("custom-date-input").value = "";
  document.getElementById("custom-date-popup").classList.add("hidden");
}

// done button on custom date picker pop-up
function donebtn() {
  const input = document.getElementById("custom-date-input");
  if (input.value === "") {
    alert("Put date");
  } else {
    document.getElementById("custom-date-popup").classList.add("hidden");
    let customdatevalue = input.value;
    slicedvalue = customdatevalue.slice(8, 10);
    document.getElementById("clear").textContent = `${slicedvalue}`;
  }
}

function addItem() {
  var item = document.getElementById("add").value;
  var unit = document.getElementById("unit").value;

  if (item === "0") {
    return alert("You need to put a value more than zero");
  }
  if (item === "") {
    return alert("Put Quantity");
  }

  let datevalue = new Date(document.getElementById("custom-date-input").value);
  if (document.getElementById("custom-date-input").value === "") {
    items.push({
      value: item,
      unit: unit,
      date: new Date().toLocaleDateString("en-US"),
    });
  } else {
    document.getElementById("custom-date-popup").classList.add("hidden");
    items.push({
      value: item,
      unit: unit,
      date: datevalue.toLocaleDateString("en-US"),
    });
  }

  localStorage.setItem("quantity-list", JSON.stringify(items));
  listItems();

  // Show flash message
  showFlashMessage("Successfully added.");

  document.getElementById("add").value = ""; // Clear input
}

function deleteItem(index) {
  if (confirm("Do you really want to Delete?")) {
    items.splice(index, 1);
    localStorage.setItem("quantity-list", JSON.stringify(items));
    listItems();

    // Show flash message
    showFlashMessage("Successfully deleted.");
  }
}

let draggedItemIndex = null;

// Function to start dragging
function dragStart(event, index) {
  draggedItemIndex = index;
  event.dataTransfer.effectAllowed = "move";
}

// Function to allow the drop
function allowDrop(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

// Function to handle the item drop
function dropItem(event, dropIndex) {
  event.preventDefault();
  // Ensure the dragged item index is valid
  if (draggedItemIndex !== null && draggedItemIndex !== dropIndex) {
    // Swap the items in the array
    let draggedItem = items[draggedItemIndex];
    items.splice(draggedItemIndex, 1);
    items.splice(dropIndex, 0, draggedItem);

    // Update the localStorage after reordering
    localStorage.setItem("quantity-list", JSON.stringify(items));
    listItems(); // Refresh the list to reflect changes
  }
  draggedItemIndex = null; // Reset dragged item index
}

// currency selector list functionality
document
  .getElementById("currency-select--option")
  .addEventListener("change", function () {
    selectedCurrency = this.value; //selected option value

    // display selected option value
    document.getElementById("selected-currency").textContent = selectedCurrency;
  });

// List items with draggable functionality
function listItems() {
  var list = "";
  for (var i = 0; i < items.length; i++) {
    list +=
      "<div class='button-wrap flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-md p-4 mb-2 shadow-md' draggable='true' ondragstart='dragStart(event, " +
      i +
      ")' ondragover='allowDrop(event)' ondrop='dropItem(event, " +
      i +
      ")' id='item-" +
      i +
      "'>" +
      "<div class='flex flex-col'>" +
      "<span class='text-gray-700 dark:text-gray-300 text-sm'>" +
      items[i].date +
      "</span>" +
      "<span class='text-lg font-semibold text-gray-900 dark:text-white'>" +
      items[i].value +
      " " +
      items[i].unit +
      "</span>" +
      "</div>" +
      "<button class='w-12 h-12 bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white font-bold rounded-lg transition duration-200 flex items-center justify-center' onclick='deleteItem(" +
      i +
      ")'>" +
      svg1 +
      "</button>" +
      "</div>";
  }
  document.getElementById("list-items").innerHTML = list;
}

function countbeforemonth() {
  if (confirm("Do you really want to count before completing the month?")) {
    // Hide initial buttons and show count and price input
    document.getElementById("initial-buttons").classList.add("hidden");
    document.getElementById("count-and-price").classList.remove("hidden");
  }

  // Hide custom date popup if no custom date is selected
  if (document.getElementById("custom-date-input").value === "") {
    document.getElementById("custom-date-popup").classList.add("hidden");
  }
}

function resetButtonVisibility() {
  document.getElementById("initial-buttons").classList.remove("hidden");
  document.getElementById("count-and-price").classList.add("hidden");
}

function countall() {
  // Hide the custom date popup if it's currently displayed
  if (document.getElementById("custom-date-popup").style.display === "") {
    document.getElementById("custom-date-popup").style.display = "none";
    document.getElementById("custom-date-input").value = "";
  }

  let sum = 0;
  let summery = "";
  let price = document.getElementById("price-input").value;

  // Conversion factors for units to liters
  const conversionFactors = {
    ml: 0.001, // 1 ml = 0.001 liters
    l: 1, // 1 liter = 1 liter
    oz: 0.0295735, // 1 oz = 0.0295735 liters
    gal: 3.78541, // 1 gallon = 3.78541 liters
  };

  // Loop through items and calculate total sum
  for (let c = 0; c < items.length; c++) {
    let unit = items[c].unit;
    let value = parseFloat(items[c].value);
    let convertedValue = value * conversionFactors[unit];

    sum += convertedValue;

    summery +=
      "<tr class='border-b'><td class='px-4 py-2'>" +
      items[c].date +
      "</td><td class='px-4 py-2'>" +
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
    // Show the report card and set the content
    document.getElementById("reportcard").style.display = "";
    document.getElementById("final").innerHTML =
      "<table class='min-w-full border-collapse'><thead><tr><th class='px-4 py-2 border-b'>Date</th><th class='px-4 py-2 border-b'>Quantity</th></tr></thead><tbody>" +
      summery +
      "</tbody></table>" +
      "<table class='mt-4 min-w-full border-collapse'><tr><th class='pd px-4 py-2 border-b'>Total Quantity</th><th class='px-4 py-2 border-b'>Total Price</th></tr><tr><td class='px-4 py-2 border-b'>" +
      sum.toFixed(2) +
      " liters</td><td class='px-4 py-2 border-b'>" +
      (sum * price).toFixed(2) +
      ` ${selectedCurrency}</td></tr></table>`;
    document.getElementById("reportcard").classList.remove("hidden");
  }
}

function closebtn() {
  const reportCard = document.getElementById("reportcard");

  // Check if the reportcard is currently visible
  if (!reportCard.classList.contains("hidden")) {
    // Hide the reportcard by adding the 'hidden' class
    reportCard.classList.add("hidden");
  }
  resetButtonVisibility();
}

function mixfun() {
  let comp = items.length <= 0;

  // Clear input values if they are not empty
  if (document.getElementById("add").value !== "") {
    document.getElementById("add").value = "";
  }

  if (document.getElementById("price-input").value !== "") {
    document.getElementById("price-input").value = "";
  }

  // Hide the clear storage button when the count button is not displayed
  if (document.getElementById("countbtn").classList.contains("hidden")) {
    document.getElementById("clearstorage").classList.add("hidden");
  } else {
    document.getElementById("clearstorage").classList.remove("hidden");
  }

  // Show count button and hide other buttons when the month is completed
  if (items.length < dayslength) {
    document.getElementById("countbtn").classList.add("hidden");
    document.getElementById("cbmbtn").classList.remove("hidden");
    document.getElementById("clearstorage").classList.remove("hidden");
    document.getElementById("nothing").classList.add("hidden");
    document.getElementById("price-input").classList.add("hidden");
  } else {
    document.getElementById("price-input").classList.remove("hidden");
    document.getElementById("cbmbtn").classList.add("hidden");
    document.getElementById("clearstorage").classList.remove("hidden");
    document.getElementById("countbtn").classList.remove("hidden");
  }

  // Check if there are no items
  if (comp) {
    document.getElementById("cbmbtn").classList.add("hidden");
    document.getElementById("nothing").classList.remove("hidden");
    document.getElementById("clearstorage").classList.add("hidden");
  }
}

window.onload = function () {
  listItems();
  applyTheme();
};

// Add this function to your script.js file
function addImportExportButtons() {
  const container = document.querySelector('.grid-cols-1.sm\\:grid-cols-2.md\\:grid-cols-4');
  if (!container) return;

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'col-span-1 sm:col-span-2 md:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4';

  const exportButton = document.createElement('button');
  exportButton.textContent = 'Export Data';
  exportButton.onclick = exportData;
  exportButton.id = 'exportBtn';
  exportButton.className = 'w-full bg-purple-500 dark:bg-purple-600 hover:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200';

  const importButton = document.createElement('button');
  importButton.textContent = 'Import Data';
  importButton.onclick = importData;
  importButton.id = 'importBtn';
  importButton.className = 'w-full bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200';

  const exportPDFButton = document.createElement('button');
  exportPDFButton.textContent = 'Export as PDF';
  exportPDFButton.onclick = exportDataAsPDF;
  exportPDFButton.id = 'exportDataAsPDF';
  exportPDFButton.className = 'w-full bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200';

  buttonContainer.appendChild(exportButton);
  // buttonContainer.appendChild(exportPDFButton);
  buttonContainer.appendChild(importButton);

  container.appendChild(buttonContainer);
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', addImportExportButtons);

// Add the exportData and importData functions here as well
function exportData() {
  const data = JSON.stringify(items);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'liquidia_data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showFlashMessage("Data exported successfully!");
}

function exportDataAsPDF() {
  const reportContent = document.getElementById("final").innerHTML;
  const opt = {
    margin:       1,
    filename:     'report.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // Choose the element to convert to PDF
  html2pdf().from(reportContent).set(opt).save();

  // Show flash message
  showFlashMessage("Report exported as PDF.", "success");
}


function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (Array.isArray(importedData)) {
          items = importedData;
          localStorage.setItem("quantity-list", JSON.stringify(items));
          listItems();
          showFlashMessage("Data imported successfully!");
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        showFlashMessage("Error importing data. Please check the file format.");
      }
    };
    reader.readAsText(file);
  };
  input.click();
}