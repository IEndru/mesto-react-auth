import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";


const Card = ({ card, onCardClick, onCardLike, onCardDelete}) => {
    //console.log(card);
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `elements__heart link-transparency  ${isLiked && 'elements__heart_active'}`
    );

    // console.log(currentUser)
    const handleClick = () => {
        onCardClick(card);
    };

    const handleLikeClick= ()=>{
        onCardLike(card);
    }

    const handleDeleteClick = () => {
        onCardDelete(card._id);
    };

    return (
            <div className="elements__card" >
                {isOwn&&<button className="elements__delete-button" type="button" onClick={handleDeleteClick}></button>}
                <img onClick={handleClick} className="elements__img" src={card.link} alt={card.name} />
                    <div className="elements__text">
                        <h2 className="elements__title">{card.name}</h2>
                        <div className="elements__like-container">
                            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                            <span className="elements__likes-counter">{card.likes.length}</span>
                        </div>
                    </div>
            </div>
    );
};

export default Card;