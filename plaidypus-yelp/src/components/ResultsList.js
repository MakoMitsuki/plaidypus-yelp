import React, { Component } from 'react';
import './ResultsList.css';

export class SearchListItem extends Component {
    renderCategories () {
        const CategoryList = this.props.restaurant.categories.map((category) => {
            return (    
                <div>{category.title}</div>
            );
        });
        return CategoryList;
    }

    render() {
        return (<div>
            <h2>{this.props.restaurant.name}</h2>
            <p>{this.props.restaurant.rating}</p>
            {this.renderCategories()}
        </div>)
    }
}

export class ResultsList extends Component {

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

    renderEmptyState () {
        return (
            <h2>`Hang tight! We are working on getting you the list of best brunch spots in your neighbourhood! `</h2>
        )
    }

    renderRestaurantInfo () {
        const RestaruantList = this.state.results.map((restaurant) => {
            return ( <SearchListItem restaurant={restaurant}/> );
        });

        return(
            <div>{RestaruantList}</div>
        )
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
                <section className="RestuarantList">
                    {this.state.results.length ? this.renderRestaurantInfo() : this.renderEmptyState()}
                    {!!this.state.errorState &&<h1>{this.state.error}</h1>}   
                </section>
            </div>
        )
    }

}