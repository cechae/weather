import React, {Component} from 'react';

import Card from 'react-bootstrap/Card';
import convert from './Convert';
import "./App.css";

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

    constructor(props) {
        super(props)
        this.state = {
            data_0: {
                high: "",
                low: "",
                weather: "",
            },
            data_1: {
                high: "",
                low: "",
                weather: "",
            },
            data_2: {
                high: "",
                low: "",
                weather: "",
            },
            data_3: {
                high: "",
                low: "",
                weather: "",
            },
            data_4: {
                high: "",
                low: "",
                weather: "",
            }


        }
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
                console.log("main is", main)

            
                return (
                    <Card bg="lg" style={{ width: '18rem' }} id={idx}>
                    <Card.Body>
                    <Card.Title>{titleTemp} F</Card.Title>
                    <Card.Text>
                        <div>{timeDisplay}</div>
                        <div>{desc}</div>
                    </Card.Text>
                    </Card.Body>
                    </Card>
                )
            })}
        

        return (

            <div className="page-wrapper">
                {this.props.forecast && 
                <div className="card-wrapper">
                  {forecastCards}
                </div>
                }
            </div>
        
        )
        

    }
}
export default Forecast;