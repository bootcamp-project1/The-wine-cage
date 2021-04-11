
//variable for input
var searchInput = document.getElementById("searchMovie");
var searchInputVal = searchInput.value;
//variable for button press to search
var searchButton = document.getElementById("searchMovieBtn");
//variable for movie poster
moviePosterHolder = document.getElementById("moviePoster")

//variable for select menus
// var genreSelect = 

// fetch from TMDB with a search term
var searchMovieDatabase = function(){
	var searchInputVal = searchInput.value;
    //get movie genre value when the search button is clicked
    var movieGenre = document.getElementById("movieGenre").value;
    console.log(movieGenre);
    // get movie rating when search button is clicked
    var movieRating = document.getElementById("movieRating").value
    console.log(movieRating)
	//variable for the movie database API
	var movieApi = 'https://api.themoviedb.org/3/search/movie?api_key=9e2d992d8fb0f9588f0d380dff3225e8&query=';
	var returnData 
	var response = fetch(movieApi + searchInputVal)
	.then(function(response){
		return response.json()
	})
	.then(function(data){
		console.log(data);
		returnData = data;
		console.log(returnData)
		var moviePoster = "https://image.tmdb.org/t/p/w500" + data.results[0].poster_path;
		moviePosterHolder.innerHTML = `<img src= '${moviePoster}' />`;
		moviePosterHolder.style.width = "200px";
		//console.log(moviePoster)
	})

}

searchButton.addEventListener("click", searchMovieDatabase)

// grab the recipe responses from  spoonacular
fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=a9af3d76ab984d298de29d4837c5c9d1')
.then(response => response.json())
.then(data => console.log(data))
.catch(err => console.error(err));

// some variables for the TMDB search by actor ID, returns list of nic cage films
const TMDBapiKey = `9e2d992d8fb0f9588f0d380dff3225e8`;
const nicCageID = '2963';

// TMDB api fetch here, searches by actor ID number
fetch(`https://api.themoviedb.org/3/person/${nicCageID}/movie_credits?api_key=${TMDBapiKey}`)
.then(response => response.json())
.then(TMDBresponse => console.log(TMDBresponse))
.catch(err => {
	console.error(err);
});

