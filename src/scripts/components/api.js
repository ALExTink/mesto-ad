//Работа с сервером
const config = { // Получение данных для работы с сервером
  baseUrl: "ВСТАВЬ_АДРЕС_СЕРВЕРА",
  headers: {
    authorization: "ВСТАВЬ_ТОКЕН",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => { //Првоерка ответа от сервера
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getUserInfo = () => { // Получение данных пользователя с сервера
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
};

const getInitialCards = () => { // Список карточек с сервера
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

export { getUserInfo, getInitialCards };