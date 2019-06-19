import React from "react";
import { Chart } from "react-charts";
 
const lineChart = (props) => {
//console.log(props.records[0])

/*const result = props.records.filter((record, index) => {
  return(
  index%40 === 0
  )
  }
  );*/

//console.log(result);

const data = {
  lines: [{
    data: props.records
  }
  ]
  
}
console.log('this is final', props.records)

/*let arr2 = [
[0, 1], [1, 2], [2, 4], [3, 2], [4, 7],[5,6],[6,7],[7,10],[8,9],[9,10],[10,11],
[11, 2], [12, 4], [13, 2], [14, 7],[15,6],[16,7],[17,10],[18,9],[19,10],[20,11],
[21, 2], [22, 4], [23, 2], [24, 7],[25,6],[26,7],[27,10],[28,9],[29,10],[30,11],
[31, 2], [32, 4], [33, 2], [34, 7],[35,6],[36,7],[37,10],[38,9],[39,10],[40,11],
[41, 2], [42, 4], [43, 2], [44, 7],[45,6],[46,7],[47,10],[48,9],[49,10],[50,11],
[51, 2], [52, 4], [53, 2], [54, 7],[55,6],[56,7],[57,10],[58,9],[59,10],[60,11],
[61, 2], [62, 4], [63, 2], [64, 7],[65,6],[66,7],[67,10],[68,9],[69,10],[70,11],
[71, 2], [72, 4], [73, 2], [74, 7],[75,6],[76,7],[77,10],[78,9],[79,10],[80,11],
[81, 2], [82, 4], [83, 2], [84, 7],[85,6],[86,7],[87,10],[88,9],[89,10],[90,11],
[91, 2], [92, 4], [93, 2], [94, 7],[95,6],[96,7],[97,10],[98,9],[99,10],[100,11],
[101, 2], [102, 4], [103, 2], [104, 7],[105,6],[106,7],[107,10],[108,9],[109,10],[110,11],
[111, 2], [112, 4], [113, 2], [114, 7],[115,6],[116,7],[117,10],[118,9],[119,10],[120,11]
]*/

return(
  // A react-chart hyper-responsively and continuusly fills the available
  // space of its parent element automatically
  <div
    style={{
      width: "100%",
      height: "300px",
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

export default lineChart