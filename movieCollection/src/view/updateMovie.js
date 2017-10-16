/**
 *  TODO IMPLEMENT validation on user input for providing immediate feedback to the user,
 *  validation on form submission for preventing the submission of invalid data
 */

mc.view.updateMovie = {
    setupUI: function () {
        //store form, save button and select input into vars
        var formEl = document.forms.Movie;
        var selectEl = formEl.selectMovie;
        var updateButton = formEl.update;

        // init key(string) keys(list) movie=null option=null;
        var key = "",
            keys = [],
            movie = null,
            optionEl = null,
            i = 0;

        // get movie list from model
        Movie.loadAll();

        //setup movie selection list
        util.populateSelectOptions(Movie.instances, selectEl, "movieID", "title");

        // when a movie is selected, fill the form with its data
        selectEl.addEventListener("change", function () {
            var movie = null,
                key = selectEl.value;
            if (key) {
                movie = Movie.instances[key];
                ["movieID", "title", "releaseDate"].forEach(function (p) {
                    formEl.value = key[p] !== undefined ? movie[p] : "";
                    // delete custom validation error message which may have been set before
                    formEl[p].setCustomValidity("");
                })
            } else {
                formEl.reset();
            }
        });

        // add event listeners for responsive validation
        formEl.title.addEventListener("input", function () {
            titleMsg = Movie.checkTitle(formEl.title.value).message;
            formEl.title.setCustomValidity(titleMsg);
        });
        formEl.releaseDate.addEventListener("input", function () {
            releaseDateMsg = Movie.checkTitle(formEl.releaseDate.value).message;
            formEl.releaseDate.setCustomValidity(releaseDateMsg);
        })

        // set an event handler for the submit/save button
        updateButton.addEventListener("click", mc.view.updateMovie.handleUpdate);

        //neutrilize the submit event
        formEl.addEventListener("submit", function (e) {
            e.preventDefault();
            formEl.reset();
        });
        // handle the event when the browser window/tab is closed
        window.addEventListener("beforeunload", Movie.saveAll);
    },

    handleUpdate: function () {
        // target form element and select input create object literal from form inputs
        var formEl = document.forms.Movie;
        var selectInput = formEl.selectMovie;
        var movieObj = {
            movieID: formEl.movieID.value,
            title: formEl.title.value,
            releaseDate: formEl.releaseDate.value
        };

        // set error messages in case of constraint violations
        titleMsg = Movie.checkTitle(movieObj.title).message;
        formEl.title.setCustomValidity(); //pass in message returned from check funtion

        dateMsg = Movie.checkReleaseDate(movieObj.releaseDate).message;
        formEl.releaseDate.setCustomValidity(); //pass in message returned from check funtion

        if (formEl.checkValidity()) {
            Movie.update(movieObj);

            // update the selected option text to updated title reset form
            selectInput.options[selectInput.selectedIndex].text = movieObj.title;
        }
    }
};