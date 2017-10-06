mc.view.deleteMovie = {
    setupUI: function () {
        // target delete button
        var deleteButton = document.forms.Movie.delete;
        console.log(deleteButton);
        // target select box in form
        var selectInput = document.forms.Movie.selectMovie;
        console.log(selectInput);
        // init key(string) keys(list) movie(null) optionEl(null) i(0)
        var key = "",
            keys = [],
            movie = null,
            optionEl = null,
            i = 0;
        // call retrieve objects from model
        Movie.loadAll();
        // store list of keys from instances list into keys var
        keys = Object.keys(Movie.instances);
        // iterate over keys and set key to key index key
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            movie = Movie.instances[key];
            optionEl = document.createElement("option");
            optionEl.text = movie.title;
            optionEl.value = movie.movieID;
            selectInput.add(optionEl, null);
        }
        deleteButton.addEventListener('click', mc.view.deleteMovie.handleDeleteEvent);
        window.addEventListener("beforeunload", Movie.saveAll);
    },
    handleDeleteEvent: function () {
        var selectInput = document.forms.Movie.selectMovie;
        var movieID = selectInput.value;
        if (movieID) {
            Movie.destroy(movieID);
            selectInput.remove(selectInput.selectedIndex);
        }
    }
};
