
const config = { 
  baseUrl: "ВСТАВЬ_АДРЕС_СЕРВЕРА",
  headers: {
    authorization: "ВСТАВЬ_ТОКЕН",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => { 
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getUserInfo = () => { 
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
};

const getInitialCards = () => { 
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

export { getUserInfo, getInitialCards };
