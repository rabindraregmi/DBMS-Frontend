import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


class Example extends PureComponent {

  chartColor =  ['','#1cafec','#ffc107',"#1cafec",'#6f42c1']
  barItem = (dataKeys)=>
  {
    return dataKeys.map((key,index)=>{
      if (index!==0){

        return (
          <Bar key = {index} fill= {this.chartColor[index]} dataKey = {dataKeys[index]}/>
          )
        }
        else{
          return null
        }  
    })
  }

  render() {
    let dataKeys = Object.keys(this.props.data[0])
    
    return (
      <BarChart
        width={1000}
        height={300}
        data={this.props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
        barSize = {20}
        
      >
        <CartesianGrid strokeDasharray="10 10" />
        
        <XAxis dataKey = {dataKeys[0]}/>
        <YAxis />
        <Tooltip />
        <Legend />
          {this.barItem(dataKeys)}
      </BarChart>
    );
  }
}
export default Example;