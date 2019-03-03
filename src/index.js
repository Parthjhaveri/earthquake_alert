// CONFIG IMPORTS
import React, { Component } from 'react'; 
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import style from './frontend/styles/main.css';


// COMPONENT IMPORTS
import Navbar from './frontend/components/navbar/navbar.jsx';
import TimeNow from './frontend/components/time-now/time_now.jsx';
import QuakeFeed from './frontend/components/feed/feed.jsx';
import change_pin from './frontend/components/feed/feed-table.jsx';
import QuakeMap from './frontend/components/map/quake_map.jsx';
import Graphmain from './frontend/components/graph/graph-main.jsx';

// REDUX IMPORTS
import store from './redux-config/store/store.js';

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cor_lat: '',
			cor_lng: '',
			table_node: ''
		}
	}

	change_coords(event) {
				
		var feed_table = event._targetInst.stateNode.parentNode.parentNode;

		this.setState({ 
			cor_lat: event.target.dataset.lat,
			cor_lng: event.target.dataset.lng,
			table_node: feed_table
		});

	}

  	render() {
  	return (
	  
  		<div className='app-main-wrapper' onClick={this.change_coords.bind(this)}>
  				<Navbar />
  			
  			<div className="container-fluid">
		
  				<div className="row">
				  
				  <div className="col-md-5 app-main-wrapper__time-now mt-2 px-2">
				  	<TimeNow />
				  </div>
				  
				  <div className="col-md-7 app-main-wrapper__heading mt-2 px-2">
				  	<p>Dating back to past 2 days - above Mag 3</p>
				  </div>

				</div>

				<div className="row">
				  
				  <div className="col-md-5 mt-2 px-2">
				  	<QuakeFeed />
				  </div>
				  
				  <div className="col-md-7">
				  	<QuakeMap map_change={change_pin} table_body={this.state.table_node} coord_lat={this.state.cor_lat} coord_lng={this.state.cor_lng} />
				  </div>

				</div>

				<Graphmain />

  			</div>
  		</div>
  	)
  }
}

ReactDOM.render(
	<Provider store={store}>
		<Index />
	</Provider>,
	document.getElementById("index"));