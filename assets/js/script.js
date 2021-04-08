// var userSearchInput =
// var movieGenre =
// var movieRating =
// var wineType =

console.log(fetch('http://www.omdbapi.com/?i=tt3896198&apikey=2f30e3c&')
.then(response => response.json())
.then(data => console.log(data)));
