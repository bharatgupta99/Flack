document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("name-box").value = localStorage.getItem("username");
});