import React from 'react';
import Chart from "react-apexcharts";


export default class timeseries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results:[],
      options: {
        chart: {
          id: "stockprice"
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "AIG",
          data: []
        }
      ]
    };
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
                      "query":"select time, p: (count i) mavg price by sym from trade"},
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
            console.log(this.state.results[1])
            this.setState({ options : {xaxis:{categories : this.state.results[1].time}}})
            this.setState({ series : {name : this.state.results[1].sym, data: this.state.results[1].p}})
            console.log(this.state.options)
            console.log(this.state.series)
          },30000);
        } catch(e) {
          console.log(e);
        }
    } 
    
    
    render() {
        return (
          <div className="app">
{/*             <div className="row">
              <div className="mixed-chart">
                <Chart
                  options={this.state.options}
                  series={this.state.series}
                  type="line"
                  width="500"
                />
              </div>
            </div> */}
        </div>
        )
    }
}

