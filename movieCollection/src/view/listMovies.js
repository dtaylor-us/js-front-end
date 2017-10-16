mc.view.listMovies = {
    setupUI: function () {
        // select tbody element
        var tbodyEl = document.querySelector("table#Movies>tbody");
        console.log(tbodyEl);
        var keys = [],
            key = "",
            row = {},
            i = 0;
        Movie.loadAll();
        // get list of keys from instances
        keys = Object.keys(Movie.instances);
        console.log(Movie.instances)
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            row = tbodyEl.insertRow();
            movie = Movie.instances[key];
            console.log(movie.movieID);
            row.insertCell(-1).textContent = movie.movieID;
            row.insertCell(-1).textContent = movie.title;
            row.insertCell(-1).textContent = movie.releaseDate;

        }
    }
};