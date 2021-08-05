import React from 'react';
import './App.css'

export default class LastValueCache extends React.Component {
constructor () {
    super()
    this.state = {
        
        result:[]
    }
  
}

async  componentDidMount() {

    const url = "https://homer.aquaq.co.uk:8040/executeFunction";
    const response = await 
    fetch (url,{
          "body": JSON.stringify({
            "arguments": {
            "db":"rdb",
            "query": "select diff:first price - last price by sym from trade"},
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
    console.log(data)
    this.setState({all_data: data.result})
    this.setState({sym: data.result[1].sym})
    this.setState({diff: data.result[1].diff})
}

// if (this.state.diff >= 0) {
//     this.state.diff.color = "green";
// } else {
//     this.state.diff.color = "red";
// }

render() {
    return (
        <div className="LVC">
            <div>{JSON.stringify(this.state.all_data)}</div>
            <h3>{JSON.stringify(this.state.sym)}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.diff)}</h5>
        </div>
    )
  }
}
// function LastValueCache(){
//     return(
//         <div className="LVC">
//             <h3>{JSON.stringify(this.state.sym)}</h3>
//             <p>Current Price</p>
//             <h5>{JSON.stringify(this.state.diff)}</h5>
//         </div>

//     );
// }
// export default LastValueCache;
