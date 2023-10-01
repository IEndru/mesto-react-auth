import React from 'react';
import PopupWithForm from "./PopupWithForm";


const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm title="Обновить аватар" name="edit-avatar" isOpen={isOpen}
                       onClose={onClose} submitButtonText="Создать" onSubmit={handleSubmit}>
            <label>
                <input type="url"
                       id="avatar-input"
                       className="popup__input popup__input_type_link"
                       name="avatar"
                       required
                       placeholder="Ссылка на фото аватара"
                       ref={avatarRef}
                />
                <span className="popup__input-error avatar-input-error"></span>
            </label>
        </PopupWithForm>
    )
};

export default EditAvatarPopup;
