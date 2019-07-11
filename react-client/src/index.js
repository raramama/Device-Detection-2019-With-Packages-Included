import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './ClientMain';
import Spinner from './Spinner';

class App extends React.Component {

    state = { lat: null , errorMessage: ''};
    // Now we want to put a border around the frame 
    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
         }
 
         if (!this.state.errorMessage && this.state.lat){     
            return <SeasonDisplay lat={this.state.lat}/>
            // return <TextFields />
         }
 
         // Here we put the Spinner 
         return <Spinner message="Loading ... Please wait" />;
    }

    render() {        
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );   
    }

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({lat: position.coords.latitude}) , 
            (err) => this.setState({errorMessage: err.message})            
        );
    }

    componentDidUpdate() {
        console.log('My component did update - rerendered');
    }
}

ReactDOM.render(
        <App /> , 
        document.querySelector('#root')
);