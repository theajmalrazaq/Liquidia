// Global variables
const selectedCurrency = {
  value: "USD" // Default value for currency
};

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then((registration) => console.log('Service Worker registered with scope:', registration.scope))
      .catch((error) => console.log('Service Worker registration failed:', error));
  });
}

// Theme toggle functionality
const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
const themeToggleBtn = document.getElementById("theme-toggle");

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.style.setProperty("--bg-color", isDark ? "#2c2f33" : "#f9f9f9");
  document.documentElement.style.setProperty("--text-color", isDark ? "#f5f5f5" : "#00274d");
  document.documentElement.style.setProperty("--input-bg-color", isDark ? "#4e545c" : "#ffffff");
  document.documentElement.style.setProperty("--input-text-color", isDark ? "#f5f5f5" : "#00274d");
  themeToggleLightIcon.classList.toggle("hidden", !isDark);
  themeToggleDarkIcon.classList.toggle("hidden", isDark);
  localStorage.setItem("color-theme", theme);
  applyTheme();
}

function applyTheme() {
  const style = getComputedStyle(document.documentElement);
  const bgColor = style.getPropertyValue("--bg-color");
  const textColor = style.getPropertyValue("--text-color");
  const inputBgColor = style.getPropertyValue("--input-bg-color");
  const inputTextColor = style.getPropertyValue("--input-text-color");

  document.body.style.backgroundColor = bgColor;
  document.body.style.color = textColor;

  document.querySelectorAll("input, textarea").forEach(input => {
    input.style.backgroundColor = inputBgColor;
    input.style.color = inputTextColor;
  });

  const headerFooterColor = bgColor === "#f9f9f9" ? "#e0e0e0" : "#23272a";
  [document.querySelector("header"), document.querySelector("footer")].forEach(element => {
    if (element) {
      element.style.backgroundColor = headerFooterColor;
      element.style.color = textColor;
    }
  });
}

themeToggleBtn.addEventListener("click", () => {
  setTheme(localStorage.getItem("color-theme") === "light" ? "dark" : "light");
});

document.addEventListener("DOMContentLoaded", () => {
  setTheme();
  applyTheme();
  
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenuButton.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
});

function showFlashMessage(message) {
  const flashMessage = document.createElement("div");
  flashMessage.textContent = message;
  flashMessage.classList.add(
    "fixed", "top-5", "right-2", "transform", "translate-x-[-50%]", "p-2",
    "bg-blue-600", "text-white", "rounded", "z-50", "opacity-0",
    "transition-opacity", "duration-500"
  );

  document.body.appendChild(flashMessage);

  setTimeout(() => flashMessage.classList.add("opacity-100"), 100);
  setTimeout(() => {
    flashMessage.classList.remove("opacity-100");
    setTimeout(() => flashMessage.remove(), 500);
  }, 3000);
}

function showSettings() {
  showFlashMessage("Settings will be added soon!");
}

function showStatistics() {
  const items = JSON.parse(localStorage.getItem("quantity-list")) || [];
  const totalQuantity = items.reduce((sum, item) => sum + parseFloat(item.value), 0);
  console.log("Total Quantity:", totalQuantity);
  showToast("Check the console for the total quantity so far!", "bg-green-500");
}

function showLastFifteenItems() {
  const items = JSON.parse(localStorage.getItem("quantity-list")) || [];
  console.log(items.slice(-15));
  showToast("Check the console for the last 15 items!", "bg-blue-600");
}

function showToast(message, bgColor) {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.classList.add("fixed", "top-5", "right-5", "z-50", "space-y-3", "max-w-xs", "w-full");
    document.body.appendChild(toastContainer);
  }

  const toastMessage = document.createElement("div");
  toastMessage.textContent = message;
  toastMessage.classList.add(
    bgColor, "text-white", "p-4", "rounded-lg", "shadow-lg", "opacity-0",
    "transform", "translate-y-5", "transition", "duration-500", "ease-in-out",
    `hover:${bgColor.replace('500', '600').replace('600', '700')}`
  );

  toastContainer.appendChild(toastMessage);

  setTimeout(() => {
    toastMessage.classList.remove("opacity-0", "translate-y-5");
    toastMessage.classList.add("opacity-100", "translate-y-0");
  }, 100);

  setTimeout(() => {
    toastMessage.classList.add("opacity-0", "translate-y-5");
    setTimeout(() => toastMessage.remove(), 500);
  }, 3000);
}

