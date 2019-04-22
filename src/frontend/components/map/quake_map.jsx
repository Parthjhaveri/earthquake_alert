// CONFIG IMPORTS
import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { Map, Marker, Popup, GeoJSON, TileLayer } from 'react-leaflet';

// REDUX IMPORTS
import store from '../../../redux-config/store/store.js';
import showCurrentTime from '../../../redux-config/actions/actions.js';

import change_pin from '../feed/feed-table.jsx';
import genereate_table from '../feed/feed-table.jsx';
import FeedTable from '../feed/feed-table.jsx';

class QuakeMap extends Component {

	constructor(props) {
		super(props);

		this.change_location = this.change_location.bind(this);

		this.state = {
			lat: 51.505,
      		long: -0.09,
      		zoom: 4,
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

			// ON CHANGE, SET POSITION TO UPDATED POSITION		
			this.change_location();

		}.bind(this), 1000);

		
	}

	change_location() {		
		
		var position = [this.state.lat, this.state.long];
	
		let table_bod = document.getElementsByClassName('quake-feed-table-body__table-row-dynamic');
		
		// GET & PARSE DYNMAIC LAT, LONG FOR EACH CLICK
		let curr_lat = parseFloat(this.props.coord_lat);
		let curr_lng = parseFloat(this.props.coord_lng);

		// UPDATED DYNAMIC POSITION
		let updated_position = [curr_lat, curr_lng];

		// SET STATE OF COMPONENT TO NEW LAT LONG WHEN TABLE IS CLICKED
		const set_parent_st = () => {
			this.setState({lat: position[0], long: position[1]});
		};
		
		// ATTACH AN EVENT LISTENER TO THE FEED TABLE ROWS & STORE LAT, LONG
		for (var i = 0; i < table_bod.length; i++) {

			var id_arr = [];

			table_bod[i].addEventListener('click', function(event) {		
						
				position[0] = parseFloat(this.children[0].attributes[1].value);
				position[1] = parseFloat(this.children[0].attributes[2].value);
				
				set_parent_st();																	
				
				// ADD UNIQUE ID
				event.target.parentNode.setAttribute('data-key', Math.ceil(Math.random() * 100));
				
				// ADD ACTIVE CLASS ONLY TO SELECTED ROW
				var sibling_nodes = this.parentNode.childNodes;
				
				if (this.classList.contains('quake-feed-table-active-row')) {
					this.classList.remove('quake-feed-table-active-row');
				} 

				else {					
					// SIBLINGS
					for (var i = 0; i < sibling_nodes.length; i++) {
						
						if (sibling_nodes[i].classList.contains('quake-feed-table-active-row')) {
							sibling_nodes[i].classList.remove('quake-feed-table-active-row');
						}
						this.classList.add('quake-feed-table-active-row');
					}
				}

			}); // END CLICK HANDLER		
		}
	}

	render() {
		let position = [this.state.lat, this.state.long];	
		return (
			<div className='section-quake-map pt-2'>
				<Map 
					center={position} 
					zoom={this.state.zoom}
					dragging={true}
				>				

			        <TileLayer

			          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'				          	
			        />
			        <Marker position={position}>
			        	<Popup>
				            Popup for any custom information.
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
