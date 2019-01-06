document.addEventListener('DOMContentLoaded', () => {

    //Logic to handle username
    if (!localStorage.getItem("username")) {
        var username = prompt("Please enter your name");
        if (!username) {
            username = "Guest"
        }
        localStorage.setItem("username", username)
    }

    var usernameField = document.querySelector("#username");
    usernameField.innerHTML = `Welcome ${localStorage.getItem("username")}!`;

});