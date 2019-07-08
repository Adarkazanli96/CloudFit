import React from 'react'
import LineChart from '../Reusables/LineChart'
import './SelectedLog.css'
import Cards from './Cards'


export default class SelectedLog extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            input: "",
            output: "",
            min: null,
            max: null,
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();
        let entry = this.state.input;
        entry = parseFloat(entry)
        //entry = this.round(entry);
        let index = await this.binary_search(this.props.records, entry) //(arr, value), only execute if the time is between 0 and max duration

        this.setState({output: this.props.records[index].heartrate})
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

      setRange = (min, max) =>{
        this.setState({min: min, max: max})
      }

      resetZoom = () =>{
        this.setState({min: null, max: null})
      }
    
      componentDidMount(){
        console.log("it mounted")
      }
      /*componentWillReceiveProps(nextProps){
        if(nextProps.records.length === 0){
          this.setState({min: null, max: null})
        }
      }*/

      static getDerivedStateFromProps(nextProps, prevState){
        console.log(nextProps.records.length)
        if(nextProps.records.length === 0){
          return {min: null, max: null, input: "", output: ""}
        }
        if(prevState.min === null){
          return {min: nextProps.records[0].time, max: nextProps.records[nextProps.records.length-1].time}
        }
        return null;
      }

    render(){
      console.log("rendering selected log component")
      

        const {timestamp} = this.props.selected
        const { workoutDate, duration, caloriesBurned, maximumHeartRate, meanHeartRate, notes, filteredRecords} = this.props.selected.data //destructuring

        let date = this.formatDate(workoutDate)
        let submissionDate = this.formatDate(timestamp)

        
        return(
                <div className = "selected-log">
                    <div style = {{paddingTop: "30px"}}>
                    <Cards max = {maximumHeartRate} mean = {meanHeartRate} duration = {duration} calories = {caloriesBurned}/>
                    </div>
                    <div style = {{width: "900px", position: "relative", left: "30px"}}>
                    <div style = {{minWidth: "700px", float: "left", padding: "20px", paddingBottom: "50px", position: "relative"}}>
                    <div style = {{fontWeight: "bold", textAlign: "center", fontSize: "15px"}}>{date}</div>
                    <div style = {{fontWeight: "bold", fontSize: "15px", position: "absolute", left: "-60px", top: "200px", transform: "rotate(-90deg)"}}>Heart Rate (bpm)</div>
                        <LineChart height = {"400px"} width = {"100%"} records = {this.props.records} setRange = {this.setRange} min = {this.state.min} max = {this.state.max} superChart = {true}/>
                        <div style = {{fontWeight: "bold", textAlign: "center", fontSize: "15px"}}>Time (s)</div>

                    </div>
                    
                        
                            
                    <div style = {{float: "left",position: "relative", top: "60px", left: "40px", minHeight: "400px", width: "200px"}}>
                        <div style = {{float: "left", fontSize: "10pt"}}><span style = {{fontWeight: "bold"}}>Range: </span>{Math.round(this.state.min) + "s - " +  Math.round(this.state.max) + "s"}</div>
                        <button className = "reset-btn" onClick = {this.resetZoom}>Reset</button>

                        <form className = "i-o-heartrate" onSubmit={this.onSubmit}>
                           <input style = {{width: "40px", marginRight: "10px"}} type = "text" value={this.state.input} onChange={this.onChange}/> 
                           <button style = {{marginRight: "10px", background: "none", padding: "0", border: ""}} type="submit" ><i class="material-icons">arrow_right_alt</i></button>
                           <span>{this.state.output}</span>
                           
                                {/*<input type="submit" value="Submit" />*/}
                        
                        </form>
                        


                    <div style = {{fontWeight: "bold", marginTop: "20px"}}>{"Category: "}</div>{notes}
                    <div style = {{fontWeight: "bold", marginTop: "20px"}}>Notes:</div>
                    </div>
                    
                    </div>

                    
                    
               
                </div>
        
        );
    }
    
}