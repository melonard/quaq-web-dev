import React from 'react';
import './App.css'
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

export default class LastValueCache extends React.Component {
constructor () {
    super()
    this.state = {
        sym:[],
        diff:[],
        curr:[],
        openDiff:[],
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
                    "query": "select curr:last price, diff:last deltas price, openDiff:(last price) - first price by sym from trade"},
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
            var openDiffArr=[]
            for (let i = 0;i<10;i++){
                symArr.push(data.result[i].sym)
                currArr.push(data.result[i].curr)
                diffArr.push(data.result[i].diff)
                openDiffArr.push(data.result[i].openDiff)
            }
            this.setState({sym: symArr})
            this.setState({curr: currArr.map(ele => parseFloat(ele.toFixed(2)))})
            this.setState({diff: diffArr.map(ele => parseFloat(ele.toFixed(2)))})
            this.setState({openDiff: openDiffArr.map(ele => parseFloat(ele.toFixed(2)))})
            this.setState({date: new Date().toLocaleString()})
        },1000);
        } catch(e) {
        console.log(e);
        }
}


render() {
    return (
        <div>   
                <h3>Last Value Cache </h3>
                <div class="date">
                <p> Last Updated: {this.state.date}</p>
                </div>
                 <div className='App'>
                      <table border="10" cellpadding="10">
                        <col width="100px" />
                        <col width="100px" />
                        <col width="100px" />
                        <col width="100px" />
                        <col width="100px" />
                        <col width="100px" />
                        <col width="100px" />
                        <col width="100px" />
                        <col width="100px" />
                        <col width="100px" />
                        <col width="100px" />
                        <tr>
                        <h4>Stock</h4>
                            {this.state.sym.map((entry,index)=>{
                                return(<th>{entry}</th>)
                            })}
                        </tr>
                        <tr>
                        <h4>Current Price</h4>
                        {this.state.curr.map((entry,index)=>{
                                return(<td>{entry}</td>)
                            })}
                        </tr>
                        <tr>
                        <h4>Difference</h4>
                            {this.state.diff.map((entry,index)=>{
                                return(<td>{entry > 0 ? <font color="green">+{entry} <AiOutlineArrowUp/></font> : <font color="red">{entry} <AiOutlineArrowDown/></font>}</td>)
                            })}
                        </tr>
                        <tr>
                        <h4>Difference from Open</h4>
                            {this.state.openDiff.map((entry,index)=>{
                                return(<td>{entry > 0 ? <font color="green">+{entry} <AiOutlineArrowUp/></font> : <font color="red">{entry} <AiOutlineArrowDown/></font>}</td>)
                            })}
                        </tr>
                      </table>  
        </div>
        </div>
    )
  }
}