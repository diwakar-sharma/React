import React from 'react';
import './styles/dashboardstyles.css';
import { Slider , Rail ,Handles, Tracks ,Ticks } from 'react-compound-slider'

const sliderStyle = {  // Give the slider some width
  position: 'absolute',
  width: '80%',
  height: 5,
  marginLeft: 5,
/*  border: '1px solid steelblue',*/
  left:0
}

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 5,
  marginTop: 25,
  marginLeft: 5,
  borderRadius: 3,
  backgroundColor: '#b3b3b3',
}

export function Handle({
  handle: { id, value, percent },
  getHandleProps
}) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: -5,
        marginTop: 20,
        zIndex: 2,
        width: 10,
        height: 10,
        border: '2px solid #8c8c8c',
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '5%',
        backgroundColor: 'white',
        color: '#333',
      }}
      {...getHandleProps(id)}
    >
      <div style={{ fontFamily: 'Roboto', fontSize: 9, marginTop: -15 }}>
        {value}
      </div>
    </div>
  )
}

function Track({ source, target, getTrackProps }) {
  return (
    <div
      style={{
        position: 'absolute',
        height: 5,
        zIndex: 1,
        marginTop: 25,
        backgroundColor: '#8c8c8c',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */}
    />
  )
}

function Tick({ tick, count }) {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: 35,
          marginLeft: 5,
          width: 1,
          height: 8,
          backgroundColor: 'silver',
          left: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: 40,
          fontSize: 9,
          textAlign: 'center',
          marginLeft: `${-(100 / count) / 3}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {tick.value}
      </div>
    </div>
  )
}



class CustomStatsToolPanel  extends React.Component {
	constructor(){
		super();
		this.validationoption = "RTEST|RCALC|RPROT";
		this.validationtypes = "FST|HSP|LUB|LUL|NVH|PLC|PLV|PRT|PTC|PTP|PUL|SCT|SPT|TLT|VAR|VLS|DTT|DCG|DCE|PPB|FLD|ECD|DCM|DST|SST|CKT|PSB|DBE|DSS|TDA|HSB|WSB|PLC|FAD|EST|BMP|BCK|PSS|VDL|VSB|VVV|CCD|IMT|SLT|IMT";
		this.validationproducts = "a|b|c|d|e|f"; 
		this.validationState = "Create|Review|Waiting|Planned|Execute|Complete|Report|Rejected|OnHold"; 
		this.validationoptions="RTEST";

		this.fieldstyle={
			width:"100%",
			margin:"5px",
			
		};
		
		this.state={
			types:"FST|HSP|LUB|LUL|NVH|PLC|PLV|PRT|PTC|PTP|PUL|SCT|SPT|TLT|VAR|VLS|DTT|DCG|DCE|PPB|FLD|ECD|DCM|DST|SST|CKT|PSB|DBE|DSS|TDA|HSB|WSB|PLC|FAD|EST|BMP|BCK|PSS|VDL|VSB|VVV|CCD|IMT|SLT|IMT"
		};
		
		this.ResetButton = {
			color:"black"
		};


	}
	
	
	
	onUpdate = (vals) => {
	//this("vals:"+vals);
	var ele2 = document.getElementById("FieldId10");
	var val =vals.join("-");
	ele2.value = val;
	//console.log(vals);
	}
	
	showFieldValueOnHideField = (param) =>{
		var field = document.getElementById("FieldId"+param);
		var fieldVal = "";
		if(field)
		 fieldVal = document.getElementById("FieldId"+param).value;
		//alert("fieldVal"+fieldVal+",param"+param);
		var ele1 = document.getElementById("SpanShow"+param);
		var fieldValArr = fieldVal.split("|");
		var showVal="";
		//alert("fieldValArr.length:"+fieldValArr.length);
		if (fieldValArr.length>1)
			showVal=fieldValArr[0]+"+";
		 else
			showVal=fieldValArr[0];
		ele1.innerHTML = showVal;
		ele1.style.fontWeight = "bold";
	}
	
	setHiddenFieldValue= (checktype,commonFieldChckName, param)=>{
		var allCheckSameFields = document.getElementsByName(commonFieldChckName);
		var ele = document.getElementById(commonFieldChckName+"Multi");
		var ele2 = document.getElementById("FieldId"+param);
		if(checktype=="multi"){
			if(ele.checked){
					ele2.value="All";
				} else {
					ele2.value="";
				}
		} else {
			var fieldVal=[];
			for(var i= 0 ;i<allCheckSameFields.length; i++){
				 var ele1 = allCheckSameFields[i]
				 if(ele1.checked){
					fieldVal.push(ele1.value);
				 }
			}
			
			if(ele2){
				ele2.value="";
				if (allCheckSameFields.length==fieldVal.length){
					ele2.value = "All";
				} else {
					
						ele2.value = fieldVal.join("|");
				}
			}
		}
	}
	
	 handleMultiCheck=(checktype,commonFieldChckName)=>{
		  var allCheckSameFields = document.getElementsByName(commonFieldChckName);
		  var ele = document.getElementById(commonFieldChckName+"Multi");
		 if(checktype=="multi"){
			var check = false;
			if(ele.checked){
				check = true;
			} else {
				check = false; 
			}
			for(var i= 0 ;i<allCheckSameFields.length; i++){
				 var ele1 = allCheckSameFields[i]
				 ele1.checked = check;
			}
		 } else {
				var check = false;
				for(var i= 0 ;i<allCheckSameFields.length; i++){
					 var ele1 = allCheckSameFields[i]
					 check = true;
					 if (!ele1.checked){
						 //alert("check");
						 check = false;
						 break
					 }
				}
				if(ele)
				ele.checked= check;
			
			}
	 }


/*
	repopulateCheckbox =(param)=>{
		var ele1 = document.getElementById("SpanShow"+param);
		var ele2 = document.getElementById("FieldId"+param);
		var ele3= document.getElementById("Submit").value;
		var showValue =ele1.innerHTML
		alert("ele2.value:"+ele2.value);
		if(showValue)
			showValue =showValue.trim();
		if (param=="10")
			return;
		if(ele3!="true"){
		if(ele2)
			ele2.value = showValue;
		var arr2 =  document.getElementsByName("checkbox"+param)
		if(arr2){
			for (var j=0; j<arr2.length; j++ ){
				if(showValue.toUpperCase()=="ALL"||arr2[j].value==showValue)
					arr2[j].checked=true;
				else 
					arr2[j].checked=false;
			}
			}
		}
		if(showValue.toUpperCase()=="ALL"){
			var ele4 = document.getElementById("checkbox"+param+"Multi");
			if(ele4){
				ele4.checked=true;
			}
			
		}
	}
	*/
	repopulateCheckbox =(param)=>{
		var ele1 = document.getElementById("SpanShow"+param);
		var ele2 = document.getElementById("FieldId"+param);
		var ele3= document.getElementById("Submit").value;
		var showValue =ele2.value;
		
		if (!showValue){
			showValue =ele1.innerHTML;
			ele2.value = showValue;
		}
		if(showValue)
			showValue =showValue.trim();
		if (param=="10")
			return;
		
		var arr1 =showValue.split("|");
		var arr2 =  document.getElementsByName("checkbox"+param)
		if(arr2){
			for (var j=0; j<arr2.length; j++ ){
				if(showValue.toUpperCase()=="ALL"||arr1.includes(arr2[j].value))
					arr2[j].checked=true;
				else 
					arr2[j].checked=false;
			}
			}
		
		if(showValue.toUpperCase()=="ALL"){
			var ele4 = document.getElementById("checkbox"+param+"Multi");
			if(ele4){
				ele4.checked=true;
			}
		}
	}
	
	toggleSpanTags =(param)=>{
		var ele1 = document.getElementById("SpanShow"+param);
		var ele2 = document.getElementById("TbodyDiv"+param);
		var ele3 = document.getElementById("MultiCheckSpan"+param);
		var ele4 = document.getElementById("Head2Id"+param);
		var showrows = "none";
		if(ele1.style.display == "block"||ele1.style.display == "") {
			this.repopulateCheckbox(param);
			ele1.style.display = "none";
			ele2.style.display = "block";
			ele4.style.float = "left";
			ele4.style.paddingLeft = "12px";
			if(ele3)
				ele3.style.display = "block";
			showrows="block"
		}
		else {
			this.showFieldValueOnHideField(param);
			ele1.style.display = "block";
			ele2.style.display = "none";
			ele4.style.float = "right";
			ele4.style.paddingLeft = "0px";
			if(ele3)
				ele3.style.display = "none";
			showrows= "none"
		}
		for (var i=1; i<=10 ;i++ ){
				if(i!=param){
				 ele1 = document.getElementById("SpanShow"+i);
				 ele2 = document.getElementById("TbodyDiv"+i)
				 ele3 = document.getElementById("MultiCheckSpan"+i)
				 ele4 = document.getElementById("Head2Id"+i);
				if(ele1.style.display=="none"){
					this.showFieldValueOnHideField(i);
					
					ele1.style.display = "block";
					ele2.style.display = "none";
					ele4.style.float = "right";
					ele4.style.paddingLeft = "0px";
					if(ele3)
						ele3.style.display = "none";
				}
			}
		}
	
	}
	
	filterDashboard =()=>{
		document.getElementById("Submit").value ="true";
		//for (var i=1; i<11 ;i++ ){
		for (var i=1; i<=10 ;i++ ){
		var ele1 = document.getElementById("SpanShow"+i);
		ele1.style.fontWeight = "normal";
		}
	}

	resetfilterFields =()=>{
		//for (var i=1; i<10 ;i++ ){
		for (var i=1; i<=10 ;i++ ){
		var ele1 = document.getElementById("SpanShow"+i);
		ele1.innerHTML = "";

		var ele2 = document.getElementById("FieldId"+i);
		ele2.value = "";

		var arr2 =  document.getElementsByName("checkbox"+i)
		for (var j=0; j<arr2.length; j++ ){
			arr2[j].checked=false;
		}

		var ele3 =  document.getElementById("checkbox"+i+"Multi")
		if(ele3) 
			ele3.checked=false;
		
		}
	}

	onClickProcess = (arg)=>{
	var inputFieldId = arg.InputFieldId;
	var fieldLevelData = arg.FieldLevelData;
	var fieldNo = fieldLevelData.fieldNo;
	if(fieldNo=="1"){
		var checkedRTESTTypeArray =[];
		var arr2 =  document.getElementsByName("checkbox"+fieldNo);
			for (var j=0; j<arr2.length; j++ ){
				if(arr2[j].checked){
				var val =arr2[j].value;
				checkedRTESTTypeArray.push(val);
				}
			}
			if(checkedRTESTTypeArray.includes("RPROT")) {
				for (var j=0; j<arr2.length; j++ ){
				var value =arr2[j].value;
				if(value != "RPROT"){
					arr2[j].checked= false;
					arr2[j].disabled= true;
				}
				}
				this.setState({types: "Test|Procurement|Costumer|Refurbishment"});
			} else  {
				this.setState({types:"FST|HSP|LUB|LUL|NVH|PLC|PLV|PRT|PTC|PTP|PUL|SCT|SPT|TLT|VAR|VLS|DTT|DCG|DCE|PPB|FLD|ECD|DCM|DST|SST|CKT|PSB|DBE|DSS|TDA|HSB|WSB|PLC|FAD|EST|BMP|BCK|PSS|VDL|VSB|VVV|CCD|IMT|SLT|IMT"});
				for (var j=0; j<arr2.length; j++ ){

					arr2[j].disabled= false;
				}
			}
		}
	}


	
	
	prepareCheckbox= (arg)=>{
		var fieldNo = arg.fieldNo;
		var OnClickEvent = arg.OnClickEvent;
		var label = arg.Label;
		
		var fieldName = "checkbox"+fieldNo;
		var value = arg.value;
		var options = arg.options;
		var multicheck = arg.multicheck;
		var fieldId = "FieldId"+fieldNo;
		var optionArr = options.split("|");
		var items = []
		var tableRowName = "TableRow"+fieldNo;
		var tbodyDivId = "TbodyDiv"+fieldNo;
		var spanShowId = "SpanShow"+fieldNo;

			for(var i =0 ; i <optionArr.length; i++){
				var option = optionArr[i];
				var checkboxId = fieldName +"Id"+i;
					items.push(
					<tr name={tableRowName}  >
						<td class="td1 td01">
							<label>{option}</label>
						</td>
						<td class="td2 td01">
						<span  class="fieldValueShow"> 
							<input
							onClick={() => {
								this.handleMultiCheck("single",fieldName);
								if(OnClickEvent){
									this.onClickProcess({"FieldLevelData":arg,"InputFieldId":checkboxId});
								}
								this.setHiddenFieldValue("single",fieldName,fieldNo);
							}}
							id = {checkboxId}
							name={fieldName}
							value={option}
							type="checkbox"
							/>
							</span>
							</td>
					</tr>);

			
		}
		var multicheckId = fieldName+"Multi"
		var multiCheckSpanId = "MultiCheckSpan"+fieldNo
		var divHead2Id = "Head2Id"+fieldNo;
		var htmlsttmnt1 
		if(multicheck){
			htmlsttmnt1 =<span  id ={multiCheckSpanId} name={tableRowName} class="formInputSpan" style={{float:"left"}}>
			<input
			id={multicheckId}
			onClick={() =>{ this.handleMultiCheck("multi",fieldName); this.setHiddenFieldValue("multi",fieldName,fieldNo);} }
			value={option}
			type="checkbox"
			/>
			</span>;
			
			var htmlsttmnt = <div class="table_wrapper"> 
		<div class="header"> 
			<div class="head1">
				<span onClick={() => this.toggleSpanTags(fieldNo)} class="fieldLabel">{label}</span>
			</div>
		<div class="head2"  id ={divHead2Id}>
				<span id={spanShowId}  class="fieldValueShow"> {value}</span>
				<input type="hidden" value = {value} id = {fieldId}/>
					{htmlsttmnt1}
			</div>
		</div>
		<div class="tbody" id={tbodyDivId}>
			<table class="table01">
			{items}
			</table>
		</div>
		</div> 
		return htmlsttmnt;
			
		}
	 	
		var htmlsttmnt = <div class="table_wrapper"> 
		<div class="header"> 
			<div class="head1">
				<span onClick={() => this.toggleSpanTags(fieldNo)} class="fieldLabel">{label}</span>
			</div>
			<div class="head2"  id ={divHead2Id}>
				<span id={spanShowId}  class="fieldValueShow"> {value}</span>
				<input type="hidden" id = {fieldId}/>
			</div>
		</div>
		<div class="tbody" id={tbodyDivId}>
			<table class="table01">
			{items}
			</table>
		</div>
		</div> 
		return htmlsttmnt;
	}
	
	
	
	
	
	
	prepareTextbox= (arg)=>{
		var fieldNo = arg.fieldNo;
		var label = arg.Label;

		var fieldId = "FieldId"+fieldNo;
		var value = arg.value;
		var placeholder = arg.placeholder;

		var items = []
		var tableRowName = "TableRow"+fieldNo;
		var tbodyDivId = "TbodyDiv"+fieldNo;
		var spanShowId = "SpanShow"+fieldNo;
		var divHead2Id = "Head2Id"+fieldNo;
		items.push(<tr name={tableRowName}> <td class="td1 td01" colspan="2">
		<input type="text" placeholder={placeholder} id = {fieldId} style={{width:"110px",fontSize:9}} />
		</td>
		</tr>);
	 	
		var htmlsttmnt = <div class="table_wrapper"> 
		<div class="header"> 
			<div class="head1">
			<span onClick={() => this.toggleSpanTags(fieldNo)} class="fieldLabel">{label}</span>
		</div>
		<div class="head2"  id ={divHead2Id}>
		<span id={spanShowId}  class="fieldValueShow"> {value}</span>
		</div>
		</div>
		<div class="tbody01" id={tbodyDivId}>
		<table class="table01">
		{items}
		</table>
		</div>
		</div>
		return htmlsttmnt;
	}

	preparSlider= (arg)=>{
		var fieldNo = arg.fieldNo;
		var label = arg.Label;

		var fieldId = "FieldId"+fieldNo;
		var value = arg.value;


		var items = []
		var tableRowName = "TableRow"+fieldNo;
		var tbodyDivId = "TbodyDiv"+fieldNo;
		var spanShowId = "SpanShow"+fieldNo;
		var thiscss = {position:"relative", marginTop:15};
		var divHead2Id = "Head2Id"+fieldNo;
		items.push(<tr name={tableRowName}> <td class="td1 td01">
		 <Slider
		rootStyle={sliderStyle}
		domain={[2000, 2020]}
		step={1}
    mode={2}
    values={[2000, 2020] /* three values = three handles */}
	onUpdate={this.onUpdate}
  >
    <Rail>
      {({ getRailProps }) => (
        <div style={railStyle} {...getRailProps()} />
      )}
    </Rail>
    <Handles>
      {({ handles, getHandleProps }) => (
        <div className="slider-handles">
          {handles.map(handle => (
            <Handle
              key={handle.id}
              handle={handle}
              getHandleProps={getHandleProps}
            />
          ))}
        </div>
      )}
    </Handles>
    <Tracks left={false} right={false}>
      {({ tracks, getTrackProps }) => (
        <div className="slider-tracks">
          {tracks.map(({ id, source, target }) => (
            <Track
              key={id}
              source={source}
              target={target}
              getTrackProps={getTrackProps}
            />
          ))}
        </div>
      )}
    </Tracks>
  <Ticks values={[2000, 2020]}>
      {({ ticks }) => (
        <div className="slider-ticks">
          {ticks.map(tick => (
            <Tick key={tick.id} tick={tick} count={ticks.length} />
          ))}
        </div>
      )}
    </Ticks>
	
  </Slider>
		</td>
		</tr>);
	 	
		var htmlsttmnt = <div class="table_wrapper"> 
		<div class="header"> 
			<div class="head1">
			<span onClick={() => this.toggleSpanTags(fieldNo)} class="fieldLabel">{label}</span>
		</div>
		<div class="head2"  id ={divHead2Id}>
		<span id={spanShowId}  class="fieldValueShow"> {value}</span>
		<input type="hidden" id = {fieldId}/>
		</div>
		</div>
		<div class="tbody01" id={tbodyDivId} style ={thiscss}>
		<table class="table01">
		{items}
		</table>
		</div>
		</div>
		return htmlsttmnt;
	}
	
	
	prepareHeader =() => {
		var htmlsttnt = <div id="filterdiv">
			{this.prepareCheckbox({fieldNo:"1", Label:"VALIDATION", name:"VALIDATION",value:"RTEST",options:this.validationoption,OnClickEvent:true, multicheck:false})}
			{this.prepareCheckbox({fieldNo:"2", Label:"TYPE", name:"Type",value:"All",options:this.state.types, multicheck:true})}
			{this.prepareTextbox({fieldNo:"3", Label:"NAME", name:"NAME",value:"All",placeholder:"Type a Name"})}
			{this.prepareCheckbox({fieldNo:"4", Label:"PRODUCT", name:"PRODUCT",value:"All",options:this.validationproducts, multicheck:true})}
			{this.prepareTextbox({fieldNo:"5", Label:"P/N", name:"PartName",value:"All",placeholder:"Type a P/N or description"})}
			{this.prepareTextbox({fieldNo:"6", Label:"PT", name:"PROSPECT",value:"All",placeholder:"Type a PT or description"})}
			{this.prepareTextbox({fieldNo:"7", Label:"CUSTOMER", name:"COSTOMER",value:"All",placeholder:"Type code or description"})}
			{this.prepareTextbox({fieldNo:"8", Label:"PERSON", name:"PERSON",value:"All",placeholder:"Type a person name"})}
			{this.prepareCheckbox({fieldNo:"9", Label:"STATE", name:"STATE",value:"All",options:this.validationState, multicheck:true})}
			{this.preparSlider({fieldNo:"10", Label:"DATE", name:"DATE",value:"All",})}
			<div class="btn-group">
			<input type="hidden" id = "Submit"/>
				<button id ="resetbutton" onClick={()=>this.resetfilterFields()}>Reset</button>
				<button id ="applybutton" onClick={()=>this.filterDashboard()}>Apply</button>
			</div>
		</div>;
		return htmlsttnt;
	}

	render = ()=> this.prepareHeader();
  	
}


export default CustomStatsToolPanel ;
