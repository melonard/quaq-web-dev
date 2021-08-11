import React from 'react';
import './App.css'

export default class LastValueCache extends React.Component {
constructor () {
    super()
    this.state = {
        sym:[],
        diff:[],
        curr:[],
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
                    "query": "select curr:last price, diff:last price - first price by sym from trade"},
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
            var symArr=[]
            var currArr=[]
            var diffArr=[]
            for (let i = 0;i<10;i++){
                symArr.push(data.result[i].sym)
                currArr.push(data.result[i].curr)
                diffArr.push(data.result[i].diff)
            }
            this.setState({sym: symArr})
            this.setState({curr: currArr.map(ele => parseFloat(ele.toFixed(2)))})
            this.setState({diff: diffArr.map(ele => parseFloat(ele.toFixed(2)))})
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
    <div>
    <h3>Last Value Cache </h3>
        <div className='App'> 
                    
                    
                  
                      <table border="10" cellpadding="10">
                  
                        <tr>
                          <th>{JSON.stringify(this.state.sym[0])}</th>
                          <th>{JSON.stringify(this.state.sym[1])}</th>
                          <th>{JSON.stringify(this.state.sym[2])}</th>
                          <th>{JSON.stringify(this.state.sym[3])}</th>
                          <th>{JSON.stringify(this.state.sym[4])}</th>
                          <th>{JSON.stringify(this.state.sym[5])}</th>
                          <th>{JSON.stringify(this.state.sym[6])}</th>
                          <th>{JSON.stringify(this.state.sym[7])}</th>
                          <th>{JSON.stringify(this.state.sym[8])}</th>
                          <th>{JSON.stringify(this.state.sym[9])}</th>
                        </tr>
                        <tr>
                          <td>{JSON.stringify(this.state.curr[0])}</td>
                          <td>{JSON.stringify(this.state.curr[1])}</td>
                          <td>{JSON.stringify(this.state.curr[2])}</td>
                          <td>{JSON.stringify(this.state.curr[3])}</td>
                          <td>{JSON.stringify(this.state.curr[4])}</td>
                          <td>{JSON.stringify(this.state.curr[5])}</td>
                          <td>{JSON.stringify(this.state.curr[6])}</td>
                          <td>{JSON.stringify(this.state.curr[7])}</td>
                          <td>{JSON.stringify(this.state.curr[8])}</td>
                          <td>{JSON.stringify(this.state.curr[9])}</td>
                        </tr>
                        <tr>
                          <td>{JSON.stringify(this.state.diff[0])}</td>
                          <td>{JSON.stringify(this.state.diff[1])}</td>
                          <td>{JSON.stringify(this.state.diff[2])}</td>
                          <td>{JSON.stringify(this.state.diff[3])}</td>
                          <td>{JSON.stringify(this.state.diff[4])}</td>
                          <td>{JSON.stringify(this.state.diff[5])}</td>
                          <td>{JSON.stringify(this.state.diff[6])}</td>
                          <td>{JSON.stringify(this.state.diff[7])}</td>
                          <td>{JSON.stringify(this.state.diff[8])}</td>
                          <td>{JSON.stringify(this.state.diff[9])}</td>
                        </tr>
                      </table>
                  </div>
                  </div>
    )
  }
}