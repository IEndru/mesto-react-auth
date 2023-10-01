import React from 'react';


const ImagePopup = ({ card, onClose }) => {
    //console.log(card);
    const popupClassNameOpenImage = `popup popup_type_image popup_type_darker ${card.link ? "popup_opened" : ""}`;
    return (
        <section className={popupClassNameOpenImage}>
            <div className="popup__content">
                <figure className="popup__image-wrap">
                    <img className="popup__image" src={card.link} alt={card.name}/>
                    <figcaption className="popup__image-caption">{card.name}</figcaption>
                    <button className="popup__close-button popup__close-button_type_full-image" onClick={onClose}></button>
                </figure>
            </div>
        </section>
    );
};

export default ImagePopup;