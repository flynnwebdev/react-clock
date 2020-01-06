import React, {Component} from 'react';
import Clock from "./Clock";

class App extends Component {
    state = { 
        latitude: null, 
        errorMessage: null, 
        value: 1, 
        fname: "garret", 
        lname: "blankenship", 
        fullName: null 
    };
    
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({ latitude: position.coords.latitude });
            },
            (error) => {
                this.setState({ errorMessage: "Something went wrong retrieving your location" });
            }
        );

        setInterval(() => {
            this.setState((state, props) => {
                return { value: state.value + 1 };
            });
        }, 1000);
    }

    componentDidUpdate() {
        console.log("updated");
    }

    isItWarm() {
        const { latitude } = this.state;
        const month = new Date().getMonth() + 1;

        if (latitude < 0) {
            if (month < 3 || month > 9) {
                return true;
            } else {
                return false;
            }
        } else {
            if (month < 3 || month > 9) {
                return false;
            } else {
                return true;
            }
        }
    }

    getClockIcon() {
        if(this.isItWarm()) {
            return "sun.svg";
        }

        return "snowflake.svg";
    }

    
    render() {
        const { latitude, errorMessage } = this.state;
        
        return (
            <div>
                {errorMessage || <Clock 
                    icon={ latitude !== null ? this.getClockIcon() : null }
                    timezone={"Sydney/Australia"} 
                    date={new Date()} 
                />}
            </div>
        );
    }
}

export default App;
