import React, { useEffect } from "react";
import DatePicker from "react-date-picker";
import { useState } from "react";
import axios from "axios";
import "./DataDisplay.css";
import "C:/Users/alias/OneDrive/Desktop/Web development/React_Projects/Travel_Website/travel-website/node_modules/react-date-picker/dist/DatePicker.css";

export default function Datadisplay() {
  const [route, setRoute] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);

  const [displaySourceCity, setDisplaySourceCity] = useState([]);

  useEffect(() => {
    const url = "http://localhost:4000/source";
    axios
      .get(url, {
        headers: {
          "x-apikey": "59a7ad19f5a9fa0808f11931",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
        responseType: "json",
      })
      .then((response) => {
        setDisplaySourceCity(response.data);
      });
  }, []);

  const [displayDestination, setDisplayDestination] = useState([]);

  useEffect(() => {
    const url = "http://localhost:4000/destination";
    axios
      .get(url, {
        headers: {
          "x-apikey": "59a7ad19f5a9fa0808f11931",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
        responseType: "json",
      })
      .then((response) => {
        setDisplayDestination(response.data);
      });
  }, []);

  const setSource = (e) => {
    const selected = displaySourceCity?.find((x) => x.city === e.target.value);
    let newSrc = { ...routeRequest };
    newSrc.source = selected.city;
    setRouteRequest(newSrc);
    // console.log(`You have selected city ${selected.city} of ${selected.state} as source city`);
  };

  const setDest = (e) => {
    const selected = displayDestination?.find((x) => x.city === e.target.value);
    let newSrc = { ...routeRequest };
    newSrc.dest = selected.city;
    setRouteRequest(newSrc);
    // console.log(`You have selected city ${selected.city} of ${selected.state} as destination`);
  };

  const [displayBus, setDisplayBus] = useState([]);
  const [routeRequest, setRouteRequest] = useState({ source: "", dest: "" });
  const currentRoute = async (source, destination) => {
    const url1 = "http://localhost:4000/userRoute";
    const url2 = "http://localhost:4000/results";

    try {
      await axios.post(url1, routeRequest);
      try {
        const response = await axios.get(url2, {
          headers: {
            "x-apikey": "59a7ad19f5a9fa0808f11931",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
          responseType: "json",
        });
        let htmlStr = ``;
        if (response.data.available === "Yes")
          htmlStr = `<p>A bus is available from ${response.data.source} to ${response.data.destination}</p>`;
        else
          htmlStr = `<p>No bus is available from ${response.data.source} to ${response.data.destination}</p>`;
        console.log(htmlStr);
        // return htmlStr;
      } catch (error1) {
        console.log(error1);
      }
    } catch (error2) {
      console.log(error2);
    }
  };

  return (
    <div className="mainData">
      <div className="element">
        <label>Source : </label>
        <select name="source" id="source" onChange={setSource}>
          <option value="select preferred city">Select preferred city</option>
          {displaySourceCity.map((e) => {
            return (
              <option key={e.id} value={e.city}>
                {e.city}
              </option>
            );
          })}
        </select>
      </div>
      <div className="element">
        <label>Destination : </label>
        <select name="destination" id="destination" onChange={setDest}>
          <option value="select preferred city">Select preferred city</option>
          {displayDestination.map((e) => {
            return (
              <option key={e.id} value={e.city}>
                {e.city}
              </option>
            );
          })}
        </select>
      </div>
      <div className="element">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="element">
        <button type="button" onClick={currentRoute}>
          Find Routes
        </button>
      </div>
      {/* <div className="element">
        <button type="button" onClick={book}>Book</button>
      </div> */}
    </div>
  );
}
