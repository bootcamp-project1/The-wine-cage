//created fetch request that works based on query search
//will use vote-average to compare to wine 

//fetch("https://api.themoviedb.org/3/search/movie?api_key=9e2d992d8fb0f9588f0d380dff3225e8&query=Saw")
//.then(response => {
//	console.log(response);
//})
//.catch(err => {
//	console.error(err);
//});
//variable for input
var searchInput = document.getElementById("searchMovie");
var searchInputVal = searchInput.value;

//variable for select menus
// var genreSelect = 


//variable for button press to search
var searchButton = document.getElementById("searchMovieBtn");

// fetch from TMDB with a search term
var searchMovieDatabase = function(){
	var searchInputVal = searchInput.value;
    //get movie genre value when the search button is clicked
    var movieGenre = document.getElementById("movieGenre").value;
    console.log(movieGenre);
    // get movie rating when search button is clicked
    var movieRating = document.getElementById("movieRating").value
    console.log(movieRating)
	fetch('https://api.themoviedb.org/3/search/movie?api_key=9e2d992d8fb0f9588f0d380dff3225e8&query=' + searchInputVal)
	.then(response => {
		console.log(response);
	})
	.catch(err => {
		console.error(err);
	});

}

var captureSearch = function(){
	console.log(searchInput.value)	
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