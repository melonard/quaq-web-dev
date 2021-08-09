import React from 'react';

export default class timeseries extends React.Component {
  constructor () {
    super();
    this.state ={
      results : [],
      sym : [],
      avgPrices : []
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
                    "query":"select p: (count i) mavg price by sym from trade"},
                    "function_name": ".aqrest.execute"
                }) ,
                method:"post",
                "headers": {
                  'Accept': 'application/json',
                  "Content-Type":"application/json",
                  "accept": "*/*",
                  "Authorization":"Basic dXNlcjpwYXNz"
          }}
          ) 
          const data = await response.json();
          this.setState({results : data.result})
          console.log(this.state.results)
        },1000);
      } catch(e) {
        console.log(e);
      }
  }
  
  render() {
      return (
          <div>
            <div>{JSON.stringify(this.state.result)}</div>
              <p>Lads</p> 
          </div>
      )
  }
}