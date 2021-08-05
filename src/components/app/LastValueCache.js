import React from 'react';
import './App.css'

export default class LastValueCache extends React.Component {
constructor () {
    super()
    this.state = {
        sym : "",
        result:[]
    }
  
}

async  componentDidMount1() {

    const url = "https://homer.aquaq.co.uk:8040/executeQuery";
    const response = await 
    fetch (url,{
          "body": JSON.stringify({
            "query": "select diff:first price - last price by sym from trade",
            "response": "true",
            "type": "sync"
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
    //console.log(data)
    this.setState({all_data: data.result})
    this.setState({sym: data.result.sym})
    this.setState({diff: data.result.diff})
}
render() {
    return (
        <div className="LVC">
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
