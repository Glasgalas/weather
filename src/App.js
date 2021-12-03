import { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import { TailSpin } from 'react-loading-icons';

import SearchBar from './components/SearchBar';
import SliderBar from './components/SliderBar';
import Error from './components/Error';
import Empty from './components/Empty';

import { weatherApiStart, weatherApi } from './api/services';

import s from './App.module.css';

const Info = lazy(() =>
  import('./components/Info' /* webpackChunkName: "info" */),
);

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
  const [empty, setEmpty] = useState(false);
  // const [firstUse, setFirstUse] = useState(true);

  //получение местоположения пользователя
  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      return;
    }
    navigator.geolocation.getCurrentPosition(pos);
  }, []);

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

  // действие при загрузке
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  //поиск по городу
  const fetch = query => {
    if (!query) {
      setEmpty(true);
      setError(false);
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
          setEmpty(false);
        })
        .catch(error => {
          setError(true);
          setEmpty(false);
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
    <div
      className={[
        (temp > 30 && s.bg1) ||
          (temp === 30 && s.bg1) ||
          (temp > 25 && temp < 30 && s.bg2) ||
          (temp > 20 && temp < 26 && s.bg3) ||
          (temp > 15 && temp < 21 && s.bg4) ||
          (temp > 10 && temp < 16 && s.bg5) ||
          (temp === 10 && s.bg6) ||
          (temp > 5 && temp < 10 && s.bg7) ||
          (temp > -1 && temp < 6 && s.bg8) ||
          (temp > -6 && temp < 0 && s.bg9) ||
          (temp > -10 && temp < -5 && s.bg10) ||
          (temp === -10 && s.bg11) ||
          (temp < -10 && s.bg11),
        s.wrapper,
      ].join(' ')}
    >
      <SearchBar fetch={fetch} />

      {!city && error && <Error />}
      {empty && !error ? (
        <Empty />
      ) : (
        <Suspense
          fallback={
            <TailSpin className={s.loader} stroke="#06bcee" speed={2} />
          }
        >
          <Info
            icon={icon}
            city={city}
            country={country}
            temp={temp}
            description={description}
            humidity={humidity}
            speed={speed}
          />
        </Suspense>
      )}
      {city && !empty && <SliderBar temp={temp} changeTemp={changeTemp} />}
    </div>
  );
}

export default App;
