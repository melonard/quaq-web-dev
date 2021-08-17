import React from 'react';
import './App.css'

export default class MinPriceSym extends React.Component {


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
           "query":"select sym,price from (select last price by sym from trade) where price in min price"},
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
      this.setState({sym: data.result[0].sym})
      this.setState({size: data.result[0].price.toFixed(2)})
    },1000);
} catch(e) {
  console.log(e);
}
  
  }
  
  
  
  render() {
      return (
          <div className='App'>
            <table border="10" cellpadding="10">
            <col width="160px" />
              <col width="150px" />
                <tr>
                  <th>Min Price Sym</th>
                  <th>Min Price ($)</th>
                </tr>
                <tr>
                  <td>{this.state.sym}</td>
                  <td>{this.state.size}</td>
                </tr>
            </table>
            </div>
      )
    }
  }