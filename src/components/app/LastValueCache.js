import React from 'react';
import './App.css'

export default class LastValueCache extends React.Component {
constructor () {
    super()
    this.state = {
        sym:[],
        diff:[],
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
            "arguments": {
            "db":"rdb",
            "query": "select diff:last price - first price by sym from trade"},
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
    for (let i = 0;i<10;i++){
        this.setState({sym:[...this.state.sym ,data.result[i].sym]})
        this.setState({diff: [...this.state.diff,data.result[i].diff]})
     }
    },1000);
} catch(e) {
  console.log(e);
}
}

// for (let i = 0;i<10;i++){
// if (this.state.diff[i] >= 0) {
//     this.state.diff[i].color = "green";
// } else {
//     this.state.diff[i].color = "red";
// }
// }

render() {
    return (
        <div className="LVC">
            <div>{JSON.stringify(this.state.all_data)}</div>
            <h3>{JSON.stringify(this.state.sym[0])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.diff[0])}</h5>
            <h3>{JSON.stringify(this.state.sym[1])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.diff[1])}</h5>
            <h3>{JSON.stringify(this.state.sym[2])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.diff[2])}</h5>
            <h3>{JSON.stringify(this.state.sym[3])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.diff[3])}</h5>
            <h3>{JSON.stringify(this.state.sym[4])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.diff[4])}</h5>
            <h3>{JSON.stringify(this.state.sym[5])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.diff[5])}</h5>
            <h3>{JSON.stringify(this.state.sym[6])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.diff[6])}</h5>
            <h3>{JSON.stringify(this.state.sym[7])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.diff[7])}</h5>
            <h3>{JSON.stringify(this.state.sym[8])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.diff[8])}</h5>
            <h3>{JSON.stringify(this.state.sym[9])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.diff[9])}</h5>
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