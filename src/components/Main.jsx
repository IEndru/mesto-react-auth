import React, {useEffect,useState} from 'react';
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import Card from "./Card";
//import avatarImage from '../images/avatar.svg';
import api from '../untils/Api';

const Main = ({ onEditProfile,card, onAddPlace, onEditAvatar, isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, onClose,selectedCard,onCardClick}) => {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards]= useState([]);


useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, initialCards]) => {
            setUserName(userData.name);
            setUserDescription(userData.about);
            setUserAvatar(userData.avatar);
            setCards(initialCards);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
    }, []);

    return (
        <>
            <main className="content">
                <section className="profile">
                    <div className="profile__block">
                        <button className="profile__avatar-editBtn" onClick={onEditAvatar} >
                            <div style= {{ backgroundImage: `url(${userAvatar})` }} className="profile__avatar" ></div>
                        </button>
                        <div className="profile__info">
                            <h1 className="profile__title">{userName}</h1>
                            <button type="button" className="profile__edit-button" onClick={onEditProfile} ></button>
                            <p className="profile__subtitle">{userDescription}</p>
                        </div>
                    </div>
                    <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
                </section>
                <section className="elements">
                    {cards.map((card) => {
                        //console.log(card)
                        return (
                            <Card key={card._id} card={card} onCardClick={onCardClick}/>
                        );
                    })}
                </section>
            </main>

            <PopupWithForm title="Обновить аватар" name="edit-avatar" isOpen={isEditAvatarPopupOpen}
                           onClose={onClose} >
                {<label>
                    <input type="url"
                           id="avatar-input"
                           className="popup__input popup__input_type_link"
                           name="avatar"
                           required
                           placeholder="Ссылка на фото аватара"/>
                    <span className="popup__input-error avatar-input-error"></span>
                </label>}
                {<button type="submit" className="popup__submit">Создать</button>}
            </PopupWithForm>

            <PopupWithForm title="Редактировать профиль" name="edit-profile" isOpen={isEditProfilePopupOpen}
                           onClose={onClose}>
                { <label>
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
                </label>}
                {<label>
                    <input type="text"
                    className="popup__input popup__input_type_specialization"
                    minLength="2" maxLength="200"
                    required
                    name="about"
                    id="specialization-input"
                    defaultValue="Исследователь океана"
                    placeholder="Введите вашу специальность"/>
                    <span className="popup__input-error specialization-input-error"></span>
                    </label>}
                {<button type="submit" className="popup__submit">Сохранить</button>}
            </PopupWithForm>

            <PopupWithForm title="Добавить место" name="card-add" isOpen={isAddPlacePopupOpen}
                           onClose={onClose}>
                {<label>
                    <input type="text"
                           className="popup__input popup__input_type_name"
                           name="name"
                           id="nameplace-input"
                           minLength="2"
                           maxLength="30"
                           required
                           placeholder="Название"/>
                    <span className="popup__input-error nameplace-input-error"></span>
                </label>}
                {<label>
                    <input type="url"
                    id="urlPlace-input"
                    className="popup__input popup__input_type_link"
                    name="link"
                    required
                    placeholder="Ссылка на картинку"/>
                    <span className="popup__input-error urlPlace-input-error"></span>
                    </label>}
                { <button type="submit" className="popup__submit">Создать</button>}
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={onClose}/>
        </>

    );
};

export default Main;