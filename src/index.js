import React, { Component } from 'react';
import ReactDOM from "react-dom";

import Navbar from './frontend/components/navbar/navbar.jsx';
import style from './frontend/styles/main.css';

class Index extends Component {
  render() {
  	return (
  		<div>
  			<Navbar />
  		</div>
  	)
  }
}

ReactDOM.render(<Index />, document.getElementById("index"));