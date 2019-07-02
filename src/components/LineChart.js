import React from "react";
import { Chart } from "react-charts";

 
export default class lineChart extends React.PureComponent {
constructor(props){
  super(props)
  this.state = {
    min: null,
    max: null
  }
}

/*componentWillReceiveProps(nextProps){
  if(nextProps.records.length > 0){
    this.setState({min: nextProps.records[0].time,
      max: nextProps.records[nextProps.records.length-1].time
  })
}}*/


render(){
const data = {
  lines: [{
    data: this.props.records
  }
  ]
  
}

const def = {
  lines: [{
    data: [{
      time: 0,
      heartrate: 0
    }]
  }
  ]
}


return(
  // A react-chart hyper-responsively and continuusly fills the available
  // space of its parent element automatically
  <div
    style={{
      width: this.props.width,
      height: this.props.height,
      textAlign:"center",
      fontWeight: "bold",
      fontSize: "15px"
    }}
  >
    <button
        onClick={() =>
          this.setState({
            min: this.props.records[0].time,
            max: this.props.records[this.props.records.length-1].time
          })
        }
      >
        Reset Zoom
      </button>
      <div>{Math.round(this.state.min) + "s - " +  Math.round(this.state.max) + "s"}</div>
    {this.props.header}
    <Chart
      data={data}
      getSeries={data => data.lines}
      getDatums={series => series.data}
      getPrimary={datum => datum.time}
      getSecondary={datum => datum.heartrate}

      axes={[
        {
          primary: true,
          type: 'linear',
          position: 'bottom',
          hardMin: this.state.min,
          hardMax: this.state.max
        },
        {
          type: 'linear',
          position: 'left'
        }
      ]}
      
      series = {{
        showPoints: false
      }
        
      }

      tooltip

      primaryCursor


      brush={{
        onSelect: brushData => {
          this.setState({
            min: Math.min(brushData.start, brushData.end),
            max: Math.max(brushData.start, brushData.end)
          })
        }
      }}
    />
  </div>
);
    }
    }