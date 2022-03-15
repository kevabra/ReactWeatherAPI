import React from 'react';
import './App.css';

class WeatherResult extends React.Component {
  constructor(props) {
    super(props);
    let name_val = (this.props.country != '') ? this.props.city + "," + this.props.country : this.props.city;

   

    this.state = {
      name: name_val,
      temperature: this.props.temperature,
      description: this.props.description,
      imageLink: this.props.imageLink
    };
  }

  // example api endpoint/request: 
  //https://api.openweathermap.org/data/2.5/weather?lat=39.6417629&lon=-77.7199932&appid=71e775c79529fd50aaefa8d695d32ff3
  // how to get weather icons: https://openweathermap.org/weather-conditions

  render() {
    return (
      <div id="weatherBox">
        <h2 id="weatherBoxName">{this.state.name}</h2>
        <h3>{this.state.temperature}<sup>o</sup>F</h3>
        <h3>{this.state.description}</h3>
        <img id="weatherBoxImage" src={this.state.imageLink} />
      </div>
    );
  }
}

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      data: {},
      input: "",
      weatherResults: [],
      longLatInput: "",
      zipCodeInput: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.doCity = this.doCity.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.doLongLat = this.doLongLat.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.doZip = this.doZip.bind(this);
  }
  
  async componentDidMount() {
    let lat = -30;
    let lon = 20;
    const API_KEY = "71e775c79529fd50aaefa8d695d32ff3";

    // whenever you first start the app, it shows you the local location's weather data

    const api_link = "https://api.openweathermap.org/data/2.5/weather?q=Massachusetts,usa&appid=71e775c79529fd50aaefa8d695d32ff3";
    
    let api_call = await fetch(api_link);
    let api_result = await api_call.json();
      this.setState({
        latitude: lat,
        longitude: lon,
        data: api_result,
        input: this.state.input,
        weatherResults: this.state.weatherResults,
        longLatInput: this.state.longLatInput,
        zipCodeInput: this.state.zipCodeInput
      });
        
        
        
      


    console.log(api_result);
  }

  componentDidUnmount() {

  }

  handleChange(event) {
    this.setState({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      data: this.state.data, 
      input: event.target.value,
      weatherResults: this.state.weatherResults,
      longLatInput: this.state.longLatInput,
      zipCodeInput: this.state.zipCodeInput
    });
  }

  handleChange2(event) {
    this.setState({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      data: this.state.data,
      input: this.state.input,
      weatherResults: this.state.weatherResults,
      longLatInput: event.target.value,
      zipCodeInput: this.state.zipCodeInput
    });
  }

  handleChange3(event) {
    this.setState({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      data: this.state.data,
      input: this.state.input,
      weatherResults: this.state.weatherResults,
      longLatInput: this.state.longLatInput,
      zipCodeInput: event.target.value
    })
  }

  async doLongLat(event) {
    let values = document.getElementById("longitudeLatitude").value.split(",");
    console.log("values: " + values);
    if (values.length != 2 || values[1].trim() == '') {
      alert("Incorrect format: Enter longitude plus a comma followed by latitude, such as: -73.935242, 40.730610 or -123.116226, 49.246292");
      this.setState({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        data: this.state.data,
        input: this.state.input,
        weatherResults: this.state.weatherResults,
        longLatInput: ""
      });
      return;
    }
    let longitude = values[0];
    let latitude = values[1];
    console.log(longitude);
    if (latitude[0] == " ") {
      latitude.split("").splice(0, 1);
    }
    console.log(latitude);

    let newLatitude = latitude + 0;
    console.log("new: " + newLatitude);

    this.setState({
      latitude: latitude,
      longitude: longitude,
      data: this.state.data,
      input: this.state.input,
      weatherResults: this.state.weatherResults,
      longLatInput: this.state.longLatInput 
    });
    


    const api_link = "https://api.openweathermap.org/data/2.5/weather?lat=" + parseFloat(latitude) + "&lon=" + longitude + "&appid=71e775c79529fd50aaefa8d695d32ff3";

    let api_call = await fetch(api_link);
    let api_result = await api_call.json();
    console.log(api_result);
    if (!api_result.weather) {
      alert("Location not found: Enter longitude plus a comma followed by latitude, such as: -73.935242, 40.730610 or -123.116226, 49.246292");
      this.setState({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        data: api_result,
        input: this.state.input,
        weatherResults: this.state.weatherResults,
        longLatInput: ""
      });
      return;
    }

    
      this.setState({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        data: api_result,
        input: this.state.input,
        weatherResults: this.state.weatherResults,
        longLatInput: ""
      });
    let name = (this.state.data) ? this.state.data.name : "";
    let visibility = (this.state.data) ? this.state.data.visibility : "";
    let temperature = (this.state.data.main) ? this.state.data.main.temp : "";
    let description = (this.state.data.weather) ? this.state.data.weather[0]['description'] : "";
    let results = (this.state.weatherResults) ? this.state.weatherResults : "";
    let imageLink = (this.state.data.weather) ? this.state.data.weather[0]['icon'] : "";

    if (this.state.data.weather) {
      imageLink = "https://openweathermap.org/img/wn/" + imageLink + "@2x.png";
      name = this.state.data.name;
    }

    if (name == "") {
      name = "Longitude: " + longitude + " Latitude: " + latitude;
    }

    if (this.state.data.main) {
      temperature -= 273.15;
      temperature *= 1.8000;
      temperature += 32;
      temperature = parseFloat(temperature).toFixed(2);
    }

    let weatherResult = <WeatherResult city={name} country={""} temperature={temperature} description={description} imageLink={imageLink}/>
    let newWeatherResults = [...this.state.weatherResults, weatherResult];

    this.setState({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      data: api_result,
      input: "",
      weatherResults: newWeatherResults
    });

  }
  //api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
  //https://api.openweathermap.org/data/2.5/weather?lat=39.6417629&lon=-77.7199932&appid=71e775c79529fd50aaefa8d695d32ff3

  async doZip(event) {
    let values = document.getElementById("zipCode").value.split(",");
    if (values.length != 2 || values[1].trim() == '') {
      alert("Incorrect format: Enter zip code plus a comma followed by country name, such as: 10001, usa or 85001, usa");
      this.setState({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        data: this.state.data,
        input: this.state.input,
        weatherResults: this.state.weatherResults,
        longLatInput: this.state.longLatInput,
        zipCodeInput: ""
      });
      return;
    }
    let zipCode = values[0];
    let country = values[1];
    console.log(zipCode);
    console.log(country);
    if (country[0] == " ") {
      country.split("").splice(0, 1);
    }
    country = country.trim();
    console.log(country);
    //zip={zip code},{country code}&appid={API key}
    const api_link = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "," + country + "&appid=71e775c79529fd50aaefa8d695d32ff3";

    let api_call = await fetch(api_link);
    let api_result = await api_call.json();
    console.log(api_result);
    if (!api_result.name) {
      alert("Location not found: Enter zip code plus a comma followed by country name, such as: 10001, us or 85001, us");
      this.setState({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        data: api_result,
        input: this.state.input,
        weatherResults: this.state.weatherResults,
        longLatInput: this.state.longLatInput,
        zipCodeInput: ""
      });
      return;
    }

    
      this.setState({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        data: api_result,
        input: this.state.input,
        weatherResults: this.state.weatherResults,
        longLatInput: this.state.longLatInput,
        zipCodeInput: ""
      });
    let name = (this.state.data) ? this.state.data.name : "";
    let visibility = (this.state.data) ? this.state.data.visibility : "";
    let temperature = (this.state.data.main) ? this.state.data.main.temp : "";
    let description = (this.state.data.weather) ? this.state.data.weather[0]['description'] : "";
    let results = (this.state.weatherResults) ? this.state.weatherResults : "";
    let imageLink = (this.state.data.weather) ? this.state.data.weather[0]['icon'] : "";

    if (this.state.data.weather) {
      imageLink = "https://openweathermap.org/img/wn/" + imageLink + "@2x.png";
    }

    if (this.state.data.main) {
      temperature -= 273.15;
      temperature *= 1.8000;
      temperature += 32;
      temperature = parseFloat(temperature).toFixed(2);
    }

    let weatherResult = <WeatherResult city={name} country={country} temperature={temperature} description={description} imageLink={imageLink}/>
    let newWeatherResults = [...this.state.weatherResults, weatherResult];

    this.setState({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      data: api_result,
      input: "",
      weatherResults: newWeatherResults
    });
  }

  async doCity(event) {
    let values = document.getElementById("cityName").value.split(",");
    if (values.length != 2 || values[1].trim() == '') {
      alert("Incorrect format: Enter city name plus a comma followed by country name, such as: New York, usa or Vancouver, canada");
      this.setState({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        data: this.state.data,
        input: "",
        weatherResults: this.state.weatherResults,
        longLatInput: this.state.longLatInput
      });
      return;
    }
    let city = values[0];
    let country = values[1];
    console.log(city);
    if (country[0] == " ") {
      country.split("").splice(0, 1);
    }
    console.log(country);
    const api_link = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=71e775c79529fd50aaefa8d695d32ff3";

    let api_call = await fetch(api_link);
    let api_result = await api_call.json();

    if (!api_result.name) {
      alert("Location not found: Enter city name plus a comma followed by country name, such as: New York, usa or Vancouver, canada");
      this.setState({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        data: api_result,
        input: "",
        weatherResults: this.state.weatherResults
      });
      return;
    }

    
      this.setState({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        data: api_result,
        input: "",
        weatherResults: this.state.weatherResults
      });
    let name = (this.state.data) ? this.state.data.name : "";
    let visibility = (this.state.data) ? this.state.data.visibility : "";
    let temperature = (this.state.data.main) ? this.state.data.main.temp : "";
    let description = (this.state.data.weather) ? this.state.data.weather[0]['description'] : "";
    let results = (this.state.weatherResults) ? this.state.weatherResults : "";
    let imageLink = (this.state.data.weather) ? this.state.data.weather[0]['icon'] : "";

    if (this.state.data.weather) {
      imageLink = "https://openweathermap.org/img/wn/" + imageLink + "@2x.png";
    }

    if (this.state.data.main) {
      temperature -= 273.15;
      temperature *= 1.8000;
      temperature += 32;
      temperature = parseFloat(temperature).toFixed(2);
    }

    let weatherResult = <WeatherResult city={city} country={country} temperature={temperature} description={description} imageLink={imageLink}/>
    let newWeatherResults = [...this.state.weatherResults, weatherResult];

    this.setState({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      data: api_result,
      input: "",
      weatherResults: newWeatherResults
    });

  }

  render() {
    let name = (this.state.data) ? this.state.data.name : "";
    let visibility = (this.state.data) ? "visibility: " + this.state.data.visibility + " meters" : "";
    let temperature = (this.state.data.main) ? this.state.data.main.temp : "";
    let min_temp = (this.state.data.main) ? this.state.data.main.temp_min : "";
    let max_temp = (this.state.data.main) ? this.state.data.main.temp_max : "";
    let description = (this.state.data.weather) ? this.state.data.weather[0]['description'] : "";
    let results = (this.state.weatherResults) ? this.state.weatherResults : "";
    if (this.state.data.main && temperature && min_temp && max_temp) {

      temperature -= 273.15;
      temperature *= 1.8000;
      temperature += 32;
      temperature = parseFloat(temperature).toFixed(2);

      min_temp -= 273.15;
      min_temp *= 1.8000;
      min_temp += 32;
      min_temp = parseFloat(min_temp).toFixed(2);

      max_temp -= 273.15;
      max_temp *= 1.8000;
      max_temp += 32;
      max_temp = parseFloat(max_temp).toFixed(2);
    }
    return (
      <div id="container-fluid">
        <h1>Weather API</h1>
        <div id="row">
          <input type="text" id="cityName" placeholder="Find weather from city, country" value={this.state.input} onChange={this.handleChange} />
          <button id="cityBtn" onClick={this.doCity}>Search for City</button>
        </div>
        <div id="row">
          <input type="text" id="longitudeLatitude" placeholder="Find weather from longitude, latitude" value={this.state.longLatInput} onChange={this.handleChange2} />
          <button id="longLatBtn" onClick={this.doLongLat}>Search for City</button>
        </div>
        <div id="row">
          <input type="text" id="zipCode" placeholder="Find weather from zipcode, country" value={this.state.zipCodeInput} onChange={this.handleChange3} />
          <button id="zipCodeBtn" onClick={this.doZip}>Search for City</button>
        </div>
          <h3>{name}</h3>
          <h3>{visibility}</h3>
          <h3>temperature: {temperature}<sup>o</sup>F</h3>
          <h3>min: {min_temp}<sup>o</sup>F, max: {max_temp}<sup>o</sup>F</h3>
          <h3>{description}</h3>
        
        <div id="results">
          {results}
        </div>
      </div>
    );
  }
}

export default Weather;
