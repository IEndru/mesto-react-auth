import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddPlace({
            name: title,
            link: link
        });
        setTitle('');
        setLink('');
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };

    return (
        <PopupWithForm title="Добавить место" name="card-add" isOpen={isOpen}
                       onClose={onClose} submitButtonText="Создать" onSubmit={handleSubmit}>
            <label>
                <input type="text"
                       className="popup__input popup__input_type_name"
                       name="name"
                       id="nameplace-input"
                       minLength="2"
                       maxLength="30"
                       required
                       onChange={handleTitleChange}
                       value={title}
                       placeholder="Название"/>
                <span className="popup__input-error nameplace-input-error"></span>
            </label>
            <label>
                <input type="url"
                       id="urlPlace-input"
                       className="popup__input popup__input_type_link"
                       name="link"
                       required
                       value={link}
                       onChange={handleLinkChange}
                       placeholder="Ссылка на картинку"/>
                <span className="popup__input-error urlPlace-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;