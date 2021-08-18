import './App.css';
import React from 'react';
import '../../../node_modules/react-linechart/dist/styles.css';
import {CartesianGrid, XAxis, YAxis, Cell, Legend, Tooltip, Line, ResponsiveContainer, LineChart} from 'recharts';
import Multiselect from 'multiselect-react-dropdown';
import { Button, Menu, MenuItem, Fade  } from '@material-ui/core';
import duck1 from './../duck1.png'

function convertDataPT(data) {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    let obj = { time: new Date(data[i].time) };
    for (let j = 0; j < data[i].sym.length; j++) {
      let sym = data[i].sym[j];
      obj[sym] = data[i].vol[j];
    }
    arr.push(obj);
  }
  return arr;
}

const COLORS = ['#0088FE', '#EF00FC', '#FC000C', '#FC7100', '#FCEF00','#8AFC00', '#000CFC', '#7B2BB5', '#DD5444', '#5BA05B']


export default class Volatility extends React.Component {
  
  constructor () {
    super()
    this.state = {
      anchorEl : null,
      open: false,
      sym:[],
      vol:[],
      result:[],
      options: [{name: 'AAPL', id: 1},{name: 'AIG', id: 2},{name: 'AMD', id: 3},{name: 'DELL', id: 4},{name: 'DOW', id: 5},{name: 'GOOG', id: 6},{name: 'HPQ', id: 7},{name: 'IBM', id: 8},{name: 'INTC', id: 9},{name: 'MSFT', id: 10}],
      filter: ["AAPL","AIG","AMD","DELL","DOW","GOOG","HPQ","IBM","INTC","MSFT"],
      filterOn:false,
      timeFilter:2,
      timeOptions:[{name: 'Previous Day', id:1},{name: 'Previous Week', id:1},{name: 'Previous Month', id:3}]
    }
    this.onSelect = this.onSelect.bind(this)
    this.setAnchorEl = this.setAnchorEl.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.yesterday = this.yesterday.bind(this)
    this.month = this.month.bind(this)
    this.week = this.week.bind(this)
}

handleClick(event) {
  this.setAnchorEl(event.currentTarget);
}
  setAnchorEl(value){
      this.setState({
          anchorEl: value,
          open: !this.state.open
      })
  }


onSelect(selectedList, selectedItem) {
  var nArr=[];
  for (let i=0; i< selectedList.length;i++){
    nArr.push(selectedList[i].name)
  }
  if(nArr.length > 0){
    this.setState({filter : nArr})
  }
  else{
    this.setState({filter: ["AAPL","AIG","AMD","DELL","DOW","GOOG","HPQ","IBM","INTC","MSFT"]})
  }
}


yesterday() {
  this.setState({timeFilter:2})
  this.setAnchorEl(null);
}
week() {
  this.setState({timeFilter:8})
  this.setAnchorEl(null);
}
month() {
  this.setState({timeFilter:31})
  this.setAnchorEl(null);
}



async  componentDidMount() {

  const url = "https://homer.aquaq.co.uk:8040/executeFunction";
  try {
      setInterval(async () => {
          const response = await 
          fetch (url,{
              "body": JSON.stringify({
                "arguments": {"db":"hdb","query":"select by (`timestamp$time) from (`time xgroup update 10 mdev vol by sym from select vol:last price by sym,time: 500000000000 xbar `long$time from trade where  (`date$time) >.z.d-"+ this.state.timeFilter.toString() +")"},
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
              // console.log(data)

this.setState({all_data: convertDataPT(data.result)})
        },10000);
        } catch(e) {
        console.log(e);
        }
    }

 
render() {
    return (
        
        <div>
               
                      <Button color = "secondary" aria-owns={this.state.open ? 'fade-menu' : undefined} aria-haspopup="true" onClick={this.handleClick}>
                          Timeframe
                      </Button>
                      <Menu id="fade-menu" anchorEl={this.state.anchorEl} open={this.state.open} onClose={this.handleClose} TransitionComponent={Fade}>
                      <MenuItem onClick={this.yesterday}>Yesterday</MenuItem>
                      <MenuItem onClick={this.week}>Past 7 Days</MenuItem>
                      <MenuItem onClick={this.month}>Past 30 Days</MenuItem>
                      </Menu>
                <Multiselect
                options={this.state.options} // Options to display in the dropdown
                placeholder="Select Symbols" // Default value of dropdown
                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onSelect} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                />

        <div><text className="header">  
          <h3>Today's Price Volatility</h3></text>
                        <div>
                        {this.state.loaded ?<ResponsiveContainer width="100%" height={400}>
                         
                            <LineChart data={this.state.all_data} margin={{ top: 15, right: 100, bottom: 15, left: 10 }}>
                              <Tooltip />
                              <XAxis dataKey="time" stroke="#000000"/>
                              <YAxis />
                              <Legend/>

                              {this.state.filter.map((entry, index) => {
                                            return (
                                                        <Line
                                                          type="monotone"
                                                          dataKey={entry}
                                                          stroke={COLORS[index % COLORS.length]}
                                                          dot={false}                                    
                                                        />
                                                  );
                                                             }
                                          )
                              
                              }

                            </LineChart>
                          </ResponsiveContainer>: <p>
                          <marquee scrollamount="10" behavior="scroll" direction="right"><img src={duck1} width="80" height="80" />  <span> <h3>Loading... </h3></span></marquee> 
                                                  </p>}
                      </div>
                      
                      </div>
        </div>
    )
  }  
}
