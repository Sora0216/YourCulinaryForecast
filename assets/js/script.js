const recipeList = document.querySelector('ul');
const submitButton = document.getElementById('submit-button');
const cancelButton = document.getElementById('cancel-button');
const getRecipesButton = document.getElementById('get-recipes-button');


function requestWeather(event) {
  event.preventDefault();
  const zipcode = document.getElementById('zipcode-input').value
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



function requestRecipes() {
    const spoonacularAPI = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=99232366887c49358403ec00d7bef302&number=5';
  
    fetch(spoonacularAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
    //     //looping over the fetch response and inserting the URL of your repos into a list
    //     for (let i = 0; i < data.length; i++) {
    //       //Create a list element
    //       const listItem = document.createElement('li');
  
    //       //Set the text of the list element to the JSON response's .html_url property
    //       listItem.textContent = data[i].html_url;
  
    //       //Append the li element to the id associated with the ul element.
    //       repoList.appendChild(listItem);
    //     }
    //   });
      })
}

submitButton.addEventListener('click', requestWeather);
getRecipesButton.addEventListener('click', requestRecipes);


const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('closeModal');
    const applyFiltersButton = document.getElementById('applyFilters');
    const zipCodeInput = document.getElementById('modal-zipcode-input');
    
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