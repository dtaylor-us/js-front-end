mc.view.updateMovie = {
    setupUI: function () {
        //store form, save button and select input into vars
        // init key(string) keys(list) book=null option=null;
        // get movie list from model
        // store keys from list in var
        // iterate over keys and add it to the select option
        // add event listener for when a book is changed to populate form wiht data
        // add event listener to save button to handle save on click
        // create a window before unload event listener to call save from model
    },

    handleSelection: function () {
        //handle selection function
        // target form and select elements
        // store selected key in var
        // if a key is present query instances by key and store it in var ELSE reset form
        // set form inputs to retrieved objects props
    },

    handleSave: function () {
        // target form element and select input
        // create object literal from form inputs and store it in var
        // call model update method and pass it object literal
        // update the selected option text to updated title
        // reset form
    }
}