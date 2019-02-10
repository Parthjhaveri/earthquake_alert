// CONFIG IMPORTS
import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

// REDUX IMPORTS
import store from '../../../redux-config/store/store.js';
import showCurrentTime from '../../../redux-config/actions/actions.js';

import change_pin from '../feed/feed-table.jsx';
import genereate_table from '../feed/feed-table.jsx';

class QuakeMap extends Component {

	constructor(props) {
		super(props);

		this.state = {
			lat: 51.505,
      		long: -0.09,
      		zoom: 3,
		}
	}

	componentDidMount() {		

		setTimeout(function() {
			// STORE STATE
			let store_state = store.getState(); 
			
			// FIRST ELEMENT OF ARRAY TO INITIALIZE MAP
			const quake_arr = store_state.quake_data[0]; 
			
			// LAT, LONG
			let quake_long = quake_arr[0].geometry.coordinates[0];
			let quake_lat  = quake_arr[0].geometry.coordinates[1];
			
			// MOST RECENT EARTHQUAKE
			this.setState({ lat: quake_lat, long: quake_long });

		}.bind(this), 1000);
		
		// ADD AN ON-CHANGE TO THE TABLE AND SET STATE OF LAT AND LONG
		console.log(this.props.table_body);
	}

	render() {
		const position = [this.state.lat, this.state.long];
		
		// GET & PARSE DYNMAIC LAT, LONG FOR EACH CLICK
		let curr_lat = parseFloat(this.props.coord_lat);
		let curr_lng = parseFloat(this.props.coord_lng);

		// UPDATED DYNAMIC POSITION
		const updated_position = [curr_lat, curr_lng];
		

		if (position) {
			return (
				<div className='section-quake-map p-2'>
					<Map center={position} zoom={this.state.zoom}>
				        <TileLayer
				          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'				          	
				        />
				        <Marker position={position} />
				     </Map>
				</div>
			)
		} else {
			return (
				<div className='section-quake-map p-2'>
					<h1>Loading...</h1>
				</div>				
			)
		}		

	}

}

function mapStateToProps(state) {
	return {
		e_quakes: state.quake_data
	}
}

export default connect(mapStateToProps)(QuakeMap);
