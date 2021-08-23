import React from 'react';
import './App.css'
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";


function joinArr(arr1,arr2){
    var joinedArr=[];
    for (let i = 0; i<arr1.length; i++){
        var temp1=""+arr1[i];
        var temp2=""+arr2[i];
        joinedArr.push(temp1 +' (' + temp2+'%)')
    }
    return(joinedArr)
}

export default class LastValueCache extends React.Component {
constructor () {
    super()
    this.state = {
        sym:[],
        diff:[],
        curr:[],
        openDiff:[],
        result:[],
        LVCpercent:[],
        percent:[],
        lvc:[],
        dfo:[]
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
            var LVCpercentArr=[]
            var percentArr=[]

            for (let i = 0;i<10;i++){
                symArr.push(data.result[i].sym)
                currArr.push(data.result[i].curr)
                diffArr.push(data.result[i].diff)
                openDiffArr.push(data.result[i].openDiff) 
                percentArr.push(100* data.result[i].openDiff /(data.result[i].curr-data.result[i].openDiff)) 
                LVCpercentArr.push(100* data.result[i].diff /(data.result[i].curr-data.result[i].diff))              
            }
      
            this.setState({sym: symArr})
            this.setState({curr: currArr.map(ele => parseFloat(ele.toFixed(2)))})
            this.setState({diff: diffArr.map(ele => parseFloat(ele.toFixed(2)))})
            this.setState({openDiff: openDiffArr.map(ele => parseFloat(ele.toFixed(2)))})
            this.setState({date: new Date().toLocaleString()}) 
            this.setState({LVCpercent: LVCpercentArr.map(ele => parseFloat(ele.toFixed(2)))})
            this.setState({percent: percentArr.map(ele => parseFloat(ele.toFixed(2)))})
            this.setState({lvc: joinArr(this.state.diff, this.state.LVCpercent)})
            this.setState({dfo: joinArr(this.state.openDiff, this.state.percent)})
        },1000);
        } catch(e) {
        console.log(e);
        }
}


render() {
    return (
        <div>   
                 <text className="header"><h3> Stock Price Fluctuation   </h3></text>
                <div className="date">
                <p > Last Updated: {this.state.date}</p>
                </div>
                 <div className='App'>
                      <table className={this.props.darkMode? 'minimalistBlackD' : 'minimalistBlack'}>
                        <col width="120px" />
                        <col width="110px" />
                        <col width="110px" />
                        <col width="110px" />
                        <col width="110px" />
                        <col width="110px" />
                        <col width="110px" />
                        <col width="110px" />
                        <col width="110px" />
                        <col width="110px" />
                        <col width="110px" />
                        <tr>
                        <h4>Stock</h4>
                            {this.state.sym.map((entry,index)=>{
                                return(<th>{entry}</th>)
                            })}
                        </tr>
                        <tr>
                        <h4>Current Price ($)</h4>
                        {this.state.curr.map((entry,index)=>{
                                return(<td>{entry}</td>)
                            })}
                        </tr>






                        <tr>
                        <h4>Last Value Cache</h4>
                            {this.state.lvc.map((entry,index)=>{
                                return(<td>{entry[0]!='-' ? <font color="green">+{entry} <AiOutlineArrowUp/></font> : <font color="red">{entry} <AiOutlineArrowDown/></font>}</td>)
                            })}
                        </tr>

{/*                         <tr>
                        <h4>% Difference LVC</h4>

                            {this.state.LVCpercent.map((entry,index)=>{
                                return(<td>{entry > 0 ? <font color="green">({entry}%) </font> : <font color="red">({entry}%) </font>}</td>)
                            })}
                        </tr> */}


                        <tr>
                        <h4>Difference from Open</h4>
                            {this.state.dfo.map((entry,index)=>{
                                return(<td>{entry[0]!='-' ? <font color="green">+{entry} <AiOutlineArrowUp/></font> : <font color="red">{entry} <AiOutlineArrowDown/></font>}</td>)
                            })}
                            </tr>
{/*                         <tr>
                        <h4>% Difference from Open</h4>

                            {this.state.percent.map((entry,index)=>{
                                return(<td>{entry > 0 ? <font color="green">({entry}%) </font> : <font color="red">({entry}%) </font>}</td>)
                            })}
                        </tr> */}
                      </table>  
        </div>
        </div>
    )
  }
}
//<span>&#37;</span>