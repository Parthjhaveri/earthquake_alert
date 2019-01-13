// CONFIG IMPORTS
import React, { Component } from 'react'; 
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import style from './frontend/styles/main.css';


// COMPONENT IMPORTS
import Navbar from './frontend/components/navbar/navbar.jsx';
import TimeNow from './frontend/components/time-now/time_now.jsx';
import QuakeFeed from './frontend/components/feed/feed.jsx';
import QuakeMap from './frontend/components/map/quake_map.jsx';

// REDUX IMPORTS
import store from './redux-config/store/store.js';

class Index extends Component {
  render() {
  		{
	  		/* 
	  			SKELETON BOOTSTRAP LAYOUT WITH COMPONENTS
	  			BEING RENDERED WHERE NECESSARY
	  		*/	
	  	}
  	return (
	  
  		<div className='app-main-wrapper'>
  				<Navbar />
  			
  			<div className="container-fluid">
		
  				<div className="row">
				  
				  <div className="col-md-5 app-main-wrapper__time-now mt-2 px-2">
				  	<TimeNow />
				  </div>
				  
				  <div className="col-md-7 app-main-wrapper__heading mt-2 px-2">
				  	<p>All Earthquakes below in past hour</p>
				  </div>

				</div>

				<div className="row">
				  
				  <div className="col-md-5 mt-2 px-2">
				  	<QuakeFeed />
				  </div>
				  
				  <div className="col-md-7">
				  	<QuakeMap />
				  </div>

				</div>
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