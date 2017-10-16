/**
 *  Setup UI and Handle Submit event for Movie entry screen
 */

mc.view.createMovie = {
    setupUI: function () {
        var formEl = document.forms.Movie,
            saveButton = formEl.save,
            titleMsg = "",
            releaseDateMsg = "";

        // call Load method from model
        Movie.loadAll();

        //add event handlers for responsive validation
        formEl.title.addEventListener("input", function () {
            titleMsg = Movie.checkTitle(formEl.title.value).message;
            formEl.title.setCustomValidity(titleMsg);
        });
        formEl.releaseDate.addEventListener("input", function () {
            releaseDateMsg = Movie.checkReleaseDate(formEl.releaseDate.value).message;
            formEl.releaseDate.setCustomValidity(releaseDateMsg);
        });

        // attach handler function to save button
        saveButton.addEventListener('click', mc.view.createMovie.handleSaveButtonClickEvent);

        // neutralize the submit event
        formEl.addEventListener('submit', function (e) {
            e.preventDefault();
            formEl.reset();
        });

        // attach before unload event listener onto window and call save all fucntion from model
        window.addEventListener('beforeunload', Movie.saveAll);
    },
    handleSaveButtonClickEvent: function () {
        //store form in var element in vaasdfl
        var formEl = document.forms.Movie,
            id = Movie.IDGen(),
            titleMsg = "",
            dateMsg = "";
        // collect input from form in object literal and store it in var
        var movieObj = {
            movieID: id,
            title: formEl.title.value,
            releaseDate: formEl.releaseDate.value
        };

        titleMsg = Movie.checkTitle(movieObj.title).message;
        formEl.title.setCustomValidity(titleMsg); //pass in message returned from check funtion

        dateMsg = Movie.checkReleaseDate(movieObj.releaseDate).message;
        formEl.releaseDate.setCustomValidity(dateMsg); //pass in message returned from check funtion

        //call add function from model and pass it object literal with input from form
        if (formEl.checkValidity()) Movie.add(movieObj);
    }
};