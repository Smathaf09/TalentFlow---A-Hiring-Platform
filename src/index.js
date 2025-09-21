import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import {BrowserRouter} from 'react-router-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {worker} from './api/server';
import {seedData} from "./api/seed"; 


async function prepareAppForDevelopment(){
  if(process.env.NODE_ENV==='development'){
    await worker.start();
    await seedData();
  }
}

prepareAppForDevelopment().then(()=>{
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode> 
);
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
