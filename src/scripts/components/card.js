export const likeCard = (likeButton) => { //Кнопка лайка
  likeButton.classList.toggle("card__like-button_is-active");
};

export const deleteCard = (cardElement) => { //Удаление карточки
  cardElement.remove();
};

const getTemplate = () => { //Клонирование HTML-шаблона
  return document
    .getElementById("card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

export const createCard = ( //Создание карточки на основе данных от пользователя и добавление обработчиков событий
  data, { onPreviewPicture, onLikeIcon, onDeleteCard }) => {
    const cardElement = getTemplate();
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__control-button_type_delete");
    const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;
  if (onLikeIcon) {
    likeButton.addEventListener("click", () => onLikeIcon(likeButton));
  }
  if (onDeleteCard) {
    deleteButton.addEventListener("click", () => onDeleteCard(cardElement));
  }
  if (onPreviewPicture) {
    cardImage.addEventListener("click", () => onPreviewPicture({name: data.name, link: data.link}));
  }
  return cardElement;
};
