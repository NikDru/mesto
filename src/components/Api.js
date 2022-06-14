export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {headers: this._headers})
      .then(res => this._checkServerAnswer(res));
  }

  editProfile(newUserInfo) {
    return fetch(this._baseUrl + "/users/me", {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify(newUserInfo)
      })
    .then(res => this._checkServerAnswer(res));
  }

  changeAvatar(avatarLink) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(avatarLink)
    })
    .then(res => this._checkServerAnswer(res));
  }

  getCards() {
    return fetch(this._baseUrl + "/cards", {headers: this._headers})
      .then(res => this._checkServerAnswer(res));
  }

  createNewCard(card) {
    return fetch(this._baseUrl + "/cards", {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify(card)
      })
    .then(res => this._checkServerAnswer(res));
  }

  deleteCard(cardID) {
    return fetch(this._baseUrl + "/cards/" + cardID, {
        headers: this._headers,
        method: 'DELETE'
      })
    .then(res => this._checkServerAnswer(res));
    /* .then( () => console.log(`Card ${cardID} deleted!`)) */
  }

  likeCard(cardID) {
    return fetch(this._baseUrl + "/cards/" + cardID + "/likes", {
      headers: this._headers,
      method: 'PUT'
    })
    .then(res => this._checkServerAnswer(res))
    /* .then(() => console.log(`Card ${cardID} liked!`)) */;
  }

  unlikeCard(cardID) {
    return fetch(this._baseUrl + "/cards/" + cardID + "/likes", {
      headers: this._headers,
      method: 'DELETE'
    })
    .then(res => this._checkServerAnswer(res))
    /* .then(() => console.log(`Card ${cardID} unliked!`)) */;
  }

  _checkServerAnswer(res) {
    if (res.ok) {
      return res.json()
    }
    else {
      return Promise.reject(`Ошибка выполнения, status: ${res.status}`);
    }
  }
}
