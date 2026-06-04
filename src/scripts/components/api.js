
const config = { 
  baseUrl: "https:/my_mesto_ad",
  headers: {
    authorization: "my_token",
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
