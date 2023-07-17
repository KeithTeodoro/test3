const itemInput = document.getElementById("item-input");
const submitItem = document.querySelector("btn");
const removeButtons = document.querySelectorAll(".remove-item");
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");

const addItem = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("test");
    return;
  }
  addItemToDOM(newItem);
  addItemToStorage(newItem);
  itemInput.value = "";
};

const addItemToDOM = (item) => {
  const itemList = document.querySelector("#item-list");
  const li = document.createElement("li");
  const button = document.createElement("button");
  const buttonImage = document.createElement("i");
  buttonImage.className = "fa-solid fa-xmark";
  button.className = "remove-item btn-link text-red";
  li.appendChild(document.createTextNode(item));
  button.appendChild(buttonImage);
  li.appendChild(button);
  itemList.appendChild(li);
  itemInput.value = "";
  button.addEventListener("click", removeItem);
};

const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
};

const addItemToStorage = (item) => {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const removeItemFromStorage = () => {};

const getItemsFromStorage = () => {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
};

const removeItem = (event) => {
  event.preventDefault();
  const listItem = event.target.closest("li");
  listItem.remove();
};

const clearItems = (e) => {
  const items = document.querySelectorAll("li");
  items.forEach((item) => {
    item.remove();
  });
};

const filterItems = () => {
  const li = document.querySelectorAll("li");

  li.forEach((item) => {
    const itemText = item.textContent.toLowerCase();

    if (itemText.includes(filter.value.toLowerCase())) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

filter.addEventListener("input", filterItems);

clearBtn.addEventListener("click", clearItems);

removeButtons.forEach((button) => {
  button.addEventListener("click", removeItem);
});

btn.addEventListener("click", addItem);

document.addEventListener("DOMContentLoaded", displayItems);
