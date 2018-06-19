import React, { Component } from 'react';
import './Body.css';
import './grid.css';
import {Dialog,Intent} from '@blueprintjs/core';
import axios from 'axios';
import Moment from 'react-moment';

class AddCustomer extends Component{
    constructor(props){
      super(props);
      this.state={
        isOpen: true,
        btnText: "Add Customer",
        colorFemale:{"backgroundColor": "#06bebd","color": "#fff"},
        colorMale: {"backgroundColor": "#fff","color": "#000000"},
        customer: {},
        errors:{}
      };
      this.apiUrl = 'http://partners-alpha.ap-southeast-1.elasticbeanstalk.com';
      this.chooseFemale=this.chooseFemale.bind(this);
  
      this.fcClose = props.fcClose;
      console.log(this.props);
      if(props.data!=null){
        this.state.btnText="Update Customer";
        this.fcUpdate = props.fcUpdate;
        
  
        this.state.customer["id"]=props.data["id"];
        if( props.data.firstName==null){
          this.state.customer["firstName"]="";
        }
        else{
          
          this.state.customer["firstName"] = props.data.firstName;
        }
        if( props.data.lastName==null){
          this.state.customer["lastName"]="";
        }else{
          this.state.customer["lastName"] = props.data.lastName;
        }
        if( props.data.email==null){
          this.state.customer["email"]="";
        }else{
          this.state.customer["email"] = props.data.email;
        }
        if( props.data.mobile==null){
          this.state.customer["mobile"]="";
        }else{
          this.state.customer["mobile"] = props.data.mobile;
        }
        if( props.data.gender==null){
          this.state.customer["gender"]="";
        }else{
          this.state.customer["gender"] = props.data.gender;
        }
        if( props.data.dob==null){
          this.state.customer["dob"]="";
        }else{
          const moment = require('moment');
          let date = moment(props.data.dob);
          var birthday = new Date(date._i);
          // console.log(date);
          this.state.customer["year"] =""+ birthday.getFullYear()+"";
          let temp = birthday.getMonth()+1;
          this.state.customer["month"] =""+ temp +"";
          this.state.customer["day"] = ""+birthday.getDate()+"";
        }
        if( props.data.addressStreet==null){
          this.state.customer["addressStreet"]="";
        }else{
          this.state.customer["addressStreet"] = props.data.addressStreet;
        }
        if( props.data.addressUnit==null){
          this.state.customer["addressUnit"]="";
        }else{
          this.state.customer["addressUnit"] = props.data.addressUnit;
        }
        if( props.data.addressCity==null){
          this.state.customer["addressCity"]="";
        }else{
          this.state.customer["addressCity"] = props.data.addressCity;
        }
        if( props.data.addressCountry==null){
          this.state.customer["addressCountry"]="";
        }else{
          this.state.customer["addressCountry"] = props.data.addressCountry;
        }
        if( props.data.addressPostalCode==null){
          this.state.customer["addressPostalCode"]="";
        }else{
          this.state.customer["addressPostalCode"] = props.data.addressPostalCode;
        }
  
      
        this.state.isOpen=props.isOpen;
        if(this.state.customer["gender"] === "Male" || this.state.customer["gender"] === "male"){
          let temp = this.state.colorMale;
          this.state.colorMale = this.state.colorFemale;
          this.state.colorFemale = temp;
        }      
      }else{
        this.fcAdd = props.fcAdd;
      }
    }
    handleChange(field, e){         
      let custome = this.state.customer;
      let error = this.state.errors;
      custome[field] = e.target.value;
      error[field] ="";        
      this.setState({customer: custome,errors:error});
    }
    addCustomer = () => {
      
      if(this.props.data != null){
        this.updateCustomer();
      }else{
        if(this.handleValidation()){
          const moment = require('moment');
          let date = moment(this.state.customer["day"]+"/"+this.state.customer["month"]+"/"+this.state.customer["year"]);
  
          const customer =
            {
              "partnerSideCustomerIdString": "123456",
              "firstName": this.state.customer["firstName"],
              "lastName": this.state.customer["lastName"],
              "email": this.state.customer["email"],
              "mobile": this.state.customer["mobile"],
              "gender": this.state.customer["gender"],
              "dob": date._i,
              "addressStreet": this.state.customer["addressStreet"],
              "addressUnit":this.state.customer["addressUnit"],
              "addressCity": this.state.customer["addressCity"],
              "addressCountry": this.state.customer["addressCountry"],
              "addressPostalCode": this.state.customer["addressPostalCode"]
            };
          
          // console.log(customer);
          axios.post(this.apiUrl+'/fakeCustomers',customer).then((res)=>{

                  this.fcAdd.add(res.data.data);
                  this.fcClose();
                  // console.log(res.data.data);
                  // this.toggleDialog(); 
          }).catch(error => {
            if(error.response.status == 400){
              if(error.response.data.errorCode === "error.badRequest.emailRegisteredByOther"){
                let listError = this.state.errors;
                listError["email"] = error.response.data.msg;
                this.setState({errors:listError});  
              }
            } 
            
        });
        }
      }
    }
  
