const recipeList = document.querySelector('ul');
const submitButton = document.getElementById('submit-button');
const cancelButton = document.getElementById('cancel-button');
const getRecipesButton = document.getElementById('get-recipes-button');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('closeModal');
const applyFiltersButton = document.getElementById('applyFilters');
const zipCodeInput = document.getElementById('modal-zipcode-input');
//Modal functions added by Stephen
function showModal() {
    modal.classList.remove('hidden');
}
function closeModal() {
    modal.classList.add('hidden');
}
window.addEventListener('load', () => {
    showModal();
});
closeModalButton.addEventListener('click', () => {
    closeModal();
});
applyFiltersButton.addEventListener('click', function(event) {
  event.preventDefault();
  const zipCode = zipCodeInput.value.trim();
  if (zipCode !== '') {
    requestWeatherModal(event);
    requestRecipes();
    closeModal();
  } else {
    alert('Please enter a valid zip code.');
  }
});
//Function to retrieve weather data from weatherbit API and use it to populate the weather dashboard
function requestWeather(event) {
  event.preventDefault();
  const zipcode = document.getElementById('zipcode-input').value;
  let weatherbitApi = `https://api.weatherbit.io/v2.0/current?&postal_code=${zipcode}&key=0ebe550f05ea43fc8fa4244dfa62a832&units=I`;
  fetch(weatherbitApi)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('There was a problem fetching the weather data');
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Retrieve weather data
      const weatherData = data.data[0];
      // Update city name
      document.getElementById('city-name').textContent = weatherData.city_name + ',' + weatherData.state_code;
      // Update temperature
      const temperature = weatherData.temp;
      document.getElementById('temperature-info').textContent = temperature + '˚F';
      // Update date
      document.getElementById('date-info').textContent = weatherData.datetime + 'pm';
      // save weather data to local storage
      localStorage.setItem('weatherData', JSON.stringify(weatherData));
      // Now that 'temperature' holds the temperature value, call requestRecipes function with temperature
      requestRecipes(temperature);
    })
    .catch(function(error) {
      console.error('Error fetching weather data:', error);
    });
}
//Duplicated weather function for Stephen's Modal
function requestWeatherModal(event) {
  event.preventDefault();
  const zipcode = document.getElementById('modal-zipcode-input').value
  let weatherbitApi = `https://api.weatherbit.io/v2.0/current?&postal_code=${zipcode}&key=0ebe550f05ea43fc8fa4244dfa62a832&units=I`;
  fetch(weatherbitApi)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('There was a problem fetching the weather data');
      }
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        //retrieve weather data
        const weatherData = data.data[0];
        //update city name
        document.getElementById('city-name').textContent = weatherData.city_name + ', ' + weatherData.state_code;
        //update temperature
        document.getElementById('temperature-info').textContent = weatherData.temp + '˚F';
        //update date
        document.getElementById('date-info').textContent = weatherData.datetime + 'pm';
    });
}
//Created a function to retreive data from the spoonacular API and console log it to test functionallity
//I also added an if/else statement to tie the weather data into the returned recipes
function requestRecipes(temperature) {
  let query;
  if (temperature >= 70) {
    query = 'salad for summer';
  } else {
    query = 'winter';
  }
  const spoonacularAPI = `https://api.spoonacular.com/recipes/complexSearch?apiKey=261372e812154de3aa5e2cfa8938aaa2&number=6&query=${query}`;
  fetch(spoonacularAPI)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('There was a problem fetching the recipe data');
      }
      return response.json();
    })
    .then(function (data) {
      displayRecipes(data);
      // Processing of recipe data functionality will be added by Juan
    localStorage.setItem('recipesData', JSON.stringify(data));
    })
    .catch(function(error) {
      console.error('Error fetching recipes:', error);
    });
}
//Juan's Function
function displayRecipes(data) {
  const resultsDiv1 = document.getElementById('results1');
  const resultsDiv2 = document.getElementById('results2');
  resultsDiv1.innerHTML = ''; // Clear previous results
  resultsDiv2.innerHTML = ''; // Clear previous results
  // Split the recipe data into two arrays, each containing 3 recipes
  const recipes1 = data.results.slice(0, 3);
  const recipes2 = data.results.slice(3, 6);
  // Function to create recipe elements
  function createRecipeElements(recipes, resultsDiv) {
      recipes.forEach(recipe => {
          // Grab specific information from each recipe object
          const recipeName = recipe.title;
          const recipeImageURL = recipe.image;
          // Create elements for each recipe
          const recipeDiv = document.createElement('div');
          const anchor = document.createElement('a');
          recipeDiv.classList.add('recipe');
          // Create elements to display the recipe information
          const title = document.createElement('h3');
          title.textContent = recipeName;
          const image = document.createElement('img');
          image.src = recipeImageURL;
          image.alt = recipeName;
          // Append elements to the recipeDiv
          recipeDiv.appendChild(title);
          // append image to anchor
          anchor.appendChild(image)
          recipeDiv.appendChild(anchor)
          anchor.setAttribute('href', '#')
          // Append recipeDiv to the resultsDiv
          resultsDiv.appendChild(recipeDiv);
      });
  }
  // Display recipes in resultsDiv1
  createRecipeElements(recipes1, resultsDiv1);
  // Display recipes in resultsDiv2
  createRecipeElements(recipes2, resultsDiv2);
}

submitButton.addEventListener('click', requestWeather);
getRecipesButton.addEventListener('click', requestRecipes);
