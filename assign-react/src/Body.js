import React, { Component } from 'react';
import './Body.css';
import {Dialog,Button,Intent} from '@blueprintjs/core';
import TableFilter from 'react-table-filter';

import axios from 'axios';


// import { Example, IExampleProps } from "@blueprintjs/docs-theme";
// import { Cell, Column, Table } from "@blueprintjs/table";
class AddCustomer extends Component{
  constructor(props){
    super(props);
    this.state={
      isOpen: false,
      colorFemale:{"background-color": "#06bebd","color": "#fff"},
      colorMale: {"background-color": "#fff","color": "#000000"},
      customer: {},
      errors:{}
    };
    this.apiUrl = 'http://partners-alpha.ap-southeast-1.elasticbeanstalk.com';
    this.chooseFemale=this.chooseFemale.bind(this);

  }
  handleChange(field, e){         
    let custome = this.state.customer;
    let error = this.state.errors;
    custome[field] = e.target.value;
    error[field] ="";        
    this.setState({customer: custome,errors:error});
  }
  addCustomer = () => {
    if(this.handleValidation()){
      const customer =
        {
          "partnerSideCustomerIdString": "123456",
          "firstName": this.state.customer["firstName"],
          "lastName": this.state.customer["lastName"],
          "email": this.state.customer["email"],
          "mobile": this.state.customer["mobile"],
          "gender": this.state.customer["gender"],
          "dob": this.state.customer["day"]+"/"+this.state.customer["month"]+"/"+this.state.customer["year"],
          "addressStreet": this.state.customer["addressStreet"],
          "addressUnit":this.state.customer["addressUnit"],
          "addressCity": this.state.customer["addressCity"],
          "addressCountry": this.state.customer["addressCountry"],
          "addressPostalCode": this.state.customer["addressPostalCode"]
      };
      // console.log(customer);
      axios.post(this.apiUrl+'/fakeCustomers',customer).then((res)=>{
            // this.state.data.push(customer);
            // this.setState({data:this.state.data});
            console.log(res);
      })
    }
    // 
  }
  handleValidation(){
      let fields = this.state.customer;
      let errors = {};
      let formIsValid = true;

      //Name
      if(!fields["firstName"]){
        formIsValid = false;
        errors["firstName"] = "Cannot be empty";
      }

      if(typeof fields["firstName"] !== "undefined"){
          if(!fields["firstName"].match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors["firstName"] = "Only letters";
          }          
      }
      //LastName
      if(!fields["lastName"]){
        formIsValid = false;
        errors["lastName"] = "Cannot be empty";
      }

      if(typeof fields["lastName"] !== "undefined"){
          if(!fields["lastName"].match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors["lastName"] = "Only letters";
          }          
      }

      //Email
      if(!fields["email"]){
        fields["email"]="";
      }else{

        if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid";
            }
        }
      }

      //Phone
      if(!fields["mobile"]){
        fields["mobile"]="";
      }else{

        if(typeof fields["mobile"] !== "undefined"){
          if(!fields["mobile".match(/^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/)]){
            formIsValid = false;
            // errors["mobile"] = "Phone Number error";
          }
        }
      }

      if(!fields["gender"]){
        fields["gender"]="female";
      }

      if(!fields["day"]){
        fields["day"]="01"
      }else{

        if(typeof fields["day"] !== "undefined"){
            if(!fields["day"].match(/^[0-9]/)){
                formIsValid = false;
                errors["day"] = "Only number";
            }else{
              if(fields['day']>31 || fields['day']<1){
                formIsValid = false;
                errors["day"] = "Day invalid";
              }
            }        
        }
      }

        if(!fields["month"]){
          fields["month"]="01"
        }else{
        if(typeof fields["month"] !== "undefined"){
          if(!fields["month"].match(/^[0-9]/)){
              formIsValid = false;
              errors["month"] = "Only number";
          }else{
            if(fields['month']>12 || fields['month']<1){
              formIsValid = false;
              errors["month"] = "month invalid";
            }
          }
        }
      } 

      if(!fields["year"]){
        fields["year"]="1990"
      }else{
          if(typeof fields["year"] !== "undefined"){
            if(!fields["year"].match(/^[0-9]/)){
                formIsValid = false;
                errors["year"] = "Only number";
            }else{
              if(fields['year']<1900 || fields['year']>2018){
                formIsValid = false;
                errors["year"] = "year invalid";
              }
            } 
          }
        }

        //addressStreet
        if(!fields["addressStreet"]){
          fields["addressStreet"]=""
        }

        if(!fields["addressStreet"]){
          fields["addressStreet"]=""
        }
        //addressUnit
        if(!fields["addressUnit"]){
          fields["addressUnit"]=""
        }
        //addressCountry
        if(!fields["addressCountry"]){
          fields["addressCountry"]=""
        }




    this.setState({errors: errors});
    return formIsValid;
  }
 
  chooseFemale(val){
    let custome=this.state.customer;
    let temp = this.state.colorMale;
    this.state.colorMale = this.state.colorFemale;
    this.state.colorFemale = temp;
    if(val){
      custome["gender"]="Female";
    }
    else {
      custome["gender"]="Male";
    }
    this.setState({colorFemale: this.state.colorFemale , colorMale: this.state.colorMale ,customer: custome});
  }
  toggleDialog = () => this.setState({isOpen: !this.state.isOpen});
  render(){
    console.log(this.state);
    return (
      <div>
        <button type="button" onClick={this.toggleDialog} className="pt-button btn-addcustomer">+ Add a Customer</button>
        {/* <Button  text="Show dialog" /> */}
        <Dialog
            // icon="inbox"
            isOpen={this.state.isOpen}
            onClose={this.toggleDialog}
            // title="Add Customer"
            // style={{'font-size':'30px'}}
        >
        {/* <form onSubmit={this.addCustomer.bind(this)}> */}
            <div className="pt-dialog-body body-dialog input-group" >
              
                <div className = "span-id" style={{"paddingBottom": "20px"}}> 
                  
                    Add Customer
                 
                  <div className="button-close">
                    {/* <button type="button" className="pt-button "> */}
                      
                      <span className="pt-icon-standard pt-icon-cross pt-align-right" 
                      onClick={this.toggleDialog}></span>
                    {/* </button> */}
                  </div>
                  
                </div>

                <div>
                  <label className="pt-label" > 
                    First name
                    <small className="error"> {this.state.errors["firstName"]}</small>
                    <input className="pt-input input-firstname" ref="firstName"  
                    onChange={this.handleChange.bind(this, "firstName")}
                     value={this.state.customer["firstName"]} type="text" 
                     placeholder="First Name" dir="auto" required/>
                  </label> 
                  <label className="pt-label label-lastname" > 
                    Last name
                    <small className="error"> {this.state.errors["lastName"]}</small>
                    <input className="pt-input input-firstname" ref="lastName" 
                    onChange={this.handleChange.bind(this,"lastName")} 
                    value={this.state.customer["lastName"]}  type="text" 
                    placeholder="Last Name" dir="auto" required />
                  </label> 
                </div>

                <label className="pt-label" > 
                  Email
                  <small className="error"> {this.state.errors["email"]}</small>
                  <input className="pt-input input-firstname" ref="email" 
                  onChange={this.handleChange.bind(this,"email")} value={this.state.customer["email"]} 
                  type="email" placeholder="Email" dir="auto" />
                </label> 
                <label className="pt-label label-lastname" > 
                  Mobile number
                  <small className="error"> {this.state.errors["mobile"]}</small>
                  <input className="pt-input input-firstname" ref="mobile"
                   onChange={this.handleChange.bind(this,"mobile")} value={this.state.customer["mobile"]} 
                    type="tel" placeholder="Phone" dir="auto" />
                </label> 
                <label className="pt-label choose-gender" > 
                  Gender
                  

                
                  <div  style={{"width":"100%"}}>
                    <button className="btn-gender-female" style={this.state.colorFemale} onClick={()=> this.chooseFemale(true)}>
                      Female
                    </button>
                    <button className="btn-gender-male" style={this.state.colorMale} onClick={()=> this.chooseFemale(false)}>
                      Male
                    </button>
                    {/* <a className="pt-button btn-gender-female" tabIndex="0" role="button">Female</a>
                    <a className="pt-button btn-gender-male" tabIndex="0" role="button">Male</a> */}
                  </div>

                </label> 
                <label className="pt-label label-lastname membership-day" > 
                  Date of birth
                  <span className="pt-text-muted">(DD/MM/YYYY)</span>
                  <small className="error"> {this.state.errors["day"]} {this.state.errors["month"]}{this.state.errors["year"]}</small>
                  <div style={{"display":"inline-block"}}>
                    
                    <input className="date-day" ref="day" 
                    
                    onChange={this.handleChange.bind(this,"day")} 
                    value={this.state.customer["day"]} type="text" placeholder="DD" dir="auto"/>
                    <input className="date-month" ref="month" onChange={this.handleChange.bind(this,"month")}
                     value={this.state.customer["month"]} type="text" placeholder="MM" dir="auto"/>
                    <input className="date-year" onChange={this.handleChange.bind(this,"year")}
                    value = {this.state.customer["year"]} type="text" placeholder="YYYY" dir="auto"/>
                  </div>
               </label> 
                
                <hr></hr>
                <div className = "span-id"> ID</div>
                <br/>
                <label className="pt-label" > 
                  Customer ID
                  
                  <input className="pt-input input-firstname" 
                  // onChange={this.handleChange.bind(this,"CustomerID")}
                  // value = {this.state.customer["CustomerID"]}
                  type="text" placeholder="Customer ID" dir="auto" />
                </label> 
                <label className="pt-label label-lastname" > 
                  Rovo Unique ID
                  <input className="pt-input input-firstname"  
                  // onChange={this.handleChange.bind(this,"rovoid")}
                  // value = {this.state.customer["rovoid"]}
                  type="text" placeholder="Rovo Unique ID" dir="auto" />
                </label> 
                <div className="linkProfile">
                  Rovo profile link
                </div>
                <br/>
                <div className="linkProfile" style={{"color":"#06bebd"}}>
                  rovo.co/talisha
                </div>
                <div style={{"marginTop":"40px"}}>
                <hr></hr>
                </div>
                <div className = "span-id"> Membership Plan</div>
                <label className="pt-label padding-member" > 
                  Membership Plan
                  <div className="div-select-option">
                    <select className="select-option"
                    // value={this.state.customer["membershipplan"]}
                    
                    // onChange={(val)=> {this.handleChange.bind(val.value,"membershipplan")}}
                    >
                      <option value="Adult">Adult Membership</option>
                      <option value="No">No</option>
                    </select>
                </div>
                </label> 
                <label className="pt-label label-lastname padding-member" > 
                  Pricing option
                  <div className="div-select-option">
                    <select className="select-option" 
                    // value={this.state.customer["pricing"]}
                    
                    // onChange={(val)=> {this.handleChange.bind(val.value,"pricing")}}
                    >
                      <option value="360"> $360/year</option>
                      <option value="340">$340/year</option>
                    </select>
                </div>
                      
              </label>
              
                <label className="pt-label padding-member" > 
                  Membership Status
                  <div className="div-select-option">
                    <select className="select-option"
                    //  value={this.state.customer["membershipstatus"]}
                    
                    //  onChange={(val)=> {this.handleChange.bind(val.value,"membershipstatus")}}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                </div>
                </label> 

                <label className="pt-label label-lastname padding-member membership-day"  > 
                  Membership Start<span className="pt-text-muted">(DD/MM/YYYY)</span>
                  <div style={{"display":"inline-block"}}>
                    
                    <input className="date-day" type="text" placeholder="DD" dir="auto"/>
                    <input className="date-month" type="text" placeholder="MM" dir="auto"/>
                    <input className="date-year" type="text" placeholder="YYYY" dir="auto"/>
                  </div>
                </label> 

                <hr></hr>
                  <div className = "span-id"> Address</div>
                <br/>
                <div>
                  <label className="pt-label" > 
                    Street name
                    <small className="error"> {this.state.errors["addressStreet"]}</small>
                    <input className="pt-input input-firstname" ref="addressStreet" onChange={this.handleChange.bind(this,"addressStreet")}
                      value={this.state.customer["addressStreet"]}  type="text" placeholder="Street name" dir="auto" />
                  </label> 
                  <div style={{"display":"inline-block"}}>
                    <label className="pt-label unit-number" > 
                      Unit number
                      <small className="error"> {this.state.errors["addressUnit"]}</small>
                      <input className="pt-input" ref="addressUnit" onChange={this.handleChange.bind(this,"addressUnit")}
                       value={this.state.customer["addressUnit"]} type="text" placeholder="Unit number" dir="auto" />
                    </label>
                    <label className="pt-label unit-number" style={{"margin":"inline-block"}} > 
                      Postal Code
                      <small className="error"> {this.state.errors["addressPostalCode"]}</small>
                      <input className="pt-input " ref="addressPostalCode" onChange={this.handleChange.bind(this,"addressPostalCode")}
                       value={this.state.customer["addressPostalCode"]}  type="text" placeholder="Postal code" dir="auto" />
                    </label>
                  </div>

                </div>

                <label className="pt-label" > 
                  City
                  <small className="error"> {this.state.errors["addressCity"]}</small>
                  <input className="pt-input input-firstname" ref="addressCity" 
                   onChange={this.handleChange.bind(this,"addressCity")}
                   value={this.state.customer["addressCity"]}  type="text" placeholder="City" dir="auto" />
                </label> 
                <label className="pt-label label-lastname" > 
                  Country
                  <small className="error"> {this.state.errors["addressCountry"]}</small>
                  <input className="pt-input input-firstname" ref="addressCountry"
                   onChange={this.handleChange.bind(this,"addressCountry")}
                   value={this.state.customer["addressCountry"]} type="text" placeholder="Country" dir="auto" />
                </label> 
            
            
            
            </div>
            <div className="pt-dialog-footer">
                <div className="pt-dialog-footer-actions">
                    <button text="Secondary" className="cancel-dialog" intent={Intent.PRIMARY}
                        onClick={this.toggleDialog}
                        text="Cancel">Cancel</button>
                    <button
                      className="add-customer-dialog"
                       text="Add Customer"
                       onClick={this.addCustomer}
                       type="submit"
                    >Add Customer</button>
                </div>
            </div>
            {/* </form> */}
        </Dialog>
    </div>
    )
  }


}

