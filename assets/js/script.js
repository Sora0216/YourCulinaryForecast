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
        document.getElementById('city-name').textContent = weatherData.city_name + ',' + weatherData.state_code;
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

  const spoonacularAPI = `https://api.spoonacular.com/recipes/complexSearch?apiKey=99232366887c49358403ec00d7bef302&number=6&query=${query}`;
    
  fetch(spoonacularAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Processing of recipe data functionality will be added by Juan
    })
    .catch(function(error) {
      console.error('Error fetching recipes:', error);
    });
}

//When a zip-code is entered and the apply button in the modal or the submit button above the weather 
// cont. from above... dashboard are clicked, the weather updates in the dashboard and both the weather 
// and the weather appropriate recipes log in the console.
submitButton.addEventListener('click', requestWeather);
getRecipesButton.addEventListener('click', requestRecipes);