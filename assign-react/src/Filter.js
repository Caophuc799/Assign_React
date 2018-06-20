import React, { Component } from 'react'
import './Filter.css'
import { Popover, PopoverInteractionKind,Position} from '@blueprintjs/core'

class Content extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: { }
    }
    // console.log(props);
    this.handleClear = this.handleClear.bind(this);
  };
  handleChange(field, e){         
    let temp = this.state.data;
    if(field === "isEmail") {
        temp["isEmail"] = !this.state.data["isEmail"];
        if(temp["isEmail"]){
            let apt = this.props.data;
            apt["isEmail"] = true;
            this.props.fcaddCountFilter(apt,1);
        }else{
            let apt = this.props.data;
            apt["isEmail"] = false;
            this.props.fcaddCountFilter(apt,-1);
        }
    }else{
        if(field === "isMembership") {
            temp["isMembership"] = !this.state.data["isMembership"];
            if(temp["isMembership"]){
                let apt = this.props.data;
                apt["isMembership"] = true;
                this.props.fcaddCountFilter(apt,1);
            }else{
                let apt = this.props.data;
                apt["isMembership"] = false;
                this.props.fcaddCountFilter(apt,-1);
            }
        }else{
            if(field === "gender"){
                temp["gender"] = !this.state.data["gender"];
                if(temp["gender"]){
                    let apt = this.props.data;
                    apt["gender"] = true;
                    this.props.fcaddCountFilter(apt,1);
                }else{
                    let apt = this.props.data;
                    apt["gender"] = false;
                    this.props.fcaddCountFilter(apt,-1);
                }
            }else{
                //temp[field] = e.target.value;
                let apt = this.props.data;
                apt[field] = e.target.value;
                this.props.fcaddCountFilter(apt,5);
            }
        }
    }
    
    // this.setState({data:temp});
  }
  handleClear(){
    
      const apt = { 
        "isEmail":false,
        "checkboxEmail":"invalid-email",
        "isMembership": false,
        "checkboxMembership":"Adult-member",
        "gender":false,
        "checkboxFemale":"female"
    };
      this.props.fcaddCountFilter(apt,0);
    //   this.setState({data:temp});
  }
  handleDoneFilter(){
    
    this.props.fcFilter(this.props.data);
    this.handleClear();
    this.props.fcClose(true);
  }
  // toggleDialog = () => this.setState({ isOpen: !this.state.isOpen });

  render () {
      
    return (
      <div>
        <div className='popover-filter'>
        
          <div className='header-popover'>
            <button className='btn-Clear'  onClick = { () => this.handleClear() }>
                        Clear
            </button>

                        Filters

            <button className=' btn-Done'  onClick = { () => this.handleDoneFilter() }>
                        Done
            </button>
          </div>
          <div className="email">
            <div className='check-email'>
                <label className='pt-control pt-checkbox .modifier'>
                <input type='checkbox'  onClick={this.handleChange.bind(this,"isEmail")}
                checked = {this.props.data["isEmail"]}
                />
                <span className='pt-control-indicator' />
                    Email
                </label>
            </div>
            <div className='div-select-option'>
                <select className='select-option' onChange={this.handleChange.bind(this,"checkboxEmail")}
                value = {this.props.data["checkboxEmail"]}
                >
                    <option value='invalid-email'>Invalid email address</option>
                     <option value='valid-email'>Has email</option>
                     <option value='no-email'>No email</option>
                </select>
            </div>
          </div>
          <div className="email">
            <div className='check-email'>
                <label className='pt-control pt-checkbox .modifier'>
                <input type='checkbox' onClick={this.handleChange.bind(this,"isMembership")} checked={this.props.data["isMembership"]}/>
                <span className='pt-control-indicator' />
                    Membership Plan
                </label>
            </div>
            
            <div className='div-select-option'>
                <select className='select-option'  onChange={this.handleChange.bind(this,"checkboxMembership")}
                value = {this.props.data["checkboxMembership"]}
                >
                    <option value='Adult-member'>Adult member</option>
                    <option value='No'>No</option>
                </select>
            </div>
          </div>

          <div className="email">
          <label className='pt-control pt-checkbox .modifier' style = {{"textAlign":"left"}}>
              <input type='checkbox'  onClick={this.handleChange.bind(this,"gender")} checked={this.props.data["gender"]}/>
              <span className='pt-control-indicator' />
                Gender
            </label>
            <div className='div-select-option'>
                <select className='select-option'  onChange={this.handleChange.bind(this,"checkboxFemale")}
                value = {this.props.data["checkboxFemale"]}
                >
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
class FilterData extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen : false,
      data: { 
        "isEmail":false,
        "checkboxEmail":"invalid-email",
        "isMembership": false,
        "checkboxMembership":"Adult-member",
        "gender":false,
        "checkboxFemale":"female"
    },
      countFilter: 0
    }
    this.handleClose = this.handleClose.bind(this);
    this.addCountFilter = this.addCountFilter.bind(this);
  };
  handleInteraction(nextOpenState) {
    //   console.log(nextOpenState);
    this.setState({ isOpen: nextOpenState });
    }
  handleClose(val){
    this.setState({isOpen:false});
  }
  addCountFilter(value,count){
    //   console.log(value);
    //   console.log(count);
    let val =this.state.countFilter;
    if(count===0){
        val = 0;
    }
    if(count === 1){
        val += 1;
    }else{
        if(count === -1){
            val -= 1;
        }
    }
    
    this.setState({data:value,countFilter:val});
      
  }
  toggleDialog = () => this.setState({ isOpen: !this.state.isOpen });

  render () {
    return (
      <div>
        {/* <button onClick={this.toggleDialog} type="button" className="pt-button"><i className="fas fa-filter"></i> Filter</button> */}
        <div style={{'float': 'right'}}>
         
             <Popover
               
                // position={Position.BOTTOM_LEFT}
                modifiers={{arrow: false}}
                isOpen={this.state.isOpen}
                onInteraction={(state) => this.handleInteraction(state)}
                interactionKind = {PopoverInteractionKind.click}
                position={Position.BOTTOM_LEFT}
                content={<Content fcClose = {this.handleClose} data = {this.state.data} fcFilter = {this.props.fcFilter }
                
                fcaddCountFilter = {this.addCountFilter}
                />}
            >
                <button onClick={this.toggleDialog}
              type='button' className='pt-button'><i className='fas fa-filter' /> Filter 
              {
                  this.state.countFilter === 0 ? "" : <div >
                  <span style={{"fontSize":"15px","marginLeft":"5px","marginRight":"5px"}}> | </span>
                   <div  style={{"color":"#06bebd","display":"inline"}}>  {this.state.countFilter} </div> </div>
           
              }
              </button>
             
            </Popover>
        </div>
      </div>
    )
  }
}

export default FilterData
