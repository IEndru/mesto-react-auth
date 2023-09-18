import React from 'react';

const Card = ({ card, onCardClick}) => {
    //console.log(card);
    const handleClick = () => {
        onCardClick(card);
    };
    return (
            <div className="elements__card" >
                <button className="elements__delete-button" type="button"></button>
                <div onClick={handleClick} className="elements__img" style= {{ backgroundImage: `url(${card.link})` }} alt="нет картинки"></div>
                    <div className="elements__text">
                        <h2 className="elements__title">{card.name}</h2>
                        <div className="elements__like-container">
                            <button type="button" className="elements__heart link-transparency"></button>
                            <span className="elements__likes-counter">{card.likes.length}</span>
                        </div>
                    </div>
            </div>
    );
};

export default Card;