//created fetch request that works based on query search
//will use vote-average to compare to wine 

fetch("https://api.themoviedb.org/3/search/movie?api_key=9e2d992d8fb0f9588f0d380dff3225e8&query=Pacific+Rim")
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});