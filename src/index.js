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
	
	  render() {
		var fontSize = this.props.fontSize;
		var rowHeight = this.props.rowHeight;
		//			alert("fontsize:"+this.props.fontsize);
		//	alert("rowHeight:"+this.props.rowHeight);

	 	return <div><Header/><Filter/><Table fontsize={fontSize} rowHeight={rowHeight}/></div>;
	//return <div><Header/><Table/></div>;
  }
}

ReactDOM.render(<div><Header/><Filter/><Table/></div>, document.getElementById('root'));
