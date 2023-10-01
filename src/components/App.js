import React from 'react';
import api from '../untils/Api';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard,setSelectedCard] = React.useState ({});
    const [currentUser, setCurrentUser] =React.useState({})
    const [cards, setCards]= React.useState([]);


    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, initialCards]) => {
                setCurrentUser(userData);
                setCards(initialCards);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        if (isLiked) {
            api.deleteLike(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        } else {
            api.addLike(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }
    }

    function handleCardDelete(id) {
        api.deleteCard(id)
            .then(() => {
                setCards((cards) => cards.filter((card) => card._id !== id));
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handelUpdateUser ({name, about}){
        api.setUserInfo({name,about})
            .then((newUserData)=>{
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }


    function handleUpdateAvatar (newAvatarData){
        api.setUserAvatar(newAvatarData)
            .then((data)=>{
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleAddPlaceSubmit (data) {
        api.setNewCard(data)
            .then((newCard) =>{
                setCards([newCard, ...cards]);
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    // Метод для открытия попапа редактирования аватара
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true)
    };

    // Метод для открытия попапа редактирования профиля
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    };

    // Метод для открытия попапа добавления места
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true)
    };

    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({})
    };

  return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
            <Header />
            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                selectedCard={selectedCard}
                onClose={closeAllPopups}
                onCardLike = {handleCardLike}
                onCardDelete={handleCardDelete}
            />
            <Footer />

              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handelUpdateUser} />

              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

              <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
