import './App.css';
import React from 'react';
import rd3 from 'react-d3-library'
//import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
//import ReactTable from "react-table";  
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


export default class Yesterday extends React.Component {
  constructor () {
    super()
    this.state = {
      sym:[],
      today:[],
      yesterday:[],
      first:[]
    }
}


async  componentDidMount() {

  const url = "https://homer.aquaq.co.uk:8040/executeFunction";
  try {
      setInterval(async () => {
          const response = await 
          fetch (url,{
              "body": JSON.stringify({
                  "arguments": {
                  "db":"hdb",
                  "query": "select last price by sym from trade where (`date$time) = -1 + .z.d"},
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

                 this.setState({all_data: data.result})
                 var diffArr=[]
                 var symArr=[]
                 for (let i = 0;i<10;i++){
                     diffArr.push(data.result[i].diff)
                     symArr.push(data.result[i].sym)
                 }
                 this.setState({sym: symArr})
                 this.setState({diff: diffArr})
             },1000);
             } catch(e) {
             console.log(e);
             }
         //console.log(this.state.all_data)
     }

//<div>{JSON.stringify(this.state.all_data)}  </div>

render() {
    return (
          <div className="a">
            <h3>{JSON.stringify(this.state.all_data)}</h3>

        </div>
       
    )
  }  
}



