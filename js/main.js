/* ========== Page loading  =========== */
let pageLoading = document.querySelector(".loading-circle");

window.addEventListener("load", function () {
  this.setTimeout(() => {
    pageLoading.classList.add("hidden");
  }, 200);
});

/* ========== Open Burger Menu  =========== */
let burgerIcon = document.getElementById("burgerIcon");

burgerIcon.addEventListener("click", function () {
  burgerIcon.classList.toggle("opened");
});

/* ========== Close burgerIcon =========== */
document.body.addEventListener("click", function (e) {
  // console.log(e.target.classList.contains("active"));
  let searchIcon = !e.target.classList.contains("search-icon");
  let searchBar = !e.target.classList.contains("search-bar");
  if (e.target !== burgerIcon && searchIcon && searchBar) {
    burgerIcon.classList.remove("opened");
  }
});

/* ========== Cart Page icon =========== */
let cartPageIcon = document.getElementById("cartPageIcon");

cartPageIcon.addEventListener("click", () => openPage("../cart.html"));

function openPage(Path) {
  window.open(Path, "_self");
}

/* ========== Get Products state =========== */
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

/* ========== Add \ remove item =========== */

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

/* ========== Add active class to the Current Section =========== */
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

/* ========== Disappear poped-up box when scroll =========== */

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

/* ========== Scroll To Top Button =========== */

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

/* ========== Dynamic Pop-up for BOX =========== */
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

/* ========== Search =========== */

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
