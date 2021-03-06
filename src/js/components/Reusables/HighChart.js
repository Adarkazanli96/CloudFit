import React, { Component } from 'react';
import { render } from 'react-dom';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { nullLiteral } from '@babel/types';
 
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
          min: null,
          max: null,

          type: 'datetime',
          dateTimeLabelFormats: {
          hour: '%I:%M %P'
        }
        },

        //animation: false,

        series:{
          data: []
        },

        plotOptions: {
          series: {
            /*point: {
              events: {
                mouseOver: this.setHoverData.bind(this)
              }
            },*/
            turboThreshold: 0
          },

          column: {
            //animation:{
              //duration:3000
            //}
          }
        },

        time: {
          useUTC: false
        }

      },
      hoverData: null,
      

      //type: 'column',
      //marginLeft: 150,
      //panning: true
      //scrollbar: {
        //enabled: true
      //}
    };
  }
 
  setHoverData = (e) => {
    // The chart is not updated because `chartOptions` has not changed.
    this.setState({ hoverData: e.target.category })
  }
 
  /*updateSeries = () => {
    // The chart is updated only with new options.
    this.setState({
      chartOptions: {
        series: [
          { data: [Math.random() * 5, 2, 1]}
        ]
      }
    });
  }*/
 
  static getDerivedStateFromProps(nextProps, prevState){
      let chartOptions = {...prevState.chartOptions}
      chartOptions.xAxis.min = nextProps.min
      chartOptions.xAxis.max = nextProps.max
      //chartOptions.xAxis.categories = nextProps.categories
      chartOptions.series.data = nextProps.data


      return {
        chartOptions: chartOptions
      }

  }

  render() {
    const { chartOptions, hoverData } = this.state;
 
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      <h3>Hovering over {hoverData}</h3>
      {/*<button onClick={this.updateSeries.bind(this)}>Update Series</button>*/}
      </div>
    )
  }
}

export default LineChart