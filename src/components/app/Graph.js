import './App.css';
import React from 'react';
import '../../../node_modules/react-linechart/dist/styles.css';
import {CartesianGrid, XAxis, YAxis,Brush, ReferenceLine, Cell, Legend, Tooltip, Line, ResponsiveContainer, LineChart} from 'recharts';
import Multiselect from 'multiselect-react-dropdown';
import duck1 from './../duck1.png'
import { Button } from '@material-ui/core';



function convertDataPT(data) {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    let obj = { time: data[i].time }; 
    for (let j = 0; j < data[i].sym.length; j++) {
      let sym = data[i].sym[j];
      obj[sym] = data[i].price[j];
    }
    arr.push(obj);
  }
  return arr;
}

const COLORS = ['#0088FE', '#EF00FC', '#FC000C', '#FC7100', '#FCEF00','#8AFC00', '#000CFC', '#7B2BB5', '#DD5444', '#5BA05B']

export default class Graph extends React.Component {
  
  constructor () {
    super()
    this.multiselectRef = React.createRef();
    this.state = {
      loaded:false,
      sym:[],
      price:[],
      options: [],
      filter: ["AAPL","AIG","AMD","DELL","DOW","GOOG","HPQ","IBM","INTC","MSFT"],
      result:[],
      time: 1000
    }
    this.onSelect = this.onSelect.bind(this)
    this.resetValues = this.resetValues.bind(this)
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
    this.setState({filter: this.props.syms})
  }
}

resetValues() {
  // By calling the belowe method will reset the selected values programatically
  this.multiselectRef.current.resetSelectedValues();
  this.setState({filter: this.props.syms.sort()})
}


async  componentDidMount() {
  const url = "https://homer.aquaq.co.uk:8040/executeFunction";
  this.setState({filter: this.props.syms.sort()})
  try {
      setInterval(async () => {
          try{const response = await 
          fetch (url,{
              "body": JSON.stringify({
                "arguments": {"db":"rdb","query":"-1_select sym, price by time from (select avg avgs price by sym,time:string 5 xbar time.minute from(select med avgs price by sym,time from trade))"},
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
var optArr=[]
for(let i =0; i<this.props.syms.length;i++){
  optArr.push({name:this.props.syms[i], id:(i+1)})
}
this.setState({options:optArr})
this.setState({date: new Date().toLocaleString()})
this.setState({loaded:true})}catch(e){
  console.log(e)
  this.setState({loaded:false})
}
        },15000);
        } catch(e) {
        //console.log(e);
        this.setState({loaded:false})
        }
    }

 
render() {
  const { selected } = this.state;
    return (
        
        <div style={{paddingTop: 20}}>
        <p className='space'></p>
        <p className="header"> <h3>Running Average Price</h3></p>
                <Multiselect
                id="css_custom"
                ref={this.multiselectRef}
                showArrow={true}
                options={this.state.options} // Options to display in the dropdown
                placeholder="Select Symbols" // Default value of dropdown
                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onSelect} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                                />
                <Button variant='contained' onClick={this.resetValues}> Reset Filter</Button>
        <div>              
           
                     
                        <div className="date">
                          <p> Last Updated: {this.state.date}</p>                       
                        </div>
                          <div> 

                          </div>
                          {this.state.loaded ?<ResponsiveContainer width="100%" height={400}>
                            <LineChart data={this.state.all_data} margin={{ top: 15, right: 100, bottom: 15, left: 10 }}>
                              <Tooltip />
                              <XAxis dataKey="time"/>
                              <YAxis />
                              <Brush dataKey="time"   fill='rgba(0, 0, 0, 0)'/>
                              <Brush />
                              {selected && <ReferenceLine x={selected} isFront stroke="red" />}
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
                          </ResponsiveContainer> : <p>
                          <marquee scrollamount="10" behavior="scroll" direction="right"><img src={duck1} width="80" height="80" />  <span> <h3 className = {this.props.darkMode ? 'dh3' : 'lh3'}>Loading... </h3></span></marquee> 
                                                  </p>}
                      
                      </div>
        </div>
    )
  }  
}