    updateCustomer = () => {
      if(this.handleValidation()){
        const moment = require('moment');
        let date = moment(this.state.customer["day"]+"/"+this.state.customer["month"]+"/"+this.state.customer["year"]);
       
        const customer =
          {
            "partnerSideCustomerIdString": "123456",
            "firstName": this.state.customer["firstName"],
            "lastName": this.state.customer["lastName"],
            "email": this.state.customer["email"],
            "mobile": this.state.customer["mobile"],
            "gender": this.state.customer["gender"],
            "dob": date._i,
            "addressStreet": this.state.customer["addressStreet"],
            "addressUnit":this.state.customer["addressUnit"],
            "addressCity": this.state.customer["addressCity"],
            "addressCountry": this.state.customer["addressCountry"],
            "addressPostalCode": this.state.customer["addressPostalCode"],
            "id":this.state.customer["id"]
        };
        // console.log(customer);
        axios.put(this.apiUrl+'/fakeCustomers/'+this.state.customer["id"],customer).then((res)=>{
                 this.fcUpdate(res.data.data);
                 this.fcClose();
                //  console.log(res);
                //  this.toggleDialog();
                 
                 
                
        }
      ).catch(error => {
          if(error.response.status == 400){
            if(error.response.data.errorCode === "error.badRequest.emailRegisteredByOther"){
              let listError = this.state.errors;
              listError["email"] = error.response.data.msg;
              this.setState({errors:listError});  
            }
          } 
          
      });
      }
    }
    handleValidation(){
        let fields = this.state.customer;
        let errors = {};
        let formIsValid = true;
        let focus = false;
  
        //Name
        if(!fields["firstName"]){
          formIsValid = false;
          this.firstName.focus(); 
          focus = true;
          errors["firstName"] = "Cannot be empty";
          
        }
  
        // if(typeof fields["firstName"] !== "undefined"){
        //     if(!fields["firstName"].match(/^[a-zA-Z]+$/)){
        //         formIsValid = false;
        //         errors["firstName"] = "Only letters";
        //     }          
        // }
        //LastName
        if(!fields["lastName"]){
          formIsValid = false;
          if (!focus){
                this.lastName.focus(); 
          }
          errors["lastName"] = "Cannot be empty";
        }
  
        // if(typeof fields["lastName"] !== "undefined"){
        //     if(!fields["lastName"].match(/^[a-zA-Z]+$/)){
        //         formIsValid = false;
        //         errors["lastName"] = "Only letters";
        //     }          
        // }
  
        //Email
        if(!fields["email"]){
          fields["email"]="";
        }else{
  
          if(typeof fields["email"] !== "undefined"){
              let lastAtPos = fields["email"].lastIndexOf('@');
              let lastDotPos = fields["email"].lastIndexOf('.');
  
              if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                if (!focus){
                   this.email.focus(); 
                }
                errors["email"] = "Email is not valid";
              }
          }
        }
  
        //Phone
        if(!fields["mobile"]){
          fields["mobile"]="";
        }else{
  
          // if(typeof fields["mobile"] !== "undefined"){
          //   if(!fields["mobile".match(/^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/)]){
          //     formIsValid = false;
          //     // errors["mobile"] = "Phone Number error";
          //   }
          // }
        }
  
        if(!fields["gender"]){
          fields["gender"]="female";
        }
  
        if(!fields["day"]){
          fields["day"]= "01";
        }else{
  
          if(typeof fields["day"] !== "undefined"){
           
              if(fields["day"]=="" || !fields["day"].match(/^[0-9]/)){
                  formIsValid = false;
                  if (!focus){
                    this.day.focus();
                  }
                  errors["day"] = "Only number";
              }else{
                if(fields['day']>31 || fields['day']<1){
                  formIsValid = false;
                  if (!focus){
                    this.day.focus();
                  }
                  errors["day"] = "Day invalid";
                }
              }        
          }
        }
  
          if(!fields["month"]){
            fields["month"]="01";
          }else{
          if(typeof fields["month"] !== "undefined"){
            if(fields["month"]=="" || !fields["month"].match(/^[0-9]/)){
                formIsValid = false;
                if (!focus){
                  this.month.focus();
                }
                errors["month"] = "Only number";
            }else{
              if(fields['month']>12 || fields['month']<1){
                formIsValid = false;
                if (!focus){
                  this.month.focus();
                }
                errors["month"] = "month invalid";
              }
            }
          }
        } 
  
