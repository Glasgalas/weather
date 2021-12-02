import axios from 'axios';

// ключ
const keyApi = '65f4657c5cc36073e600eb6295ee89b9';

//стандартный путь запроса
axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5/';

// обработка ответа по координатам
export const weatherApiStart = (latt, long) => {
  return axios
    .get(`weather?lat=${latt}&lon=${long}&appid=${keyApi}&units=metric`)
    .then(response => response.data);
};

// обработка ответа по городу
export const weatherApi = query => {
  return axios
    .get(`weather?q=${query}&appid=${keyApi}&units=metric`)
    .then(response => response.data);
};
