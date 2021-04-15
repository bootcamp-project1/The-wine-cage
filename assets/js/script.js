//variable for input
const searchForm = document.getElementById(`form-bucket`);
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
// constants to grab modal window info elements
const movieTitle = document.getElementById('movie-title');
const movieDetails = document.getElementById('movie-details');
const movieButton = document.getElementById('movie-button');
const wineTitle = document.getElementById('wine-title');
const wineDetails = document.getElementById('wine-details');
const wineButton = document.getElementById('wine-button');

//saving searches to an array
let searchArray = []

//create a function to show recent searches
const showRecentSearch = function(){
	var recentSearchHolder = document.getElementById("recentSearchHolder");
	recentSearchHolder.innerHTML = "recent searches:";
	// recentSearchHolder.classList.add('', '');
	for( let i = 0; i < searchArray.length; i ++){
		var showSearch = document.createElement("li");
		showSearch.innerHTML = searchArray[i];
		showSearch.classList = 'text-sm text-oreoMid';
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
}

//accessing local storage
const accessLocalStorage = function(){
	let recentSearches = JSON.parse(localStorage.getItem("searches"));
	if (recentSearches !== null && recentSearches !== undefined) {
		searchArray = recentSearches;
	} else {
		localStorage.setItem("searches", JSON.stringify(searchArray));
	}
	showRecentSearch();
}
accessLocalStorage()

// fetch from TMDB with a search term
const searchMovieDatabase = function(){
    searchInputVal = searchInput.value;
	saveToLocalStorage();
	showRecentSearch();
	// make sure there is an ;input, else nic cage em
	if (searchInputVal === undefined || searchInputVal == '' || searchInputVal === null) {
		nicolasCager();
		
		return;
		searchInputVal = "";
	}
    //get movie genre value when the search button is clicked
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
			let moviePosterUrl = `https://image.tmdb.org/t/p/w500${movies[0].poster_path}`;
			moviePosterHolder.innerHTML = `<img src= '${moviePosterUrl}' class='cursor-pointer' onclick="toggleModal('movie-modal')" />`;
			moviePosterHolder.style.width = '500px';
			// grab the movie ID to perform fetch for details
			let movieId = movies[0].id;
			// use the movie ID in another details fetch url
			let movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDBapiKey}&language=en-US`
			fetch(movieDetailsUrl)
				.then((response) => response.json())
				.then((detailsData) => {
					// grab info about the movie here
					let title = detailsData.original_title;
					let description = detailsData.overview;
					let rating = detailsData.vote_average;
					movieTitle.textContent = title;
					movieDetails.textContent = description;
					movieButton.textContent = `movie rating: ${rating}`;
				})
				.catch(err => console.error(err));
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
			wineImage.innerHTML = `<img src= '${wineImage.src}' class='cursor-pointer' onclick="toggleModal('wine-modal')" />`;
			wineImage.style.width = '500px';
			// put info about the wine into the wine modal
			let description = data.recommendedWines[wineSelectNumber].description;
			let rating = Math.round((data.recommendedWines[wineSelectNumber].score) * 100) / 10;
			wineTitle.textContent = wineName;
			wineDetails.textContent = description;
			wineButton.textContent = `wine rating: ${rating}`;
     	})
     	.catch(err => console.error(err));
}


// some variables for the TMDB search by actor ID, returns list of nic cage films

// TMDB api fetch here, searches by actor ID number

const nicolasCager = function() {
	let movieRating = document.getElementById("movieRating").value;
	fetch(`https://api.themoviedb.org/3/person/${nicCageID}/movie_credits?api_key=${TMDBapiKey}`)
		.then((response) => response.json())
		.then((data) => {
			let movies = data.cast;
			movies = ratingChecker(movies, movieRating);
			let movie = movies[Math.floor(Math.random()*movies.length)];
			moviePosterUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
			moviePosterHolder.innerHTML = `<img src= '${moviePosterUrl}' class='cursor-pointer' onclick="toggleModal('movie-modal')" />`;
			moviePosterHolder.style.width = '500px';
			let movieId = movie.id;
			let movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDBapiKey}&language=en-US`;
			fetch(movieDetailsUrl)
				.then((response) => response.json())
				.then((detailsData) => {
					let title = detailsData.original_title;
					let description = detailsData.overview;
					let rating = detailsData.vote_average;
					movieTitle.textContent = title;
					movieDetails.textContent = description;
					movieButton.textContent = `movie rating: ${rating}`;
				})
				.catch(err => console.error(err));
		})
		.catch(err => {
			console.error(err);
		});
}

const ratingChecker = (movies, score) => {
	// sort the movies and filter out by vote_average and vote_count
	const results = movies.sort((a, b) => b.vote_average - a.vote_average)
		.filter(item => (item.vote_average <= parseInt(score)))
		.filter(item => (item.vote_count >= 5));
	return results;
}

const buttonHandler = (e) => {
	e.preventDefault();
	// if search for actor input is empty, search by the search terms
	if (searchActor.value === '') {
		searchMovieDatabase();
		// getWinePairing();
	} else { // if someone tries searching for an actor, nic cage em
		nicolasCager();
		searchActor.value = "";
}
}

function toggleModal(modalID){
    document.getElementById(modalID).classList.toggle("hidden");
}

searchButton.addEventListener("click", buttonHandler);