
const githubName = document.querySelector("#githubName"),
    form = document.querySelector("#searchForm"),
    clearButton = document.querySelector("#clearButton"),
    clearAllButton = document.querySelector("#clearAllButton");

const github = new Github();
const ui = new UI();

runEventListeners();

function runEventListeners() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clearInput);
    document.addEventListener("DOMContentLoaded", runPageLoaded);
    clearAllButton.addEventListener("click", clearSearchedUser);
}

function clearSearchedUser() {
    Storagex.clearAllSearchUserFromStorge();
    ui.clearAllSearchUser();
}

function runPageLoaded() {
    ui.fillSearchedUserToUIFromStorage();
}

function clearInput() {
    ui.clearInput();
}

function search(e) {
    e.preventDefault();
    const username = githubName.value.trim();
    if (username == null || username == "") {
        alert("Please enter a username.")
    } else {
        github.getGithubData(username)
            .then((response) => {
                ui.addSearchUserToUI(username);
                Storagex.addSearchedUserToStorge(username);
                ui.addUserProfileToUI(response.user);
                document.querySelector("#showRepo").addEventListener("click", () => ui.showRepos(response.repo))
            })
            .catch(error => console.log(error))
    }
}