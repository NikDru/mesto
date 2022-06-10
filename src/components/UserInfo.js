export default class UserInfo {
  constructor({userNameSelector, userAboutSelector}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    this.userName = this._userNameElement.textContent;
    this.userAbout = this._userAboutElement.textContent;
    return this;
  }

  setUserInfo(userName, userAbout) {
    this._userNameElement.textContent = userName;
    this._userAboutElement.textContent = userAbout;
  }
}