const Rowsearch = () => {
  return(
    <div className="inrow "  >  
      
        <span> Customer</span>
     
      <button type="button" className="pt-button btn-upload"> Upload CSV</button>
      <AddCustomer />
      
      <div className="pt-input-group">
        
        <input className="pt-input"  type="search" placeholder="Search input" dir="auto" />
        <span className="pt-icon pt-icon-search"></span>
      </div>
      <button type="button" className="pt-button"><i className="fas fa-filter"></i> Filter</button>
      {/* <input className="pt-input .modifier" type="text" placeholder="Search for a name, ID or contact" dir="auto" /> */}
      
      

    </div>
  )
}

const ItemTable = ({data}) => {
  return (
    <tr key={data.id}>
      <th>
        <label className="pt-control pt-checkbox checkbox-choose">
          <input type="checkbox"/>
          <span className="pt-control-indicator"></span>
        
        </label>
      </th>
      <th>
        {data.firstName}
      </th>
      <th>
        {data.lastName}
      </th>
      <th>
        {data.email}
      </th>
      <th>
        {data.mobile}
      </th>
      <th>
        No  
      </th>
    </tr>

  )
}

const TableForm = ({datas}) => {
  console.log(datas);
  const temp = datas.map( (user) => {
    return(<ItemTable data = {user} />)
  })
  return (
    temp
  )
}

class TableUser extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    this.apiUrl = 'http://partners-alpha.ap-southeast-1.elasticbeanstalk.com';
  }
  componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl+'/fakeCustomers?limit=99&emailCondition=no-email&genderCondition=female&q=6233')
      .then((res) => {
        // Set state with result
        console.log(res.data);
        this.setState({data:res.data.data});
       
      });
  }

  render () {
    return (
      <div>
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
        <tbody key="tbody">
          <TableForm datas={this.state.data}  />

        </tbody>
        </table>
        <span>
          {this.state.data.length}
        </span>
      </div>
    )
  }

}



class App extends Component {
  render() {
    return (
      <div className="body" className="content">
        <Rowsearch />

        < TableUser />
      </div>
    );
  }
}

export default App;
