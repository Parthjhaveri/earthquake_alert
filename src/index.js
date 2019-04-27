// CONFIG IMPORTS
import React, { Component } from 'react'; 
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import style from './frontend/styles/main.css';


// COMPONENT IMPORTS
import Navbar from './frontend/components/navbar/navbar.jsx';
import TimeNow from './frontend/components/time-now/time_now.jsx';
import QuakeFeed from './frontend/components/feed/feed.jsx';
import change_pin from './frontend/components/feed/feed-table.jsx';
import QuakeMap from './frontend/components/map/quake_map.jsx';
import Graphmain from './frontend/components/graph/graph-main.jsx';
import ControlDashboardMain from './frontend/components/ctrl-dashboard/ctrl-dash-main.jsx';
import SignIn from './frontend/components/sign-in/sign-in-page.jsx';

// REDUX IMPORTS
import store from './redux-config/store/store.js';

class Index extends Component {
	constructor(props) {
		super(props);

		this.disable_overlay = this.disable_overlay.bind(this);

		this.state = {
			cor_lat: '',
			cor_lng: '',
			table_node: ''
		}
	}

	componentDidMount() {
		var map_overlay = document.getElementById('map-scroll-ovlay');
		
		document.addEventListener('keypress', 
			(event) => {				
				if (event.key === 'm') { 
					map_overlay.style.display = 'none'; 
				}
			}
		);		
	}

	disable_overlay(event) {
		var map_overlay = document.getElementById('map-scroll-ovlay');		
		if (event.currentTarget.classList.contains('map-overlay')) {
			map_overlay.style.display = 'none';
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
				  
				  <div className="col-md-5 app-main-wrapper__time-now mt-2">
				  	<TimeNow />
				  </div>
				  
				  <div className="col-md-7 app-main-wrapper__heading mt-2">
				  	<p>Dating back to past 2 days - above Mag 3</p>
				  </div>

				</div>

				<div className="row">
				  
				  <div className="col-md-5 mt-2 px-2">
				  	<QuakeFeed />
				  </div>
				  
				  <div className="col-md-7 p-0">
				  	<div className='map-wrap'>
		  				<QuakeMap map_change={change_pin} table_body={this.state.table_node} coord_lat={this.state.cor_lat} coord_lng={this.state.cor_lng} />
		  				<div className='map-overlay pt-0' id='map-scroll-ovlay' onClick={this.disable_overlay}>
		  					<h2>Click here to access Map</h2>
		  					<h2>or press the <span>'M'</span> key</h2>
		  				</div>
		  			</div>
				  </div>

				</div>
				<ControlDashboardMain />
				<Graphmain />

  			</div>
  		</div>
  	)
  }
}

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route path="/" exact component={SignIn} />
			<Route path="/dash" component={Index} />
		</Router>
	</Provider>,
	document.getElementById("index"));