//created fetch request that works based on query search
//will use vote-average to compare to wine 

//variable for input
var searchInput = document.getElementById("searchMovie");
var searchInputVal = searchInput.value;
//variable for button press to search
var searchButton = document.getElementById("searchMovieBtn");

var searchMovieDatabase = function(){
	var searchInputVal = searchInput.value;
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



