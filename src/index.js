// CONFIG IMPORTS
import React, { Component } from 'react'; 
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import style from './frontend/styles/main.css';

// COMPONENT IMPORTS
import Navbar from './frontend/components/navbar/navbar.jsx';
import TimeNow from './frontend/components/time-now/time_now.jsx';

// REDUX IMPORTS
import store from './redux-config/store/store.js';

class Index extends Component {
  render() {
  	return (
  		<div>
  			<Navbar />

  			<div className='container-fluid'>
  				
  				<div className="row">
				  
				  <div className="col-md-5 p-2">
				  	<TimeNow />
				  </div>
				  
				  <div className="col-md-7 p-2">
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