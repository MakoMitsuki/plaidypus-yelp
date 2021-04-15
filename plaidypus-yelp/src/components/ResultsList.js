import React, { Component } from 'react';

export class SearchListItem extends Component {
    constructor(props) {
        super(props);
    }

    renderCategories () {
        return [];
    }

    render() {
        return (<div>
            <h2>{this.props.restaurant.name}</h2>
            <p>{this.props.restaurant.rating}</p>
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
            return (    
                <SearchListItem restaurant={restaurant}/>
            );
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
            <div>
                <form onSubmit={(e) => this.handleFormSubmit(e)}>
                    <label htmlFor = 'location' className = 'searchForm__label'>
                        I am looking for restaurants near </label>
                    <input type = 'text' id = 'location' placeholder = 'address, neighbourhood, city, province or postal code' value = {this.state.searchLocationQuery} onChange = {this.handleSearchChange}
                        className = 'searchForm__input'
                        />
                    <button type = 'submit' className = 'searchForm__button'>Search</button>
                </form>
                <section className="RestuarantList">
                    {this.state.results.length ? this.renderRestaurantInfo() : this.renderEmptyState()}

                    {/*conditional rendering for error state - when this.state.errorState is not true*/}
                    {!!this.state.errorState &&
                        <h1>{this.state.error}</h1>
                    }   
                </section>
            </div>
        )
    }

}