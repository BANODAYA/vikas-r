import React, { Component } from 'react';
import axios from 'axios';

class RentalCalculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            response:{},
        };
    }

     componentDidMount() {
        this.setState({loading: true})
     fetch("http://localhost:5000/api/users/rentalCalculator")
       .then(response => response.json())
       .then(data => {
         this.setState({
           response: data
         })
       })
    }

    render() {
        return (
            <div>
                <p>{this.state.response}</p>
            </div>
        );
    }
}
var cal = new (RentalCalculator);
export default cal=cal;