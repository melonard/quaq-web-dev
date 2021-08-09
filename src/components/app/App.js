import './App.css';
import React from 'react';
import LastValueCache from './LastValueCache';
import MinPriceSym from './MinPriceSym';
import MaxPriceSym from './MaxPriceSym';
import ChartApp from './AppChart';
import Yesterday from './Yesterday';
export default class App extends React.Component {


  constructor () {
    super()
    this.state = {
        sym : "",
        amount: 0
    }
}

async componentDidMount() {
    const url = "https://homer.aquaq.co.uk:8040/executeFunction";
    try {
      setInterval(async () => {
        const response = await 
        fetch (url,{
              "body": JSON.stringify({
                "arguments": {
              "db":"rdb",
              "query":"select from (select from select sum size by sym from trade) where size = max size"},
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
        console.log(data.result[0].sym)
        this.setState({sym: data.result[0].sym})
        this.setState({size: data.result[0].size})
      },1000);
    } catch(e) {
      console.log(e);
    }
}


render() {
    return (
        <div>
          <table border="10" cellpadding="10">
            <tr>
              <th>Most Traded Sym</th>
              <th>Volume Traded</th>
            </tr>
            <tr>
              <td>{JSON.stringify(this.state.sym)}</td>
              <td>{JSON.stringify(this.state.size)}</td>
            </tr>
          </table>
          <div><MinPriceSym /></div>
          <div><MaxPriceSym /></div>
          <div><ChartApp /></div>
          <p>Move the mouse over the button to open the dropdown menu.</p>
                <div class="dropdown">
                  <button class="dropbtn">Select Year</button>
                  <div class="dropdown-content">
                    <a href="#no">
                      Today
                      <chart1></chart1>
                    </a>
                    <a href="#no">
                      Yesterday          
                      <div><Yesterday/></div>
                    </a>
                    <a href="#no">
                      2 Days Ago
                    </a>
                  </div>

                </div>

          <div><LastValueCache /></div>
          
        </div>
    )
  }
}