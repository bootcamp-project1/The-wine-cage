// Write a fetch request 
// console.log(fetch("https://rapidapi.com/edamam/api/edamam-food-and-grocery-database")) 
//     .then(response => response.json())
//         if (response.ok)
//     .then(data => console.log(data))
//     .catch(erro => console.log("error"))


//created fetch request that works based on query search
//will use vote-average to compare to wine 

fetch("https://api.themoviedb.org/3/search/movie?api_key=9e2d992d8fb0f9588f0d380dff3225e8&query=Tommy+Boy")
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