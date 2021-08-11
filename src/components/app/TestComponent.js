import './App.css';
import React, {Component} from 'react';
//import LineChart from 'react-linechart';
import Chart from "react-apexcharts";

import '../../../node_modules/react-linechart/dist/styles.css';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Line, ResponsiveContainer, LineChart} from 'recharts';
//import ReactTable from "react-table";  
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function convertDataPT(data) {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    let obj = { time: data[i].time };
    for (let j = 0; j < data[i].sym.length; j++) {
      let sym = data[i].sym[j];
      obj[sym] = data[i].price[j];
    }
    arr.push(obj);
  }
  return arr;
}


export default class Graph extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      all_data:[[],[],[],[],[],[],[],[],[],[]],
      results:[],
      options: {
        chart: {
          id: "Price History"
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "DOW",
          data: []
        }
      ]
    };
  }

async  componentDidMount() {

  const url = "https://homer.aquaq.co.uk:8040/executeFunction";
  try {
      setInterval(async () => {
          const response = await 
          fetch (url,{
              "body": JSON.stringify({
                  "arguments": {
                  "db":"rdb",
                  "query": "select `time$time, price:(count i) mavg price by sym from trade where 0=i mod 10"},
                  "function_name": ".aqrest.execute"
                  }),
              method:"post",
              "headers": {
                  'Accept': 'application/json',
                  "Content-Type":"application/json",
                  "accept": "*/*",
                  "Authorization":"Basic dXNlcjpwYXNz"
          }}
          ) 
          const data = await response.json();
              // console.log(data)

this.setState({all_data: convertDataPT(data.result)})
console.log(this.state.all_data)
//console.log(this.state.all_data.length)
//console.log((this.state.all_data));

//this.setState({ options : {xaxis:{categories : mytimeArray } } })
// this.setState({ series : {data: mypriceArray}})

          // console.log(this.state.results)
          // console.log(this.state.options)
          // console.log(this.state.series)
        },5000);
        } catch(e) {
        console.log(e);
        }
    }

render() {
    return (
        // <div>Graph Of Previous Day's History</div>
        <div>

{/*               
              <div className="row">
                    <div className="mixed-chart">
                          <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            width="500"
                          /> */}

                        <div>
                        <div>
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={this.state.all_data} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
                              <Tooltip />
                              <XAxis dataKey="time" />
                              <YAxis />

                              <Legend/>
                              
                              {["AAPL","AIG","AMD","DELL","DOW","GOOG","HPQ","IBM","INTC","MSFT"].map((entry, index) => {
                                return (
                                  <Line
                                    type="monotone"
                                    dataKey={entry}
                                  />
                                );
                              })}
                              {/* <Line type="monotone" dataKey="AAPL" stroke="#FB8833" />
                              <Line type="monotone" dataKey="AIG" stroke="#17A8F5" /> */}
                            </LineChart>
                          </ResponsiveContainer>
                      </div>
                      </div>
                
          

        </div>
    )
  }  
}


