let allProducts = document.querySelectorAll(".reco .box");

// [1] Selectors
let slidesContainer = document.querySelector(".reco .boxes-container");

let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("previous");
let currentSlide = 0;

let filterButtons = document.querySelectorAll(".filter-btns button");

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    currentSlide = 0;
    filterButtons.forEach((button) => {
      button.classList.remove("active");
    });
    button.classList.add("active");

    disappearElements(this.innerHTML);
    filterProducts();

    previousBtn.classList.remove("disabled");
    nextBtn.classList.remove("disabled");
  });
});

function filterProducts() {
  let allProducts = document.querySelectorAll(".reco .box");
  let activeButton = document.querySelector(".reco .filter-btns .active");

  // console.log(activeButton.innerHTML);

  // let filteredProducts = allProducts;
  // console.log(filteredProducts)

  let filteredProducts = Array.from(allProducts).filter((product) => {
    // console.log(product.getAttribute("data-cat"));
    // console.log(activeButton.innerHTML);
    return (
      activeButton.innerHTML === product.getAttribute("data-cat") ||
      activeButton.innerHTML === "all"
    );
  });

  return filteredProducts;
}

function disappearElements(category) {
  let allProducts = document.querySelectorAll(".reco .box");
  // console.log(allProducts)
  for (let i = 0; i < allProducts.length; i++) {
    for (let j = 0; j < allProducts.length; j++) {
      allProducts[i].classList.remove(`box-${j}`);
    }
    if (
      allProducts[i].getAttribute("data-cat") === category ||
      category === "all"
    ) {
      allProducts[i].classList.remove("hidden");
    } else {
      allProducts[i].classList.add("hidden");
    }
  }
  let allAppearElements = Array.from(allProducts).filter((product) => {
    return !product.classList.contains("hidden");
  });
  for (let i = 0; i < allAppearElements.length; i++) {
    allAppearElements[i].classList.add(`box-${i}`);
  }
}

// [2] Events
nextBtn.addEventListener("click", () => {
  let slides = filterProducts();

  // Change max elements to display at the end.
  let max = slides.length - 1;
  if (window.innerWidth > 768) {
    max = slides.length - 2;
  }
  if (window.innerWidth > 992) {
    max = slides.length - 3;
  }

  if (currentSlide < max) {
    slides[currentSlide].classList.add("hidden");
    currentSlide++;
    previousBtn.classList.remove("disabled");
  } else {
    nextBtn.classList.add("disabled");
  }
  updateBoxClass();
});

previousBtn.addEventListener("click", () => {
  let slides = filterProducts();
  if (currentSlide > 0) {
    currentSlide--;
    slides[currentSlide].classList.remove(`hidden`);
    updateBoxClass();
    nextBtn.classList.remove("disabled");
  } else {
    previousBtn.classList.add("disabled");
  }
});

function updateBoxClass() {
  let slides = filterProducts();
  for (let i = 0; i < slides.length; i++) {
    for (let j = 0; j < slides.length; j++) {
      // Remove All box-num classes from ALL elements
      slides[i].classList.remove(`box-${j}`);
    }
    // Add box-num class to the active box.
    if (i - currentSlide >= 0) {
      slides[i].classList.add(`box-${i - currentSlide}`);
    }
  }
}
