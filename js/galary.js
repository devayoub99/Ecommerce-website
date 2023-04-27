// [1] Variables
let newSection = document.querySelector(".gallery-section");
let loadMoreBtn = newSection.querySelector(".load-more");

// Breakpoints
let smallScreen = window.innerWidth > 576 && window.innerWidth < 992;
let largeScreen = window.innerWidth >= 992 && window.innerWidth < 1200;
let xLargeScreen = window.innerWidth >= 1200;

let min = 3;
if (smallScreen) {
  min = 4;
} else if (largeScreen) {
  min = 6;
} else if (xLargeScreen) {
  min = 8;
}

// [2] Event Listeners
window.addEventListener("load", () => loadProducts(newSection));

loadMoreBtn.addEventListener("click", () => {
  min += 3;
  if (smallScreen || xLargeScreen) {
    min += 1;
  }
  loadProducts(newSection);
});

// [3] Function
function loadProducts(gallerySection) {
  let targetBoxes = gallerySection.querySelectorAll(".box");

  if (min <= targetBoxes.length) {
    for (let i = 0; i < min; i++) {
      targetBoxes[i].classList.remove("hidden");
    }
  } else {
    loadMoreBtn.classList.add("no-more");
    loadMoreBtn.innerHTML = "No more products!";
  }
}
