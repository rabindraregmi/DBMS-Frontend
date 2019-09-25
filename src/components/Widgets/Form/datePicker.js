import React, { Component } from "react";
import $ from "jquery";
import "../jquery.nepaliDatePicker";
import { calendarFunctions } from "../jquery.nepaliDatePicker";

export class NepaliDatePicker extends Component {
  componentDidMount() {
    console.log(calendarFunctions.getNepaliNumber(125));
    this.$el = $(this.el);
    if (this.props.date === "" || this.props.date === null) {
      console.log("EMPTY");
      var currentDate = new Date();
      var currentNepaliDate = calendarFunctions.getBsDateByAdDate(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      );
      var formatedNepaliDate = calendarFunctions.bsDateFormat(
        "%y/%m/%d",
        currentNepaliDate.bsYear,
        currentNepaliDate.bsMonth,
        currentNepaliDate.bsDate
      );
      this.$el.val(formatedNepaliDate);
    }
    this.$el.nepaliDatePicker({
      dateFormat: "%y/%m/%d",
      closeOnDateSelect: true
    });
    this.handleChange = this.handleChange.bind(this);
    this.$el.on("dateSelect", this.handleChange);
    
  }
  handleChange(e) {
    //    console.log(calendarFunctions.getNepaliNumber(125));
    console.log(e.datePickerData.adDate);
    console.log(e.datePickerData);
    const year = e.datePickerData.bsYear;
    const month = e.datePickerData.bsMonth;
    const day = e.datePickerData.bsDate;
    console.log([year, month, day].join("/"));
    this.props.dateChangeHandler(e.datePickerData.formattedDate, this.props.id);
  }
  render() {
    return (
      <div>
        <input
          value={this.props.date}
          className="date-picker"
          onChange={e => this.handleClick(e)}
          ref={el => (this.el = el)}
        />
      </div>
    );
  }
}

export default NepaliDatePicker;
