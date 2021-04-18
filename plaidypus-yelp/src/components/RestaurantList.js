import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './RestaurantList.scss';
import Badge from 'react-bootstrap/Badge'

export class SearchListItem extends Component {
    renderCategories () {
        const CategoryList = this.props.restaurant.categories.map((category) => {
            return (    
                <Badge variant="secondary" className="categoryBadge">{category.title}</Badge>
            );
        });
        return CategoryList;
    }

    render() {
        return (<div className="SearchListItem">
            <div className="row">
                <div className="col-12">
                    <Link to={`/${this.props.restaurant.alias}`}><h2>{this.props.restaurant.name}</h2></Link>
                </div>
            </div>
            <div className="row">
                <div className="col-6">★{this.props.restaurant.rating}</div>
                <div className="col-6">{this.renderCategories()}</div>
            </div>
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
        return (<section className="RestaurantList">
            {this.props.results.length ? this.renderRestaurantInfo() : this.renderEmptyState()}
            {!!this.props.errorState}   
        </section>)
    }
}