import React from 'react';
import './App.css'

export default class MaxPriceSym extends React.Component {


    constructor () {
      super()
      this.state = {
          sym : "",
          amount: 0
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
           "db":"rdb",
           "query":"select sym,price from (select last price by sym from trade) where price in max price"},
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
      //console.log(data.result[0].sym)
      this.setState({sym: data.result[0].sym})
      this.setState({size: data.result[0].price})
    },1000);
  } catch(e) {
    console.log(e);
  }
  
  }
  
  
  
  render() {
      return (
          <div className='App'>
            <table border="10" cellpadding="10">
              <tr>
                <th>Max Price Sym</th>
                <th>Max Price</th>
              </tr>
              <tr>
                <td>{JSON.stringify(this.state.sym)}</td>
                <td>{JSON.stringify(this.state.size)}</td>
              </tr>
            </table>
            </div>
      )
    }
  }