        if(!fields["year"]){
          fields["year"]="1990";
        }else{
            if(typeof fields["year"] !== "undefined"){
              if(!fields["year"].match(/^[0-9]/)){
                  formIsValid = false;
                  if (!focus){
                    this.year.focus();
                  }
                  errors["year"] = "Only number";
              }else{
                if(fields['year']<1900 || fields['year']>2018){
                  formIsValid = false;
                  if (!focus){
                    this.year.focus();
                  }
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
   
      return (
          <Dialog
              // icon="inbox"
              isOpen={this.state.isOpen}
              onClose={this.fcClose}
              canOutsideClickClose={false}
              // title="Add Customer"
              // style={{'font-size':'30px'}}
          >
          
              <div className="pt-dialog-body body-dialog input-group" >
                
                  <div className = "span-id" style={{"paddingBottom": "20px"}}> 
                    
                      Add Customer
                   
                    <div className="button-close">
                        
                        <span className="pt-icon-standard pt-icon-cross pt-align-right" 
                        onClick={this.fcClose}></span>
                      {/* </button> */}
                    </div>
                    
                  </div>
  
                  <div className="row">
                    <div className = "col col-sm-6" >
                      <label className="pt-label" > 
                        First name
                        <small className="error"> {this.state.errors["firstName"]}</small>
                        <input className="pt-input input-firstname"
                      
                        ref={(input) => { this.firstName = input; }} 
                        onChange={this.handleChange.bind(this, "firstName")}
                        value={this.state.customer["firstName"]} type="text" 
                        placeholder="First Name" dir="auto"
                        autoFocus = {true}
                        required
                        
                        />
                      </label> 
                    </div>
                    <div className="col col-sm-6">
                    <label className="pt-label label-lastname" > 
                      Last name
                      <small className="error"> {this.state.errors["lastName"]}</small>
                      <input className="pt-input input-firstname" 
                       ref={(input) => { this.lastName = input; }} 
                      onChange={this.handleChange.bind(this,"lastName")} 
                      value={this.state.customer["lastName"]}  type="text" 
                      placeholder="Last Name" dir="auto" required />
                    </label> 
                    </div>
                  </div>
               <div className="row">
                 <div className = "col col-sm-6" >
                  <label className="pt-label" > 
                    Email
                    <small className="error"> {this.state.errors["email"]}</small>
                    <input className="pt-input input-firstname" 
                    ref={(input) => { this.email = input; }} 
                    onChange={this.handleChange.bind(this,"email")} value={this.state.customer["email"]} 
                    type="email" placeholder="Email" dir="auto" />
                  </label> 
                </div>
                <div className="col col-sm-6">
                  <label className="pt-label label-lastname" > 
                    Mobile number
                    <small className="error"> {this.state.errors["mobile"]}</small>
                    <input className="pt-input input-firstname" 
                    ref={(input) => { this.mobile = input; }} 
                     onChange={this.handleChange.bind(this,"mobile")} value={this.state.customer["mobile"]} 
                      type="tel" placeholder="Phone" dir="auto" />
                  </label>

                </div>
              </div>
              <div className="row">
                 <div className = "col col-sm-6" >
                  <label className="pt-label choose-gender" > 
                    Gender
                    
  
                  
                    <div  style={{"width":"100%"}}>
                      <button className="btn-gender-female" style={this.state.colorFemale} onClick={()=> this.chooseFemale(true)}>
                        Female
                      </button>
                      <button className="btn-gender-male" style={this.state.colorMale} onClick={()=> this.chooseFemale(false)}>
                        Male
                      </button>
                     
                    </div>
  
                  </label> 
                </div>
                <div className = "col col-sm-6" >
                  <label className="pt-label label-lastname membership-day" > 
                    Date of birth
                    <span className="pt-text-muted">(DD/MM/YYYY)</span>
                    <small className="error"> {this.state.errors["day"]} {this.state.errors["month"]}{this.state.errors["year"]}</small>
                    <div style={{"display":"inline-block"}}>
                      
                      <input className="date-day" 
                      ref={(input) => { this.day = input; }} 
                      
                      onChange={this.handleChange.bind(this,"day")} 
                      value={this.state.customer["day"]} type="text" placeholder="DD" dir="auto"/>
                      <input className="date-month" 
                       ref={(input) => { this.month = input; }} 
                       onChange={this.handleChange.bind(this,"month")}
                       value={this.state.customer["month"]} type="text" placeholder="MM" dir="auto"/>
                      <input className="date-year" 
                      ref={(input) => { this.year = input; }} 
                      onChange={this.handleChange.bind(this,"year")}
                      value = {this.state.customer["year"]} type="text" placeholder="YYYY" dir="auto"/>
                    </div>
                 </label> 
                </div>
              </div>
                  <hr></hr>
                  <div className = "span-id"> ID</div>
                  <br/>
              <div className="row">
               <div className = "col col-sm-6" >
                  <label className="pt-label" > 
                    Customer ID
                    
                    <input className="pt-input input-firstname" 
                    // onChange={this.handleChange.bind(this,"CustomerID")}
                    // value = {this.state.customer["CustomerID"]}
                    type="text" placeholder="Customer ID" dir="auto" />
                  </label> 
                </div>
                <div className = "col col-sm-6" >
                  <label className="pt-label label-lastname" > 
                    Rovo Unique ID
                    <input className="pt-input input-firstname"  
                    // onChange={this.handleChange.bind(this,"rovoid")}
                    // value = {this.state.customer["rovoid"]}
                    type="text" placeholder="Rovo Unique ID" dir="auto" />
                  </label> 
              </div>
            </div>
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
              <div className="row">
              <div className = "col col-sm-6" >
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
                </div>
                <div className = "col col-sm-6" >
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
                </div>
              </div>
              <div className="row">
                <div className = "col col-sm-6" >
              
                
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
                </div>
                <div className = "col col-sm-6" >
                  <label className="pt-label label-lastname padding-member membership-day"  > 
                    Membership Start<span className="pt-text-muted">(DD/MM/YYYY)</span>
                    <div style={{"display":"inline-block"}}>
                      
                      <input className="date-day" type="text" placeholder="DD" dir="auto"/>
                      <input className="date-month" type="text" placeholder="MM" dir="auto"/>
                      <input className="date-year" type="text" placeholder="YYYY" dir="auto"/>
                    </div>
                  </label> 
                </div>
              </div>
                  <hr></hr>
                    <div className = "span-id"> Address</div>
                  <br/>
                  <div>
                <div className="row">
                <div className = "col col-sm-6" >
                    <label className="pt-label" > 
                      Street name
                      <small className="error"> {this.state.errors["addressStreet"]}</small>
                      <input className="pt-input input-firstname" ref="addressStreet" onChange={this.handleChange.bind(this,"addressStreet")}
                        value={this.state.customer["addressStreet"]}  type="text" placeholder="Street name" dir="auto" />
                    </label> 
                  </div>
                  <div className = "col col-sm-6" >
                    <div className="row">
                    <div className="col col-sm-6">
                    <div style={{"display":"inline-block"}}>
                      <label className="pt-label unit-number" > 
                        Unit number
                        <small className="error"> {this.state.errors["addressUnit"]}</small>
                        <input className="pt-input unitaddress" ref="addressUnit" onChange={this.handleChange.bind(this,"addressUnit")}
                         value={this.state.customer["addressUnit"]} type="text" placeholder="Unit number" dir="auto" />
                      </label>
                      </div>
                    </div>
                      <div className="col col-sm-6">
                      <label className="pt-label unit-number" style={{"margin":"inline-block"}} > 
                        Postal Code
                        <small className="error"> {this.state.errors["addressPostalCode"]}</small>
                        <input className="pt-input unitaddress" ref="addressPostalCode" onChange={this.handleChange.bind(this,"addressPostalCode")}
                         value={this.state.customer["addressPostalCode"]}  type="text" placeholder="Postal code" dir="auto" />
                      </label>
                      </div>
                    </div>
                  </div>
                  </div>
  
                  </div>
                <div className="row">
                <div className="col col-sm-6">
                  <label className="pt-label" > 
                    City
                    <small className="error"> {this.state.errors["addressCity"]}</small>
                    <input className="pt-input input-firstname" ref="addressCity" 
                     onChange={this.handleChange.bind(this,"addressCity")}
                     value={this.state.customer["addressCity"]}  type="text" placeholder="City" dir="auto" />
                  </label> 
                </div>
                <div className="col col-sm-6">
                  <label className="pt-label label-lastname" > 
                    Country
                    <small className="error"> {this.state.errors["addressCountry"]}</small>
                    <input className="pt-input input-firstname" ref="addressCountry"
                     onChange={this.handleChange.bind(this,"addressCountry")}
                     value={this.state.customer["addressCountry"]} type="text" placeholder="Country" dir="auto" />
                  </label> 
                </div>
              </div>
              
              
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
                      >{this.state.btnText}</button>
                  </div>
              </div>
              {/* </form> */}
          </Dialog>
      
      )
    }
  
  
  }

  export default AddCustomer;
  