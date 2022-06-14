export default class UserInfo {
  constructor({userNameSelector, userAboutSelector, avatarImageSelector}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
    this._userAvatarImageElement = document.querySelector(avatarImageSelector);
  }

  getUserInfo() {
    this.userName = this._userNameElement.textContent;
    this.userAbout = this._userAboutElement.textContent;
    this.avatarImageLink = this._userAvatarImageElement.src;
    return this;
  }

  setUserInfo({name, about, avatar}) {
    this._userNameElement.textContent = name;
    this._userAboutElement.textContent = about;
    this._userAvatarImageElement.src = avatar;
  }
}
