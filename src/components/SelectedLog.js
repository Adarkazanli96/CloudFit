import React from 'react'
import { Auth, API } from 'aws-amplify';
import LineChart from './LineChart'
import './SelectedLog.css'
import backIcon from '../assets/images/back-icon.png'


export default class SelectedLog extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            input: "",
            output: ""
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();
        let entry = this.state.input;
        entry = parseInt(entry)
        //entry = this.round(entry);
        let index = await this.binary_search(this.props.selected.data.records, entry) //(arr, value), only execute if the time is between 0 and max duration

        this.setState({output: this.props.selected.data.records[index].heartrate})
    }

    onChange = (event) => {
        this.setState({input: event.target.value});
    }

    formatDate = (workoutDate) => {
        let date = new Date(workoutDate);
        let day = date.toDateString();
       let res = day.split(" ")
       let time = date.toLocaleTimeString();
       date = res[1] + " " + res[2] + ", " + res[3] + " " + time;
       return date;
     }

     

     binary_search(arr, value){
        var mid, left, right; 
        left = 0; 
        right = arr.length-1;
        while(left<=right){
          mid = parseInt((left+right)/2); 
          if(value === arr[mid].time){
            console.log(mid)
            return mid;
            
          }
          else if(value < arr[mid].time){
            right = mid-1; 
            console.log(mid)
          }
          else {
            left = mid+1;
            console.log(mid)
          }
        }
        return mid; 
      }
    

    render(){
        

        console.log(this.state.input)
        if(this.props.selected === null){
            return <div></div>;
        }
        const {timestamp} = this.props.selected
        const { workoutDate, duration, caloriesBurned, maximumHeartRate, meanHeartRate, notes, records} = this.props.selected.data //destructuring

        let date = this.formatDate(workoutDate)
        let submissionDate = this.formatDate(timestamp)

        
        return(
                <div className = "selected-log">
                    <div>

                    <div className = "dates">
                    <span style = {{fontWeight: "bold", marginRight: "17px"}}>{"Workout Date: "}</span>{date}
                    <span style = {{fontWeight: "bold", marginRight: "17px", marginLeft: "90px"}}>{"Submission Date: "}</span>{submissionDate}
                    </div>
                    
                    </div>
                    <div style = {{width: "600px"}}>
                        <div style = {{float: "left"}}>
                            <div>Time v Heart Rate</div>
                        <LineChart height = {"300px"} width = {"400px"} records = {records}/>
                        <form onSubmit={this.onSubmit}>
                           <input type = "text" value={this.state.input} onChange={this.onChange}/> 
                           <button type="submit" text="Submit">Submit</button>
                                {/*<input type="submit" value="Submit" />*/}
                        </form>
                        output: {this.state.output}
                        
                    </div>
                        
                            
                    <div style = {{float: "right"}}>
                        <div className = "heart-rates">Max Heart Rate: {maximumHeartRate}</div>
                    <div className = "heart-rates">Mean Heart Rate: {meanHeartRate}</div>
                    <div className = 'heart-rates'>{"Notes: "}{notes}</div>
                    </div>
                    
                    </div>

                    
                    
               
                </div>
        
        );
    }
    
}