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
    if (!id) {
        return new MandatoryValueConstraintViolation("This record cannot be created with out an Identifier.");
    } else if (Movie.instances[id]) {
        return new UniquenessConstraintViolation("A record already exists with this ID");
    } else {
        return new NoConstraintViolation();
    }
};

// check title: Mandatory, Length
Movie.checkTitle = function (title) {
    if (!title) {
        return new MandatoryValueConstraintViolation("Title is required.");
    } else if (title.length > 50) {
        return new StringLengthConstraintViolation("Title must be less than 50 chars long");
    } else if (Movie.instances[title]) {
        return new UniquenessConstraintViolation("This movie has already been collected");
    } else {
        return new NoConstraintViolation();
    }
};

// check releaseDate: Pattern, Range/Interval
Movie.checkReleaseDate = function (date) {
    var yearfield = '',
        monthfield = '',
        dayfield = '',
        pattern = new RegExp("[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"),
        today = new Date(),
        minDate = new Date(1895, 12, 28);
    if (date) {
        //verify pattern match
        if (pattern.test(date)) {
            yearfield = date.split('-')[0];
            monthfield = date.split('-')[1];
            dayfield = date.split('-')[2];
            inputDate = new Date(yearfield, monthfield, dayfield);
        } else {
            return new PatternConstraintViolation("Date must match following patter YYYY-MM-DD");
        }
        //verify date range
        if (inputDate < minDate || inputDate > today) {
            return new IntervalConstraintViolation("Date must be after 12-28-1895 and before today's date.");
        }
        return new NoConstraintViolation();
    }
};

//SETTER invokes the check function and is to be used for setting the value of the property
// set movieID: Mandatory, Unique
Movie.prototype.setMovieID = function (id) {
    var validationResult = Movie.checkMovieID(id);
    if (validationResult instanceof NoConstraintViolation) {
        this.movieID = id;
    } else {
        throw validationResult;
    }
};

// set title: Mandatory, Length
Movie.prototype.setTitle = function (title) {
    var validationResult = Movie.title(title);
    if (validationResult instanceof NoConstraintViolation) {
        this.title = title;
    } else {
        throw validationResult;
    }
};

// set releaseDate: Range/Interval
Movie.prototype.setReleaseDate = function (date) {
    var validationResult = Movie.releaseDate(date);
    if (validationResult instanceof NoConstraintViolation) {
        this.releaseDate = date;
    } else {
        throw validationResult;
    }
};

Movie.instances = {};

Movie.prototype.toString = function () {
    return "Movie{ ID:" + this.movieID + ", title:" + this.title +
        ", releaseDate:" + (this.releaseDate || "Add link to update") + "}";
};

//CRUD OPERATIONS =============================================

// perform validation before any data is saved
Movie.add = function (model) {
    var movie = null;
    try {
        movie = new Movie(model);
    } catch (e) {
        console.log(e.constructor.name + ": " + e.message);
        movie = null;
    }
    if (movie) {
        Movie.instances[model.movieID] = movie;
        console.log('Movie: ' + model.title + " - " + model.title + " added!");
    }
};

// perform validation before any data is saved
Movie.update = function (model) {
    var movie = Movie.instances[model.movieID],
        msgInd = true,
        updatedProps = [],
        origObj = util.cloneObject(model);
    try {
        if (movie.title !== model.title) {
            movie.setTitle(model.title);
            updatedProps.push("title");
        }
        if (movie.releaseDate !== model.releaseDate) {
            movie.setReleaseDate(model.releaseDate);
            updatedProps.push("releaseDate");
        }
    } catch (e) {
        console.log(e.constructor.name + ": " + e.message);
        msgInd = false;
        // restore object to its state before updating
        Movie.instances[model.movieID] = origObj;
    }
    if (msgInd) {
        if (updatedProperties.length > 0) {
            console.log("Properties " + updatedProperties.toString() +
                " modified for movie " + model.movieID);
        } else {
            console.log("No property value changed for movie " +
                model.movieID + " !");
        }
    }
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