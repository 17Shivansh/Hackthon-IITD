// hamburger-menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-nav");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("-translate-x-full");
});

// hamburger-menu ends here

//  search starts here
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealContainer = document.getElementById("mealContainer");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// get meal list that matches with the ingredients

// Fetch data from the API
function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        meal.innerHTML=
        `<h2 class = "title text-center font-bold">Your Search Results :</h2>`
        data.meals.forEach((meal) => {
          html += `
          
          // <div class="swiper-slide"> <!-- Add this class to each card -->
            <div class="meal-item rounded-lg card max-w-[75px] overflow-hidden shadow-lg cursor-pointer my-4 p-2 flex flex-col items-center justify-center h-75" data-id="${meal.idMeal}">
              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="food" class="w-full h-32 sm:h-48 rounded-lg object-cover">
              </div>
              <div class="meal-name font-semibold">
                <h3 class="py-2 text-center text-wrap">${meal.strMeal}</h3>
                <a href="#" class="recipe-btn bg-pink-600 text-white rounded-lg px-4 py-1 mt-5 font-bold mx-auto">View Recipe</a>
              </div>
            </div>
          </div>
`;      
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add("notFound");
      }

      mealList.innerHTML = html;

      // Initialize Swiper after adding cards
      new Swiper('.swiper-container', {
        // Optional Swiper options
        slidesPerView: 'auto', // Display as many slides as possible within the container
        spaceBetween: 16, // Adjust this value for spacing between slides
      });
    });
}


// get recipe of the meal
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

// create a modal
function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let html = `
       
        <h2 class="recipe-title text-center font-bold text-black">${meal.strMeal}</h2>
        <div class="w-[90%] rounded-lg bg-gray-200 flex justify-between gap-5">
        <div class="ingredients">
        <h2 class="recipe-category">${meal.strCategory}</h2>

        </div>
      
        <div class="meal-img ">
              <img src="${meal.strMealThumb}" alt="food" class="w-full h-32 sm:h-48 rounded-full object-cover">
          </div>
        
        <div class="recipe-instruct text">
        <h3 claass="font-semibold">Instructions:</h3>
        <p>${meal.strInstructions}</p>
  
        </div>
       
      
        </div>
       
    `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}

//  image slider ends here


// recipe of the day card here from start



// recipe of the day card here from end

// Fetch data from the API
