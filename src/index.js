//For React
import React from 'react';
import ReactDOM from 'react-dom';
//FOR Jquery 
//import $ from 'jquery';
import Header from './Header.js';

//For Grid
import Table from './Table.js';
import Filter from './Filter.js';




export default class Body extends React.Component {
	constructor(){
		super();
		this.state={
			tableFontSize:"11px"
		};
	}
	
/*	updateSettings = () =>{
		this.setState({
			tableFontSize:"5px"
		});
		alert("this.setState:"+this.state.tableFontSize);
	}
*/
  updateSettings = (val) => {
	//alert("this.setState:"+val);
	this.setState({
			tableFontSize:val
		});
		this.forceUpdate();
  }
  
	render() {
		var rowHeight = this.props.rowHeight;
		return <div><Header updateSettings = {this.updateSettings}/><Filter/><Table fontSize={this.state.tableFontSize} rowHeight={rowHeight}/></div>;
  }
}

ReactDOM.render(<Body/>, document.getElementById('root'));
