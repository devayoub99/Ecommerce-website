/* ========== Loading Circle =========== */
window.addEventListener("load", () => {
  let pageLoading = document.querySelector(".page-loading-circle");
  loadingCircle(pageLoading);
});

function loadingCircle(target) {
  this.setTimeout(() => {
    target.classList.add("hidden");
  }, 200);
}

/* ========== Toggle Burger Menu  =========== */
let burgerIcon = document.getElementById("burgerIcon");

burgerIcon.addEventListener("click", function () {
  burgerIcon.classList.toggle("opened");
});

/* ========== Close Burger Menu when click out =========== */
document.body.addEventListener("click", function (e) {
  let searchIcon = !e.target.classList.contains("search-icon");
  let searchBar = !e.target.classList.contains("search-bar");
  if (e.target !== burgerIcon && searchIcon && searchBar) {
    burgerIcon.classList.remove("opened");
  }
});

/* ========== Add active class to the Current Section =========== */
const sections = document.querySelectorAll(".linked-sec");

window.addEventListener("scroll", getActiveWhenArrive);

function getActiveWhenArrive() {
  const navLinks = document.querySelectorAll(".page-header nav a");
  const scrollPosition = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;

    if (scrollPosition >= sectionTop) {
      const sectionName = section.getAttribute("id");

      const targetLink = document.querySelector(
        `.page-header nav a[href='#${sectionName}']`
      );

      removeActives();
      targetLink.classList.add("active");
    } else if (scrollPosition < 50) {
      removeActives();
    }
  });

  function removeActives() {
    navLinks.forEach(function (link) {
      link.classList.remove("active");
    });
  }
}

/* ========== Scroll To Top Button =========== */
let scrollToTopBtn = document.querySelector(".scroll-to-top");

window.addEventListener("scroll", showHideScrollToTop);

function showHideScrollToTop() {
  if (this.scrollY > document.documentElement.clientHeight) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
}

scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo(0, 0);
}

/* ========== User Form =========== */

let profileIcon = document.getElementById("profileIcon");

profileIcon.addEventListener("click", memeberPopup);

function memeberPopup() {
  // Appear pop up
  let signPopup = document.querySelector(".be-a-member");
  signPopup.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
  scrollToTop();

  // Switch between Login & Sign up
  let switchBetweenBtns = document.querySelectorAll(".switch-between");
  switchBetweenBtns.forEach((btn) =>
    btn.addEventListener("click", loginToSignup)
  );

  function loginToSignup() {
    let flippingCard = document.querySelectorAll(".card-face");
    flippingCard.forEach((card) => {
      card.classList.toggle("active");
    });
  }

  // Close Memeber Popup
  let closeBtns = signPopup.querySelectorAll(".close-icon");
  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      signPopup.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    });
  });
}

/* ========== Search =========== */

let searchIcon = document.getElementById("searchIcon");
let searchBar = document.getElementById("searchBar");

searchIcon.addEventListener("click", showSearchBar);

function showSearchBar() {
  searchBar.classList.toggle("hidden");
}

searchBar.addEventListener("input", () => {
  if (searchBar.value) {
    let searchBarValue =
      searchBar.value[0].toUpperCase() + searchBar.value.slice(1);
    searchResults(searchBarValue);
    scrollToTop();
    document.body.classList.add("overflow-hidden");
  } else {
    deleteResults();
    document.body.classList.remove("overflow-hidden");
  }
});

function searchResults(searchBarValue) {
  // Remove Previous Results
  deleteResults();

  // Collect New Results
  function getSearchResults() {
    let allProducts = document.querySelectorAll(".produtcs-container .box");

    return Array.from(allProducts)
      .map((product) => {
        return product.querySelector(".product-name");
      })
      .filter((productTitle) => {
        let productName = productTitle.innerHTML;
        // All results that contain the search query
        return productName.indexOf(searchBarValue) !== -1;
      })
      .map((productTitles) => productTitles.parentElement.parentElement);
  }

  let filteredResults = getSearchResults();

  // [2] DOM Part
  function createResult() {
    let results = document.createElement("div");
    results.classList.add("search-results", "container");

    let resultsLengthElement = document.createElement("h3");
    resultsLengthElement.innerHTML = `Search Results (${filteredResults.length})`;

    let resultsContainer = document.createElement("div");
    resultsContainer.classList.add("results-container");

    filteredResults.forEach((result) => {
      let clonedResult = result.cloneNode(true);
      resultsContainer.append(clonedResult);
    });

    results.append(resultsLengthElement);
    results.append(resultsContainer);

    document.querySelector(".page-header").after(results);
  }

  createResult();
}

function deleteResults() {
  let resultsContainer = document.querySelector(".search-results");
  if (resultsContainer) {
    resultsContainer.remove();
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
