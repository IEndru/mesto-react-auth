 class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _getRes(res){
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error('Возникла ошибка'));
  }

// получение инфо о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._getRes);
  }

//редактирование информации о пользователе
  setUserInfo(data){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })

    })
      .then(this._getRes);
  }

//получение карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._getRes);
  }

// Добавление новой карточки
  setNewCard(data){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._getRes);
  }

//удаление карточки
  deleteCard(id){
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._getRes);
  }

//редактирование аватара пользователя
  setUserAvatar(data){
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._getRes);
  }

//добавляем лайк
  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._getRes);
  }

//удаляем лайк
  deleteLike(cardId){
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers

    })
      .then(this._getRes);
  }

}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: '11813631-a6ff-4278-8ebe-34f9a02b5859',
    'Content-Type': 'application/json'
  }
});

export default api;