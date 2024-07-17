import React from 'react';
import styles from "./TimeSeriesData.module.css";

function TimeSeries (){
    return <>
        <h1 className={styles.heading}>Time Series Data</h1>
        <p className={styles.data}>A time series dataset consists of data points collected at successive, equally spaced points in time</p>
        <p className={styles.data}><strong>Dataset Overview:</strong> The dataset captures heart rate measurements over a period of 10 minutes, with data collected at a sampling rate of 1 sample per second.</p>
        <p className={styles.data}><strong>Time (s):</strong> This column denotes the time at which each heart rate measurement was recorded, starting from 0 seconds and increasing sequentially.</p>
        <p className={styles.data}><strong>Heart Rate (bpm): </strong>Recorded in beats per minute (bpm), this column represents the heart rate measurements corresponding to each time point. The values are likely gathered continuously or at regular intervals, forming a time-series dataset of heart rate data.</p>
        <p className={styles.data}><strong>Length of dataset:</strong> (600, 2)</p>
        </>
};

export default TimeSeries;
