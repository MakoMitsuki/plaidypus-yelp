import React, { Component } from 'react';
import { Link } from "react-router-dom";

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
            <Link to={`/${this.props.restaurant.alias}`}><h2>{this.props.restaurant.name}</h2></Link>
            <p>{this.props.restaurant.rating}</p>
            {this.renderCategories()}
        </div>)
    }
}

export class RestaurantList extends Component {
    renderRestaurantInfo () {
        const RestaruantList = this.props.results.map((restaurant) => {
            return ( <SearchListItem restaurant={restaurant}/> );
        });

        return(
            <div>{RestaruantList}</div>
        )
    }

    renderEmptyState () {
        return (
            <h2>Hang tight! We are working on getting you the list of best brunch spots in your neighbourhood!</h2>
        )
    }

    render() {
        return (<section className="RestuarantList">
            {this.props.results.length ? this.renderRestaurantInfo() : this.renderEmptyState()}
            {!!this.props.errorState}   
        </section>)
    }
}