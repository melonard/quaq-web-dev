import './App.css';
import React from 'react';
import '../../../node_modules/react-linechart/dist/styles.css';
import {CartesianGrid, XAxis, YAxis, Legend, Tooltip, Line, ResponsiveContainer, LineChart} from 'recharts';

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

export default class TwoDaysAgo extends React.Component {
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
                "arguments": {"db":"hdb","query":"select sym,price by time from (select by sym,time:string 5 xbar time.minute from(select time,sym,price from trade where (`date$time) = -2 + .z.d))"},
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
                 
             },1000);
             } catch(e) {
             console.log(e);
             }
         //console.log(this.state.all_data)
     }

render() {
  return (
    <div>
        <h3>Two Day's Ago Price History</h3>
        <div>
                        <div>
                          <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={this.state.all_data} margin={{ top: 15, right: 100, bottom: 15, left: 10 }}>
                              <Tooltip />
                              <XAxis dataKey="time" />
                              <YAxis />

                              <Legend/>
                              {["AAPL","AIG","AMD","DELL","DOW","GOOG","HPQ","IBM","INTC","MSFT"].map((entry, index) => {
                                return (
                                  <Line
                                    type="monotone"
                                    dataKey={entry}
                                    stroke="#82ca9d"
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



