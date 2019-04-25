import React, {Component} from 'react';
import './App.css';
import Weather from './Weather';
import Form from './form';

class App extends Component {
  state = {
    apikey: 'dcde117d11e87b2ce285dbabf22a66bf',
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,

  }
  convert = (kelvin) => {
    let answer = (kelvin - 273.15) * (9/5) + 32;
    return Math.round(answer);
  }

  getWeather = async(e) => {
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${this.state.apikey}`);
    const response = await api_call.json();
    
    // check the status code
    if (response.cod === '404'){
      this.setState({
        error: "Please enter the correct city or country."
      });
      return;
    } 
    const fah = this.convert(response.main.temp);
    if (city && country){
      this.setState({
        temperature: fah,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: ""
      })
    } else {
      this.setState({
       error: "Please enter the values."
      })
    }
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="title-container">
            <h1 className="title-container_title"> Weather App </h1>
            <p className="title-container_subtitle"> Weather conditions around the world! </p>
          </div>
          <div className="input"> 
            <Form loadWeather={this.getWeather}/>
              <Weather 
                temperature={this.state.temperature}
                city={this.state.city}
                country={this.state.country}
                humidity={this.state.humidity}
                description={this.state.description}
                error={this.state.error} />
           </div>
        </div>
      </div>
    );
  }
}
export default App;
