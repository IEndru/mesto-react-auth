import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from '../hooks/useForm';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
    const currentUser = React.useContext(CurrentUserContext);
    const { values, handleChange, setValues } = useForm({
        name: currentUser.name || '',
        about: currentUser.about || '',
    });

    React.useEffect(() => {
        setValues({
            name: currentUser.name || '',
            about: currentUser.about || '',
        });
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: values.name,
            about: values.about,
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
                       value={values.name}
                       onChange={handleChange}
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
                       value={values.about}
                       onChange={handleChange}
                       placeholder="Введите вашу специальность"/>
                <span className="popup__input-error specialization-input-error"></span>
            </label>
        </PopupWithForm>
    );
};

export default EditProfilePopup;










