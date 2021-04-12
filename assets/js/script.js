//variable for input
const searchInput = document.getElementById("searchMovie");
const searchInputVal = searchInput.value;
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


// fetch from TMDB with a search term
const searchMovieDatabase = function(){
	let searchInputVal = searchInput.value;
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
		})
}


// grab the wine recommendation based on select menu
const getWinePairing = function() {
    let wineSelectNumber = Math.floor(Math.random() * 6);
        //console.log(wineSelectNumber);
    
    let wineRatingNumber = document.getElementById('movieRating');
    let wineScale = (wineRatingNumber.value - 1) / 10;
    
    console.log(wineScale)
    // fetch spoonacular api wine specific
    fetch('https://api.spoonacular.com/food/wine/recommendation?apiKey=a9af3d76ab984d298de29d4837c5c9d1&wine=' + wineSelect.value + '&number=7&minRating=' + wineScale )
    .then(response => response.json())
    .then((data) => {
        console.log(data)
        
        //get recommended wine URL
        let wineRec = data.recommendedWines[wineSelectNumber].imageUrl
        wineImage.src = wineRec
        //get recommende wine title  rating
        let wineName = data.recommendedWines[wineSelectNumber].title;
        let wineScore = data.recommendedWines[wineSelectNumber].score;
        //rounding to nearest 100th
        let wineScoreRounded = Math.round(100 *wineScore)/100;
        //create element to hold title & wine rating
        const wineNameHolder = document.getElementById('wineTitle');
        const wineScoreHolder = document.getElementById('wineScoreDisplay');
        const wineScoreScale = document.getElementById('wineScore')
        //Setting title to h3
        wineNameHolder.textContent = wineName;
        //setting wine rating to p
        wineScoreHolder.textContent = "Wine Score:" + wineScoreRounded;
        wineScoreScale.textContent = "(0.00 -1.00)";
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