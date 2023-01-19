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

    const scrollable = document.querySelector("#scrollable");
  // console.log(scrollable);

    // if (scrollable) {
    //   scrollable.addEventListener("wheel" , event => {
    //     console.log("klement1");
    
    //     if (event.wheelDelta > 0) {
    //       this.scrollLeft -= 100;
    //       console.log("klement");
    //     } else {
    //       this.scrollLeft += 100;
    //     }
      
    //   },  { passive: true})
    // }else{console.log("object");}
  // console.log(data.list);
  return (
    <div className=" flex flex-col items-start overflow-auto scroll-smooth whitespace-nowrap	 w-[99%] p-10" id="scrollable">

      <Accordion
        allowZeroExpanded
        className="accordionWrap flex justify-space-between gap-5"
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
                    src={`${process.env.PUBLIC_URL}/icons/${item.weather[0].icon}.svg`}
                    className="icon-small"
                    alt="weather"
                  />
                  <div className=" text-[1.3rem] text-[#ffffff]	">
                    <label className="description">
                      {item.weather[0].description} &nbsp;
                    </label>
                    <label className="min-max text-[2rem] text-[#ffffff]">
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
    </div>
  );
};

export default Forecast;
