/**
 *  TODO IMPLEMENT validation on user input for providing immediate feedback to the user,
 *  validation on form submission for preventing the submission of invalid data
 */

mc.view.createMovie = {
    setupUI: function () {
        // store submit button for form in a var
        var saveButton = document.forms.Movie.save;
        // call Load method from model
        Movie.loadAll();
        // attach handler function to save button
        saveButton.addEventListener('click', mc.view.createMovie.handleFormSubmit);
        // attach before unload event listener onto window and call save all fucntion
        // from model
        window.addEventListener('beforeunload', Movie.saveAll);
    },
    handleFormSubmit: function () {
        //store form in var element in vaasdfl
        var form = document.forms.Movie;
        var id = Movie.IDGen();
        // collect input from form in object literal and store it in var
        var movieObj = {
            movieID: id,
            title: form.title.value,
            releaseDate: form.releaseDate.value
        };
        //call add function from model and pass it object literal with input from form
        Movie.add(movieObj);
        //reset the form
        form.reset();
    }
};
