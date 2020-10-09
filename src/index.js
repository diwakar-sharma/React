//For React
import React from 'react';
import ReactDOM from 'react-dom';
//FOR Jquery 
//import $ from 'jquery';
import Header from './Header.js';

//For Grid
import Table from './Table.js';
import Filter from './Filter.js';


function getValueFromBrowserCache(){
		var JSONObj = {};
		var fontSize ="";
		var rowHeight ="";
		if (typeof(Storage) !== "undefined") {
			 var Settings = JSON.parse(localStorage.getItem("Settings"));
			 if(Settings) {
				fontSize =Settings.fontsize ;
				rowHeight =Settings.rowHeight;
			}
			
		} else {
			alert("Sorry, your browser does not support Web Storage...");
		}
		if(!fontSize)
			fontSize ="11px";
		if(!rowHeight)
			rowHeight =20;
		JSONObj ={"fontSize":fontSize,"rowHeight":rowHeight}
		return JSONObj;
}


export default class Body extends React.Component {
	constructor(){
		super();
		this.state={
			tableFontSize:getValueFromBrowserCache().fontSize,
			tableRowHeight:getValueFromBrowserCache().rowHeight
		};
	}
	

updateSettings = (fontsize ,rowHeight , save ) => {
		if(save){
		if (typeof(Storage) !== "undefined") {
			var json ={
				"fontsize": fontsize,
				"rowHeight": rowHeight
			}
			localStorage.setItem("Settings", JSON.stringify(json));
		} else {
			alert("Sorry, your browser does not support Web Storage...");
		}
		}	
		this.setState({
			tableFontSize:fontsize,
			tableRowHeight:20
		});
		this.forceUpdate();
  }
	render() {
		var rowHeight = this.props.rowHeight;
		return <div><Header updateSettings = {this.updateSettings}/><Filter/><Table fontSize={this.state.tableFontSize} rowHeight={this.state.tableRowHeight}/></div>;
  }
}

ReactDOM.render(<Body/>, document.getElementById('root'));
