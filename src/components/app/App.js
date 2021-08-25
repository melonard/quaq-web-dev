import './App.css';
import React from 'react';
import LastValueCache from './LastValueCache';
import MostTradedSym from './MostTradedSym';
import MinPriceSym from './MinPriceSym';
import MaxPriceSym from './MaxPriceSym';
import CurrentPrice from './CurrentPrice';
import Yesterday from './Yesterday';
import TimeSeries from './TimeSeries';
import Graph from './Graph';
import Select from 'react-select';
import TwoDaysAgo from './TwoDaysAgo';
import Volatility from './Volatility';
import VolumePie from './VolumePie'
import AmountPie from './AmountPie'
import { Avatar, Button } from '@material-ui/core';
import duck4 from './../duck4clear2.png'
import quaq from './../quaq3.png';
import { ResponsiveContainer } from 'recharts';

//import { CSSTransition } from 'react-transition-group';

window.addEventListener("offline", function() {
  alert("The application is currently offline and is unable to display up-to-date data until the connection has been restored. \n \nPlease check your internet connection.");
});
window.addEventListener("online", function() {
  alert("The connection has been restored. \n \nThe application will now display up-to-date data.");
});

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      btnOption: true,
      symList: ["AAPL","AIG","AMD","DELL","DOW","GOOG","HPQ","IBM","INTC","MSFT"],
      darkMode: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.modeSwitch = this.modeSwitch.bind(this)
}

handleClick(){
  this.setState({btnOption : !this.state.btnOption})
}
modeSwitch(){
  this.setState({darkMode: !this.state.darkMode})
}

async  componentDidMount() {

  const url = "https://homer.aquaq.co.uk:8040/executeFunction";
  try {
      setInterval(async () => {
          const response = await 
          fetch (url,{
              "body": JSON.stringify({
                "arguments": {"db":"rdb","query":"select distinct sym from trade"},
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
          var symArr=[];
          for (let i = 0; i< data.result.length; i++){
            symArr.push(data.result[i].sym)
          }
          this.setState({symList: symArr})
        },1000);
        } catch(e) {
        console.log(e);
        }
    }
 
render() {
    return (
      <div className='div' style={{
        backgroundColor: (this.state.darkMode ? '#000000' : '#FFFFFF')
      }}>
      
<span>
<img position="absolute" src={quaq} width="20%" height="10%" className='title' />
<div class="center"><strong>Qu</strong>antitative <strong>A</strong>nalytics using <strong>Q</strong></div>
{/* <marquee width="75%" scrollamount="20" behavior="alternate" direction="left" ><strong>QU</strong>antitative <strong>A</strong>nalytics using <strong>Q</strong></marquee>  */}
</span>
<ResponsiveContainer width="100%" height={135} >
 <div>
 <marquee class="marq" scrollamount="20" behavior="scroll" direction="right"><img src={duck4} width="200" height="200" /></marquee>
 </div>    
 </ResponsiveContainer >
 <div className='divc'> 
          <div ><Button   id='btnDark'  onClick={this.modeSwitch} startIcon={<Avatar src={this.state.darkMode ? 'https://png.pngtree.com/png-clipart/20190921/original/pngtree-sun-line-black-icon-png-image_4750183.jpg' :'https://png.pngtree.com/png-clipart/20190628/original/pngtree-vector-new-moon-icon-png-image_4049286.jpg'}/>}></Button></div>
          <div><LastValueCache darkMode={this.state.darkMode} syms={this.state.symList}/></div>
          <div class="float-child"><MostTradedSym darkMode={this.state.darkMode} syms={this.state.symList}/></div>
          <div class="float-child"><MinPriceSym darkMode={this.state.darkMode} syms={this.state.symList}/></div>
          <div class="float-child"><MaxPriceSym darkMode={this.state.darkMode} syms={this.state.symList}/></div>
          <div> <VolumePie darkMode={this.state.darkMode} syms={this.state.symList}/> <AmountPie darkMode={this.state.darkMode}/></div>
          <div><Graph darkMode={this.state.darkMode} syms={this.state.symList}/></div>
          {this.state.btnOption ?<text className="header"> <h3>Yesterday's Price History</h3></text>:<text className="header"><h3>Two Day's Ago Price History</h3></text>}
          <div className="date">
                          <p> See data from:</p>                       
                        </div>
          <Button variant="contained" id="btn" onClick={this.handleClick}>{this.state.btnOption ? "2 Days Ago": "Yesterday"} </Button>
          <div>
          {this.state.btnOption === true ? <Yesterday darkMode={this.state.darkMode} syms={this.state.symList}/> :
          <TwoDaysAgo darkMode={this.state.darkMode} syms={this.state.symList}/>}</div>
          <div><Volatility darkMode={this.state.darkMode} syms={this.state.symList}/></div>
          </div>
          </div>
    )
  }
}