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
    let searchByKeyword = props.headings[event.target.value].type;

    let states = {
      searchBy: searchByKeyword
    };
    props.setState(states);
  };

  const changeHandler = event => {
    let keyword = event.target.value;
    let searchByKeyword = props.state.searchBy;
    // console.log('Stateprops', props.state.searchBy);
    console.log('****', searchByKeyword);
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
      if (!props.sortingOnlyList.includes(header.label))
        return (
          <option key={i} value={i}>
            {header.label}
          </option>
        );
    });
  };

  const changeSortHandler = event => {
    const field = event.target.value;
    console.log(field);
    if (field === "Overdue") {
        console.log('Here');
      let filteredData = props.state.tableData.filter(item => {
        return item["Overdue"].isOverdue;
      });
      props.setState({
        filtered: filteredData
      });
    //   console.log(filteredData);
      if (props.state.filtered.length === 0)
        props.setState({
          noResult: true
        });
    } else if (field === "All") {
      props.setState({
        filtered: props.state.tableData
      });
    }
  };

  const sortings = () => {
    return [
      <option key={0} value="All">
        All
      </option>,
      ...props.headings.map((header, i) => {
        if (props.sortingOnlyList.includes(header.label))
          return (
            <option key={i + 1} value={header.type}>
              {header.type}
            </option>
          );
      })
    ];
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

        <label class="col-sm-2 col-form-label">Show: </label>
        <select
          className="form-control selectbar"
          onChange={event => changeSortHandler(event)}
        >
          {sortings()}
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


      let actionTemplate = actions.map((action, index) => {
        let templates = (
          <Link to={`${action.link}${datas["id"]}`}>
            <FontAwesomeIcon icon={action.icon} />
          </Link>
        );

        return templates;
      });

      //Template for blinking button
      if (tempData.hasOwnProperty("Overdue")) {
        const overdueInfo = tempData["Overdue"];

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

        tempData["Overdue"] = blinkingButton;
      }

      tempData["action"] = actionTemplate;
      return tempData;
    });

    data["columns"] = columns;
    data["rows"] = rows;
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
