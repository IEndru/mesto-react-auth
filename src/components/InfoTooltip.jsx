import React from 'react';
import IconT from "../images/iconTrue.svg";
import IconF from "../images/iconfalse.svg";

const InfoTooltip = ({onClose,isOpen, message}) => {
    const isSuccess = message === 'Вы успешно зарегистрировались!';
    return (
        <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <img src={isSuccess?IconT:IconF} className="popup__icon" alt={isSuccess?'Вы успешно зарегистрировались!':'Что-то пошло не так! Попробуйте ещё раз.'}/>
                <button className="popup__close-button"  onClick={onClose} type="button"/>
                <h2 className="popup__title-forSign">{message}</h2>
            </div>
        </section>
    );
};

export default InfoTooltip