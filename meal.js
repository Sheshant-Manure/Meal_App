// meal.html receives the mealData object fetched by the API via GET request params
const urlString = window.location.href; // So it gets encrypted in the meal.html url as a string which can be accessed like this
const url = new URL(urlString); // Converting the string to url
const mealDataParam = url.searchParams.get("mealData"); // From the url, gettting the mealData object (encrypted)
const decodedMealData = decodeURIComponent(mealDataParam); // Decoding the mealData object
const mealObject = JSON.parse(decodedMealData); // Final step is JSON parsing the mealData Object, so that we can read it

let i = 1;
console.log(mealObject);
document.querySelector('h1.center').innerHTML = mealObject.strMeal;  

// Meal origin
document.querySelector('#meal-origin').innerHTML = 'Origin: ' + mealObject.strArea;

// Meal Thumbnail image
document.querySelector('#meal-thumbnail').setAttribute('src', mealObject.strMealThumb);

// Youtube link
document.querySelector('#youtube').setAttribute('src', './images/youtube.png');
document.querySelector('#youtube-link').setAttribute('href', mealObject.strYoutube);

// Vegetarian or non-vegetarian
let category = document.querySelector('#category');
if(mealObject.strCategory === "Vegetarian")
{
    category.setAttribute('src', './images/vegetarian-symbol.png'); 
}
else
{
    category.setAttribute('src', './images/non-vegetarian-symbol.png'); 
}

// Listing the ingredients required to prepare the meal
// the mealObject has 20 ingredient keys strIngredient1, strIngredient2, ..., strIngredient20
const olElement = document.getElementById(`ingredients`);
for (let i = 1; i <= 20; ++i) {
    if (mealObject[`strIngredient${i}`] !== "") {
        let liElement = document.createElement("li");

        if (!isNaN(mealObject[`strIngredient${i}`])) {
            liElement.innerText += `${+mealObject[`strIngredient${i}`]}`;
        } else {
            liElement.innerText += `${mealObject[`strIngredient${i}`]}`;
        }

        if (mealObject[`strMeasure${i}`] !== "") {
            liElement.innerText += ` - ${mealObject[`strMeasure${i}`]}`;
        }

        olElement.appendChild(liElement);
    }
}

// Preparing and displaying the instructions for preparing this meal
document.querySelector('#instructions').innerHTML = mealObject.strInstructions;

// Add meal to favourites in browser local storage
document.querySelector('#addToFavourites').addEventListener('click', () => {
    // Check if localStorage is available in the browser
    if (typeof(Storage) !== "undefined") {
        // Get existing favorites from local storage or initialize an empty array
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Check if the meal is already in favorites
        if (!favorites.some(favMeal => favMeal.strMeal === mealObject.strMeal)) {
            // Add the meal to favorites
            favorites.push(mealObject);

            // Update the local storage with the updated favorites array
            localStorage.setItem('favorites', JSON.stringify(favorites));

            // Display a confirmation message or update UI indicating success
            alert(`${mealObject.strMeal} added to favorites!`);
        } else {
            alert(`${mealObject.strMeal} is already in your favorites!`);
        }
    } else {
        alert("Local storage is not available in this browser.");
    }
});
