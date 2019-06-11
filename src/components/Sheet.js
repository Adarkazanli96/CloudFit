import React from 'react'
import "./Sheet.css"


class sheet extends React.Component {
        constructor(props){
        super(props);
        this.state = {
                open: false
                }
        }


togglePanel = (e) => {
        this.setState({open: !this.state.open})
}
                
render() {
        let collapsibleTitle = <div className = "collapsible">{this.props.data.body.workoutDate}{this.props.data.body.workoutTime}</div>

    return(

                <div className = "wrap">
                <div onClick={(e)=>this.togglePanel(e)} className='header'>{this.props.data.body.workoutDate}{this.props.data.body.workoutTime}</div>

                {this.state.open ?
                <div className = "sheet">
                    <span className = "left-block">


                    <br/>
                    Duration: {this.props.data.body.duration}
                    <br/>
                    Maximum Heart Rate: {this.props.data.body.maximumHeartRate}
                    <br/>
                    Mean Heart Rate: {this.props.data.body.meanHeartRate}
                    <br/>
                    Notes: {this.props.data.body.notes}
                
                        </span>

                        <span className = "right-block">
                            <div className = "graph">Data</div>
                        </span>

                </div> : null}
        </div>
        );
    }
}

export default sheet;