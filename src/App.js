import React, { useState } from 'react';
import TimeSeriesData from "./Components/TimeSeriesData";
import Container from "./Components/Container";
import VisualizeButton from "./Components/VisualizeButton";
import TimeSeriesPlot from "./Components/TimeSeriesPlot";
import './App.css';

function App() {
  const [data, setData] = useState(null); // State to hold the fetched CSV data
  //let data = null
  const [showPlot, setShowPlot] = useState(false); // State to toggle plot visibility

  function fetchData() {
     fetch('/heart_rate_time_series.csv')
      .then(Response => {
        if (!Response.ok) {
          throw new Error('Response was not ok');
        }
        return Response.text();
      })
      .then(csvText => {
        const data = parseCSV(csvText);
        setData(data)
        
      })
      .catch(error => {
        console.error('Error loading CSV file:', error);
      });
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split('\n'); //splitting lines
    const headers = lines[0].split(','); //headers
    const rows = [];
  
    for (let i = 1; i < lines.length; i++) { //skips header line. only data rows
      const line = lines[i];
      const values = line.split(',');
      const obj = {};
  
      for (let j = 0; j < headers.length; j++) { //iterate on each header 
        const header = headers[j].trim(); //remove extra spaces
        obj[header] = parseFloat(values[j]); //store corresponding value from 'values' array 
      }
  
      if (!isNaN(obj['Time (s)']) && !isNaN(obj['Heart Rate (bpm)'])) { //if not null push to rows. skipping null values
        rows.push(obj);
      }
    }
  
    return rows;
  };
  

  const togglePlot = () => { setShowPlot(!showPlot); };

  // Fetch data when component mounts. fetchData function will be called on every render if there's not a check condition.
  if (!data) {
    fetchData();
  }
  return (
    <Container>
      <TimeSeriesData /> 
      <VisualizeButton 
      onClick={togglePlot} 
      />
      {showPlot && <TimeSeriesPlot data={data} />}
    </Container>
  );
}


export default App;
