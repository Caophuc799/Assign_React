import React from 'react'
import './Footer.css'
import {Alert, Intent} from '@blueprintjs/core'

class FooterCustomer extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = { time: {}, seconds: 5 }
    this.timer = 0
    // this.startTimer = this.startTimer.bind(this)
    // this.countDown = this.countDown.bind(this)
  }
  deleted () {
    // this.setState({timer:3});
    // this.startTimer()
    this.props.fcDelete()
  }
  // secondsToTime (secs) {
  //   let hours = Math.floor(secs / (60 * 60))

  //   let divisor_for_minutes = secs % (60 * 60)
  //   let minutes = Math.floor(divisor_for_minutes / 60)

  //   let divisor_for_seconds = divisor_for_minutes % 60
  //   let seconds = Math.ceil(divisor_for_seconds)

  //   let obj = {
  //     'h': hours,
  //     'm': minutes,
  //     's': seconds
  //   }
  //   return obj
  // }
  // startTimer () {
  //   if (this.timer == 0) {
  //     this.timer = setInterval(this.countDown(), 1000)
  //     console.log(this.timer)
  //   }
  // }
  // countDown () {
  //   // Remove one second, set state so a re-render happens.
  //   let seconds = this.state.seconds - 1
  //   this.setState({
  //     time: this.secondsToTime(seconds),
  //     seconds: seconds
  //   })
  //   console.log(this.state.seconds)
  //   // Check if we're at zero.
  //   if (seconds === 0) {
  //     clearInterval(this.timer)
  //   }
  // }

  render () {
    return (
      <footer >
        <Alert
          intent={Intent.SUCCESS}
          isOpen={this.timer !== 0}
        >
          <p>
                       Delete customer successful
          </p>
        </Alert>
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

          <button type='button' className='pt-button btn-delete' onClick={() => this.deleted()}>Delete selected</button>
        </div>
      </footer>

    )
  }
}

export default FooterCustomer
