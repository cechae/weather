import React from 'react';

const Weather = (props) => {
    
    return (
        <div className="weather-info">
        {props.country && props.city && <p className="shown location">Location: {props.city},{props.country}</p>}
        {props.temperature && <p className="shown">Temperature: {props.temperature} Fahrenheit</p>}
        {props.humidity && <p className="shown">Humidity: {props.humidity}%</p>}
        {props.description && <p className="shown">Conditions:  {props.description}</p>}
        {props.error && <p className="shown error">{props.error}</p>}
        </div>
    )
}
export default Weather;