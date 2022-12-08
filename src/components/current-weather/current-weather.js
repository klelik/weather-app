import "./current-weather.css";

const CurrentWeather = ({data}) => {
  return (
    <article className="widget">
      <div className="weatherIcon">
        <img src={`icons/${data.weather[0].icon}.png`}></img>
      </div>
      <div className="weatherData">
        <h1 className="temperature">{Math.round(data.main.temp)}&deg;</h1>
        <h2 className="description">{data.weather[0].description}</h2>
        <h3 className="city">{data.city}</h3>
      </div>
      <div className="date">
        <h4 className="month" id="month"></h4>
        <h5 className="day" id="day"></h5>
      </div>
    </article>
  );
};

export default CurrentWeather;
