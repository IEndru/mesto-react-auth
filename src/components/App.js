import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard,setSelectedCard] = React.useState ({});


    // Метод для открытия попапа редактирования аватара
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true)
    };

    // Метод для открытия попапа редактирования профиля
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    };

    // Метод для открытия попапа добавления места
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true)
    };

    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({})
    };


  return (
      <div className="page">
        <Header />
        <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            isEditProfilePopupOpen={isEditProfilePopupOpen}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            selectedCard={selectedCard}
            onClose={closeAllPopups}
        />
        <Footer />
          <PopupWithForm title="Обновить аватар" name="edit-avatar" isOpen={isEditAvatarPopupOpen}
                         onClose={closeAllPopups} submitButtonText="Создать">
              <label>
                  <input type="url"
                         id="avatar-input"
                         className="popup__input popup__input_type_link"
                         name="avatar"
                         required
                         placeholder="Ссылка на фото аватара"/>
                  <span className="popup__input-error avatar-input-error"></span>
              </label>
          </PopupWithForm>

          <PopupWithForm title="Редактировать профиль" name="edit-profile" isOpen={isEditProfilePopupOpen}
                         onClose={closeAllPopups} submitButtonText="Сохранить">
               <label>
                  <input type="text"
                         className="popup__input popup__input_type_name"
                         name="name"
                         id="user-input"
                         minLength="2"
                         maxLength="40"
                         required
                         defaultValue="Жак-Ив Кусто"
                         placeholder="Введите ваше имя"/>
                  <span className="popup__input-error user-input-error"></span>
              </label>
              <label>
                  <input type="text"
                         className="popup__input popup__input_type_specialization"
                         minLength="2" maxLength="200"
                         required
                         name="about"
                         id="specialization-input"
                         defaultValue="Исследователь океана"
                         placeholder="Введите вашу специальность"/>
                  <span className="popup__input-error specialization-input-error"></span>
              </label>
          </PopupWithForm>

          <PopupWithForm title="Добавить место" name="card-add" isOpen={isAddPlacePopupOpen}
                         onClose={closeAllPopups} submitButtonText="Создать">
              <label>
                  <input type="text"
                         className="popup__input popup__input_type_name"
                         name="name"
                         id="nameplace-input"
                         minLength="2"
                         maxLength="30"
                         required
                         placeholder="Название"/>
                  <span className="popup__input-error nameplace-input-error"></span>
              </label>
              <label>
                  <input type="url"
                         id="urlPlace-input"
                         className="popup__input popup__input_type_link"
                         name="link"
                         required
                         placeholder="Ссылка на картинку"/>
                  <span className="popup__input-error urlPlace-input-error"></span>
              </label>
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </div>
  );
}

export default App;
