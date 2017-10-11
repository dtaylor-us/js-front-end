/**
 *  TODO IMPLEMENT validation on user input for providing immediate feedback to the user,
 *  validation on form submission for preventing the submission of invalid data
 */

mc.view.updateMovie = {
    setupUI: function () {
        //store form, save button and select input into vars
        var form = document.forms.Movie;
        var selectInput = form.selectMovie;
        var updateButton = form.update;
        // init key(string) keys(list) movie=null option=null;
        var key = "",
            keys = [],
            movie = null,
            optionEl = null,
            i = 0;
        // get movie list from model
        Movie.loadAll();
        keys = Object.keys(Movie.instances);

        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            movie = Movie.instances[key];
            optionEl = document.createElement("option");
            optionEl.text = movie.title;
            optionEl.value = movie.movieID;
            selectInput.add(optionEl, null);
        }
        // when a movie is selected, fill the form with its data
        selectInput.addEventListener("change", mc.view.updateMovie.handleSelection);
        // set an event handler for the submit/save button
        updateButton.addEventListener("click", mc.view.updateMovie.handleUpdate);
        // handle the event when the browser window/tab is closed
        window.addEventListener("beforeunload", Movie.saveAll);
    },

    handleSelection: function () {
        var form = document.forms['Movie'];
        var selectInput = form.selectMovie,
            movie = null,
            key = selectInput.value;
        if (key) {
            movie = Movie.instances[key];
            form.movieID.value = movie.movieID;
            form.title.value = movie.title;
            form.releaseDate.value = movie.releaseDate;
        } else {
            form.reset();
        }
    },

    handleUpdate: function () {
        // target form element and select input create object literal from form inputs
        var form = document.forms.Movie;
        var selectInput = form.selectMovie;
        var movieObj = {
            movieID: form.movieID.value,
            title: form.title.value,
            releaseDate: form.releaseDate.value
        };

        Movie.update(movieObj);
        selectInput.options[selectInput.selectedIndex].text = movieObj.title;
        // and store it in var call model update method and pass it object literal
        // update the selected option text to updated title reset form
    }
};