export default class Api {
  constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
      method: 'GET'
    })
    .then(res => {
      return this.checkOK(res);
    });  
  }
  
  patchAvatarInfo(avatarData) { 
    return fetch(this._baseUrl + '/users/me/avatar', {  ///отправляем запрос на сервер 
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(avatarData)
    })
    .then(res => {
      return this.checkOK(res);
    });  
  }

  patchUserInfo(userData) { 
    return fetch(this._baseUrl + '/users/me', {  
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(userData)
    })
    .then(res => {
      return this.checkOK(res);
    });  
  }
  
  postNewCard(newCard) { 
    return fetch(this._baseUrl + '/cards', {   
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(newCard)
    })
    .then(res => {
      return this.checkOK(res);
    });  
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
      method: 'GET'
    })
      .then(res => {
        return this.checkOK(res);
    });  
  }  

  deleteCard(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(res => {
        return this.checkOK(res);
    });  
  }  
  
  putLike(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT'
    })
      .then(res => {
        return this.checkOK(res);
    });  
  }  

  deleteLike(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(res => {
        return this.checkOK(res);
    });  
  }  

  checkOK(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
  }



  changeLikeStatus(cardId, isLiked) {
    if (isLiked) {
        return this.deleteLike(cardId);
    } else {
        return this.putLike(cardId);
    }
  }
}

