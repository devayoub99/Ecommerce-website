import productsData from "./products.json" assert { type: "json" };

const targetSection = document.querySelector(".gallery-section .gallery");

let productsArr = [];

window.addEventListener("load", () => {
  jsonToBoxes();
  showProductsBasedOnScreenSize();
  getFromLocalstorage();
  addToCartOrRemove();
});

function getFromLocalstorage() {
  const hasLocalStorageData =
    JSON.parse(window.localStorage.getItem("products")) ?? [];

  getItemsStatus();
  addNotificationToCart();

  function getItemsStatus() {
    const allBoxes = document.querySelectorAll(".box");

    // Update productsArr value IF there are data in localStorage.
    if (hasLocalStorageData) {
      productsArr = hasLocalStorageData;

      // Fill Cart icon (item) when RELOAD
      allBoxes.forEach((box) => {
        for (let i = 0; i < productsArr.length; i++) {
          if (productsArr[i].id === box.getAttribute("data-id")) {
            box.querySelector(".cart-icon").classList.add("bxs-cart");
            box.querySelector(".cart-icon").classList.remove("bx-cart");
          }
        }
      });
    }
  }

  function addNotificationToCart() {
    if (hasLocalStorageData.length) {
      addNotificationDot(cartPageIcon);
    }
  }
}

function jsonToBoxes() {
  productsData.products.map((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("box", "hidden");
    productDiv.setAttribute("data-cat", product.category);
    productDiv.setAttribute("data-id", product.id);

    createImageSection();

    createInfoSection();

    function createImageSection() {
      const imageSection = document.createElement("section");
      imageSection.classList = "image";

      const img = document.createElement("img");
      img.src = product.url;
      img.alt = product.title;

      imageSection.append(img);

      productDiv.append(imageSection);
    }

    function createInfoSection() {
      const infoSection = document.createElement("section");
      infoSection.className = "info";

      const productTitle = document.createElement("h3");
      productTitle.className = "product-name";
      productTitle.innerHTML = product.title;

      infoSection.append(productTitle);

      createRating();

      createPriceAndAdd();

      function createRating() {
        const productRate = document.createElement("div");
        productRate.className = "rate";
        for (let i = 0; i < 5; i++) {
          const starIcon = document.createElement("i");
          starIcon.classList.add("bx", "bx-star", "star");
          productRate.append(starIcon);
        }

        infoSection.append(productRate);

        applyStars();

        function applyStars() {
          const stars = productRate.children;

          // Add the Filled Stars
          for (let i = 0; i < parseInt(product.rate); i++) {
            stars[i].classList.add("bxs-star");
            stars[i].classList.remove("bx-star");
          }

          // Add the half star
          if (parseInt(product.rate) < product.rate) {
            stars[parseInt(product.rate)].classList.add("bxs-star-half");
            stars[parseInt(product.rate)].classList.remove("bx-star");
          }
        }
      }

      function createPriceAndAdd() {
        const mainDiv = document.createElement("div");
        mainDiv.className = "price-add";

        const price = document.createElement("span");
        price.className = "price";
        price.innerHTML = product.price;

        const addToCart = document.createElement("button");
        addToCart.classList.add("add-to-cart", "transparent-btn");

        const cartIcon = document.createElement("i");
        cartIcon.classList.add("bx", "bx-cart", "cart-icon");

        addToCart.append(cartIcon);

        mainDiv.append(price);
        mainDiv.append(addToCart);

        infoSection.append(mainDiv);
      }

      productDiv.append(infoSection);
    }

    targetSection.append(productDiv);
  });
}

function showProductsBasedOnScreenSize() {
  const breakpoints = {
    mobile: "(max-width: 575px)",
    small: "(min-width: 576px) and (max-width: 768px)",
    medium: "(min-width: 769px) and (max-width: 992px)",
    large: "(min-width: 993px) and (max-width: 1200px)",
    xlarge: "(min-width: 1201px)",
  };

  const defaultBoxesAmount = {
    mobile: 3,
    small: 4,
    medium: 6,
    large: 6,
    xlarge: 8,
  };

  const allBoxes = targetSection.querySelectorAll(".box");

  const currentBreakpoint = Object.keys(breakpoints).find(
    (key) => window.matchMedia(breakpoints[key]).matches
  );
  let boxesAmount = defaultBoxesAmount[currentBreakpoint];

  for (let i = 0; i < boxesAmount; i++) {
    allBoxes[i].classList.remove("hidden");
  }
}

function addToCartOrRemove() {
  let allBoxes = document.querySelectorAll(".box");

  allBoxes.forEach((box) => {
    let addIcon = box.querySelector(".cart-icon");

    addIcon.addEventListener("click", (e) => {
      if (e.target.classList.contains("bx-cart")) {
        changeCartIcon(addIcon, "bx-cart", "bxs-cart");
        addToCart(box);
      } else {
        changeCartIcon(addIcon, "bxs-cart", "bx-cart");
        removeFromCart(box);
      }

      cartNotification();
      updateLocalStorage();
    });
  });

  function changeCartIcon(icon, classToDelete, classToAdd) {
    if (icon) {
      icon.classList.remove(classToDelete);
      icon.classList.add(classToAdd);
    }
  }

  function addToCart(targetBox) {
    let itemObj = {
      title: targetBox.querySelector("h3").innerHTML,
      price: targetBox.querySelector(".price").innerHTML,
      imgUrl: targetBox.querySelector(".image img").src,
      id: targetBox.getAttribute("data-id"),
      cat: targetBox.getAttribute("data-cat"),
    };

    productsArr.push(itemObj);
  }

  function removeFromCart(targetBox) {
    for (let i = 0; i < productsArr.length; i++) {
      if (productsArr[i].id === targetBox.getAttribute("data-id")) {
        productsArr.splice(i, 1);
      }
    }
  }

  function cartNotification() {
    if (productsArr.length) {
      addNotificationDot(cartPageIcon);
    } else {
      removeNotificationDot(cartPageIcon);
    }
  }

  function updateLocalStorage() {
    localStorage.setItem("products", [JSON.stringify(productsArr)]);
  }
}

const seeallBtn = document.querySelector(".gallery-section .see-all");

seeallBtn.addEventListener("click", (e) => {
  const allBoxes = targetSection.querySelectorAll(".box");

  allBoxes.forEach((box) => box.classList.remove("hidden"));

  e.target.innerHTML = "No more";
  e.target.classList.add("no-more");
});
