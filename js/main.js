/* ========== [1] Page loading  =========== */
let pageLoading = document.querySelector(".loading-circle");

window.addEventListener("load", function () {
  this.setTimeout(() => {
    pageLoading.classList.add("hidden");
  }, 200);
});

/* ========== [2] Open Burger Menu  =========== */
let burgerIcon = document.getElementById("burgerIcon");

burgerIcon.addEventListener("click", function () {
  burgerIcon.classList.toggle("opened");
});

/* ========== [3] Close burgerIcon =========== */
document.body.addEventListener("click", function (e) {
  // console.log(e.target.classList.contains("active"));
  let searchIcon = !e.target.classList.contains("search-icon");
  let searchBar = !e.target.classList.contains("search-bar");
  if (e.target !== burgerIcon && searchIcon && searchBar) {
    burgerIcon.classList.remove("opened");
  }
});

/* ========== [5] Cart Page icon =========== */
let cartPageIcon = document.getElementById("cartPageIcon");

cartPageIcon.addEventListener("click", () => openPage("../cart.html"));

function openPage(Path) {
  window.open(Path, "_self");
}

/* ========== [7] Get Products state =========== */
let allBoxes = document.querySelectorAll(".box");
let productsArr = [];

window.addEventListener("load", loadFromLocalStorage);

function loadFromLocalStorage() {
  // Update itemsArr value IF there are data in localStorage.
  let dataFromLocalStorage = JSON.parse(
    window.localStorage.getItem("products")
  );

  if (dataFromLocalStorage) {
    itemsArr = dataFromLocalStorage;

    // Fill Cart icon (item) when RELOAD
    allBoxes.forEach((box) => {
      for (let i = 0; i < itemsArr.length; i++) {
        if (itemsArr[i].title === box.querySelector("h3").innerHTML) {
          box.querySelector(".cart-icon").classList.add("bxs-cart");
          box.querySelector(".cart-icon").classList.remove("bx-cart");
        }
      }
    });

    // Add red dot on the Cart Page icon if there are item(s) in Cart
    if (dataFromLocalStorage.length) {
      addNotificationDot(cartPageIcon);
    }
  }
}

/* ========== [8] Add \ remove item =========== */

window.addEventListener("load", toggleProduct);

function toggleProduct() {
  let allBoxes = document.querySelectorAll(".box");
  allBoxes.forEach((box) => {
    let addIcon = box.querySelector(".cart-icon");

    addIcon.addEventListener("click", () => {
      if (addIcon.classList.contains("bx-cart")) {
        addToCart(addIcon, box);
      } else {
        removeFromCart(addIcon, box);
      }

      if (productsArr.length) {
        addNotificationDot(cartPageIcon);
      } else {
        removeNotificationDot(cartPageIcon);
      }

      // Add the Array to local storage
      localStorage.setItem("products", [JSON.stringify(productsArr)]);
    });
  });

  function addToCart(targetClasses, targetBox) {
    // Change Icon
    targetClasses.classList.remove("bx-cart");
    targetClasses.classList.add("bxs-cart");

    // console.log(targetBox);

    // Create Obj
    let itemObj = {
      title: targetBox.querySelector("h3").innerHTML,
      price: targetBox.querySelector(".price").innerHTML,
      imgUrl: targetBox.querySelector(".image img").src,
      cat: targetBox.getAttribute("data-cat"),
    };

    // Add Obj to Array
    productsArr.push(itemObj);
  }

  function removeFromCart(targetClasses, targetBox) {
    // Change Icon
    targetClasses.classList.remove("bxs-cart");
    targetClasses.classList.add("bx-cart");

    // Remove Obj from Array
    for (let i = 0; i < itemsArr.length; i++) {
      if (itemsArr[i].title === targetBox.querySelector("h3").innerHTML) {
        itemsArr.splice(i, 1);
      }
    }
  }
}

// Used Globally
function addNotificationDot(targetElement) {
  if (!targetElement.querySelector(".red-dot-noti")) {
    let redDot = document.createElement("span");
    redDot.classList.add("red-dot-noti");
    targetElement.append(redDot);
  }
}

// Used Globally
function removeNotificationDot(targetElement) {
  let redDot = targetElement.querySelector(".red-dot-noti");

  if (redDot) {
    redDot.remove();
  }
}

