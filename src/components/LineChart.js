import React from "react";
import { Chart } from "react-charts";
 
export default class lineChart extends React.PureComponent {



render(){
const data = {
  lines: [{
    data: this.props.records
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
        { primary: true, type: "linear", position: "bottom" },
        { type: "linear", position: "left" }
      ]}
      
      series = {{
        showPoints: false
      }
        
      }
      tooltip
    />
  </div>
);
    }
    }
