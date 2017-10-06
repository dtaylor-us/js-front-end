//CONSTRUCTORS =============================================
function Movie(record) {
    this.movieID = record.movieID;
    this.title = record.title;
    this.releaseDate = record.releaseDate;
}

Movie.instances = {};

//CRUD OPERATIONS =============================================
Movie.add = function (model) {
    var movie = new Movie(model);
    Movie.instances[model.movieID] = movie
    console.log('Movie: ' + model.isbn + " - " + model.title + " added!")
}

Movie.update = function (model) {
    var movie = Movie.instances[model.movieID],
        date = model.releaseDate;
    if (movie.title !== model.title) book.title = slots.title;
    if (movie.releaseDate !== model.releaseDate) book.releaseDate = slots.releaseDate;
    console.log('Movie: ' + model.title + 'has been updated.')
}

//create function expression Movie.destroy pass in movieID
Movie.destroy = function (movieID) {
    //if the movieID is in instances delete the book instance by movieID
    if (Movie.instances[movieID]) {
        console.log("Movie " + movieID + " deleted.")
        delete Movie.instances[movieID];
    } else {
        //else log there is no record with that movieID
        console.log("There is no record with movieID: " + movieID + " in the storage list");
    }
};

//create function expression Movie.saveAll
Movie.saveAll = function () {
    //initialize variables for booksString, errorInd, numbrofbooks = bookinstances.length
    var movieString = "",
        errorInd = false,
        numbrofmovies = Object.keys(Movie.instances).length;

    try {
        movieString = JSON.stringify(Movie.instances);
        localStorage.setItem("movies", movieString);
    } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
        error = true;
    }
    if (!error) console.log(numbrofmovies + " movies saved.");
}

//create function expression to loadAll
Move.loadAll = function () {
    var key = '',
        keys = [],
        movieString = "",
        movies = {}
    try {
        if (localStorage.getItem('movies')) {
            movieString = localStorage.getItem('movies');
        }
    } catch (e) {
        alert("Error when reading from Local Storage\n" + e);
    }
    if (movieString) {
        movies = JSON.parse(movieString);
        keys = Object.keys(movies);
    }
    keys.forEach(function () {
        movieKey => Movie.instances[movieKey] = Movie.getModelFromObjectRow(movies[movieKey]);
    })
}

//HELPERS =============================================
Movie.getModelFromObjectRow = function (movieRow) {
    var movie = new Movie(movieRow);
    return movie;
};

//HELPERS =============================================
Movie.createTestData = function () {
  Movie.instances["1"] = new Movie(
      {movieID:"1", title:"Lord of the Rings: The Fellowship...", releaseDate:2000});
  Movie.instances["2"] = new Movie(
      {movieID:"2", title:"The Matrix", releaseDate:1999});
  Movie.instances["3"] = new Movie(
      {movieID:"3", title:"Looper", releaseDate:2008});
  Movie.saveAll();
};

Movie.clearData = function () {
  if (confirm("Do you really want to delete all movie data?")) {
    localStorage["movies"] = "{}";
  }
};