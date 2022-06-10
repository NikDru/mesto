export default class UserInfo {
  constructor({userNameSelector, userAboutSelector}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    this.userName = this._userNameElement.innerText;
    this.userAbout = this._userAboutElement.innerText;
    return this;
  }

  setUserInfo(userName, userAbout) {
    this._userNameElement.innerText = userName;
    this._userAboutElement.innerText = userAbout;
  }
}
