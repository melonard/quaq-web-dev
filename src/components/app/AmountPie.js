import './App.css';
import React from 'react';
import '../../../node_modules/react-linechart/dist/styles.css';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis,Brush, Cell, Legend, Tooltip, Line, ResponsiveContainer, LineChart} from 'recharts';
import Multiselect from 'multiselect-react-dropdown';
import duck1 from './../duck1.png'

const COLORS = ['#0088FE', '#EF00FC', '#FC000C', '#FC7100', '#FCEF00','#8AFC00', '#000CFC', '#7B2BB5', '#DD5444', '#5BA05B']


export default class AmountPie extends React.Component {
  
  constructor () {
    super()
    this.state = {
      loaded:false,
      sym:[],
      size:[],
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
                "arguments": {"db":"rdb","query":"select (sum (size*price)) by sym from trade"},
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

this.setState({all_data: (data.result)})
this.setState({loaded:true})
        },5000);
        } catch(e) {
        console.log(e);
        }
    }

 
render() {
    return (
      <div style={{
        backgroundColor: (this.props.darkMode ? '#000000' : '#FFFFFF'),
      }}>                   
                          <div  class={this.props.darkMode?"pieD":"pie"} > 

                          <div>
                          <text className="header" > <h3>Dollar Value Traded Today</h3></text>
                          </div>
                          {this.state.loaded ?<ResponsiveContainer width="100%" height={400}>
                           
                          <BarChart  width={730} height={300} data={this.state.all_data} margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }} > 
                          <CartesianGrid/>
                              <XAxis dataKey="sym" />
                              <YAxis/>
                              <Bar data={this.state.all_data}  dataKey="size" nameKey="sym" >
                                  {
                                      this.state.all_data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                  } 
                              </Bar>
                              <Tooltip/>
                              
                          </BarChart>


                          </ResponsiveContainer> : <p>
                          <marquee scrollamount="10" behavior="scroll" direction="right"><img src={duck1} width="80" height="80" />  <span> <h3 className = {this.props.darkMode ? 'dh3' : 'lh3'}>Loading... </h3></span></marquee> 
                                                  </p>}
                      
                      </div></div>
   
    )
  }  
}