function clearstorage() {
  if (confirm("Do You Really Want to Clear All List?")) {
    localStorage.clear();
    showFlashMessage("Successfully cleared.");
    window.location.reload();
  }
}

// Items array that contains all quantity items
let items = JSON.parse(localStorage.getItem("quantity-list")) || [];
const svg1 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';

// Function to get days in month for showing count button when month complete
const date = new Date();
const currentyear = date.getFullYear();
const currentmonth = date.getMonth() + 1;
const daysincurrentmonth = new Date(currentyear, currentmonth, 0).getDate();
document.getElementById("clear").textContent = date.getDate();

document.getElementById("custom-date-input").setAttribute("min", `${currentyear}-0${currentmonth}-01`);
document.getElementById("custom-date-input").setAttribute("max", `${currentyear}-0${currentmonth}-${daysincurrentmonth}`);

function showcustomdatepopup() {
  const popup = document.getElementById("custom-date-popup");
  const input = document.getElementById("custom-date-input");
  popup.classList.toggle("block");
  popup.classList.toggle("hidden");
  input.value = "";
}

function cancelbtn() {
  document.getElementById("custom-date-input").value = "";
  document.getElementById("custom-date-popup").classList.add("hidden");
}

function donebtn() {
  const input = document.getElementById("custom-date-input");
  if (input.value === "") {
    alert("Put date");
  } else {
    document.getElementById("custom-date-popup").classList.add("hidden");
    let customdatevalue = input.value;
    document.getElementById("clear").textContent = customdatevalue.slice(8, 10);
  }
}

function addItem() {
  const item = document.getElementById("add").value;
  const unit = document.getElementById("unit").value;

  if (item === "0") {
    return alert("You need to put a value more than zero");
  }
  if (item === "") {
    return alert("Put Quantity");
  }

  let datevalue = new Date(document.getElementById("custom-date-input").value);
  items.push({
    value: item,
    unit: unit,
    date: document.getElementById("custom-date-input").value === "" 
      ? new Date().toLocaleDateString("en-US")
      : datevalue.toLocaleDateString("en-US")
  });

  localStorage.setItem("quantity-list", JSON.stringify(items));
  listItems();
  showFlashMessage("Successfully added.");
  document.getElementById("add").value = "";
  document.getElementById("custom-date-popup").classList.add("hidden");
}

function deleteItem(index) {
  if (confirm("Do you really want to Delete?")) {
    items.splice(index, 1);
    localStorage.setItem("quantity-list", JSON.stringify(items));
    listItems();
    showFlashMessage("Successfully deleted.");
  }
}

let draggedItemIndex = null;

function dragStart(event, index) {
  draggedItemIndex = index;
  event.dataTransfer.effectAllowed = "move";
}

