//variable for input
const searchInput = document.getElementById("searchMovie");
let searchInputVal ;
//variable for button press to search
const searchButton = document.getElementById("searchBtn");
const searchActor = document.getElementById("searchActor")
//variable for movie poster
const moviePosterHolder = document.getElementById("moviePoster");
const TMDBapiKey = `9e2d992d8fb0f9588f0d380dff3225e8`;
const nicCageID = '2963';
//variable for wine poster & wine select
const wineSelect = document.getElementById('wineSelect');
const wineImage = document.getElementById('wineImage');
//variable for wine image container
const wineImageContainer = document.getElementById('wine')

//saving searches to an array
let searchArray = []

//create a function to show recent searches
const showRecentSearch = function(){
	var recentSearchHolder = document.getElementById("recentSearchHolder");
	recentSearchHolder.innerHTML = "Recent Searches";
	for( let i = 0; i < searchArray.length; i ++){
		var showSearch = document.createElement("li");
		showSearch.innerHTML = searchArray[i];
		recentSearchHolder.appendChild(showSearch)
	}
}

//saving user search to local storage
const saveToLocalStorage = function(){
	// find the value to be appended to the searchArray
	searchInputVal = searchInput.value;
	// make sure the search array isnt full
	if (searchArray.length < 5){
		// append it to the searchArray
		searchArray.push(searchInputVal);
		// update localStorage
		localStorage.setItem("searches", JSON.stringify(searchArray));
	} else if (searchArray.length >= 5) {
		// append it to the searchArray, so length = 6
		searchArray.push(searchInputVal);
		// take off the first element in the array
		searchArray.shift();
		// update localStorage
		localStorage.setItem("searches", JSON.stringify(searchArray));
	}
	showRecentSearch();
}

//accessing local storage
const accessLocalStorage = function(){
	let recentSearches = JSON.parse(localStorage.getItem("searches"));
	// make sure to check if this value is null before overwriting the searchArray
	if (recentSearches !== null || recentSearches !== undefined) {
		searchArray = recentSearches;
	} else {
		// if it is null or undefined then localStorage was empty, so we set it
		localStorage.setItem("searches", JSON.stringify(searchArray));
	}
	console.log(searchArray)
	showRecentSearch();
}
accessLocalStorage()





// fetch from TMDB with a search term
const searchMovieDatabase = function(){
    searchInputVal = searchInput.value;
    //get movie genre value when the search button is clicked
    let movieGenre = document.getElementById("movieGenre").value;
    // get movie rating when search button is clicked
    let movieRating = document.getElementById("movieRating").value;
	//letiable for the movie database API
	let movieApi = `https://api.themoviedb.org/3/search/movie?api_key=${TMDBapiKey}&query=${searchInputVal}`;
	fetch(movieApi)
		.then((response) => response.json())
		.then((data) => {
			// an array to hold list of movies
			let movies = data.results;
			// sort the list from most to least
			movies = ratingChecker(movies, movieRating);
			// render the movie poster image according to the option selected
			let moviePosterUrl = `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
			moviePosterHolder.innerHTML = `<img src= '${moviePosterUrl}' />`;
			moviePosterHolder.style.width = '500px';
			saveToLocalStorage();
		})
		//if user types in something that doesn't work, nic cage em
		.catch(err => {
			nicolasCager();
		}
)}



// grab the wine recommendation based on select menu
const getWinePairing = function() {
    let wineSelectNumber = Math.floor(Math.random() * 5);
     let wineRatingNumber = document.getElementById('movieRating');
     let wineScale = wineRatingNumber.value
   // fetch spoonacular api wine specific
     fetch('https://api.spoonacular.com/food/wine/recommendation?apiKey=a9af3d76ab984d298de29d4837c5c9d1&wine=' + wineSelect.value + '&number=5')
     .then(response => response.json())
     .then((data) => {
     //get recommended wine URL
         let wineRec = data.recommendedWines[wineSelectNumber].imageUrl
         wineImage.src = wineRec
         //get recommende wine title
         let wineName = data.recommendedWines[wineSelectNumber].title;
         //create element to hold title
         const wineNameHolder = document.getElementById('wineTitle');
         wineNameHolder.textContent = wineName;
         wineImageContainer.appendChild(wineNameHolder);
		 	wineImage.innerHTML = `<img src= '${wineImage.src}' />`;
			wineImage.style.width = '500px';
     })
     .catch(err => console.error(err));
}


// some variables for the TMDB search by actor ID, returns list of nic cage films

// TMDB api fetch here, searches by actor ID number

const nicolasCager = () => {
	let movieRating = document.getElementById("movieRating").value;
	fetch(`https://api.themoviedb.org/3/person/${nicCageID}/movie_credits?api_key=${TMDBapiKey}`)
		.then((response) => response.json())
		.then((data) => {
			let movies = data.cast;
			movies = ratingChecker(movies, movieRating);
			moviePosterUrl = "https://image.tmdb.org/t/p/w500" + data.cast[Math.floor(Math.random()*data.cast.length)].poster_path;
			moviePosterHolder.innerHTML = `<img src= '${moviePosterUrl}' />`;
			moviePosterHolder.style.width = '500px';
		})
		.catch(err => {
			console.error(err);
		});
}

const ratingChecker = (movies, score) => {
	movies.sort((a, b) => b.vote_average - a.vote_average);
	// go through the list, removing movies over the selected vote_average option
	movies.forEach((movie, index) => {
		// compare vote_average to score picked
		if (movie.vote_average > score) {
			// remove the first element from the array
			movies.shift();
		} else if (movie.vote_average === 0) {
			// make sure there is a rating for the movie
			movies.shift();
		} else if (movie.vote_count < 3) {
			// make sure there are at least a few votes
			movies.splice(index, 1);
		}
	})
	console.log(movies)
	return movies;
}

const buttonHandler = (e) => {
	e.preventDefault();
	// if search for actor input is empty, search by the search terms
	if (searchActor.value === '') {
		searchMovieDatabase();
	} else { // if someone tries searching for an actor, nic cage em
		nicolasCager();
	}

}

searchButton.addEventListener("click", buttonHandler);
searchButton.addEventListener("click", getWinePairing)