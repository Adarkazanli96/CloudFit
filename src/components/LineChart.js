import React from "react";
import { Chart } from "react-charts";

 
export default (props) => {


const data = {
  lines: [{
    data: props.records
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
      width: props.width,
      height: props.height,
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
          hardMin: props.min,
          hardMax: props.max
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
          props.setRange(Math.min(brushData.start, brushData.end), Math.max(brushData.start, brushData.end))
        }
      }}
    />
  </div>
);
    
    }