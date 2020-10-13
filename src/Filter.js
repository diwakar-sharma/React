//For React
import React from 'react';
import CustomStatsToolPanel from './CustomStatsComponent.jsx';
import expanded from './images/expanded.svg';
//For Grid

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


//import 'ag-grid-enterprise';

import './styles/dashboardstyles.css';
//import FontSizeChanger from 'react-font-size-changer';



export default class Filter extends React.Component {
	constructor(){
		super();
		this.divStyle={
			float:"left",
			width:"20px",
			height:"89vh",
			position: "relative",
			backgroundColor: '#d9d9d9',
			paddingTop:"5px",
		};
		
		this.filterdivStyle={
			position:"absolute",
			float:"right",
			width:"90%",
			height:"90vh",
			top:"20px",
			visibility: "hidden"
		};
		this.filterbuttonStyle={
			float:"left",
			width:"20px",
			backgroundColor: '#b3b3b3',
			paddingTop:"3px"
		};
		this.fieldHeaderstyle={
			position:"absolute",
			float:"left",
			left:"20px",
			height:"20px",
			paddingTop:"3px",
			paddingLeft:"5px",
			fontSize:"12px",
			fontWeight:"bolder",
			fontFamily: "Arial"
		};
		}

	
	
	toggleDiv = () => {
		var ele4 = document.getElementById("filterlabel");
		var ele3 = document.getElementById("SideBarDiv");
		var ele2 = document.getElementById("target");
		var ele1 = document.getElementById("filterDivForm");

		if(ele1.style.visibility=="hidden"){
			ele1.style.visibility="visible";
			ele1.style.width="90%";
			ele3.style.width="125px";
			ele4.style.width="125px";
			ele2.style.width="calc(100% - 125px)";
		} else {
			ele1.style.visibility="hidden";
			ele1.style.width="0%";
			ele2.style.width="calc(100% - 20px)";
			ele3.style.width="20px";
		}
	}
	prepareHeader =() => {
		var htmlsttnt = <div id="SideBarDiv" style={this.divStyle} >
		<span style={this.filterbuttonStyle} onClick={()=>this.toggleDiv()} id = "Sidebutton" ><img src={expanded} alt="Carraro" width="15px" height="15px"  /></span>
		<span style={this.fieldHeaderstyle} id="filterlabel">FILTER BY</span>
		<div style={this.filterdivStyle} id="filterDivForm"><CustomStatsToolPanel filterTable = {this.props.filterTable}/></div>
		</div>;
		return htmlsttnt;
	}
	render = ()=> this.prepareHeader();
}


