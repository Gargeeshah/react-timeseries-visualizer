import React from 'react';
import Plot from 'react-plotly.js';
import styles from './TimeSeriesPlot.module.css';

function TimeSeriesPlot({ data }) {
  // Extract data
  const time = data.map(entry => entry['Time (s)']); // new array
  const heartRate = data.map(entry => entry['Heart Rate (bpm)']); //new array

  //  Plot Data
  const plotData = [
    {
      x: time,
      y: heartRate,
      type: 'scatter', //draw lines
      mode: 'lines', //connected with lines
      line: { color: 'navyblue' },
    },
  ];

  const plotLayout = {
    width: 1450,
    height: 700,
    title: 'Heart Rate Time Series',
    xaxis: { title: 'Time (s)', range: [0, 600] },
    yaxis: { title: 'Heart Rate (bpm)' },
  };

  const totalHeartRate = heartRate.reduce((acc, curr) => acc + curr, 0); //for loop
  //console.log(totalHeartRate)
  const averageHeartRate = totalHeartRate / heartRate.length;
  //console.log(averageHeartRate)
  const colorByAverage = heartRate.map(value => value > averageHeartRate ? 'red' : 'blue');

  const enhancedPlotData = [
    {
      x: time,
      y: heartRate,
      type: 'scatter',
      mode: 'lines+markers',
      marker: {
        color: colorByAverage,
        size: 6,
      },
      line: { color: 'navyblue' },
      text: heartRate.map(value => value > averageHeartRate ? 'Above Average Heart Rate' : 'Below Average Heart Rate'),
      hoverinfo: 'x+y+text',
      showlegend: false
    },
    {
      x: time,
      y: Array(time.length).fill(averageHeartRate), // Line representing average heart rate. create array of time length and then fill with avg hr
      type: 'scatter',
      mode: 'lines',
      line: { color: 'green', dash: 'dash' },
      name: `Average Heart Rate (${averageHeartRate} bpm)`, //bydefault legend
      hoverinfo: 'name',
    },
    {
      x: [null], y: [null], //requires to be define in plotty
      type: 'scatter',
      mode: 'markers',
      marker: { color: 'red', size: 8 },
      name: 'Above Average',
      
    },
    {
      x: [null], y: [null], 
      type: 'scatter',
      mode: 'markers',
      marker: { color: 'blue', size: 8 },
      name: 'Below Average',
      
    },
  ];

  return (
    <>
      <Plot className={styles.plot}
        data={plotData}
        layout={plotLayout}
        config={{ responsive: true }} /*automatically resize to fit the container*/ 
      />
      <Plot className={styles.plot} 
        data={enhancedPlotData}
        layout={plotLayout}
        config={{ responsive: true }}
      />
    </>
  );
};

export default TimeSeriesPlot;
