import React, { Component } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';



const Chart = (props)=>{
  let data = props.data;
  console.log(data)
  return (
    <BarChart width={1000} height={300} barSize = {20} data={data}>
    <XAxis dataKey="year" stroke="#8884d8" />
    <YAxis />
    <Tooltip />
    <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
   
    <Bar type="monotone" dataKey="noOfPendingPackages" fill="#8884d8"/>
  </BarChart>
  )
}
export default Chart;
// class Example extends Component {

//   chartColor =  ['','#1cafec','#ffc107',"#1cafec",'#6f42c1']
//   barItem = (dataKeys)=>
//   {
//     return dataKeys.map((key,index)=>{
//       if (index!==0){

//         return (
//           <Bar key = {index} fill= {this.chartColor[index]} dataKey = {dataKeys[index]}/>
//           )
//         }
//         else{
//           return null
//         }  
//     })
//   }

//   render() {
//     return (
//       <BarChart
//         width={1000}
//         height={300}
//         data={this.props.data}
//         margin={{
//           top: 5, right: 30, left: 20, bottom: 5,
//         }}
//         barSize = {20}
        
//       >
//         <CartesianGrid strokeDasharray="10 10" />
        
//         <XAxis dataKey = {dataKeys[0]}/>
//         <YAxis />
//         <Tooltip />
//         <Legend />
//           {this.barItem(dataKeys)}
//       </BarChart>
//     );
//   }
// }
// export default Example;