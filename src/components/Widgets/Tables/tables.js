import React from "react";
import "./tables.css";
import { MDBDataTable } from "mdbreact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn } from "mdbreact";

const PendingPackageTable = props => {
  //CHangeSelectHandler Function is for setting State for selected Value in FILTER BY: option in every table
  //After the change in dropdown
  const filterByFieldChangeHandler = event => {
    let searchByKeyword = props.headings[event.target.value].field;

    let states = {
      searchBy: searchByKeyword
    };
    props.setState(states);
  };

  //This function is used for Searching within Table and render only searched item
  const searchFieldChangeHandler = event => {
    let keyword = event.target.value;
    let searchByKeyword = props.state.searchBy;
    console.log("****", searchByKeyword);
    let filteredData = props.state.tableData.filter(item => {
      return item[String(searchByKeyword)].indexOf(keyword) > -1;
    });
    //SETSTATE is not setting state, it is calling function passed in props which is setting state
    props.setState({
      filtered: filteredData
    });
    //Case for No Result
    if ((keyword !== "") & (props.state.filtered.length === 0)) {
      props.setState({
        noResult: true
      });
    }
  };

  //This method for showing options in Filter By:
  const selections = () => {
    return props.headings.map((header, i) => {
      if (
        !props.sortingOnlyList ||
        !props.sortingOnlyList.includes(header.label)
      )
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
      console.log("Here");
      let filteredData = props.state.tableData.filter(item => {
        return item["Overdue"].isOverdue;
      });
      props.setState({
        filtered: filteredData
      });
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
    return props.sortingOnlyList
      ? [
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
        ]
      : null;
  };

  const SearchBar = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="form-group col-md-1 col-lg-5">
            <label for="selectbar">Filter By:</label>
            <select
              id="selectbar"
              className="form-control "
              onChange={event => filterByFieldChangeHandler(event)}
            >
              {selections()}
            </select>
          </div>
          <div className="form-group col-md-1 col-lg-5">
            <label>Show: </label>
            <select
              className="form-control"
              onChange={event => changeSortHandler(event)}
            >
              {sortings()}
            </select>
          </div>

          <div className="form-group col-md-1 col-lg-2">
            <label>Search</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={event => searchFieldChangeHandler(event)}
            />
          </div>
        </div>
      </div>
    );
  };

  //MDBtable needs data in JSON format.Data methods is used for that.
  //Headings is looped and stored in columns
  //tableData is looped and stored in rows
  const data = () => {
    //headings is passed in props
    let headings = props.headings;
    //tableData are datas to be rendered in tabular format
    let tableData = props.tableData;
    let actions = props.actions;
    let data = {};
    //Manually added first and Last column of Table which is absent in props.heading
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
    //to make SN first column and Action Last column
    let columns = [remainingColumns[0], ...headings, remainingColumns[1]];
    console.log(tableData);
    let rows = tableData.map((datas, index) => {
      //   console.log(datas);
      let tempData = {};
      tempData["sn"] = index + 1;
      for (let key in datas) {
        if (key != "id") {
          tempData[key] = datas[key];
        }
      }
      //Adding Icon/Button in Action Column in every row
      let actionTemplate = actions.map((action, index) => {
        // console.log("ID", datas.id);
        let templates = null;
        if (action.hasOwnProperty("onClick")) {
          templates = (
            <button
              className="btn-xs btn-primary"
              onClick={() => action.onClick(datas["id"])}
            >
              Receive Package
            </button>
          );
        } else {
          templates = (
            <Link to={`${action.link}${datas["id"]}`}>
              <FontAwesomeIcon icon={action.icon} />
            </Link>
          );
        }
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
      //   console.log(tempData)
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
      <MDBDataTable
        className="xxx"
        searching={false}
        data={data()}
        tBodyColor="white"
        bordered
        sortable
      />
    </div>
  );
};
export default PendingPackageTable;
