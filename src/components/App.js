import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard,setSelectedCard] = React.useState ({});


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
      <div className="page">
        <Header />
        <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            isEditProfilePopupOpen={isEditProfilePopupOpen}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            selectedCard={selectedCard}
            onClose={closeAllPopups}
        />
        <PopupWithForm />
        <Footer />
      </div>
  );
}

export default App;
