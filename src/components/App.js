import React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import api from '../untils/Api';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../untils/auth';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [selectedCard,setSelectedCard] = React.useState ({});
    const [currentUser, setCurrentUser] =React.useState({})
    const [cards, setCards]= React.useState([]);
    const loggedInFromStorage = JSON.parse(localStorage.getItem('isLoggedIn'));
    const [isLoggedIn, setIsLoggedIn] = React.useState(loggedInFromStorage);
    const [authEmail, setAuthEmail] = React.useState('');
    const navigate = useNavigate();

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

    const handleInfoTooltip = () => {
        setIsInfoTooltipOpen(true);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard({})
    };

    React.useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            auth.getContent(token)
                .then((data) => {
                    localStorage.setItem('isLoggedIn', JSON.stringify(true));
                    setIsLoggedIn(true);
                    setAuthEmail(data.data.email);
                    navigate('/');
                })
                .catch((err) => {
                    localStorage.setItem('isLoggedIn', JSON.stringify(false));
                    console.error(`Ошибка при проверке токена: ${err}`);
                    localStorage.removeItem('jwt');
                });
        }
    }, [navigate]);

    const handleRegister = ({ email, password }) => {
        auth.register({ email, password })
            .then((res) => {
                setIsLoggedIn(true);
                console.log('Регистрация прошла успешно', res);
                handleInfoTooltip();
                navigate('/sign-in');
            })
            .catch((err) =>
                console.error(`Ошибка при регистрации: ${err}`));
                setIsLoggedIn(false);
                handleInfoTooltip();

    };

    const handleLogin = ({ email, password }) => {
        auth.authorize({ email, password })
            .then((data) => {
                //console.log(data.token)
                if (data.token) {
                    localStorage.setItem('isLoggedIn', JSON.stringify(true));
                    setIsLoggedIn(true);
                    localStorage.setItem('jwt', data.token);
                    navigate('/');
                }
            })
            .catch((err) =>
                console.error(`Ошибка при входе: ${err}`));
    };

    const handleSignOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('jwt');
        navigate('/sign-in');
    };

    React.useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

  return (
       <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
            <Header loggedIn={isLoggedIn} userEmail={authEmail} onSignOut={handleSignOut}/>
            <Routes>
                <Route path="/sign-in" element={<Login onLogin={handleLogin}/>}/>
                <Route path="/sign-up" element={<Register onRegister={handleRegister}/>}/>
                <Route path="/" element={
                    <ProtectedRoute element={ Main}
                        loggedIn={isLoggedIn}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        selectedCard={selectedCard}
                        onClose={closeAllPopups}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                  }
                />
           </Routes>
            <Footer />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handelUpdateUser}/>

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

            <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipOpen} isSuccess={isLoggedIn}/>

          </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
