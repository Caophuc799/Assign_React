import React, { Component } from 'react'
import './Footer.css'

class FooterCustomer extends React.Component {
  constructor (props) {
    super(props)
    // console.log(props);
  }
  render () {
    return (
      <footer >
        <div className='footer-div'>
          <div className='count-customer'>
            <span>
              {this.props.countCustomer} customers selected
            </span>
          </div>
          <div className='select-customer' onClick={this.props.fcDeselectedAll}>
            <span>
                   Deselected all rows
            </span>
          </div>
          <div className='select-customer' onClick={this.props.fcSeletedAll}>
            <span>
                  Selected all rows
            </span>
          </div>

          <button type='button' className='pt-button btn-delete' onClick={this.props.fcDelete}>Delete selected</button>
        </div>
      </footer>

    )
  }
}

export default FooterCustomer
