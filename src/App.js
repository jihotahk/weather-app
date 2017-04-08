import React, { Component } from 'react';
import './App.css';
import xhr from 'xhr';
import Plot from './Plot';


var API_KEY = '599849e6048d135ad639a174d2802cb6';

class App extends Component {
    state = {
        location: '',
        data: {},
        dates: [],
        temps: []
    };

    fetchData = (evt) => {
        evt.preventDefault();
        // in case spaces are included in value
        var location = encodeURIComponent(this.state.location);

        var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
        var urlSuffix = '&APPID='+API_KEY+'&units=imperial';
        var url = urlPrefix+ location + urlSuffix;

        // necessary because 'this' inside xhr will be fetchData, not App
        var self = this;

        // call using xhr
        xhr({ url }, (err, data) => {
            var body = JSON.parse(data.body);
            var list = body.list;
            var dates =[];
            var temps =[];
            list.forEach(function(date) {
                dates.push(date.dt_txt);
                temps.push(date.main.temp);
            })

            self.setState({
                data: body,
                dates,
                temps
            });
        });
    };


    changeLocation = (evt) => {
        // set the state.location to user input
        this.setState({ location: evt.target.value });
    }


    render() {
        var currentTemp = 'not loaded yet';
        if (this.state.data.list) {
            currentTemp = this.state.data.list[0].main.temp;
        }

        return (
            <div>
                <h1>Weather</h1>
                <form onSubmit={this.fetchData} >
                    <label>I want to know the weather for
                        <input
                            placeholder={"City, Country"}
                            type="text"
                            value={this.state.location}
                            onChange={this.changeLocation}
                        />
                    </label>
                </form>
                {/*
                  Render the current temperature and the forecast if we have data
                  otherwise return null
                */}
                {(this.state.data.list) ? (
                  <div className="wrapper">
                    <p className="temp-wrapper">
                      <span className="temp">{ currentTemp }</span>
                      <span className="temp-symbol">°C</span>
                    </p>
                    <h2>Forecast</h2>
                    <Plot
                      xData={this.state.dates}
                      yData={this.state.temps}
                      type="scatter"
                    />
                  </div>
                ) : null}
            </div>
        );
    }
}

export default App;
