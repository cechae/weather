import React, {Component} from 'react';

import Card from 'react-bootstrap/Card';
import convert from './Convert';
import "./App.css";

class Forecast extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let forecastCards;
        if (this.props.forecast) {
           
            let temp = this.props.forecast.slice(0, 5);
            forecastCards = temp.map((i,idx) => {
                let titleTemp = convert(i.main.temp);
                let icon;

            
                return (
                    <Card bg="lg" style={{ width: '18rem' }} id={idx}>
                        <Card.Body>
                        <Card.Title>{titleTemp} F</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk
                            of the card's content.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                )})

        }
        

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