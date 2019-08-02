import React, {Component} from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
 
class LineChart extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      // To avoid unnecessary update keep all options in the state.
      chartOptions: {
        //type: "spline",
        title: {
            text:"Device# "
        },
        xAxis: {
          //min: null,
          //max: null,
          //tickInterval: 3,

          tickPixelInterval: 200,
          tickInterval: 10,
          type: 'datetime',
          dateTimeLabelFormats: {
            millisecond: '%I:%M:%S.%L %p',
            second: '%I:%M:%S %p',
            hour: '%I %p',
            minute: '%I:%M %p',
            },

            labels : {
                //rotation: 45
            }
            
        },

        //animation: false,

        series:{
          data: [],
          //pointStart: Date.UTC(2009, 0, 1)
        },

        data: {
            //startColumn: 1000000000
        },

        time: {
          useUTC: false
        },

      },
    };
  }

 
  static getDerivedStateFromProps(nextProps, prevState){
      let chartOptions = {...prevState.chartOptions}
      chartOptions.series.data = nextProps.data

      return {
        chartOptions: chartOptions
      }

  }

  render() {
    const { chartOptions } = this.state;
 
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={chartOptions}
        />
      </div>
    )
  }
}

export default LineChart