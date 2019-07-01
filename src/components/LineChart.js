import React from "react";

import {XYPlot, FlexibleXYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, MarkSeries, Highlight, VerticalGridLines} from 'react-vis';
//import {highlightPoint} from 'react-vis/highlight'
import './LineChart.css' 
 
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
      textAlign:"center",
      fontWeight: "bold",
      fontSize: "15px"
    }}
  >
    {this.props.header}
    <FlexibleXYPlot

                animation = {10}
                getX={d => d.time}
                getY={d => d.heartrate}
                >
                  
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <LineSeries
                color= "#64B4E6"
                    data={this.props.records}/>
            </FlexibleXYPlot>
  </div>
);
    }
    }
