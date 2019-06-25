import React from 'react';
import LineChart from '../components/LineChart'
import Collapsible from 'react-collapsible';
import triangleOpen from '../assets/images/sheet_list_icons/triangle-open.png'
import triangleClosed from '../assets/images/sheet_list_icons/triangle-closed.png'
import ellipsisIcon from '../assets/images/sheet_list_icons/ellipsis.png'
import './Table.css'

class table extends React.PureComponent {
    constructor(props) {
       super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
       this.state = { //state is by default an object
       }
    }

    compare = ( a, b ) => {
      return b.timestamp - a.timestamp
    }


    formatDate(workoutDate){
       let date = new Date(workoutDate);
       let day = date.toDateString();
      let res = day.split(" ")
      let time = date.toLocaleTimeString();
      date = res[1] + " " + res[2] + ", " + res[3] + " " + time;
      return date;
    }
    
    /*shouldComponentUpdate(nextProps, nextState){
      
 
       if(nextProps.logs.length !== this.props.logs.length || nextProps.loading != this.props.loading){
          return true;
       }

       else{
          return false;
       }
       
    }*/


 
    renderTableData() {
       let logs = this.props.logs.slice();

       logs.sort(this.compare) // sort by timestamp
       console.log("entries going into the table", logs)

        return logs.map((log, index) => {
           const { workoutDate, duration, caloriesBurned, maximumHeartRate, meanHeartRate, notes, filteredRecords} = log.data //destructuring
           const {_id} = log;
           
           let date = this.formatDate(workoutDate)

           return (
              <tr className = "data-row" style = {log.recentlyAdded ? {fontWeight: "600", color: "black", backgroundColor: "#f0f6fe"} : {}} key={index}>
                 <td onClick = {() => this.props.onSelect(log)}>{log.recentlyAdded ? <button className = "more-btn"><img src = {ellipsisIcon}/></button> : null}</td>
                 <td onClick = {() => this.props.onSelect(log)}>{date}</td>
                 <td onClick = {() => this.props.onSelect(log)}>{duration}</td>
                 <td onClick = {() => this.props.onSelect(log)}>{caloriesBurned}</td>
                 <td onClick = {() => this.props.onSelect(log)}>{notes}</td>
               <td><Collapsible transitionTime = {100}
               trigger={<span className = "trigger"><img src = {triangleClosed}/>Show</span>}
               triggerWhenOpen = {<span className = "trigger"><img src = {triangleOpen}/>Hide</span>}><LineChart records = {filteredRecords} width = {"100%"} height = {"300px"} /><div className = "heart-rates">Max Heart Rate: {maximumHeartRate}</div>
               <div className = "heart-rates">Mean Heart Rate: {meanHeartRate}</div></Collapsible>
                 
                 </td>
                 {/*<td><img className = "trash-img"/></td>}*/}
              </tr>
           )
        })
     }
  
     render() {
        console.log("table is rerendering")
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