import React from 'react';
import $ from 'jquery';

class DatePicker extends Component {
  
    componentDidMount() {
      this.$el = $(this.el);
      this.$el.nepaliDatePicker({
        dateFormat: "%D, %M %d, %y",
        closeOnDateSelect: true,
    });

    this.handleChange = this.handleChange.bind(this);
    this.$el.on('dateChange', this.handleChange);
    }
    handleChange(e) {
     // console.log(e.datePickerData.adDate)
      console.log(calendarFunctions.getNepaliNumber(125));
    }
    render () {
      return (<div>
       <input className= "date-picker" onChange = {(e)=>this.handleClick(e)}ref={el => this.el = el}>
       
       </input>
       
       </div> 
        );
    }
  }
  export default DatePicker;