function allowDrop(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function dropItem(event, dropIndex) {
  event.preventDefault();
  if (draggedItemIndex !== null && draggedItemIndex !== dropIndex) {
    const [draggedItem] = items.splice(draggedItemIndex, 1);
    items.splice(dropIndex, 0, draggedItem);
    localStorage.setItem("quantity-list", JSON.stringify(items));
    listItems();
  }
  draggedItemIndex = null;
}

document.getElementById("currency-select--option").addEventListener("change", function() {
  selectedCurrency.value = this.value;
  document.getElementById("selected-currency").textContent = selectedCurrency.value;
});

function listItems() {
  const listContainer = document.getElementById("list-items");
  listContainer.innerHTML = items.map((item, i) => `
    <div class='button-wrap flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-md p-4 mb-2 shadow-md' 
         draggable='true' ondragstart='dragStart(event, ${i})' ondragover='allowDrop(event)' ondrop='dropItem(event, ${i})' id='item-${i}'>
      <div class='flex flex-col'>
        <span class='text-gray-700 dark:text-gray-300 text-sm'>${item.date}</span>
        <span class='text-lg font-semibold text-gray-900 dark:text-white'>${item.value} ${item.unit}</span>
      </div>
      <button class='w-12 h-12 bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white font-bold rounded-lg transition duration-200 flex items-center justify-center' 
              onclick='deleteItem(${i})'>${svg1}</button>
    </div>
  `).join('');
}

function countbeforemonth() {
  if (confirm("Do you really want to count before completing the month?")) {
    document.getElementById("initial-buttons").classList.add("hidden");
    document.getElementById("count-and-price").classList.remove("hidden");
  }
  if (document.getElementById("custom-date-input").value === "") {
    document.getElementById("custom-date-popup").classList.add("hidden");
  }
}

function resetButtonVisibility() {
  document.getElementById("initial-buttons").classList.remove("hidden");
  document.getElementById("count-and-price").classList.add("hidden");
}

function countall() {
  const customDatePopup = document.getElementById("custom-date-popup");
  if (customDatePopup.style.display === "") {
    customDatePopup.style.display = "none";
    document.getElementById("custom-date-input").value = "";
  }

  const price = document.getElementById("price-input").value;
  if (price === "") return alert("Enter Price");
  if (items.length === 0) return alert("Put Something In List");

  const conversionFactors = { ml: 0.001, l: 1, oz: 0.0295735, gal: 3.78541 };
  let sum = 0;
  const summery = items.map(item => {
    const convertedValue = parseFloat(item.value) * conversionFactors[item.unit];
    sum += convertedValue;
    return `<tr class='border-b'><td class='px-4 py-2'>${item.date}</td><td class='px-4 py-2'>${item.value} ${item.unit}</td></tr>`;
  }).join('');

  const reportCard = document.getElementById("reportcard");
  reportCard.style.display = "";
  document.getElementById("final").innerHTML = `
    <table class='min-w-full border-collapse'>
      <thead><tr><th class='px-4 py-2 border-b'>Date</th><th class='px-4 py-2 border-b'>Quantity</th></tr></thead>
      <tbody>${summery}</tbody>
    </table>
    <table class='mt-4 min-w-full border-collapse'>
      <tr><th class='pd px-4 py-2 border-b'>Total Quantity</th><th class='px-4 py-2 border-b'>Total Price</th></tr>
      <tr><td class='px-4 py-2 border-b'>${sum.toFixed(2)} liters</td><td class='px-4 py-2 border-b'>${(sum * price).toFixed(2)} ${selectedCurrency.value}</td></tr>
    </table>
  `;
  reportCard.classList.remove("hidden");
}

function closebtn() {
  const reportCard = document.getElementById("reportcard");
  if (!reportCard.classList.contains("hidden")) {
    reportCard.classList.add("hidden");
  }
  resetButtonVisibility();
}

function mixfun() {
  const comp = items.length <= 0;
  document.getElementById("add").value = "";
  document.getElementById("price-input").value = "";

  const countBtn = document.getElementById("countbtn");
  const cbmBtn = document.getElementById("cbmbtn");
  const clearStorage = document.getElementById("clearstorage");
  const nothing = document.getElementById("nothing");
  const priceInput = document.getElementById("price-input");

  clearStorage.classList.toggle("hidden", countBtn.classList.contains("hidden"));

  if (items.length < daysincurrentmonth) {
    countBtn.classList.add("hidden");
    cbmBtn.classList.remove("hidden");
    clearStorage.classList.remove("hidden");
    nothing.classList.add("hidden");
    priceInput.classList.add("hidden");
  } else {
    priceInput.classList.remove("hidden");
    cbmBtn.classList.add("hidden");
    clearStorage.classList.remove("hidden");
    countBtn.classList.remove("hidden");
  }

  if (comp) {
    cbmBtn.classList.add("hidden");
    nothing.classList.remove("hidden");
    clearStorage.classList.add("hidden");
  }
}

window.onload = function () {
  listItems();
  applyTheme();
};

// Add Import/Export functionality
function addImportExportButtons() {
  const container = document.querySelector(".grid-cols-1.sm\\:grid-cols-2.md\\:grid-cols-4");
  if (!container) return;

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "col-span-1 sm:col-span-2 md:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4";

  const exportButton = createButton("Export Data", exportData, "exportBtn", "bg-purple-500 dark:bg-purple-600 hover:bg-purple-600 dark:hover:bg-purple-700");
  const importButton = createButton("Import Data", importData, "importBtn", "bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700");

  buttonContainer.appendChild(exportButton);
  buttonContainer.appendChild(importButton);

  container.appendChild(buttonContainer);
}

function createButton(text, onclick, id, className) {
  const button = document.createElement("button");
  button.textContent = text;
  button.onclick = onclick;
  button.id = id;
  button.className = `w-full ${className} text-white font-bold py-2 px-4 rounded-lg transition duration-200`;
  return button;
}

document.addEventListener("DOMContentLoaded", addImportExportButtons);

function exportData() {
  const data = JSON.stringify(items);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "liquidia_data.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showFlashMessage("Data exported successfully!");
}

function importData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
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