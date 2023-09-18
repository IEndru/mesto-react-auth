import React from 'react';

const PopupWithForm = ({ title, name, children, isOpen, onClose }) => {
    const popupClassName = `popup popup_type_${name}${isOpen ? ' popup_opened' : ''}`;
    return (
            <section className={popupClassName} >
                <div className="popup__container">
                    <button className={`popup__close-button popup__close-button_type_${name}`} onClick={onClose} type="button"></button>
                    <h2 className="popup__title">{title}</h2>
                    <form className={`popup__form popup__form_type_${name}`} action="#" name={name} noValidate>
                        {children}
                    </form>
                </div>
            </section>
    );
};

export default PopupWithForm;

