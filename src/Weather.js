import React, {Component} from 'react';
class Weather extends Component {
    render() {
        console.log(this.props.temperature)
        console.log(this.props.temp_min)
        return (
            <div className="weather-info">
                {this.props.city && <h1 className="loc">{this.props.city}</h1>}
                {this.props.timeNow && <p>{this.props.timeNow}</p>}
                {this.props.temperature && this.props.temp_min && this.props.temp_max&&
                <div style={{display:"flex"}}>
                    <p className="temp shown">{this.props.temperature}{'\u00b0'}F</p>
                    <div className="high" style={{display:'flex', flexDirection:"column"}}>
                        <p className="">High: {this.props.temp_max}{'\u00b0'}F</p>
                        <p className="">Low: {this.props.temp_min}{'\u00b0'}F</p>
                    </div>
                </div>
                }
                {this.props.humidity && <p className="shown">Humidity: {this.props.humidity}%</p>}
                {this.props.description && <p className="shown conditions">{this.props.description}</p>}
                {this.props.error && <p className="shown error">{this.props.error}</p>}
            </div>
        )


    }
    
    
}
export default Weather;