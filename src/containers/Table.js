import React from 'react';
import './Table.css'

class table extends React.Component {
    constructor(props) {
       super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
       this.state = { //state is by default an object
       }
    }
 
    renderTableData() {
        return this.props.sheets.map((sheet, index) => {
           const { _id, workoutDate, workoutTime, duration, caloriesBurned, maximumHeartRate, meanHeartRate, notes} = sheet.body //destructuring
           return (
              <tr key={index}>
                 <td>{workoutDate}</td>
                 <td>{workoutTime}</td>
                 <td>{duration}</td>
                 <td>{caloriesBurned}</td>
                 <td>{maximumHeartRate}</td>
                 <td>{meanHeartRate}</td>
                 <td>{notes}</td>
              </tr>
           )
        })
     }
  
     render() {
         console.log(this.props.sheets)
        return (
           <div>
              <table id='students'>
                 <tbody>
                    <tr>
                        <th>WORKOUT DATE</th>
                        <th>WORKOUT TIME</th>
                        <th>DURATION</th>
                        <th>CALORIES BURNED</th>
                        <th>MAX HEART RATE</th>
                        <th>MEAN HEART RATE</th>
                        <th>NOTES</th>
                    </tr>
                    {this.renderTableData()}
                 </tbody>
              </table>
           </div>
        )
     }
 }
 
 export default table