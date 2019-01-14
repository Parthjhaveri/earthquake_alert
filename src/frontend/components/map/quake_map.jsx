// CONFIG IMPORTS
import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

// REDUX IMPORTS
import store from '../../../redux-config/store/store.js';
import showCurrentTime from '../../../redux-config/actions/actions.js';

class QuakeMap extends Component {

	constructor(props) {
		super(props);

		this.handle_map_change = this.handle_map_change.bind(this);

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
	}

	handle_map_change() {
		
	}

	render() {
		const position = [this.state.lat, this.state.long];

		return (
			<div className='section-quake-map'>
				<Map center={position} zoom={this.state.zoom}>
			        <TileLayer
			          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
			        />
			        <Marker position={position}>
			          <Popup>
			            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
			          </Popup>
			        </Marker>
			     </Map>


			</div>
		)

	}

}

function mapStateToProps(state) {
	return {
		e_quakes: state.quake_data
	}
}

export default connect(mapStateToProps)(QuakeMap);
