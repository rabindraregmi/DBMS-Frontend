import React, {Component,Fragment} from 'react'

class   TableOptions extends Component{
            state = {
                isAdvancedSearch: false,
                searchBy: 0,
                filterSelected:[],
            }
        //CHangeSelectHandler Function is for setting State for selected Value in FILTER BY: option in every table
        //After the change in dropdown
        searchByFieldChangeHandler = event => {
            let searchByKeyword = event.target.value;
            console.log(searchByKeyword)
                this.setState({
                    searchBy: searchByKeyword
                })
            } 
          
            


        // filterByFieldChangeHandler = event=> {
        //     let filterByKeyword = event.target.value;
        //     let states = {
        //         filterBy: filterByKeyword
        //     };
        //     this.setState(states)
        // }

        // filterSelectionChangeHandler= event=>{
        //     let filterSelection = this.props.categories[this.state.filterBy][event.target.value]
        //     this.setState({
        //         filterOption: filterSelection
        //     })

        // }

        //This function is used for Searching within Table and render only searched item
        searchFieldChangeHandler = event => {
            let keyword = event.target.value;
            let searchByKeyword = this.state.searchBy;
            console.log("xx",this.props.state.tableData[0])
            if (searchByKeyword!==0 && searchByKeyword!=='0')
            {
                
            let filteredData = this.props.state.tableData.filter(item => {
            return item[String(searchByKeyword)].indexOf(keyword) > -1;
            });
            //SETSTATE is not setting state, it is calling function passed in this.props which is setting state
            this.props.setState({
                filtered: filteredData,
                isFiltered:keyword === ""?false:true
            });
        }
        };
//This method for showing options in Filter By:
        searchBySelection = () => {
                return this.props.headings.map((header, i) => {
                    return (
                    <option key={i} value={header.field}>
                        {header.label}
                    </option>
                    );
                });
                };

        searchByBar = () =>{
            return(
                <div className="form-group col-md-1 col-lg-2">
                <label htmlFor="searchBySelectBar">Search By:</label>
                <select
                  id="searchBySelectBar"
                  className="form-control "
                  onChange={event => this.searchByFieldChangeHandler(event)}
                >
                <option value = {0}>Select Option to Filter</option>
                  {this.searchBySelection()}
                </select>
              </div>
            )}

        searchBar = ()=>{
            return (

                    <div className="form-group col-md-1 col-lg-2">
                        <label htmlFor= "searchBar">Search</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        onChange={event => this.searchFieldChangeHandler(event)}
                        />
                        {this.state.searchBy===0?<div id= "searhBarErrorField" style= {{color:'red'}}></div>:null}
                    </div>
                        
            )
        }


    // filterBySelection = () => {
    //     return this.props.headings.map((header, i) => {

    //         return header.grouping?(
    //             <option key={i} value={header.field}>
    //                 {header.label}
    //             </option>
    //             ):null;
    //         });
    //         };

    // filterBar = ()=>{
    //     return(
    //         <div className="form-group col-md-1 col-lg-2">
    //         <label for="filterBySelectBar">Filter By:</label>
    //         <select
    //           id="filterBySelectBar"
    //           className="form-control "
    //           onChange={event => this.filterByFieldChangeHandler(event)}
    //         >
    //           {this.filterBySelection()}
    //         </select>
    //       </div>
    //     )
    // }
    filterOptionsSelection= (id)=>{
        return this.props.categories[id].map((header, i) => {
            return(
            <option key={i} value={header}>
                {header}
            </option>
            );
        });
    }

    // filterSelectionChangeHandler = (event,id) => {
    //     let categories = this.props.categories
    //     let selectedCategory = {}

    //     selectedCategory[id] = event.target.value

    //     console.log(selectedCategory)

    // }
    // filterOptionBar = ()=>{
    //     return(
    //         <div className="form-group col-md-1 col-lg-2">
    //         <label htmlFor="filterOptionSelectBar">Filter By:</label>
    //         <select
    //           id="filterOptionSelectBar"
    //           className="form-control "
    //           onChange={event => this.filterSelectionChangeHandler(event)}
    //         >
    //           {this.filterOptionsSelection()}
    //         </select>
    //       </div>
    //     )
    // }

