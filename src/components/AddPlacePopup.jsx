import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { useForm } from '../hooks/useForm';


function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const { values, handleChange, setValues } = useForm({
        name: '',
        link: '',
    });

    React.useEffect(() => {
        if (isOpen) {
            setValues({
                name: '',
                link: '',
            });
        }
    }, [isOpen]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddPlace({
            name: values.name,
            link: values.link
        });
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
                       onChange={handleChange}
                       value={values.name}
                       placeholder="Название"/>
                <span className="popup__input-error nameplace-input-error"></span>
            </label>
            <label>
                <input type="url"
                       id="urlPlace-input"
                       className="popup__input popup__input_type_link"
                       name="link"
                       required
                       onChange={handleChange}
                       value={values.link}
                       placeholder="Ссылка на картинку"/>
                <span className="popup__input-error urlPlace-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;







