import Swiper from "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs";

const swiper = new Swiper(".swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
  },

  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});

window.addEventListener("load", () => {
  getDataFromAPI();
});

// Save data from API in:
let allProducts;

function saveData(data) {
  allProducts = data;
}

async function getDataFromAPI() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "88f8a6e729mshcb42b60a388d603p135322jsn114c17f6cea1",
      "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    },
  };
  const dataFromAPI = await fetch(
    "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30&categories=men_newarrivals_clothes&categories=ladies_newarrivals_clothes&categories=kids_newbornbaby_viewall&sortBy=newProduct",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      saveData(data.results);
      createFilterButtons(data.results);
      createProductBox(data.results);
    });
}

function createFilterButtons(products) {
  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.categoryName)),
  ];

  const sectionTitle = document.querySelector(
    ".reco .container .special-heading"
  );

  const filterButtons = document.createElement("div");
  filterButtons.className = "filter-btns";

  allCategories.map((category) => {
    const mainBtn = document.createElement("button");
    mainBtn.classList.add("cat-filter", "btn");
    mainBtn.innerHTML = category;

    filterButtons.append(mainBtn);
  });

  // when page loads -> Add active to category => "All"
  filterButtons.children[0].classList.add("active");

  sectionTitle.after(filterButtons);

  switchActiveCategory(filterButtons);
}

function switchActiveCategory(filterButtons) {
  Array.from(filterButtons.children).forEach((button) => {
    button.addEventListener("click", function () {
      Array.from(filterButtons.children).forEach((button) => {
        // Remove .active from all lis
        button.classList.remove("active");
      });

      // Add .active ONLY for Click one.
      button.classList.add("active");

      // Remove all current slides
      swiper.removeAllSlides();

      // Add ONLY the filtered slides.
      createProductBox(allProducts);

    });
  });
}

function createProductBox(products) {
  const activeCategory = document.querySelector(
    ".reco .filter-btns .active"
  ).innerHTML;

  const productsWrapper = document.getElementById("swiperWrapper");

  products.map((product) => {
    if (product.categoryName === activeCategory || activeCategory === "All") {
      let productDiv = document.createElement("div");
      productDiv.className = "swiper-slide";
      productDiv.classList.add("box", "swiper-slide");
      productDiv.setAttribute("data-cat", product.categoryName);

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

      productsWrapper.append(productDiv);
    }
  });
}
