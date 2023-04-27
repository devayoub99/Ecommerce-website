// [1] Get from local Storage
window.addEventListener("load", function () {
  if (window.localStorage.getItem("products")) {
    let jsObj = JSON.parse(window.localStorage.getItem("products"));

    jsObj.forEach((box) =>
      createItemBox(box.title, box.price, box.imgUrl, box.cat)
    );
  }
});

function createItemBox(title, price, imgUrl, cat) {
  let itemBox = document.createElement("div");
  itemBox.classList.add("box");
  itemBox.setAttribute("data-cat", cat);

  let imageSec = document.createElement("section");
  imageSec.className = "image";

  let itemImg = document.createElement("img");
  itemImg.src = imgUrl;

  let infoSec = document.createElement("section");
  infoSec.className = "info";

  let itemTitle = document.createElement("h3");
  itemTitle.className = "product-name";
  itemTitle.innerHTML = title;

  let itemPrice = document.createElement("span");
  itemPrice.className = "price";
  itemPrice.innerHTML = price;

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("bx", "bx-x", "close-icon");

  imageSec.append(itemImg);

  infoSec.append(itemTitle);
  infoSec.append(itemPrice);
  infoSec.append(deleteIcon);

  itemBox.append(imageSec);
  itemBox.append(infoSec);

  document.querySelector(".products").append(itemBox);
}

// [2] Click on Item
window.addEventListener("load", function () {
  let allItems = document.querySelectorAll(".products .box");

  allItems.forEach((box) => {
    box.addEventListener("click", (e) => {
      if (e.target.classList.contains("close-icon")) {
        // Remove from DOM
        box.remove();

        let targetName = box.querySelector("h3").innerHTML;

        // Remove from Localstorage
        rmSotrage(targetName);

        // Re-calc the subTotal
        setSubTotalValue();
      } else {
        // console.log(e.target);
        this.open("../index.html#new");
      }
    });
  });
});

function rmSotrage(target) {
  let data = JSON.parse(window.localStorage.getItem("products"));

  for (let i = 0; i < data.length; i++) {
    if (data[i].title === target) {
      data.splice(i, 1);
    }
  }

  localStorage.setItem("products", JSON.stringify(data));
}

// [3] Calc the Subtotal
window.addEventListener("load", setSubTotalValue);

function setSubTotalValue() {
  let allPrices = Array.from(
    document.querySelectorAll(".products .box .price")
  );
  let subTotalEle = document.getElementById("subTotal");
  let subTotalValue = allPrices
    .map((price) => price.innerHTML)
    .reduce((acc, cur) => {
      return parseInt(acc) + parseInt(cur);
    }, 0);

  subTotalEle.innerHTML = subTotalValue;
}
