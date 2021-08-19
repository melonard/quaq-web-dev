import './App.css';
import React from 'react';
import '../../../node_modules/react-linechart/dist/styles.css';
import {CartesianGrid, XAxis, YAxis, Legend, Tooltip, Line, ResponsiveContainer, LineChart} from 'recharts';
//import rd3 from 'react-d3-library'
//import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
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
const COLORS = ['#0088FE', '#EF00FC', '#FC000C', '#FC7100', '#FCEF00','#8AFC00', '#000CFC', '#7B2BB5', '#DD5444', '#5BA05B']
const filter = ["AAPL","AIG","AMD","DELL","DOW","GOOG","HPQ","IBM","INTC","MSFT"]

export default class Yesterday extends React.Component {
  constructor () {
    super()
    this.state = {
      sym:[],
      price:[],
      result:[]
    }
}


async  componentDidMount() {

  const url = "https://homer.aquaq.co.uk:8040/executeFunction";
  try {
      setInterval(async () => {
          const response = await 
          fetch (url,{
              "body": JSON.stringify({
                "arguments": {"db":"hdb","query":"select sym,price by time from (select by sym,time:string 5 xbar time.minute from(select time,sym,price from trade where (`date$time) = -1 + .z.d))"},
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

                 this.setState({all_data: convertDataPT(data.result)})
                 var symArr=[]
                 for (let i = 0;i<10;i++){
                    symArr.push(data.result[i].sym)
                }
                this.setState({sym: symArr})
                 
             },1000);
             } catch(e) {
             console.log(e);
             }
         //console.log(this.state.all_data)
     }

//<div>{JSON.stringify(this.state.all_data)}  </div>

render() {
  return (
    <div>
        <div>
                        <div>
                          <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={this.state.all_data} margin={{ top: 15, right: 100, bottom: 15, left: 10 }}>
                              <Tooltip />
                              <XAxis dataKey="time" />
                              <YAxis />
                              <Legend/>
                              {filter.map((entry, index) => {
                                return (
                                  <Line
                                    type="monotone"
                                    dataKey={entry}
                                    stroke={COLORS[index % COLORS.length]}  
                                  />
                                );
                              })}
                            </LineChart>
                          </ResponsiveContainer>
                      </div>
                      </div>
        </div>
)
  }  
}