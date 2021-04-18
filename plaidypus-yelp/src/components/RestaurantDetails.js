import React, { Component, useState } from 'react';
import {
    Link,
    useParams
  } from "react-router-dom";

export function Photos(props) {

    const photoCollection = []

    if (props.photos) {
        for (const p of props.photos) {
            photoCollection.push(<div><img src={p} alt="Restaurant"/></div>)
        }
    }
    
    return (
        <div>
            {photoCollection}
        </div>
    )
}

export function Address(props) {
    const displayAddress = []

    if (props.address) {
        for (const a of props.address) {
            displayAddress.push(<div>{a}</div>)
        }
    }
    
    return (
        <div>
            {displayAddress}
        </div>
    )
}

export function Hours(props) {
    const displayHours = []

    if (props.hours) {
        for (const a of props.hours) {
            displayHours.push(<div>{a.hours_type}</div>)
            let displayOpen = []
            a.open.map(o => {
                return displayOpen.push(<div>{o.day} : {o.start} - {o.end}</div>)
            })
            displayHours.push(<div>{displayOpen}</div>)
        }
    }


    return (
        <div>
            {displayHours.length > 0 ? displayHours : <i>Hours not available</i>}
        </div>
    )
}

export class Details extends Component {
    render() {
        return (
            <div>
                <div>
                    {this.props.restaurant.name}
                </div>
                <div>
                    <img src={this.props.restaurant.image_url} alt="Restaurant"/>
                </div>
                <div>{this.props.restaurant.is_closed ? "CLOSED" : "OPEN"}</div>
                <div>{this.props.restaurant.transactions} available</div>
                <div>{this.props.restaurant.display_phone}</div>
                <div>{this.props.restaurant.rating} / 5 from {this.props.restaurant.review_count} reviews</div>
                <div>PRICE: {this.props.restaurant.price}</div>
                <div><a href={this.props.restaurant.url}>Visit store page in Yelp</a></div>
                <Address address={this.props.restaurant.location.display_address} />
                <Hours hours={this.props.restaurant.hours} />
                <Photos photos={this.props.restaurant.photos} />
            </div>
        )
    }
} 

export function RestaurantDetails () {
    let { id } = useParams();
    let [details, setDetails] = useState(null);

    fetch(`/fetchRestaurantDetails/${id}`).then( response => response.json())
        .then((response) => {
            setDetails(response);
        })
        .catch((err) => {
                
    })
  
    return (
        <div>
            <div>{details === null ? "" : <Details restaurant={details} />}</div>
            <Link to="/">Go Back</Link>
        </div>
    );
}