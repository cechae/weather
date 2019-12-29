import React, {Component} from 'react';
import './App.css';
import Weather from './Weather';
import Form from './form';
import Forecast from './Forecast';
import Convert from './Convert';

const urls = ["clouds", "snow","rain","clear"]
class App extends Component {
  state = {
    apikey: 'dcde117d11e87b2ce285dbabf22a66bf',
    temperature: undefined,
    city: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    forecast: undefined,
    now: undefined,
    temp_min: undefined,
    temp_max: undefined,
    appIsMounted: false,
    bgCls: ""
  }
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

  getWeather = async(e) => {
    const city = e.target.elements.city.value;
    e.preventDefault();
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.state.apikey}`);
    const forecast_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.state.apikey}`);
    const response = await api_call.json();
    const forecastRes = await forecast_call.json();
    // check the status code
    if (response.cod === '404' || forecastRes.cod === '404'){
      this.setState({
        error: "Please enter the correct city."
      });
      return;
    } 
    let timeNow = "";
    let clsName = "";
    if (city) {
      let temp = new Date().toString().slice(0,15);
      timeNow += temp;
      timeNow += `  ${this.formatAMPM(new Date())}`;
      let main = response.weather[0].main;
      switch(main) {
        case 'Clouds':
          clsName = 0;
          break;
        case 'Snow':
          clsName = 1;
            break;
        case 'Rain':
          clsName = 2;  
            break;
        case 'Clear':
          clsName = 3;  
            break;
        default:
          break;
      }
    }

    if (city){
      this.setState({
        now: response,
        temperature: Convert(response.main.temp),
        city: response.name,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: "",
        forecast: forecastRes.list,
        temp_min: Convert(response.main.temp_min),
        temp_max: Convert(response.main.temp_max),
        timeNow: timeNow,
        appIsMounted: true,
        bgCls: clsName
      })
    } else {
      this.setState({
       error: "Please enter the values."
      })
    }
  }
  render() {

    let cls;
    if (this.state.bgCls !== "") {
      cls = this.state.bgCls !== "" ? urls[this.state.bgCls] : urls[0];
      let x = document.querySelector('#app')
      x.className = `App ${cls}`;
    }
    return (
      <div className="App" id="app">
        <div className="navbar">
          <h1> Weather </h1>
          <Form className="input search-bar gogo" loadWeather={this.getWeather}/>
          
        </div>
        {!this.state.appIsMounted &&<div className="title-text">
          <h2> Please type the name of the city to get started. </h2>
        </div>}
      {this.state.appIsMounted &&
        <div className="container" id="container">
         <div className="input"> 
              <Weather 
                temperature={this.state.temperature}
                city={this.state.city}
                humidity={this.state.humidity}
                description={this.state.description}
                error={this.state.error} 
                temp_min={this.state.temp_min}
                temp_max={this.state.temp_max}
                timeNow={this.state.timeNow}
                />
           </div>
           <Forecast
                forecast = {this.state.forecast}
                nowData = {this.state.now}
              />
        </div>}
      </div>
    );
  }
}
export default App;
