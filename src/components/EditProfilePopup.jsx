import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose,onUpdateUser}) => {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
       <PopupWithForm title="Редактировать профиль" name="edit-profile" isOpen={isOpen}
                      onClose={onClose} submitButtonText="Сохранить" onSubmit={handleSubmit}>
           <label>
               <input type="text"
                      className="popup__input popup__input_type_name"
                      name="name"
                      id="user-input"
                      minLength="2"
                      maxLength="40"
                      required
                      value={name}
                      onChange={handleChangeName}
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
                      value={description}
                      onChange={handleChangeDescription}
                      placeholder="Введите вашу специальность"/>
               <span className="popup__input-error specialization-input-error"></span>
           </label>
       </PopupWithForm>
    );
};

export default EditProfilePopup;