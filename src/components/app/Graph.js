import './App.css';
import React from 'react';
import '../../../node_modules/react-linechart/dist/styles.css';
import {CartesianGrid, XAxis, YAxis, Cell, Legend, Tooltip, Line, ResponsiveContainer, LineChart} from 'recharts';


function convertDataPT(data) {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    let obj = { time: data[i].time };
    for (let j = 0; j < data[i].sym.length; j++) {
      let sym = data[i].sym[j];
      obj[sym] = data[i].price[j];
    }
    arr.push(obj);
    console.log(arr)
  }
  return arr;
}


const COLORS = ['#0088FE', '#EF00FC', '#FC000C', '#FC7100', '#FCEF00','#8AFC00', '#000CFC', '#7B2BB5', '#DD5444', '#5BA05B']
const filter = ["AAPL","AIG","AMD","DELL","DOW","GOOG","HPQ","IBM","INTC","MSFT"]

export default class Graph extends React.Component {
  
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
                "arguments": {"db":"rdb","query":"-1_select sym, price by time from (select avg avgs price by sym,time:string 5 xbar time.minute from(select med avgs price by sym,time from trade))"},
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
        },10000);
        } catch(e) {
        console.log(e);
        }
    }

 
render() {
    return (
        <div>
                <h3>Today's Price History</h3>
        <div>
                        <div>
                          <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={this.state.all_data} margin={{ top: 15, right: 100, bottom: 15, left: 10 }}>
                              <Tooltip />
                              <XAxis dataKey="time" stroke="#000000"/>
                              <YAxis />
                              <Legend/>

                              {filter.map((entry, index) => {
                                            return (
                                                        <Line
                                                          type="monotone"
                                                          dataKey={entry}
                                                         stroke={COLORS[index % COLORS.length]}              
                                                          dot={false}                                    
                                                        />                                                                                                   
                                                  );
                                                             }
                                          )
                              
                              }
                            </LineChart>
                          </ResponsiveContainer>
                      </div>
                      </div>
        </div>
    )
  }  
}


