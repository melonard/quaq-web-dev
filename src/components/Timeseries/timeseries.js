import React from 'react';

import React, { Component } from 'react'

export class timeseries extends Component {

    async componentDidMount() {
        const url = "https://homer.aquaq.co.uk:8040/executeFunction";
        try {
          setInterval(async () => {
            const response = await 
            fetch (url,{
                  "body": JSON.stringify({
                    "arguments": {
                  "db":"rdb",
                  "query":"select avgs price by sym from trade"},
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
                
            </div>
        )
    }
}

