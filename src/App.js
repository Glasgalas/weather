import SearchBar from './components/SearchBar';
import Info from './components/Info';
import SliderBar from './components/SliderBar';

import { useState, useEffect } from 'react';
import { weatherApiStart, weatherApi } from './api/services';

import './App.css';

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

function App() {
  const [state, setState] = useState(initialState);
  const { icon, city, country, temp, description, humidity, speed } = state;
  const [error, setError] = useState(false);

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

  //поиск по городу
  const fetch = query => {
    if (!query) {
      console.log('first enter your query');
      return;
    } else {
      weatherApi(query)
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
          setError(false);
        })
        .catch(error => {
          setError(true);
          setState(initialState);
        });
    }
  };

  // управление температурой на слайдере
  const changeTemp = e => {
    setState(prev => ({
      ...prev,
      temp: e.target.value,
    }));
  };

  return (
    <>
      <SearchBar fetch={fetch} />
      <Info
        icon={icon}
        city={city}
        country={country}
        temp={temp}
        description={description}
        humidity={humidity}
        speed={speed}
      />
      <SliderBar temp={temp} changeTemp={changeTemp} />
    </>
  );
}

export default App;