    setValues=(value, id)=>{
      
    }
    selectOptions = (id)=>{
        let temp= []
        console.log(this.props.categories[id])
        this.props.categories[id].forEach(element=>{
             let tempD= {}
             console.log(element)
             tempD['text'] = element
             tempD['val'] = element
             temp.push (tempD)
        });
        return temp
    }
    filterOptionsBar = ()=>{
        let categories = this.props.categories;
        let categoryArray = []
        for (let [key,value] of Object.entries(categories))
        {
            categoryArray.push({field:key, options: value})
        }
        return categoryArray.map((option, i) => {
            let id = option.field
            //console.log(this.props.categories)
            return(
                <div key = {i} className="form-group col-md-1 col-lg-2">
                <label htmlFor="filterOptionSelectBar">{option.field.charAt(0).toUpperCase() + option.field.substring(1)}</label>
                
                {/* <Select
                options={this.selectOptions(id)}
                clearable={true}
                onChange={values => this.setValues(values,id)}
                searchBy='text'
                labelField='text'
                className="form-control"
              /> */}
                
                <select
                  id={`${option.field}-filterOptionSelectBar`}
                  className="form-control "
                  //onChange={event=> this.filterSelectionChangeHandler(event,id)}
                >
                    <option value ={0} defaultValue>Show All {option.field}</option>
                  {this.filterOptionsSelection(id)}
                </select>
                 {/* <Select options={values.config.options}  clearable = {true}
                    onChange={(values) => setValues(values, data.id)}
                    searchBy= 'text' labelField = "text"
                    className = "form-control"
                    id={`${option.field}-filterOptionSelectBar`}
              /> */}
              </div>
            );
        });


    }
    handleFilterClick = ()=>{
        let categories = this.props.categories;
        let categoryArray = []
        for (let [key,value] of Object.entries(categories))
        {
            categoryArray.push({field:key, options: value})
        }

        let selectedValue = categoryArray.map((item, index)=>{
            return item.field
        })
        let selectedDOM= []
        for (let item of selectedValue)
        {
            let tempJSON = {}
            let tempJSONKey = item
            tempJSON[tempJSONKey] = document.getElementById(`${item}-filterOptionSelectBar`).value
            selectedDOM.push(tempJSON);
        }
        console.log(selectedDOM)

        let filteredData = []
        for(let tableData of this.props.state.tableData)
        {   

            let flag = true; // TableData should match with every filter option so in loop it is ANDED with every option
            //if one of the condition failed, that particular tableDATA is not pushed into filtered DATA
            for (let element of selectedDOM)
            {

                for (let key of Object.keys(element))
                {   
                    //I've added Link to some table so this was to extract children of <Link> element
                    if(tableData[key].props)
                        tableData[key] =tableData[key].props.children 
                    if(element[key]==='0')
                    {
                        flag = flag && true // 0 means show all so condition is always true thats why anded with true
                    }
                    else
                    {

                        flag = flag && tableData[key]===element[key]
                    }
                }
            }
            if (flag) filteredData.push(tableData);
        }
        console.log(filteredData)
        this.props.setState({
            filtered: filteredData,
            isFiltered:true
        });

    }
    handleClearFilterClick = ()=>{
        let x = document.querySelectorAll('[id*="-filterOptionSelectBar"]');
        for (let element of x)
        {
            element.selectedIndex= 0;
        }
        this.props.setState({
            filtered: this.props.state.tableData,
            isFiltered:false
        });
    }



    advancedButtonClickHandler=(event)=>{
       //document.getElementById('advancedSearchOptions').hidden = !document.getElementById('advancedSearchOptions').hidden
        let el = event.target;
        el.nextSibling.hidden = !el.nextSibling.hidden
    //    this.setState((prevState) => ({
    //     isAdvancedSearch: !prevState.isAdvancedSearch 
    //    }));
     }

      tableOptions = ()=>{

        if (!this.state.isAdvancedSearch){
         return (
           <Fragment>
            <button className = "btn btn-sm btn-default" onClick = {(event)=>{this.advancedButtonClickHandler(event)}}> &#8810;Advanced Search</button>
            <div className="advanceSearchOptions" id="advancedSearchOptions" hidden>
                <div className = "row">
                    {this.searchByBar()}
                    {this.searchBar()}
                </div>
                <div className = "row">
                    {this.filterOptionsBar()}
                    <div>
                        <button onClick = {()=>this.handleFilterClick()}className = "btn btn-md btn-secondary" style = {{marginTop: '30px'}}>Filter</button>
                        <button onClick = {()=>this.handleClearFilterClick()}className = "btn btn-md btn-danger" style = {{marginTop: '30px'}}>Clear Filter</button>
                    </div>
                </div>
            </div>
          </Fragment>
         )
       }
       else {
           return(
            <button className = "btn btn-sm btn-default" onClick = {(event)=>{this.advancedButtonClickHandler(event)}}> &#8810;Advanced Search</button>
           )
       }

    }

    render(){
        return (
            <div className = "container-fluid">
                    {this.tableOptions()}
            </div>
        )
    }
}
export default TableOptions;