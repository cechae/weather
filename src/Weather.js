import React from 'react';

const Weather = (props) => {
    
    return (
        <div className="weather-info">
            {props.city && <h1 className="loc">{props.city}</h1>}
            {props.timeNow && <p>{props.timeNow}</p>}
            {props.temperature && props.temp_min && props.temp_max&&
            <div style={{display:"flex"}}>
                <p className="temp shown">{props.temperature}{'\u00b0'}F</p>
                <div className="high" style={{display:'flex', flexDirection:"column"}}>
                    <p className="">High: {props.temp_max}{'\u00b0'}F</p>
                    <p className="">Low: {props.temp_min}{'\u00b0'}F</p>
                </div>

            </div>

            }
            
            {props.humidity && <p className="shown">Humidity: {props.humidity}%</p>}
            {props.description && <p className="shown">Conditions:  {props.description}</p>}
            {props.error && <p className="shown error">{props.error}</p>}
        </div>
    )
}
export default Weather;