import React, {Component} from 'react';
import './App.css';
import Weather from './Weather';
import Form from './form';
import Forecast from './Forecast';
import Convert from './Convert';


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

  componentDidMount = () => {
    let d = document.getElementById("container")
    console.log(d)
    d.className+=" show";

    

  }

  getWeather = async(e) => {
    const city = e.target.elements.city.value;
   
    // https://api.openweathermap.org/data/2.5/weather?q=new%20york,us&appid=dcde117d11e87b2ce285dbabf22a66bf
    //target api => https://api.openweathermap.org/data/2.5/forecast?q=London&appid=b6907d289e10d714a6e88b30761fae22
    
    e.preventDefault();
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.state.apikey}`);
    console.log(api_call)
    const forecast_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.state.apikey}`);
    console.log(api_call)
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
    if (city) {
      let temp = new Date().toString().slice(0,15);
      console.log(temp)
      timeNow += temp;
      timeNow += `  ${this.formatAMPM(new Date())}`;
      console.log(timeNow)
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
        <div className="navbar">
          <h1> Weather </h1>
          <Form className="input search-bar gogo" loadWeather={this.getWeather}/>
        </div>
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
        </div>
      </div>
    );
  }
}
export default App;
