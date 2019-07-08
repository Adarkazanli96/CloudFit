import Pagination from './Pagination'
import React from 'react'
import ReactTable from "react-table";

import LineChart from '../Reusables/LineChart'

import "react-table/react-table.css";

import Collapsible from 'react-collapsible';

import triangleOpen from '../../../assets/images/sheet_list_icons/triangle-open.png'
import triangleClosed from '../../../assets/images/sheet_list_icons/triangle-closed.png'

import Loader from './Loader'


import './Table.css'
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

  // only chanage the state if the length changes, should not change depending on order change
  componentWillReceiveProps(nextProps){
    if(this.state.logs.length != nextProps.logs.length){
      this.setState({logs: nextProps.logs})
    }
  }

  onRowClick = (state, rowInfo, column, instance) => {
    return {
        onClick: e => {
          if(column.id === 1 || column.id === 6){
            return;
          }

          this.props.select(rowInfo.original);
        }
    }
  }

    render(){
      

      const columns = 
        [
          {
            id: 1,
        Header: "",
        accessor: (d) => d,
        sortable: false,
        Cell: d => d.value.recentlyAdded? <span className = "dot">{}</span> : <span>{}</span>,
        minWidth: 50,

      },
        {
        Header: "DATE",
        accessor: "data.workoutDate",
        Cell: d => <span>{this.formatDate(d.value)}</span>,
        minWidth: 200,
      },
      {
        id: 3,
        Header: "DURATION",
        accessor: "data.duration",
        minWidth: 150,

      },
      {
        id: 4,
        Header: "CALORIES",
        accessor: "data.caloriesBurned",
        minWidth: 150,

      },
      {
        id: 5,
        Header: "CATEGORY",
        accessor: d => d.data.notes,
        minWidth: 200,

      },
      {
        id: 6,
        Header: "GRAPH",
        accessor: (d) => d,
        sortable: false,
        Cell: props => <div><Collapsible transitionTime = {100}
        trigger={<span className = "trigger"><img src = {triangleClosed}/>Show</span>}
        triggerWhenOpen = {<span className = "trigger"><img src = {triangleOpen}/>Hide</span>}><LineChart records = {props.value.data.filteredRecords} width = {"100%"} height = {"300px"} superChart = {false}/><div className = "heart-rates">Max Heart Rate: {props.value.data.maximumHeartRate}</div>
        <div className = "heart-rates">Mean Heart Rate: {props.value.data.meanHeartRate}</div></Collapsible>
          
          </div>,
        minWidth: 300,
        

      }
    ]

        /*resizable={false}*/
        console.log('table is rerendering with these logs', this.props.logs)
        return(
        <ReactTable
        resizable={false}
        PaginationComponent={Pagination}
        NoDataComponent={this.props.loading? Loader : () => <div style = {{width: "100%", fontWeight: "bold", textAlign: "center"}}>No Data Found</div>}
        data={this.state.logs}
        defaultPageSize= {10}
        columns={columns}
        getTrProps={(state, rowInfo, column) => {
          return {
            style: rowInfo.original.recentlyAdded? {fontWeight: "600", color: "black", backgroundColor: "#f0f6fe"} : {backgroundColor: "white"}
            //className: rowInfo.original.recentlyAdded? "new" : null
          }
        }}
        
        minRows = {0}
        getTdProps={this.onRowClick}
        defaultSortDesc = {true}
        defaultSorted={[
          {
            id: "data.workoutDate",
            desc: true
          }
        ]}
  />

        )
    }

}

export default table;