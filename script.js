// User input to search the meal
let search = document.querySelector('#searchbox');

// An unordered empty list (We'll populate it with list-items after api responds back)
let result = document.querySelector('#search-result');
let mealData = {};

// Real-time reading the value of meal seach
search.addEventListener('input', async (event) => {
    // Real-time data of the user input
    let meal = search.value;
    result.innerHTML = '';
    const APIreq = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(meal)}`;
    try {
        const response = await fetch(APIreq);

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        mealData = await response.json();
        // console.log(data);
        // Store the response data in a variable for further processing
        const meals = mealData.meals;
        // Display the meal names as suggestions
        if (meals) {
          result.innerHTML = '';
          meals.forEach(meal => {
            const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = meal.strMeal;

    // Construct the URL with the correct query parameter name
    a.href = `/meal.html?mealData=${encodeURIComponent(JSON.stringify(meal))}`;


    li.appendChild(a);
    result.appendChild(li);
          });
        } 
        if (meals.length === 0)
         console.log('no meals found')
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    // Get the element where you want to display the favorites list
const favoritesList = document.getElementById('favoritesList');

// Retrieve favorites from local storage
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Check if there are any favorites
if (favorites.length > 0) {

  // Loop through the favorites and create list items
  favorites.forEach(favMeal => {
    const liElement = document.createElement('li');
    liElement.textContent = favMeal.strMeal;
    favoritesList.appendChild(liElement);
  });
} 
else // When there is no favourite meal or this is your first time visit to the app
{
  favoritesList.textContent = 'No favorite meals yet.';
}
