import React, { Component } from 'react';
import './Body.css';
import SwapPage from './SwapPage.js';
import AddCustomer from './AddCustomer.js';
import FooterCustomer from './Footer.js';
import FilterData from './Filter.js'
import axios from 'axios';

// import { Example, IExampleProps } from "@blueprintjs/docs-theme";
// import { Cell, Column, Table } from "@blueprintjs/table";


class Rowsearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      isShow : false
    }
    this.add = props;
  }
  toggleDialog = () => this.setState({isShow: !this.state.isShow})
  render(){
  return(
      <div>
        {
          this.state.isShow ? <AddCustomer data={null} isOpen={this.state.isShow} fcAdd={this.add} fcClose={this.toggleDialog} />  : "" 
        }
        <div className="inrow "  >  

            <span> Customer</span>
        
          <button type="button" className="pt-button btn-upload"> Upload CSV</button>
          
          <button type="button" onClick={this.toggleDialog}  className="pt-button btn-addcustomer">+ Add a Customer</button>
        
          
          <div className="pt-input-group">
            
            <input className="pt-input"  type="search" placeholder="Search input" dir="auto" />
            <span className="pt-icon pt-icon-search"></span>
          </div>
          <FilterData fcFilter = {this.props.fcFilter}/>
          {/* <input className="pt-input .modifier" type="text" placeholder="Search for a name, ID or contact" dir="auto" /> */}
          
          

        </div>
      </div>
      )
}
}

class ItemTable extends Component{
  constructor(props){
    super(props);
    this.state={
      data: props.data,
      isShow:false
     
    }
    this.update=props.update;
    this.checkIt = this.checkIt.bind(this);
    
  }

  openShow = ()=>{
    
    this.setState({isShow: !this.state.isShow});
  }
  checkIt(id){

    this.props.fcaddSelected(id,!this.props.data.isChecked);
  }
  render(){
    return (
       <tr className="itemtable" key={this.props.data.data.id}   >
        <td> 
          <div style={{"display":"None"}}>
            {
                this.state.isShow ? <AddCustomer data = {this.props.data.data} isOpen={true} fcUpdate={this.update} fcClose={this.openShow}/> : "" 
            }
          </div>
          <label className="pt-control pt-checkbox checkbox-choose">
            <input type="checkbox" checked={this.props.data.isChecked} onClick={()=>this.checkIt(this.props.data.data.id)}/>

            <span className="pt-control-indicator"></span>
            
          </label>
        </td>
        <td onClick={this.openShow}>
          {this.props.data.data.firstName}
        </td>
        <td onClick={this.openShow}>
          {this.props.data.data.lastName}
        </td>
        <td onClick={this.openShow}>
          {this.props.data.data.email}
        </td>
        <td onClick={this.openShow}>
          {this.props.data.data.mobile}
        </td>
        <td onClick={this.openShow}>
          No  
        </td>
      </tr>
  
  
    )
  }
  
}

class TableForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: props.datas
    }
  
  }
  render(){
   
    return(
        <tbody key="tbody">
        {
          this.props.datas.map( (user) => {
            return(<ItemTable data = {user}  fcaddSelected = {this.props.fcaddSelected} update={this.props.update} key={user.data.id} />)
          })
        }
      
        </tbody>
    )
  }
}



