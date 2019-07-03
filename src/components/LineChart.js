import React from "react";
import { Chart } from "react-charts";

 
export default class lineChart extends React.Component {
constructor(props){
  super(props)
  this.state = {
    /*min: null,
    max: null*/
  }
}

componentWillReceiveProps(nextProps){
  /*if(nextProps.records.length > 0){
    this.setState({min: nextProps.records[0].time,
      max: nextProps.records[nextProps.records.length-1].time
  })*/
  /*if(nextProps.records.length === 0){
    this.setState({min: null, max: null})
  }*/
}


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
    }}
  >

    
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
          hardMin: this.props.min,
          hardMax: this.props.max
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
          this.props.setRange(Math.min(brushData.start, brushData.end), Math.max(brushData.start, brushData.end))
        }
      }}
    />
  </div>
);
    }
    }