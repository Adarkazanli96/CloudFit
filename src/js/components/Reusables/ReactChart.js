import React from "react";
import { Chart } from "react-charts";

// import '../../../css/components/Reusables/LineChart.css' // <-- import to change the charts css styles

 
export default class lineChart extends React.Component {

  // only update the graph if the number of records change or if the min/max changes, should work since the records get set to 0 each time
  shouldComponentUpdate(nextProps, nextState){
    if(this.props.records.length != nextProps.records.length || this.props.min != nextProps.min || this.props.max != nextProps.max){
      return true;
    }
    return false;
  }



render () {
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
      position: "relative"
    }}
  >

    <div style = {{fontWeight: "bold", fontSize: "15px", position: "absolute", left: "-40px", top: "50%", transform: "rotate(-90deg)"}}>{this.props.yLabel}</div>
    <Chart
      data={data}
      getSeries={data => data.lines}
      getDatums={series => series.data}
      getPrimary={datum => datum.time}
      getSecondary={datum => datum.heartrate}

      getSeriesStyle={() => ({
        transition: 'all .5s ease'
      })}
      getDatumStyle={() => ({
        transition: 'all .5s ease'
      })}

      axes={[
        {
          primary: true,
          type: 'linear',
          position: 'bottom',
          //type: 'time',
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

      primaryCursor = {this.props.superChart}

      /*getLabel = {(series) => "heart rate"}*/

      brush={this.props.superChart? {
        onSelect: brushData => {
          this.props.setRange(Math.min(brushData.start, brushData.end), Math.max(brushData.start, brushData.end))
        }
      } : false}
    />

<div style = {{textAlign: "center", fontWeight: "bold", fontSize: "15px"}}>{this.props.xLabel}</div>

  </div>
);
    
    }
  }