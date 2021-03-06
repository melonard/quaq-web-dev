import './App.css';
import React from 'react';
import '../../../node_modules/react-linechart/dist/styles.css';
import {CartesianGrid, XAxis, YAxis, Cell, Legend, Tooltip, Line, ResponsiveContainer, LineChart, PolarAngleAxis} from 'recharts';
import Multiselect from 'multiselect-react-dropdown';
import { Button, Menu, MenuItem, Fade  } from '@material-ui/core';
import duck1 from './../duck1.png'
import moment from 'moment'
import { AiOutlineCaretDown } from "react-icons/ai";


function convertDataPT(data) {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    let obj = { time: new moment(data[i].time).format('Do MMMM HH:mm') };
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
    this.multiselectRef = React.createRef();

    this.state = {
      anchorEl : null,
      open: false,
      loaded: false,
      sym:[],
      bSize: 500000000000,
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
    this.resetValues = this.resetValues.bind(this)
}

resetValues() {
  // By calling the belowe method will reset the selected values programatically
  this.multiselectRef.current.resetSelectedValues();
  this.setState({filter : this.props.syms.sort()})
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
      this.setState({filter: this.props.syms.sort()})
    }
  }

  yesterday() {
    this.setState({timeFilter:2})
    this.setState({bSize : 300000000000})
    this.setState({loaded : false})
    this.setAnchorEl(null);
  }
  week() {
    this.setState({timeFilter:8})
    this.setState({bSize : 1000000000000})
    this.setState({loaded : false})
    this.setAnchorEl(null);
  }
  month() {
    this.setState({timeFilter:31})
    this.setState({bSize : 3000000000000})
    this.setState({loaded : false})
    this.setAnchorEl(null);
  }
  


async  componentDidMount() {
  const url = "https://homer.aquaq.co.uk:8040/executeFunction";
  this.setState({filter: this.props.syms.sort()})
  try {
      setInterval(async () => {
          try{const response = await 
          fetch (url,{
              "body": JSON.stringify({
                "arguments": {"db":"hdb","query":"1_select by (`timestamp$time) from (`time xgroup update 10 mdev vol by sym from select vol:last price by sym,time: "+this.state.bSize+" xbar `long$time from trade where  (`date$time) >.z.d-"+ this.state.timeFilter.toString() +")"},
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
this.setState({loaded:true})}catch(e){
  console.log(e)
  this.setState({loaded:false})
}
        },5000);
        } catch(e) {
        //console.log(e);
        this.setState({loaded:false})
        }
    }

 



render() {
    return (
 
        <div>
               <text className="header">  
              <h3>Historical Price Volatility       
                </h3></text>
                <div style={{width: '50%', margin: '0 auto'}}>
                <Multiselect
                ref={this.multiselectRef}
                showArrow={true}
                options={this.state.options} // Options to display in the dropdown
                placeholder="Select Symbols" // Default value of dropdown
                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onSelect} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                />
                 </div>
                <Button variant='contained' onClick={this.resetValues}> Reset Filter</Button>
                <Button variant='contained' aria-owns={this.state.open ? 'fade-menu' : undefined} aria-haspopup="true" onClick={this.handleClick}>
                          History &nbsp; <AiOutlineCaretDown/>
                      </Button>
                      <Menu id="fade-menu" anchorEl={this.state.anchorEl} open={this.state.open} onClose={this.handleClose} TransitionComponent={Fade}>
                      <MenuItem onClick={this.yesterday}>Yesterday</MenuItem>
                      <MenuItem onClick={this.week}>Past 7 Days</MenuItem>
                      <MenuItem onClick={this.month}>Past 30 Days</MenuItem>
                      </Menu>

        <div style={{
        backgroundColor: (this.props.darkMode ? '#000000' : '#FFFFFF'),
        }}>

                        {this.state.loaded ?<ResponsiveContainer width="100%" height={400}>
                         
                            <LineChart data={this.state.all_data} margin={{ top: 15, right: 100, bottom: 15, left: 10 }}>
                              <Tooltip />                            
                              <XAxis dataKey="time" tick="rotate(-35)"/>
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
                          <marquee scrollamount="10" behavior="scroll" direction="right"><img src={duck1} width="80" height="80" />  <span> <h3 className = {this.props.darkMode ? 'dh3' : 'lh3'}>Loading... </h3></span></marquee> 
                                                  </p>}
                      </div>
                      
                     
        </div>
    )
  }  
}