/* ========== [9] Add active class to the Current Section =========== */
const navLinks = document.querySelectorAll(".page-header nav a");
const sections = document.querySelectorAll(".linked-sec");

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;

    if (scrollPosition >= sectionTop) {
      const sectionName = section.getAttribute("id");

      const navLink = document.querySelector(
        `.page-header nav a[href='#${sectionName}']`
      );

      navLinks.forEach(function (link) {
        link.classList.remove("active");
      });
      navLink.classList.add("active");
    } else if (scrollPosition < 50) {
      navLinks.forEach(function (link) {
        link.classList.remove("active");
      });
    }
  });
});

/* ========== [11] Disappear poped-up box when scroll =========== */

window.addEventListener("scroll", () => {
  let allProducts = document.querySelectorAll(".reco .boxes-container .box");
  allProducts.forEach((product) => {
    if (product.classList.contains("pop-up-box")) {
      let productDimenObj = product.getBoundingClientRect();

      if (
        productDimenObj.top > window.innerHeight ||
        productDimenObj.bottom < 0
      ) {
        allProducts.forEach((product) =>
          product.classList.remove("pop-up-box")
        );

        removeAddedElements(product);
      }
    }
  });
});

/* ========== [12] Scroll To Top Button =========== */

let scrollToTopBtn = document.querySelector(".scroll-to-top");

// Show / Hide
window.addEventListener("scroll", () => {
  if (this.scrollY > document.documentElement.clientHeight) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

// Function
scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo(0, 0);
}

/* ========== User Form =========== */

let profileIcon = document.getElementById("profileIcon");

profileIcon.addEventListener("click", memeberPopup);

function memeberPopup() {
  // * Appear pop up
  let signPopup = document.querySelector(".be-a-member");
  signPopup.classList.remove("hidden");
  document.body.classList.add("member-layout");
  scrollToTop();

  // * Switch between Login & Sign up
  let switchBetweenBtns = document.querySelectorAll(".switch-between");
  switchBetweenBtns.forEach((btn) =>
    btn.addEventListener("click", loginToSignup)
  );

  // * Close Memeber Popup
  let closeBtns = signPopup.querySelectorAll(".close-icon");
  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      signPopup.classList.add("hidden");
      document.body.classList.remove("member-layout");
    });
  });
}

function loginToSignup() {
  let flippingCard = document.querySelectorAll(".card-face");
  flippingCard.forEach((card) => {
    card.classList.toggle("active");
  });
}

/* ========== [10] Dynamic Pop-up for BOX =========== */
function popUpBox() {
  let allProducts = document.querySelectorAll(".reco .boxes-container .box");

  allProducts.forEach((box) => {
    box.addEventListener("click", (e) => {
      let closeIcon = e.target.classList.contains("close-icon");
      let productImage = e.target.nodeName;
      let isPoppedUp = box.classList.contains("pop-up-box");

      if (closeIcon) {
        removeAddedElements(box);
      } else if (!isPoppedUp && productImage === "IMG") {
        // console.log(allBoxes);
        allProducts.forEach((box) => {
          box.classList.remove("pop-up-box");
          removeAddedElements(box);
        });
        box.classList.add("pop-up-box");
        addCloseIcon(box);
      }
    });
  });

  function addCloseIcon(targetBox) {
    let imageSection = targetBox.querySelector(".image");

    let closeIcon = document.createElement("i");
    closeIcon.classList.add("bx", "bx-x", "close-icon");

    imageSection.after(closeIcon);
  }
}

function removeAddedElements(targetBox) {
  let closeIcon = targetBox.querySelector(".close-icon");

  if (closeIcon) {
    targetBox.classList.remove("pop-up-box");
    closeIcon.remove();
  }
}

/* ========== [11] Get Data From Public API =========== */

