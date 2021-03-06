// CONFIG IMPORTS
import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

// REDUX IMPORTS
import store from '../../../redux-config/store/store.js';
import showCurrentTime from '../../../redux-config/actions/actions.js';

class TimeNow extends Component {

	constructor (props) {
		super(props);

		this.state = {
			current_time: ''
		}
	}

	componentWillMount() {
		
		// GET DATE AND TIME TODAY
		var time = new Date().getTime();
		var date = new Date(time);
		var now  = date.toString();
		
		// DISPATCH THE CURRENT TIME TO THE STORE
		store.dispatch({ type: 'SHOW-DATE', payload: now });
	}

	componentDidMount() {		
		var time_now = store.getState()
		this.setState({ current_time: time_now.quake_data[0] });		
	}

	render() {
		return (
			<div className='section-time-now'>
				<p className='section-time-now__heading'>
					Today is {new Date(this.state.current_time).toLocaleString()}
				</p>
			</div>
		)
	}
}

// CONNECTS ALL OUR PROPS BETWEEN COMPONENTS TO THE STATE
function mapStateToProps (state) {

	return {		
		time_now: state.quake_data
	}
}

export default connect(mapStateToProps)(TimeNow);