class UI {
    constructor() {
        this.profileContentDiv = document.querySelector("#profileContentDiv");
        this.githubNameInput = document.querySelector("#githubName");
        this.tableContent = document.querySelector("#tableContent");
        this.searchUserList = document.querySelector("#searchedUserList");
        this.table = document.querySelector("#table");
        this.isShowRepo = true;
    }

    fillSearchedUserToUIFromStorage() {
        const users = Storagex.getSearchedUserFromStorage();
        if (users !== null && users.length > 0) {
            users.forEach(user => {
                const li = document.createElement("li");
                li.className = "list-group-item";
                li.textContent = user;

                this.searchUserList.appendChild(li);
            })
        }
    }

    addSearchUserToUI(username) {
        if (Storagex.checkUser(username)) {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = username;

            this.searchUserList.appendChild(li);
        }

    }

    addUserProfileToUI(user) {
        this.profileContentDiv.innerHTML = `
            <div class="col-sm-12 col-md-4 col-lg-4">
                <div id="profileDiv">
                    <img id="profileImg" src="${user.avatar_url}" width="200" height="200" alt="" class="mb-2">
                    <hr style="border: 1px solid lightgray; width: 50%;">
                    <span>${user.name}</span>
                    <span>${user.bio}</span>
                </div>
            </div>

            <div class="col-sm-12 col-md-8 col-lg-8">
                <div id="badge-div" class="mt-2">
                    <button type="button" class="btn btn-info btn-sm">
                        Followers <span class="badge badge-light">${user.followers}</span>
                    </button>
                    <button type="button" class="btn btn-warning btn-sm">
                        Following <span class="badge badge-light">${user.following}</span>
                    </button>
                    <button type="button" class="btn btn-success btn-sm">
                        Repositories <span class="badge badge-light">${user.public_repos}</span>
                    </button>
                </div>

                <div id="infoDiv" class="mt-5">
                    <div class="info">
                          <a><i class="fa-solid fa-user" style="font-size:30px; color:black;"></i></a>
                        <span>${user.company == null ? "" : user.company}</span>
                    </div>
                    <div class="info">
                        <a>
                        <i class="fa-solid fa-location-dot" style="font-size:30px; color:black;"></i>
                        </a>
                        <span>${user.location == null ? "" : user.location}</span>
                    </div>
                    <div class="info">
                         <a><i class="fa-solid fa-envelope" style="font-size:30px; color:black;"></i></a>
                        <span>${user.email == null ? "" : user.email}</span>
                    </div>
                    <div class="info">
                        <a id="showRepo" href="#">View Repositories</a>
                    </div>
                </div>
            </div>
        `
    }

    checkMessage() {
        const showRepoLink = document.querySelector("#showRepo");
        if (this.isShowRepo) {
            showRepoLink.textContent = "View Repositories";

        } else {
            showRepoLink.textContent = "Close Repos";
        }
    }

    showRepos(repos) {
        if (this.isShowRepo) {
            if (repos != null && repos.length > 0) {
                let sayac = 1;
                repos.forEach(repo => {
                    this.table.classList.remove("d-none");
                    this.tableContent.innerHTML += `
                    <tr>
                    <th scope="row">${sayac}</th>
                    <td>${repo.name}</td>
                    <td>${repo.created_at}</td>
                  </tr>
                    `;
                    sayac++;
                })
            }
            this.isShowRepo = false;
            this.checkMessage();
        } else {
            this.isShowRepo = true;
            this.checkMessage();
            this.tableContent.innerHTML = "";
            this.table.classList.add("d-none");
        }
    }

    clearAllSearchUser() {
        this.searchUserList.innerHTML = "";
    }

    clearInput() {
        this.githubNameInput.value = "";
        this.profileContentDiv.innerHTML = "";
        this.tableContent.innerHTML = "";
        this.table.classList.add("d-none");
    }
}