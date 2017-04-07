import React, { Component } from 'react';
import './App.css';

class App extends Component {
    state = {
        location: ''
    };

    fetchData = (evt) => { /* … */ };


    changeLocation = (evt) => {
        // set the state.location to user input
        this.setState({ location: evt.target.value });
    }


    render() {
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
            </div>

        )
    };
}

export default App;
