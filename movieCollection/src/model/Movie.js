//CONSTRUCTORS =============================================
function Movie(record) {
    // init default values
    this.movieID = "";
    this.title = "";
    this.releaseDate = 0;
    // if object contains properties validate them and set them if valid
    if (this.arguments > 0) {
        this.setMovieID(record.movieID);
        this.setTitle(record.title);
        this.setReleaseDate(record.releaseDate);
    }
}



//CHECK validate the constraints defined for the properties
// check movieID: Mandatory, Unique
Movie.checkMovieID = function (id) {
    var constraintViolation = {};
    if (!id) {
        constraintViolation = new MandatoryValueConstraintViolation(
            "This record cannot be created with out an Identifier.");
    } else if (Movie.instances[id]) {
        constraintViolation = new UniquenessConstraintViolation(
            "A record already exists with this ID");
    } else {
        constraintViolation = NoConstraintViolation();
    }
};

// check title: Mandatory, Length
Movie.checkTitle = function () {

};
// check releaseDate: Range/Interval
Movie.checkReleaseDate = function () {

};

//SETTER invokes the check function and is to be used for setting the value of the property
// set movieID: Mandatory, Unique
Movie.setMovieID = function () {

}
// set title: Mandatory, Length
Movie.setTitle = function () {

}
// set releaseDate: Range/Interval
Movie.setReleaseDate = function () {

}

Movie.instances = {};

//CRUD OPERATIONS =============================================

// perform validation before any data is saved
Movie.add = function (model) {
    var movie = new Movie(model);
    Movie.instances[model.movieID] = movie;
    console.log('Movie: ' + model.title + " - " + model.title + " added!")
};

// perform validation before any data is saved
Movie.update = function (model) {
    var movie = Movie.instances[model.movieID],
        date = model.releaseDate;
    if (movie.title !== model.title)
        movie.title = model.title;
    if (movie.releaseDate !== model.releaseDate)
        movie.releaseDate = model.releaseDate;
    console.log('Movie: ' + model.title + 'has been updated.');
};

Movie.destroy = function (movieID) {
    //if the movieID is in instances delete the movie instance by movieID
    if (Movie.instances[movieID]) {
        console.log("Movie " + movieID + " deleted.");
        delete Movie.instances[movieID];
    } else {
        //else log there is no record with that movieID
        console.log("There is no record with movieID: " + movieID + " in the storage list");
    }
};

//  Save all book objects to Local Storage
Movie.saveAll = function () {
    var moviesString = "",
        error = false,
        nmrOfMovies = Object
        .keys(Movie.instances)
        .length;
    try {
        moviesString = JSON.stringify(Movie.instances);
        localStorage.setItem("movies", moviesString);
    } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
        error = true;
    }
    if (!error)
        console.log(nmrOfMovies + " movies saved.");
};

//create function expression to loadAll
Movie.loadAll = function () {
    var key = "",
        keys = [],
        moviesString = "",
        movies = {};

    try {
        if (localStorage.getItem('movies')) {
            moviesString = localStorage.getItem('movies');
        }

    } catch (e) {
        alert("Error when reading from Local Storage\n" + e);
    }
    if (moviesString) {
        movies = JSON.parse(moviesString);
        keys = Object.keys(movies);
    }
    for (i = 0; i < keys.length; i++) {
        key = keys[i];
        Movie.instances[key] = Movie.getModelFromObjectRow(movies[key]);
    }
    console.log(keys.length + " movies loaded.");
};

//HELPERS =============================================
Movie.getModelFromObjectRow = function (movieRow) {
    var movie = new Movie(movieRow);
    return movie;
};

//HELPERS =============================================
Movie.loadSeedData = function () {
    Movie.instances["1"] = new Movie({
        movieID: "1",
        title: "Lord of the Rings: The Fellowship...",
        releaseDate: 2000
    });
    Movie.instances["2"] = new Movie({
        movieID: "2",
        title: "The Matrix",
        releaseDate: 1999
    });
    Movie.instances["3"] = new Movie({
        movieID: "3",
        title: "Looper",
        releaseDate: 2008
    });
    Movie.saveAll();
};

Movie.clearData = function () {
    if (confirm("Do you really want to delete all movie data?")) {
        localStorage.movies = "{}";
    }
};

Movie.IDGen = function () {
    return Date.now();
};