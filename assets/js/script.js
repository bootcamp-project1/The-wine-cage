//created fetch request that works based on query search
//will use vote-average to compare to wine 

fetch("https://api.themoviedb.org/3/search/movie?api_key=9e2d992d8fb0f9588f0d380dff3225e8&query=Saw")
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

var searchInput = document.getElementById("searchMovie");
var searchButton = document.getElementById("searchMovieBtn");

var captureSearch = function(){
	console.log(searchInput.value)
		
}
searchButton.addEventListener("click", captureSearch)



fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=a9af3d76ab984d298de29d4837c5c9d1')
.then(response => response.json())
.then(data => console.log(data))
.catch(err => console.error(err));