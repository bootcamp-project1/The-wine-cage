
<<<<<<< HEAD
//variable for movie name input
const searchInput = document.getElementById("searchMovie");
const searchInputVal = searchInput.value;
//variable for actor/actress search
const searchCage = document.getElementById("searchActor")
const searchCageVal = searchCage.value;
//variable for button press to search
const searchMovieBtn = document.getElementById("searchMovieBtn");
const searchActorBtn = document.getElementById("searchActorBtn")
=======
//variable for input
const searchInput = document.getElementById("searchMovie");
const searchInputVal = searchInput.value;
//variable for button press to search
const searchButton = document.getElementById("searchMovieBtn");
>>>>>>> 4ab335a751b0d1c00fd6742b9e303d9eb70d0269
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
    let movieRating = document.getElementById("movieRating").value;
    console.log(movieRating);
	//letiable for the movie database API
	let movieApi = `https://api.themoviedb.org/3/search/movie?api_key=${TMDBapiKey}&query=${searchInputVal}`;
	fetch(movieApi)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			// turn the data into an array
			let movieArray = Object.values(data);
			movieArray = movieArray[1];
			let idList = [];
			let movieIds = movieArray.forEach((movie, index) => idList.push(movieArray[index].id));
			// grab the movie ID of each movie in the list
			console.log(idList);
			// render the movie poster image
			let moviePosterUrl = `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
			moviePosterHolder.innerHTML = `<img src= '${moviePosterUrl}' />`;
			moviePosterHolder.style.width = '200px';
		})
}

searchMovieBtn.addEventListener("click", searchMovieDatabase)

// // grab the recipe responses from  spoonacular
// fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=a9af3d76ab984d298de29d4837c5c9d1')
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(err => console.error(err));

// some variables for the TMDB search by actor ID, returns list of nic cage films

// TMDB api fetch here, searches by actor ID number
<<<<<<< HEAD

const nicolasCager = (actor) => {
	fetch(`https://api.themoviedb.org/3/person/${nicCageID}/movie_credits?api_key=${TMDBapiKey}`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			
			moviePosterUrl = "https://image.tmdb.org/t/p/w500" + data.cast[Math.floor(Math.random()*data.cast.length)].poster_path;
			console.log(data.cast.length)
			moviePosterHolder.innerHTML = `<img src= '${moviePosterUrl}' />`;
			moviePosterHolder.style.width = '200px';
=======
const nicolasCager = (actor) => {
	fetch(`https://api.themoviedb.org/3/person/${nicCageID}/movie_credits?api_key=${TMDBapiKey}`)
		.then((response) => response.json())
		.then((TMDBresponse) => {
			console.log(TMDBresponse);
>>>>>>> 4ab335a751b0d1c00fd6742b9e303d9eb70d0269
		})
		.catch(err => {
			console.error(err);
		});
<<<<<<< HEAD
}

searchActorBtn.addEventListener("click", nicolasCager)

=======
}
>>>>>>> 4ab335a751b0d1c00fd6742b9e303d9eb70d0269
