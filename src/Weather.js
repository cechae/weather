import React from 'react';

const Weather = (props) => {
    
    return (
        <div className="weather-info">
            {props.city && <h1 className="loc">{props.city}</h1>}
            {props.temperature && <p className="temp shown">{props.temperature} F</p>}
            {props.humidity && <p className="shown">Humidity: {props.humidity}%</p>}
            {props.description && <p className="shown">Conditions:  {props.description}</p>}
            {props.error && <p className="shown error">{props.error}</p>}
        </div>
    )
}
export default Weather;