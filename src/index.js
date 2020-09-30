//For React
import React from 'react';
import ReactDOM from 'react-dom';
//import getJson from './Dataaction.js';
//FOR Jquery 
import $ from 'jquery';
import Header from './Header.js';
import CustomStatsToolPanel from './CustomStatsComponent.jsx';
import expanded from './images/expanded.svg';

//For Grid
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


import 'ag-grid-enterprise';

import './styles/dashboardstyles.css';
//import FontSizeChanger from 'react-font-size-changer';

class CustomLoadingCellRenderer extends React.Component {
  render() {
    return (
      <div
        className="ag-custom-loading-cell"
        style={{ paddingLeft: '10px', lineHeight: '25px' }}
      >
        <i className="fas fa-spinner fa-pulse"></i>{' '}
        <span> {this.props.loadingMessage}</span>
      </div>
    );
  }
}

class CustomTooltip extends React.Component  {
  getReactContainerClasses() {
    return ['custom-tooltip'];
  }

  render() {
    const data = this.props.api.getDisplayedRowAtIndex(this.props.rowIndex)
	  .data;
	  const fieldName = this.props.name;
	  //const value = data.fieldName;
	  alert("value:"+fieldName);
    return (
      <div
        className="custom-tooltip"
        style={{ backgroundColor: this.props.color || 'white' }}
      >
        <p>
          <span>{data.fieldName}</span>
        </p>
      </div>
    );
  }
}




class Table extends React.Component {
	
	constructor(props){
		super(props);
		this.divStyle={
			float:"left",
			width:"100%",
			height:"90vh",
			//backgroundColor:"yellow"
		};
		this.state = {
         columnDefs: [
			 {  headerName: "Type",
				field: "attr_CRRTestType",
				filter:"text",
				width : 90, 
				tooltipField: 'attr_CRRTestType',
                tooltipComponentParams: { color: '#ececec' ,name:"attr_CRRTestType"},
			},
			 { headerName: "Name", 
			 field: "name",
			 filter: 'text',
			 width  : 125 
			}, 
			 { headerName: "State", 
			 field: 'status',
			 enableRowGroup: true,
			 width  : 90,
			 filter:"text"
			},
			 { headerName: "Prospect P/N",
			  field: 'attr_CRRPartNumber', 
			  width  : 130 ,
			  filter:"text"


			},
			 { headerName: "Prospect",
			  field: 'attr_CRRProspectReference',
			  width  : 125 ,
			  filter:"text" 
			},
			 { headerName: "Product Range", 
			 field: "prospect_product_range",
			 width  : 150, 
			 filter: 'text'
			},
			 { headerName: "Originator", 
			 field: "attr_Originator_show",
			 width  : 135 , 
			 filter: 'text'
			},
			 { headerName: "Technician", 
			 field: "attr_CRRBenchSpecialist_show",
			  width  : 135 , 
			 filter: 'text' 
			},
			 { headerName: "Bench", 
			 field: "attr_CRRTestBench_show",
			  width : 100 , 
			 filter: 'text'
			},
			 { headerName: "Test End Date", 
			 field: "state_Complete_actual_show",
			  width : 150, 
			 filter: 'date'
			},
			 { headerName: "Result", 
			 field: "attr_CRRTestResults",
			 width : 90, 
			 filter: 'text'
			},
			
			   ],
			   defaultColDef: {
/*               flex: 1,
		resizable: true,
*/	tooltipComponent: 'customTooltip',
             cellStyle:{"fontSize" : "12px"}	
	  },
	  tooltipShowDelay: 0,
      frameworkComponents: { customTooltip: CustomTooltip },
	  rowSelection: 'multiple',
	  statusBar: {
        statusPanels: [
          {
            statusPanel: 'agTotalAndFilteredRowCountComponent',
            align: 'left',
          },
          {
            statusPanel: 'agTotalRowCountComponent',
            align: 'center',
          },
          { statusPanel: 'agFilteredRowCountComponent' },
          { statusPanel: 'agSelectedRowCountComponent' },
          { statusPanel: 'agAggregationComponent' },
        ],
      },
      sideBar: {
        toolPanels: [
          {
                id: 'customStats',
                labelDefault: 'Filter',
                labelKey: 'customStats',
                iconKey: 'expanded',
                toolPanel: 'customStatsToolPanel',
          },
        ],
		position: 'left',
      },
  frameworkComponents: { customStatsToolPanel: CustomStatsToolPanel },
			   	  rowData: []
    }
	}
	
	
	
	onGridReady = params => {
    this.gridApi = params.api;
	//this.gridColumnApi = params.columnApi;
	var updateData =(data)=>{
		this.setState({rowData:data});
	}
		     const httpRequest = new XMLHttpRequest();

    httpRequest.open(
      'GET',
      'http://localhost:8080/RestWS/rest/DashboardWebservice/rtests'
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
		  //console.log(httpRequest.responseText)
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };
  


	prepareTable= ()=>{
		var prepareDiv = <div id="target" className="ag-theme-alpine" style={this.divStyle}>
		  	<AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
		  defaultColDef={this.state.defaultColDef}
		  rowSelection={this.state.rowSelection}
		  statusBar={this.state.statusBar}
		  sideBar={this.state.sideBar}
		  onGridReady={this.onGridReady}
		  frameworkComponents={this.state.frameworkComponents}
		  >
        </AgGridReact>
		</div>;
		return prepareDiv ;
	};

  	render = () =>this.prepareTable();
}
function getParams() {
  return {
    suppressQuotes: true,
    columnSeparator: ",",
	 customHeader: "none",
    customFooter: "none",
  };
}


class Body extends React.Component {
	  render() {
	//return <div><Header/><Filter/><Table/></div>;
	return <div><Header/><Table/></div>;
  }
}


//ReactDOM.render(<p>Hello world Diwakar Sharma of the Year!!!</p>, document.getElementById('root'));
ReactDOM.render(<Body/>, document.getElementById('root'));
