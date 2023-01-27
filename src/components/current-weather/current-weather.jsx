import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  // console.log(data);
  // console.log(data.weather[0].icon);

  const day = new Date().toLocaleString("en-US", { day: "2-digit" });
  const month = new Date().toLocaleString("en-US", { month: "long" });

  return (
    <article className="widget">
      <div className="weatherIcon">
        <img
          src={`${process.env.PUBLIC_URL}/icons/${data.weather[0].icon}.svg`}
          alt={data.weather[0].description}
        ></img>
      </div>
      <div className="downRow flex justify-start">

      <div className="weatherData">
       <h1 className="temperature">{Math.round(data.main.temp)}&deg;</h1>
        <div className="descAndCity">
          <h2 className="description">{data.weather[0].description}</h2>
          <h3 className="city">{data.city}</h3>
        </div>
      </div>
      <div className="date">
        <h4 className="month" id="month">
          {month}
        </h4>
        <h5 className="day" id="day">
          {day}
        </h5>
      </div>
      </div>


    </article>
    
  );
};
export default CurrentWeather;
