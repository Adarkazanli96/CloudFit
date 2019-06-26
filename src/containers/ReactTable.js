import Pagination from './Pagination'
import React from 'react'
import PropTypes from "prop-types";
import { render } from "react-dom";
import ReactTable from "react-table";

import LineChart from '../components/LineChart'

import "react-table/react-table.css";

import Collapsible from 'react-collapsible';

import triangleOpen from '../assets/images/sheet_list_icons/triangle-open.png'
import triangleClosed from '../assets/images/sheet_list_icons/triangle-closed.png'
import ellipsisIcon from '../assets/images/sheet_list_icons/ellipsis.png'


import './ReactTable.css'
import 'react-table/react-table.css'



class table extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      logs: []
    }
  }

  formatDate = (d) =>{
    let date = new Date(d);
       let day = date.toDateString();
      let res = day.split(" ")
      let time = date.toLocaleTimeString();
      date = res[1] + " " + res[2] + ", " + res[3] + " " + time;
      return date;
  }

  componentWillReceiveProps(nextProps){
    if(this.state.logs.length != nextProps.logs.length){
      this.setState({logs: nextProps.logs})
    }
  }

    render(){
      

      const columns = 
        [
          {
            id: 1,
        Header: "DATE",
        accessor: (d) => d,
        Cell: d => <span onClick = {() => this.props.delete(d.value._id)}>{this.formatDate(d.value.data.workoutDate)}</span>,
        width: 150,
        className : "react-row",
        headerClassName : "react-header"

      },
      {
        Header: "DURATION",
        accessor: "data.duration",
        width: 150,
        className : "react-row"

      },
      {
        Header: "CALORIES",
        accessor: "data.caloriesBurned",
        width: 150,
        className : "react-row"

      },
      {
        id: 'notes',
        Header: "NOTES",
        accessor: d => d.data.notes,
        width: 200,
        className : "react-row"

      },
      {
        Header: "GRAPH",
        accessor: "data.filteredRecords",
        sortable: false,
        Cell: props => <div><Collapsible transitionTime = {100}
        trigger={<span className = "trigger"><img src = {triangleClosed}/>Show</span>}
        triggerWhenOpen = {<span className = "trigger"><img src = {triangleOpen}/>Hide</span>}><LineChart records = {props.value} width = {"100%"} height = {"300px"} /><div className = "heart-rates">Max Heart Rate: {"maximumHeartRate"}</div>
        <div className = "heart-rates">Mean Heart Rate: {"meanHeartRate"}</div></Collapsible>
          
          </div>,
        width: 300,
        
        className : "react-row"

      }
    ]

        /*resizable={false}*/
        console.log('table is rerendering with these logs', this.props.logs)
        return(
        <ReactTable
        
        PaginationComponent={Pagination}
        data={this.state.logs}
        defaultPageSize= {12}
        className = {"react-tab"}
        columns={columns}
        loading = {false}
        loadingText= {'LOADING...'}
        noDataText = {''}
  />

        )
    }

}

export default table;