
//variable for input
const searchInput = document.getElementById("searchMovie");
const searchInputVal = searchInput.value;
//variable for button press to search
const searchButton = document.getElementById("searchMovieBtn");
//variable for movie poster
const moviePosterHolder = document.getElementById("moviePoster");
const TMDBapiKey = `9e2d992d8fb0f9588f0d380dff3225e8`;
const nicCageID = '2963';

// fetch from TMDB with a search term
const searchMovieDatabase = function(){
	let searchInputVal = searchInput.value;
    //get movie genre value when the search button is clicked
    let movieGenre = document.getElementById("movieGenre").value;
    // get movie rating when search button is clicked
    let moviePopularity = document.getElementById("movieRating").value;
    console.log(moviePopularity);
	//letiable for the movie database API
	let movieApi = `https://api.themoviedb.org/3/search/movie?api_key=${TMDBapiKey}&query=${searchInputVal}`;
	fetch(movieApi)
		.then((response) => response.json())
		.then((data) => {
			// an empty array to hold list of ratings
			let ratings = [];
			// append values to the list
			data.results.forEach((hot, index) => {
				ratings.push(parseInt(`${data.results[index].popularity})`))
			})
			// go through the list, removing values over the selected option
			ratings.forEach((rating, index) => {
				if (rating > moviePopularity) {
					ratings.shift();
				}
			})
			// make a list of movie options, use ratings.length to shorten the list up
			let movies = data.results;
			console.log(movies);

			// sort the list from most to least
			ratings.sort((a, b) => b - a);
			console.log(ratings);

			
			// render the movie poster image according to the option selected
			let moviePosterUrl = `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
			moviePosterHolder.innerHTML = `<img src= '${moviePosterUrl}' />`;
			moviePosterHolder.style.width = '200px';
		})
}

searchButton.addEventListener("click", searchMovieDatabase)

// // grab the recipe responses from  spoonacular
// fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=a9af3d76ab984d298de29d4837c5c9d1')
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(err => console.error(err));

// some variables for the TMDB search by actor ID, returns list of nic cage films

// TMDB api fetch here, searches by actor ID number
const nicolasCager = (actor) => {
	fetch(`https://api.themoviedb.org/3/person/${nicCageID}/movie_credits?api_key=${TMDBapiKey}`)
		.then((response) => response.json())
		.then((TMDBresponse) => {
			console.log(TMDBresponse);
		})
		.catch(err => {
			console.error(err);
		});
}