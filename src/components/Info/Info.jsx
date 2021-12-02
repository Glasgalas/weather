import s from './Info.module.css';

const Info = ({ icon, city, country, temp, description, humidity, speed }) => {
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
