import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike,onCardDelete}) => {
    const currentUser = React.useContext(CurrentUserContext);
    const {name,about,avatar}=currentUser;

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__block">
                    <button className="profile__avatar-editBtn" onClick={onEditAvatar} >
                        <img src={avatar}  className="profile__avatar" alt='Фото аватара'/>
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__title">{name}</h1>
                        <button type="button" className="profile__edit-button" onClick={onEditProfile} ></button>
                        <p className="profile__subtitle">{about}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) => {
                   // console.log(card)
                    return (
                        <Card key={card._id}
                              card={card}
                              onCardClick={onCardClick}
                              onCardDelete ={onCardDelete}
                              onCardLike={onCardLike}/>
                    );
                })}
            </section>
        </main>
    );
};

export default Main;