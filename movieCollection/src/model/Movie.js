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
    Movie.instances[model.movieID] = movie;
    console.log('Movie: ' + model.title + " - " + model.title + " added!")
};

Movie.update = function (model) {
    var movie = Movie.instances[model.movieID],
        date = model.releaseDate;
    if (movie.title !== model.title) 
        movie.title = slots.title;
    if (movie.releaseDate !== model.releaseDate) 
        movie.releaseDate = slots.releaseDate;
    console.log('Movie: ' + model.title + 'has been updated.')
};

Movie.destroy = function (movieID) {
    //if the movieID is in instances delete the movie instance by movieID
    if (Movie.instances[movieID]) {
        console.log("Movie " + movieID + " deleted.")
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
    Movie.instances["1"] = new Movie({movieID: "1", title: "Lord of the Rings: The Fellowship...", releaseDate: 2000});
    Movie.instances["2"] = new Movie({movieID: "2", title: "The Matrix", releaseDate: 1999});
    Movie.instances["3"] = new Movie({movieID: "3", title: "Looper", releaseDate: 2008});
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