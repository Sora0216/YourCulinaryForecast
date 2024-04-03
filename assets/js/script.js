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
            
        // save weather data to local storage 
        localStorage.setItem('weatherData', JSON.stringify(weatherData));
    })
    .catch(function(error) {
      console.error('Error fetching weather data', error);
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
    const spoonacularAPI = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=99232366887c49358403ec00d7bef302&number=6';
  
    fetch(spoonacularAPI)
      .then(function (response) {
      if (!response.ok) {
        throw new Error('There was a problem fetching the recipe data');
      }
        return response.json();
      })
      .then(function (data) {
        console.log(data);
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
    localStorage.setItem('recipesData', JSON.stringify(data));
    })
    .catch(function(error) {
      console.error('Error fetching weather data', error);
      });
}

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


// Event listener for the "Get Recipes" button
getRecipesButton.addEventListener('click', function() {
    // Retrieve recipes data from localStorage
    const recipesData = JSON.parse(localStorage.getItem('recipesData'));
    if (recipesData) {
        // Call the displayRecipes function with the retrieved data
        displayRecipes(recipesData);
    }
});



submitButton.addEventListener('click', requestWeather);
getRecipesButton.addEventListener('click', requestRecipes);