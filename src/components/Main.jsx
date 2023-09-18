import React, {useEffect,useState} from 'react';
import Card from "./Card";
//import avatarImage from '../images/avatar.svg';
import api from '../untils/Api';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick}) => {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards]= useState([]);


useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, initialCards]) => {
            setUserName(userData.name);
            setUserDescription(userData.about);
            setUserAvatar(userData.avatar);
            setCards(initialCards);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__block">
                    <button className="profile__avatar-editBtn" onClick={onEditAvatar} >
                        <div style= {{ backgroundImage: `url(${userAvatar})` }} className="profile__avatar" ></div>
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__title">{userName}</h1>
                        <button type="button" className="profile__edit-button" onClick={onEditProfile} ></button>
                        <p className="profile__subtitle">{userDescription}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) => {
                    //console.log(card)
                    return (
                        <Card key={card._id} card={card} onCardClick={onCardClick}/>
                    );
                })}
            </section>
        </main>
    );
};

export default Main;