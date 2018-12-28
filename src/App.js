import React, { Component } from 'react';
import './App.css';
require('dotenv').config()
const api_key = process.env.REACT_APP_API_KEY;
var data2 = require("./city_list.json");
async function GetData(url)
{
try {
  const response = await fetch(url);
  if(!response.ok)
  {
    throw Error(response.statusText);
  }
  const result = response.json();
  return result;
} catch (error) {
  throw Error(error);
}
}
class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      data : undefined,
      forecast : undefined,
      display: "hidden",
      current_data: undefined,
      status: "display_box",
      status2: "center_content",
      status_of_main: "none_display",
      status_of_btn: "exit_button",
      test:"undefined",
      "search_page":0,
      "btn1": "btn_page1_change",
      "btn2": "btn_page2",
      "search_result": "",
      "current_city": "Ha Noi, Viet Nam"
    }
    this.Change_State = this.Change_State.bind(this);
    this.ShowMore = this.ShowMore.bind(this);
    this.showPosition = this.showPosition.bind(this);
    this.showError = this.showError.bind(this);
    this.GetLocation = this.GetLocation.bind(this);
    this.Change_page1 = this.Change_page1.bind(this);
    this.Change_page2 = this.Change_page2.bind(this);
    this.Search = this.Search.bind(this);
    this.Change_position = this.Change_position.bind(this);
  }
  async componentDidMount()
  {
    const url1 = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Hanoi,VN&appid=" + api_key;
    const today = await GetData(url1);
    const url2 = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=Hanoi,VN&appid=" + api_key;
    const forecast = await GetData(url2);
    this.setState({
      data: today,
      forecast: forecast
    });
    const response = await fetch("./abc.json");
    const result = response.text();
    this.setState({test:result});
  }
  showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }
  GetLocation()
  {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    } else { 
      alert("Geolocation is not supported by this browser.");
    }
  }
  async showPosition(position)
  {
    const url1 = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + api_key;
    const today = await GetData(url1);
    const url2 = "https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + api_key;
    const forecast = await GetData(url2);
    this.setState({
      data: today,
      forecast: forecast,
      current_city:"your city"
    });
    alert("The weather in your city has been updated");
    this.Change_page1();
  }
  Display_today(data)
  {
    return(
      <div className = "weather">
        {this.RenderTime(data)}
        {this.RenderImage(data)}
        {this.RenderMain(data)}
        {this.RenderButton(data)}
      </div>
    );
  }
  Display_forecast(data)
  {
    const forecast = data.map(obj => 
      {
        return <div className = "weather" key = {obj.dt}>
          {this.RenderTime(obj)}
          {this.RenderImage(obj)}
          {this.RenderMain(obj)}
          {this.RenderButton(obj)}
          <br/>
        </div>
      });
      return forecast;
  }
  RenderMain(data)
  {
    let main = data.main;
    return(
    <div>
    <span>Average temperature: {main.temp + " ºC"}</span>
    <br></br>
    <span>Humidity: {main.humidity + " %"}</span>
    <br></br>
    <span>Pressure: {main.pressure + " hPa"}</span>
    </div>
    );
  }
  RenderTime(data)
  {
    let time = data.dt;
    let date = new Date(time*1000).toLocaleString();
    return(
      <span className = "sp1">{date}</span>
    );
  }
  RenderImage(data)
  {
    const icon = data.weather[0].icon;
    const url = "https://openweathermap.org/img/w/" + icon + ".png";
    return (
      <img  src = {url} alt = {data.weather[0].description} className = "w_img" />
    );
  }
  RenderButton(data)
  {
    return(
      <button className = "show_more_btn" onClick = {() => (this.ShowMore(data))}>MORE INFO</button>
    );
  }
  Change_State()
  {
    this.setState({display:"hidden",status:"display_box close_gradually",status2:"none_display",status_of_main:"background1"});
  }
  ShowMore(data)
  {
    this.setState({display : "visible"})
    let main = data.main;
    let rain,snow;
    if(typeof (data.rain) !== "undefined")
    {
      rain = data.rain["3h"];
    }
    else
    {
      rain = "No rain";
    }
    if(typeof (data.snow) !== "undefined")
    {
      snow = data.snow["3h"];
    }
    else
    {
      snow = "No snow";
    }
    this.setState({status:"display_box open_gradually",status2:"center_content slow_down",status_of_main:"modal",status_of_btn:"exit_button slow_down_btn"});
    this.setState({current_data:<div>
      {this.RenderTime(data)}
      {this.RenderImage(data)}
      {this.RenderMain(data)}
      <span>Minimum temperature: {main.temp_min}</span>
      <br/>
      <span>Maximum temperature: {main.temp_max}</span>
      <br/>
      <span>Pressure at sea level: {main.sea_level}</span>
      <br/>
      <span>Pressure at ground level: {main.grnd_level}</span>
      <br/>
      <span>Cloudliness: {data.clouds.all + " %"}</span>
      <br/>
      <span>Wind speed: {data.wind.speed + " m/s"}</span>
      <br/>
      <span>Wind direction: {data.wind.deg + " º"}</span>
      <br/>
      <span>Rain volume for last 3 hours: {rain}</span>
      <br/>
      <span>Snow volume for last 3 hours: {snow}</span>
    </div>});
  }
  Return_search(data)
  {
    const all_data = data.map(name =>
      {
        return <div><button key ={name} className = "sub_btn" onClick = {() => this.Change_position(name)}>{name}</button><br/></div>
      }
    )
    return <div> <h4>Note that this search_box always displays 100 first result. You must use a space between anywords, example: New York</h4>{all_data}</div>
  }
  Search(e)
  {
    let s = e.target.value;
    let k = 0;
    let arr = [];
    for(let i=0;i<data2.length;i++)
    {
      if(data2[i].query_name.toLowerCase().indexOf(s.toLowerCase()) !== -1)
      {
      k++;
      arr.push(data2[i].query_name);
    };
    if(k>=100)
    break;
    }
    this.setState({search_result:this.Return_search(arr)
    });
  }
  async Change_position(name)
  {
    const url1 = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + name +  "&appid=" + api_key;
    const today = await GetData(url1);
    const url2 = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=" + name + "&appid=" + api_key;
    const forecast = await GetData(url2);
    this.setState({
      data: today,
      forecast: forecast,
      current_city:name
    });
    alert("The weather in the city choosed has been updated");
    this.Change_page1();
  }
  Change_page1()
  {
    this.setState({btn1:"btn_page1_change",btn2:"btn_page2",search_page:0,status:"none_display"});
  }
  Change_page2()
  {
    this.setState({btn2:"btn_page2_change",btn1:"btn_page1",search_page:1});
  }
  render() {
    return (
    (this.state.data && this.state.forecast) 
    ?
    (
    (!this.state.search_page)
    ?
      <div className = "background1 float-up">
      <button className = "btn_get_location" onClick = {this.GetLocation}>Weather in your current location</button>
      <button onClick = {this.Change_page1} className = {this.state.btn1}>Weather</button>
      <button onClick = {this.Change_page2} className = {this.state.btn2}>Search city</button>
      <div className ={this.state.status_of_main}> {/*It is possible to use scroll_to function here to keep the same position instead of using a div*/}
      <div className = {this.state.status}>
      <button className = {this.state.status_of_btn} onClick = {this.Change_State}>X</button>
      <div className = {this.state.status2}>
       NOTE: The today box never has informations about snow and rain
       <br/>
       <br/>
       {this.state.current_data}
       </div>
      </div> 
      </div>
      <h4 align = "center">Simple weather forecast redesigned interface by <a href = "https://www.facebook.com/profile.php?id=100006826129122"><font color = "aqua">Lưu Khánh Tùng</font></a> from HSGS</h4>
      <h4 align = "center">This is the current weather in {this.state.current_city}</h4>
      <h1 align = "center">Today</h1>
      {this.Display_today(this.state.data)}
      <h1 align = "center">Forecast</h1>
      {this.Display_forecast(this.state.forecast.list)}
      <h4 align = "center">Sponsored by <a href = "https://openweathermap.org/"><font color = "aqua">Openweathermap</font></a></h4>
      </div>
    :
    (
    <div className = "float-up">
    <button className = "btn_get_location" onClick = {this.GetLocation}>Weather in your current location</button>
    <button onClick = {this.Change_page1} className = {this.state.btn1}>Weather</button>
    <button onClick = {this.Change_page2} className = {this.state.btn2}>Search city</button>
    <h4 align = "center">Simple weather forecast redesigned interface by <a href = "https://www.facebook.com/profile.php?id=100006826129122"><font color = "aqua">Lưu Khánh Tùng</font></a> from HSGS</h4>
    <h4 align = "center">This is the current weather in {this.state.current_city}</h4>
    <input className = "below_input" onChange = {this.Search}></input>
    <div className = "search_box">{this.state.search_result}</div>
    <h4 align = "center" className = "source_of_sponsor">Sponsored by <a href = "https://openweathermap.org/"><font color = "aqua">Openweathermap</font></a></h4>
    </div>
    )
    )
    : 
    <div>Loading ...</div>
    );
  }
}
export default App;
