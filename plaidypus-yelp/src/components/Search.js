import React, { Component } from 'react';
import './ResultsList.css';
import { RestaurantList } from './RestaurantList.js'

import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    useParams
  } from "react-router-dom";

export class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            errorState: null,
            loading: false,
        };
    }

    //function to get information from API 
    getRestaurantsFromApi (locationSearched) {
        this.setState({ loading: true })

        fetch(`/fetchRestaurants/${locationSearched}`).then( response => response.json())
            .then((response) => {
                console.log(response)
                this.setState({ results: response, loading: false })
            })
            .catch((err) => {
                this.setState({ errorState: `Sorry we coudln't find information related to the location you search, do you want to try something else?`, loading: false })
        })
    }

    handleSearchChange = (e) => {
        this.setState({
            searchLocationQuery: e.target.value
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.getRestaurantsFromApi(this.state.searchLocationQuery);
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={(e) => this.handleFormSubmit(e)}>
                    <label htmlFor = 'location'>I am looking for restaurants near </label>
                    <input type = 'text' id = 'location' placeholder = 'address, neighbourhood, city, province or postal code' onChange = {this.handleSearchChange}/>
                    <button type = 'submit'>Search</button>
                </form>
                <Router>
                    <Switch>
                        <Route exact path="/" children={<RestaurantList results={this.state.results} errorState={this.state.errorState} />} />
                        <Route path="/:id" children={<Child />} />
                    </Switch>
                </Router>
                
            </div>
        )
    }

}
  
function Child() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
  
    return (
      <div>
        <h3>ID: {id}</h3>
        <Link to="/">Go Back</Link>
      </div>
    );
}