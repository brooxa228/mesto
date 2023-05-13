export default class UserInfo {
    constructor({userNameSelector, userJobSelector, userAvatarSelector}) {
        this._userName = document.querySelector(userNameSelector)
        this._userJob = document.querySelector(userJobSelector)
        this._userAvatar = document.querySelector(userAvatarSelector)
    }

    getUserInfo() {
        return {name: this._userName.textContent, about: this._userJob.textContent};
    }

    setUserInfo(userData) {
        this._userName.textContent = userData.name;
        this._userJob.textContent = userData.about;
    }

    setAvatarInfo(userData) {
        this._userAvatar.src = userData.avatar;
    }
}