class TableUser extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      listSelected:[],
      count:1,
      countOf:0,
      countInPage:10,
      conditionFilter:""
      
    
    }
    this.apiUrl = 'http://partners-alpha.ap-southeast-1.elasticbeanstalk.com';
  }
  componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl+'/fakeCustomers?limit='+this.state.countInPage)
      .then((res) => {
        // Set state with result
        
        let count = res.data.pagination.total/this.state.countInPage;
        console.log(count);
        const temp = res.data.data.map( (item)=>{
          return {data:item,isChecked:false};
        })
        this.setState({data:temp,count:count});
        
      });
  }
  filterData(obj){

    let link ="";
    if(obj.isEmail){
      link = "&emailCondition="+obj.checkboxEmail;
    }
    if(obj.gender){
      link += "&genderCondition="+obj.checkboxFemale;
    }
    axios.get(this.apiUrl+'/fakeCustomers?limit='+this.state.countInPage + link)
      .then((res) => {
        // Set state with result
        const temp = res.data.data.map( (item)=>{
          return {data:item,isChecked:false};
        })
        this.setState({data:temp});
        
      });
  }
  addSelected(id,val){
    
    if(val){
      const listSelected = this.state.listSelected;
      listSelected.push(id);
      const temp = this.state.data.map( (item) => {
        if(item.data.id === id){
          return {data:item.data, isChecked: true};
        }
        return item;
      })
      this.setState({listSelected: listSelected, data: temp});
    }else{
      const listSelected = this.state.listSelected.filter( (item) => {
        if(item !== id) return item;
      })
     
      const temp = this.state.data.map( (item) => {
        if(item.data.id === id){
          return {data:item.data, isChecked: false};
        }
        return item;
      })
      this.setState({listSelected: listSelected, data: temp});
    }   
    
  }

  addCustomer(customer){
    this.state.data.push({data:customer,isChecked:false});
    this.setState({data:this.state.data});
  }
  updateCustomer(customer){
   
    const temp = this.state.data.map((item)=>{
      if(item.data.id===customer.id){
        return {data:customer,isChecked:item.isChecked};
      }
      return item;
    });
    
    this.setState({data:temp});
  }
  checkItemInList(val){
    let temp = false;
    this.state.listSelected.forEach( (item) => {
      if(item === val) {
        
        temp=true;
      }
    })
    
    return temp;
  }
  handleSelectedAll(){
    const tem =this.state.data.map( (item) => {

      return item.data.id;
    })
    const temp = this.state.data.map( (item) => {
        return {data:item.data, isChecked: true};
    })
    this.setState({listSelected:tem,data: temp});
  }

  handleDeselectedAll(){
    const temp = this.state.data.map( (item) => {
      return {data:item.data, isChecked: false};
    })
    this.setState({listSelected:[],data:temp});
  }
  handleRemove(){
    const remainder = this.state.data.filter( (item) => {
     
      if(this.checkItemInList(item.data.id)){
        axios.delete(this.apiUrl + '/fakeCustomers/' + item.data.id).then((res) => {
          // console.log("Sucessful");
        })
      }else{
        return item;
      }
    })
    

    this.setState({data: remainder, listSelected:[]});
    
     
  }
  handleNext(){
    let countOf = this.state.countOf;
    let start = countOf*5;
    countOf +=1;
    
    axios.get(this.apiUrl+'/fakeCustomers?offset=' + start + '&limit='+this.state.countInPage + this.state.conditionFilter)
      .then((res) => {
        // Set state with result
        console.log(res);
        const temp = res.data.data.map( (item)=>{
          return {data:item,isChecked:false};
        })
        this.setState({data:temp,countOf: countOf});
        
      });
  }
  handlePrevious(){
    let countOf = this.state.countOf;
    countOf -=1;
    let start = countOf*5;
    axios.get(this.apiUrl+'/fakeCustomers?offset=' + start + '&limit='+this.state.countInPage + this.state.conditionFilter)
      .then((res) => {
        // Set state with result
        const temp = res.data.data.map( (item)=>{
          return {data:item,isChecked:false};
        })
        this.setState({data:temp,countOf: countOf});
        
      });
  }

  render () {
    return (
      <div>
        <div className="body" className="content">
          <Rowsearch  add={this.addCustomer.bind(this)} fcFilter = {this.filterData.bind(this)} />

          <table >
            <thead key="thead" >
            <tr>
              <th className="th1">

              </th >
              <th className="th2">
                FIRST NAME
              </th>
              <th  className="th2">
                LAST NAME
              </th>
              <th  className="th2">
                EMAIL
              </th>
              <th  className="th2">
                MOBILE NUMBER
              </th>
              <th  className="th2">
                MEMBERSHIP PLAN
              </th>
            </tr>
          </thead>
          
            <TableForm datas={this.state.data}  fcaddSelected = {this.addSelected.bind(this)} update={this.updateCustomer.bind(this)}  key={this.state.data.id}  />
          
          </table>
          {/* <span>
            {this.state.data.length}
          </span> */}
        </div>
        <SwapPage count={this.state.count} countOf={this.state.countOf} fcNext = {this.handleNext.bind(this)} fcPrevious = {this.handlePrevious.bind(this)}/>
        <div >
          <FooterCustomer  countCustomer={this.state.listSelected.length} fcSeletedAll={this.handleSelectedAll.bind(this)} fcDeselectedAll = {this.handleDeselectedAll.bind(this)} fcDelete = {this.handleRemove.bind(this)} />
        </div>
      </div>
    )
  }

}



class App extends Component {
  render() {
    return (
    <div>
      <div >
       

        < TableUser />


      </div>
       

       <script src="https://fb.me/react-15.1.0.js"></script>
       <script src="https://fb.me/react-dom-15.1.0.js"></script>
     </div>

    );
  }
}

export default App;
