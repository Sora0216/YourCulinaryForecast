//const currentWeather = document.querySelector('')
const recipeList = document.querySelector('ul');
const submitButton = document.getElementById('submit-button');
const cancelButton = document.getElementById('cancel-button');
const getRecipesButton = document.getElementById('get-recipes-button');


//getApi function is called when the fetchButton is clicked
console.log(submitButton);

function getWeatherApi() {
  // Insert the API url to get a list of your repos
  const requestWeather = 'https://api.weatherbit.io/v2.0/current?&postal_code=78704&key=b8cec87fcad4466891c1e31ddead93d0&units=I';

  fetch(requestWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
    //   //looping over the fetch response and inserting the URL of your repos into a list
    //   for (let i = 0; i < data.length; i++) {
    //     //Create a list element
    //     const listItem = document.createElement('li');

    //     //Set the text of the list element to the JSON response's .html_url property
    //     listItem.textContent = data[i].html_url;

    //     //Append the li element to the id associated with the ul element.
    //     repoList.appendChild(listItem);
    //   }
    });
}

function getRecipeApi() {
    // Insert the API url to get a list of your repos
    const requestRecipes = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=99232366887c49358403ec00d7bef302&number=5';
  
    fetch(requestRecipes)
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

submitButton.addEventListener('click', getWeatherApi);
getRecipesButton.addEventListener('click', getRecipeApi);
const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('closeModal');
    const searchButton = document.getElementById('searchButton');
    const applyFiltersButton = document.getElementById('applyFilters');

    
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

    
    applyFiltersButton.addEventListener('click', () => {
        
        closeModal();
        
    });
