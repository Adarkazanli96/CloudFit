import React from 'react';
import LineChart from '../components/LineChart'
import Collapsible from 'react-collapsible';
import triangleOpen from '../assets/images/sheet_list_icons/triangle-open.png'
import triangleClosed from '../assets/images/sheet_list_icons/triangle-closed.png'
import ellipsisIcon from '../assets/images/sheet_list_icons/ellipsis.png'
import './Table.css'

class table extends React.Component {
    constructor(props) {
       super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
       this.state = { //state is by default an object
       }
    }

    compare = ( a, b ) => {
      return b.timestamp - a.timestamp
    }


    
 
    renderTableData() {
       let logs = this.props.logs.slice();
       if(logs.length !== 0 && logs[logs.length - 1].isAdded){
       logs[logs.length-1].style =  {animation: "glow 2s linear"}// give the last inserted element the css glow
       }
       logs.sort(this.compare) // sort by timestamp
       console.log("the logs are sorting: ", logs)


        return logs.map((log, index) => {
           const { _id, workoutDate, duration, caloriesBurned, maximumHeartRate, meanHeartRate, notes, filteredRecords} = log.data //destructuring
           let date = new Date(workoutDate);
           //date = date.toString();
           
let day = date.toDateString();
let res = day.split(" ")
let time = date.toLocaleTimeString();
date = res[1] + " " + res[2] + ", " + res[3] + " " + time;
          


           return (
              <tr style = {log.style} key={index}>
                 <td><button className = "more-btn"><img src = {ellipsisIcon}/></button></td>
                 <td>{date}</td>
                 <td>{duration}</td>
                 <td>{caloriesBurned}</td>
                 <td>{notes}</td>
           <td><Collapsible transitionTime = {100}
           trigger={<span className = "trigger"><img src = {triangleClosed}/>Show</span>}
           triggerWhenOpen = {<span className = "trigger"><img src = {triangleOpen}/>Hide</span>}><LineChart records = {filteredRecords}/><div className = "heart-rates">Max Heart Rate: {maximumHeartRate}</div>
           <div className = "heart-rates">Mean Heart Rate: {meanHeartRate}</div></Collapsible>
                 
                 </td>
              </tr>
           )
        })
     }
  
     render() {
         console.log(this.props.logs)
        return (
              <table id='logs-table'>
                 <tbody>
                    <tr>
                        <th style = {{width: "50px"}}></th>
                        <th style = {{width: "200px"}}>DATE</th>
                        <th style = {{width: "150px"}}>DURATION</th>
                        <th style = {{width: "150px"}}>CALORIES</th>
                        <th style = {{width: "200px"}}>NOTES</th>
                        <th style = {{width: "300px"}}>GRAPH</th>
                    </tr>
                    {this.props.loading? <div className = "spinner-container"><div className="lds-ellipsis"><div></div>LOADING<div></div><div></div><div></div></div></div> : this.renderTableData()}
                    
                 </tbody>
              </table>
        )
     }
 }
 
 export default table