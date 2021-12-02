import { useState, useEffect } from 'react';
import { weatherApiStart } from '../../api/services';
import s from './Info.module.css';

// начальный стейт
const initialState = {
  icon: '',
  city: '',
  country: '',
  temp: '',
  description: '',
  humidity: '',
  speed: '',
};

const Info = () => {
  const [state, setState] = useState(initialState);
  const { icon, city, country, temp, description, humidity, speed } = state;

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //получение местоположения пользователя
  const getLocation = () => {
    if (!navigator.geolocation) {
      return;
    }
    navigator.geolocation.getCurrentPosition(pos);
  };

  //определение координат и запрос по ним
  function pos(position) {
    const latt = position.coords.latitude;
    const long = position.coords.longitude;

    weatherApiStart(latt, long)
      .then(data => {
        setState({
          icon: data.weather[0].icon,
          city: data.name,
          country: data.sys.country,
          temp: data.main.temp_min,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          speed: data.wind.speed,
        });
      })
      .catch(error => console.error(error));
  }

  // адрес иконки
  const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    city && (
      <div className={s.weather}>
        <img src={imgUrl} alt="weather-icon" width="100" />
        <p>
          {city} {country}
        </p>
        <p>{Math.round(temp)}°C</p>
        <p>Now: {description}</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind speed: {speed} m/s</p>
      </div>
    )
  );
};

export default Info;
