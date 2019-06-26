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

    render(){
        console.log('table is rerendering')
        return(

        <ReactTable
        resizable={false}
        PaginationComponent={Pagination}
        data={this.props.logs}
        defaultPageSize= {12}
        className = {"react-tab"}
        columns={[
          {
        Header: "Workout Date",
        accessor: "data.workoutDate",
        Cell: props => <span onClick = {() => alert("suh dude")}>{props.value}</span>,
        width: 150,
        className : "react-row"
      },
      {
        Header: "Duration",
        accessor: "data.duration",
        width: 150,
        className : "react-row"

      },
      {
        Header: "Calories",
        accessor: "data.caloriesBurned",
        width: 150,
        className : "react-row"

      },
      {
        id: 'notes',
        Header: "Notes",
        accessor: d => d.data.notes,
        width: 200,
        className : "react-row"

      },
      {
        Header: "Graph",
        accessor: "data.filteredRecords",
        Cell: props => <div><Collapsible transitionTime = {100}
        trigger={<span className = "trigger"><img src = {triangleClosed}/>Show</span>}
        triggerWhenOpen = {<span className = "trigger"><img src = {triangleOpen}/>Hide</span>}><LineChart records = {props.value} width = {"100%"} height = {"300px"} /><div className = "heart-rates">Max Heart Rate: {"maximumHeartRate"}</div>
        <div className = "heart-rates">Mean Heart Rate: {"meanHeartRate"}</div></Collapsible>
          
          </div>,
        width: 300,
        className : "react-row"

      }
    ]}
  />

        )
    }

}

export default table;