// Конфигурация валидации формы
export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

export const popupAddCardsForm = document.querySelector('.popup_type_card-add');
export const addCardFormElement = popupAddCardsForm.querySelector('.popup__form_type_card-add');

export const popupEditCardsForm = document.querySelector('.popup_type_profile-edit');
export const editFormElement = popupEditCardsForm.querySelector('.popup__form_type_edit');

export const popupEditAvatarForm = document.querySelector('.popup_type_edit-avatar');
export const editAvatarFormElement = popupEditAvatarForm.querySelector('.popup__form_type_edit-avatar');
export const editAvatarButtonElement = document.querySelector('.profile__avatar-editBtn');
export const photoAvatar = document.querySelector('.profile__avatar');

export const deleteCardsPopup = document.querySelector('.popup_type_delete-card');

export const editButtonElement = document.querySelector('.profile__edit-button');
export const closeButtonEditElement = document.querySelector('.popup__close-button_type_edit');
export const popupElementEdit = document.querySelector('.popup_type_profile-edit');
export const formEditElement = document.querySelector('.popup__form_type_edit');
export const nameInput = formEditElement.querySelector('.popup__input_type_name');
export const jobInput = formEditElement.querySelector('.popup__input_type_specialization');
export const profileNameElement = document.querySelector('.profile__title');
export const profileJobElement = document.querySelector('.profile__subtitle');

export const popupElements = document.querySelectorAll('.popup');

export const profileAddButton = document.querySelector('.profile__add-button');
export const popupAddCards = document.querySelector('.popup_type_card-add');
export const addFormElement = popupAddCards.querySelector('.popup__form_type_card-add');
export const closeButtonAddCards = popupAddCards.querySelector('.popup__close-button_type_card-add');
export const nameInputAddCard = popupAddCards.querySelector('.popup__input_type_name');
export const linkInputAddCard = popupAddCards.querySelector('.popup__input_type_link');
export const cardsContainer = document.querySelector('.elements');
export const cardTemplate = document.querySelector('#card-template');

// Получение элементов попапа с полноразмерным изображением
export const popupImage = document.querySelector('.popup_type_image');
export const popupContent = popupImage.querySelector('.popup__image-wrap');
export const closeButtonFullImage = popupContent.querySelector('.popup__close-button_type_full-image');
export const popupElementImage = popupContent.querySelector('.popup__image');
export const popupElementContent = popupContent.querySelector('.popup__image-caption');
