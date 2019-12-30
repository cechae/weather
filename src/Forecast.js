import React, {Component} from 'react';

import Card from 'react-bootstrap/Card';
import convert from './Convert';
import "./App.css";

// Clouds, Snow, Rain, Clear, 
const icons = [<i className="icon far fa-cloud-sun"></i>,
<i className="icon fas fa-snowflakes"></i>,
<i className="icon fas fa-cloud-showers-heavy"></i>,
<i className="icon fas fa-sun"></i>
]
class Forecast extends Component {

    formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

    render() {
        let forecastCards;
        if (this.props.forecast) {
           // sort records by the date, get the average temperature and display
            
            forecastCards = this.props.forecast.slice(0,7).map((i,idx) => {
                let titleTemp = convert(i.main.temp);
                let date = new Date( i.dt *1000);
                let timeDisplay = this.formatAMPM(date);
                let desc = i.weather[0].description;
                let main = i.weather[0].main;
                let selIcon;
                switch(main) {
                    case 'Clouds':
                        selIcon = icons[0];
                        break;
                    case 'Snow':
                        selIcon = icons[1];
                        break;
                    case 'Rain':
                        selIcon = icons[2];
                        break;
                    case 'Clear':
                        selIcon = icons[3];
                        break;
                    default:
                        break;
                }
                return (
                    <Card bg="lg" style={{ width: '13rem', margin: "0 2rem" }} id={idx} key={idx}>
                    <Card.Body>
                    <Card.Text>
                        <div className="bold"> {titleTemp}{'\u00b0'}F </div>
                        <div className="icon-div">{selIcon}</div>
                        <div>{desc}</div>
                        <div className="time-display" style={{fontSize: '26px'}}>{timeDisplay}</div>
                    </Card.Text>
                    </Card.Body>
                    </Card>
                )
            })}
        return (
            <div className="page-wrapper">
                {this.props.forecast && 
                <div>
                    <div className="forecast">
                    </div>
                    
                    <div className="card-wrapper">
                    {forecastCards}
                    </div>
                </div>
                }
            </div>
        )
    }
}
export default Forecast;