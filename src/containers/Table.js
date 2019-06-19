import React from 'react';
import LineChart from '../components/LineChart'
import Collapsible from 'react-collapsible';
import triangleOpen from '../assets/images/triangle-open.png'
import triangleClosed from '../assets/images/triangle-closed.png'

import './Table.css'

class table extends React.Component {
    constructor(props) {
       super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
       this.state = { //state is by default an object
       }
    }
 
    renderTableData() {

        return this.props.sheets.map((sheet, index) => {
           const { _id, workoutDate, workoutTime, duration, caloriesBurned, maximumHeartRate, meanHeartRate, notes, filteredRecords} = sheet.data //destructuring
           return (
              <tr key={index}>
                 <td>{workoutDate}</td>
                 <td>{workoutTime}</td>
                 <td>{duration}</td>
                 <td>{caloriesBurned}</td>
                 <td>{notes}</td>
           <td><Collapsible transitionTime = "100"
           trigger={<span className = "trigger"><img src = {triangleClosed}/>Show</span>}
           triggerWhenOpen = {<span className = "trigger"><img src = {triangleOpen}/>Hide</span>}><LineChart records = {filteredRecords}/><div className = "heart-rates">Max Heart Rate: {maximumHeartRate}</div>
           <div className = "heart-rates">Mean Heart Rate: {meanHeartRate}</div></Collapsible>
                 
                 </td>
              </tr>
           )
        })
     }
  
     render() {
         console.log(this.props.sheets)
        return (
           <div className = "table-container">
              <table id='students'>
                 <tbody>
                    <tr>
                        <th style = {{width: "150px"}}>DATE</th>
                        <th style = {{width: "150px"}}>TIME</th>
                        <th style = {{width: "150px"}}>DURATION</th>
                        <th style = {{width: "150px"}}>CALORIES</th>
                        <th style = {{width: "200px"}}>NOTES</th>
                        <th style = {{width: "300px"}}>GRAPH</th>
                    </tr>
                    {this.props.loading? <div className = "spinner-container"><div className = "loader"></div></div> : this.renderTableData()}
                    
                 </tbody>
              </table>
           </div>
        )
     }
 }
 
 export default table