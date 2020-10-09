import React, { Component } from "react";
import ReactDOM from 'react-dom';
import logo_carraro from './images/logo_carraro.gif';
import setting from './images/setting.png';
import './styles/dashboardstyles.css';
import Table from './Table.js';
import Filter from './Filter.js';
import 'font-awesome/css/font-awesome.min.css';

export class RowHeightSetting extends Component {
	render(){
		var label= "ROW HEIGHT";
		return (<>
		<span style={{width:"100%",fontSize:15, fontWeight:"bold"}}>
			{label}
		</span>
		<table style={{width:"100%",fontSize:11}}>
			<tr><td>{"Compact"}</td><td><input name="rowHeight" value= "Compact" checked type="radio"/></td></tr>
			<tr><td>{"Normal"}</td><td><input name="rowHeight" value= "Normal"  type="radio"/></td></tr>
			<tr><td>{"Wide"}</td><td><input name="rowHeight" value= "Wide" type="radio"/></td></tr>
		</table>
		</>
		);
	}
}

export class FontSize extends Component {
	render(){
		var label= "FONT SIZE";
		return (<>
		<span style={{width:"100%",fontSize:15, fontWeight:"bold"}}>
			{label}
		</span>
		<table style={{width:"100%",fontSize:11}}>
			<tr><td>{"Small"}</td><td><input name="FontSize" value= "11px" checked type="radio"/></td></tr>
			<tr><td>{"Normal"}</td><td><input name="FontSize" value= "13px"  type="radio"/></td></tr>
			<tr><td>{"Large"}</td><td><input name="FontSize" value= "15px"  type="radio"/></td></tr>
		</table>
		</>
		);
	}
}

export class OnOpening extends Component {
	render(){
		var label= "ON OPENING";
		return (<>
		<span style={{width:"100%",fontSize:15, fontWeight:"bold"}}>
			{label}
		</span>
		<table style={{width:"100%",fontSize:11}}>
			<tr><td>{"No Changes"}</td><td><input name="OnOpening" checked type="radio"/></td></tr>
			<tr><td>{"Use current filter as default" }</td><td><input name="OnOpening" type="radio"/></td></tr>
			<tr style={{height:11}}><td></td><td></td></tr>
		</table>
		</>
		);
	}
}


export class PopUp extends Component {
	constructor(){
		super();
		this.settingLableHostNoStyle = {
			height: "40px",
			backgroundColor:"#8c8c8c"
		};
		this.settingsStyle = {
			height: "130px",
			backgroundColor:"#cccccc",
			paddingTop:20,
			paddingLeft:20
		};
		this.settingsSaveStyle = {
			height: "40px",
			backgroundColor:"#cccccc",
			position: "relative",
		};
	}

  handleClick = () => {
   this.props.toggle();
  };
  
	applySettings =()=>{
	   this.props.updateSettings();
		var fontSize ="";
		var rowHeight ="";
		 var ele = document.getElementsByName('FontSize'); 
			for(var i = 0; i < ele.length; i++) { 
				if(ele[i].checked) 
				fontSize= ele[i].value; 
			}

		 var ele1 = document.getElementsByName('rowHeight'); 
            for(i = 0; i < ele.length; i++) { 
				if(ele1[i].checked) 
					rowHeight= ele1[i].value; 
            } 
		this.props.updateSettings(fontSize);
		this.props.toggle();
	}
	render() {
	var serverCOnt= "Host=_R:1";
	return (
		<div className="modal">
		<div className="modal_content"  style ={{fontFamily:"Calibri"}}>
		<div id = "settingLableHostNo" style={this.settingLableHostNoStyle}>
			<span style ={{float:"left",paddingTop: 10 ,paddingLeft: 2}}><img src={setting} alt="Carraro" width="17px" height="17px" /></span><span style ={{float:"left", fontSize:20,fontFamily:"Calibri" ,paddingTop: 6 ,paddingLeft: 3}}> Settings</span>
			<span style ={{float:"right", fontSize:20,fontFamily:"Calibri" ,paddingTop: 6 ,paddingRight: 3}}> {serverCOnt}</span>
	 </div>
	 <div id = "settings" style={this.settingsStyle}>
	 <table>
	 <tr>
	<td style ={{width:"33%"}}><RowHeightSetting/></td>
	<td style ={{width:"30%", paddingLeft:20}}><FontSize/></td>
	<td style ={{width:"36%", paddingLeft:20}}><OnOpening/></td>
	</tr>
	 </table>
	 </div>
	<div id = "SaveSattings" style={this.settingsSaveStyle}>
				<div style={{fontWeight:"bold", position:"absolute", width:"30%", left:"40%", bottom:10}}>
					<button id ="DiscardBtn" onClick={this.handleClick} style={{padding: "5px 15px",border: "none",outline: "none",backgroundColor: "#cccccc",color:"#8c8c8c" }}> DISCARD</button>
					<button id ="ApplyBtn" onClick= {() =>{
//						this.props.updateSettings("abc");
						var fontSize ="";
						var rowHeight ="";
						var ele = document.getElementsByName('FontSize'); 
						for(var i = 0; i < ele.length; i++) { 
							if(ele[i].checked) 
							fontSize= ele[i].value; 
						}
						var ele1 = document.getElementsByName('rowHeight'); 
						for(i = 0; i < ele.length; i++) { 
							if(ele1[i].checked) 
								rowHeight= ele1[i].value; 
						} 
						this.props.updateSettings(fontSize);
						this.handleClick();
						} }style={{padding: "5px 15px",border: "none",outline: "none",backgroundColor: "#8c8c8c",color:"white"}}>APPLY</button>
				</div>
	
	 </div>
	</div>
	</div>
  );
 }
}

class Header extends React.Component {
	constructor(){
		super();
		this.titlespanstyle={
			color: "black",
			fontFamily: "Arial",
			fontWeight: "bold",
			fontSize: "20px",
			paddingLeft: "25px",
			verticalAlign:"top"
		}
		this.spanstyle={
			float:"right"
		}
		this.spanstyle1={
			float:"right",
			backgroundColor:"#cccccc",
			width:"250px"
		}
		this.logoStyle={
			paddingLeft:"10px"
		}
		this.state = {
			seen: false
		};
	}
	togglePop = () => {
		this.setState({
		seen: !this.state.seen
	});
	};
	
	
	updateFunction = (val)=>{
		this.props.updateSettings(val);
	}

	openRequestedPopup =()=> {
	var windowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
	window.open("./public/index.html", "CNN_WindowName", windowFeatures);
	}
	prepareHeader =() => {
		var htmlsttnt = <div id="headerDiv" style = {this.logoStyle}>
		<img src={logo_carraro} alt="Carraro" width="120px" height="25px" />
		<span style={this.titlespanstyle}>Validation Archive</span>
		<div id="profileImage" onClick={this.openRequestedPopup}>
		VF
		</div>
		<span style={this.spanstyle} id="settingIcon" onClick={this.togglePop}>
		<img src={setting} class="js-btn" alt="Carraro" width="23px" height="23px" />
		</span>
		{this.state.seen ? <PopUp toggle={this.togglePop} updateSettings ={this.updateFunction} /> : null}
		<span style={this.spanstyle1}>
		<form><input type="text" placeholder ="Find On Page" class="searchPage"/></form>
		</span>

		</div>;
		return htmlsttnt;
	}



	render = ()=> this.prepareHeader();
  	
}


export default Header;