async function getDataFromPublicApi() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "215adc18bamshba2581847085043p1a19dcjsn97e11bc84378",
      "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    },
  };

  const dataFromAPI = await fetch(
    "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30&categories=men_newarrivals_clothes&categories=ladies_newarrivals_clothes&categories=kids_newbornbaby_viewall&sortBy=newProduct",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      let allProducts = data.results;
      return allProducts.map((product) => {
        // console.log(product.sale);
        let productDiv = document.createElement("div");
        productDiv.classList.add("box", `box-${allProducts.indexOf(product)}`);
        productDiv.setAttribute("data-cat", product.categoryName);

        // console.log(product.categoryName);

        let imageSection = document.createElement("section");
        imageSection.className = "image";

        let productImg = document.createElement("img");
        productImg.src = product.images[0].baseUrl;

        if (product.rgbColors) {
          let productColors = document.createElement("div");
          productColors.className = "product-colors";
          for (let i = 0; i < product.rgbColors.length; i++) {
            let color = document.createElement("span");
            color.style.backgroundColor = product.rgbColors[i];
            color.className = "color";
            productColors.append(color);
          }
          imageSection.append(productColors);
        }

        let productCats = document.createElement("span");
        productCats.className = "product-category";
        productCats.innerHTML = product.categoryName;

        // console.log(product.sellingAttributes)

        imageSection.append(productImg);
        imageSection.append(productCats);

        let infoSection = document.createElement("section");
        infoSection.className = "info";

        let nameNSizes = document.createElement("div");
        nameNSizes.className = "row";

        let productTitle = document.createElement("h3");
        productTitle.className = "product-name";
        productTitle.innerHTML = product.name;
        nameNSizes.append(productTitle);

        if (product.variantSizes.length) {
          let productSizes = document.createElement("select");
          productSizes.className = "product-sizes";
          for (let i = 0; i < product.variantSizes.length; i++) {
            let size = document.createElement("option");
            size.value = product.variantSizes[i].filterCode;
            size.innerHTML = product.variantSizes[i].filterCode;
            productSizes.append(size);
          }
          nameNSizes.append(productSizes);
        }

        let productPricing = document.createElement("div");
        productPricing.classList.add("price-add");

        let productPrice = document.createElement("span");
        productPrice.className = "price";
        productPrice.innerHTML = product.price.value;

        let addBtn = document.createElement("button");
        addBtn.classList.add("add-to-cart", "transparent-btn");

        let addIcon = document.createElement("i");
        addIcon.classList.add("bx", "bx-cart", "cart-icon");

        addBtn.append(addIcon);

        productPricing.append(productPrice);
        productPricing.append(addBtn);

        infoSection.append(nameNSizes);

        infoSection.append(productPricing);

        productDiv.append(imageSection);
        productDiv.append(infoSection);

        // if (product.categoryName === "Kids") {
        //   console.log(product.categoryName);
        // }

        // document.body.append(productDiv);
        let target = document.querySelector(".reco .boxes-container");

        target.append(productDiv);
      });
    })
    .then(() => popUpBox())
    .catch((err) => console.error(err));
}

/* ========== [12] Search =========== */

let searchIcon = document.getElementById("searchIcon");
let searchBar = document.getElementById("searchBar");

searchIcon.addEventListener("click", () => {
  showSearchBar();
});

function showSearchBar() {
  searchBar.classList.remove("hidden");
}

searchBar.addEventListener("input", () => {
  if (searchBar.value) {
    let searchBarValue =
      searchBar.value[0].toUpperCase() + searchBar.value.slice(1);
    appearSearchResults(searchBarValue);
  } else {
    let resultsContainer = document.querySelector(".results-container");
    resultsContainer.remove();
  }
});

function appearSearchResults(searchBarValue) {
  // [1] Remove Previous Results
  let resultsContainer = document.querySelector(".results-container");
  if (resultsContainer) {
    resultsContainer.remove();
  }

  // [1] Collect Results
  function getSearchResults() {
    let allProducts = document.querySelectorAll(".produtcs-container .box");

    return Array.from(allProducts)
      .map((product) => {
        return product.querySelector(".product-name");
      })
      .filter((productTitle) => {
        let productName = productTitle.innerHTML;
        // ! Main Condition
        // All results that contain the search query
        return productName.indexOf(searchBarValue) !== -1;
      })
      .map((productTitles) => productTitles.parentElement.parentElement);
  }

  let filteredResults = getSearchResults();

  // [2] DOM Part
  function createResult() {
    let resultsContainer = document.createElement("div");
    resultsContainer.classList.add("results-container", "container");

    Array.from(resultsContainer.children).forEach((child) => child.remove());

    resultsContainer.before(
      document.createTextNode(`Search Results (${filteredResults.length})`)
    );

    filteredResults.forEach((result) => {
      let clonedResult = result.cloneNode(true);
      resultsContainer.append(clonedResult);
    });

    document.querySelector(".page-header").after(resultsContainer);
  }

  createResult();
  toggleProduct();
}

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "215adc18bamshba2581847085043p1a19dcjsn97e11bc84378",
//     "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
//   },
// };

// fetch(
//   "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30&categories=ladies_newarrivals_clothes",
//   options
// )
//   .then((response) => response.json())
//   .then((data) => {
//     data.results.forEach((product) => console.log(product.categoryName));
//   })
//   .catch((err) => console.error(err));

// getDataFromPublicApi();

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "215adc18bamshba2581847085043p1a19dcjsn97e11bc84378",
//     "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
//   },
// };

// fetch(
//   "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list?lang=en&country=us",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
