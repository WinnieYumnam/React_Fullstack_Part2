import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'
import App from './App';
import './index.css';

axios.get('http://localhost:3001/persons').then(response => {
  const notes = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

