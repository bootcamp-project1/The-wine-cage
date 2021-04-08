
fetch("https://api.themoviedb.org/3/review/movie?api_key=9e2d992d8fb0f9588f0d380dff3225e8&query=saw")
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});