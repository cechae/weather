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
    const fah = Convert(response.main.temp);

    if (city){
      this.setState({
        now: response,
        temperature: fah,
        city: response.name,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: "",
        forecast: forecastRes.list,
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
                error={this.state.error} />
              
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
