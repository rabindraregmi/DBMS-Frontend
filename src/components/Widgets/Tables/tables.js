import React from "react";
import TableHeader from "./tableHeader.js";
import TableBody from "./tablesBody.js";
import "./tables.css";
import { MDBDataTable } from "mdbreact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader,
  MDBBtn,
  MDBContainer
} from "mdbreact";

const PendingPackageTable = props => {
  const changeSelectHandler = event => {
    let searchByKeyword = props.headings[event.target.value].field;
    let states = {
      searchBy: searchByKeyword
    };
    props.setState(states);
  };

  const changeHandler = event => {
    let keyword = event.target.value;
    let searchByKeyword = props.state.searchBy;
    let filteredData = props.state.tableData.filter(item => {
      return item[String(searchByKeyword)].indexOf(keyword) > -1;
    });
    props.setState({
      filtered: filteredData
    });
    if ((keyword !== "") & (props.state.filtered.length === 0)) {
      props.setState({
        noResult: true
      });
    }
  };

  const selections = () => {
    return props.headings.map((header, i) => {
      return (
        <option key={i} value={i}>
          {header.label}
        </option>
      );
    });
  };

  const SearchBar = () => {
    return (
      <div className="form-group xxx">
        <label class="col-sm-2 col-form-label">Filter By:</label>
        <select
          className="form-control selectbar"
          onChange={event => changeSelectHandler(event)}
        >
          {selections()}
        </select>
        <input
          type="text"
          className="form-control searchbar"
          placeholder="Search..."
          onChange={event => changeHandler(event)}
        />
      </div>
    );
  };

  const data = () => {
    let headings = props.headings;
    let tableData = props.tableData;
    let actions = props.actions;
    let data = {};
    let remainingColumns = [
      {
        label: "S.N",
        sort: "asc",
        field: "sn"
      },
      {
        label: "Action",
        sort: ""
      }
    ];
    let columns = [remainingColumns[0], ...headings, remainingColumns[1]];
    let rows = tableData.map((datas, index) => {
      let tempData = {};
      tempData["sn"] = index + 1;
      for (let key in datas) {
        if (key != "id") {
          tempData[key] = datas[key];
        }
      }

      console.log(tempData);

      let actionTemplate = actions.map((action, index) => {
        let templates = (
          <Link to={`${action.link}${datas["id"]}`}>
            <FontAwesomeIcon icon={action.icon} />
          </Link>
        );

        return templates;
      });

      //Template for blinking button
      if (tempData.hasOwnProperty("overdue")) {
        const overdueInfo = tempData["overdue"];

        const blinkingButton = overdueInfo.isOverdue ? (
          //If overdue
          <MDBPopover placement="top" popover clickable id="popper1">
            <MDBBtn color="red" />
            <div>
              <MDBPopoverHeader>Overdue</MDBPopoverHeader>
              <MDBPopoverBody>{overdueInfo.days} days</MDBPopoverBody>
            </div>
          </MDBPopover>
        ) : (
          //Else
          <MDBPopover placement="top" popover clickable id="popper1">
            <MDBBtn color="success" />
            <div>
              <MDBPopoverHeader>Days remaining</MDBPopoverHeader>
              <MDBPopoverBody>{overdueInfo.days} days</MDBPopoverBody>
            </div>
          </MDBPopover>
        );

        tempData["overdue"] = blinkingButton;
      }

      
      tempData["action"] = actionTemplate;
      return tempData;
    });

    data["columns"] = columns;
    data["rows"] = rows;
    console.log(data);
    return data;
  };

  return (
    <div>
      {SearchBar()}
      <div className="table">
        <MDBDataTable
          searching={false}
          data={data()}
          tBodyColor="white"
          bordered
        />
      </div>
    </div>
  );
};
export default PendingPackageTable;
