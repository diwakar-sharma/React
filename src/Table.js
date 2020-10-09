//For React
import React from 'react';
import jsondata from './temp/projectdata.json';
import docicon from './images/ficon.png';


//For Grid
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import './styles/dashboardstyles.css';


var colorIndex = 3;
var colors = ['12px', '13px', '14px', '20px'];
var fontsize = '12px';
var rowHeight = 20;

export default class Table extends React.Component {
	
	constructor(props){
		super(props);
		this.divStyle={
			float:"right",
			width: "calc(100% - 20px)",
			height:"90vh",
			minWidth :"90%"
		};

		//var cellfontSize = this.props.fontSize;
		//alert("cellfontSize:"+cellfontSize);
		this.state = {
         columnDefs: [
			 {  headerName: "Type",
				field: "attr_CRRTestType",
				width : 70, 
				flex: 1
			},
			 { headerName: "Name", 
			 field: "name",
			 width  : 125 
			}, 
			 { headerName: "State", 
			 field: 'status',
			 width  : 90,
			 flex: 1
			},
			 { headerName: "Prospect P/N",
			  field: 'attr_CRRPartNumber', 
			  width  : 135 ,
			},
			 { headerName: "Prospect",
			  field: 'attr_CRRProspectReference',
			  width  : 125 ,
			  flex: 1
			},
			 { headerName: "Product Range", 
			 field: "prospect_product_range",
			 width  : 125, 
			 
			},
			 { headerName: "Originator", 
			 field: "attr_Originator_show",
			 width  : 120 , 
			 
			},
			 { headerName: "Technician", 
			 field: "attr_CRRBenchSpecialist_show",
			  width  : 135 ,
			},
			 { headerName: "Bench", 
			 field: "attr_CRRTestBench_show",
			  width : 100 , 
		
			},
			 { headerName: "Test End Date", 
			 field: "state_Complete_actual_show",
			  width : 115, 
			},
			 { headerName: "Result", 
			 field: "attr_CRRTestResults",
			 width : 80, 
			},
			{ headerName: "Doc", 
			 maxWidth : 80, 
			 minWidth : 60, 
			 flex: 1,
			 cellRenderer: function(params) {
					let newLink = '<img src="'+docicon+'" alt="Carraro" />';
					return newLink;
				}
			 
			},
			
			   ],
			   defaultColDef: {
				/*wrapText: true,*/
               /*flex: 1,*/
            /* cellStyle:{"fontSize" : cellfontSize ,"textAlign": "left"}*/
	  },

			   	   rowData: [],
				    getRowStyle: function () {
        return { fontSize: fontsize ,verticalAlign: "middle"};
      }
    }
	
	}
	
	componentDidUpdate(previousProps, previousState) {
		/*if(colorIndex==3)
		colorIndex= 0
			else 
		colorIndex++
	    */
		fontsize = this.props.fontSize;
		//rowHeight = this.props.rowHeight;
		//alert("rowHeight:"+rowHeight);
		this.gridApi.redrawRows();
	}
	onGridReady = params => {
    this.gridApi = params.api;
	this.gridApi.setHeaderHeight(25);
	var updateData =(data)=>{
		this.setState({rowData:data});
	}
	// 	     const httpRequest = new XMLHttpRequest();
	// 
    // httpRequest.open(
    //   'GET',
    //   'http://localhost:8080/RestWS/rest/DashboardWebservice/rtests'
    // );
    // httpRequest.send();
    // httpRequest.onreadystatechange = () => {
    //   if (httpRequest.readyState === 4 && httpRequest.status === 200) {
	//   console.log(httpRequest.responseText)
    //   updateData(JSON.parse(httpRequest.responseText));
    // }
    //};
	updateData(jsondata);
  };
  
getRowHeight = (params) => {
    return rowHeight;
  };

	prepareTable= ()=>{
		var prepareDiv = <div id="target" className="ag-theme-alpine" style={this.divStyle}>
		  	<AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
		  defaultColDef={this.state.defaultColDef}
		  rowSelection={this.state.rowSelection}
		/* statusBar={this.state.statusBar}*/
		/* sideBar={this.state.sideBar}*/
		  getRowHeight={this.getRowHeight}
		  onGridReady={this.onGridReady}
		  frameworkComponents={this.state.frameworkComponents}
		  getRowStyle={this.state.getRowStyle}
		  >
        </AgGridReact>
		</div>;
		return prepareDiv ;
	};

  	render = () =>this.prepareTable();
}
