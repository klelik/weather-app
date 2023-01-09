import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );
  console.log(data.list);
  return (
    <>
      <label className="title mt-[3rem] mb-[3rem] text-[2rem] text-[white]">
        Daily Forecast
      </label>
      <Accordion
        allowZeroExpanded
        className="acordionWrap flex justify-space-between gap-5"
      >
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem
            key={idx}
            className="forecastItem hover:scale-110 hover:bg-[hsla(0,9%,97%,0.5)]"
          >
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item flex flex-col  ">
                  <label className="day text-[#334044] text-[1.4rem] font-medium">
                    {forecastDays[idx]}
                  </label>

                  <img
                    src={`${process.env.PUBLIC_URL}/icons/${item.weather[0].icon}.png`}
                    className="icon-small"
                    alt="weather"
                  />
                  <div className=" text-[1.3rem] text-[#334044]	">
                    <label className="description">
                      {item.weather[0].description} &nbsp;
                    </label>
                    <label className="min-max text-[2rem] text-[#717273]">
                      {Math.round(item.main.temp_max - 273.15)}°C
                    </label>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="acordionPanel text-[#334044]">
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure: </label>
                  <label>{item.main.pressure}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity: </label>
                  <label>{item.main.humidity}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds: </label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind speed: </label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level: </label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like: </label>
                  <label>{Math.round(item.main.feels_like - 273.15)}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
