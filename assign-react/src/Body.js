import React, { Component } from 'react'
import './Body.css'
import SwapPage from './SwapPage.js'
import AddCustomer from './AddCustomer.js'
import FooterCustomer from './Footer.js'
import FilterData from './Filter.js'
import axios from 'axios'

// import Math from 'react-real-math';

// import { Example, IExampleProps } from "@blueprintjs/docs-theme";
// import { Cell, Column, Table } from "@blueprintjs/table";

class Rowsearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: false
    }
    this.add = props
    this.toggleDialog = this.toggleDialog.bind(this)
  }
  toggleDialog () {
    this.setState({isShow: !this.state.isShow})
  }
  render () {
    return (
      <div>
        {
          this.state.isShow ? <AddCustomer data={null} isOpen={this.state.isShow} fcAdd={this.add} fcClose={this.toggleDialog} /> : ''
        }
        <div className='inrow ' >

          <span> Customer</span>

          <button type='button' className='pt-button btn-upload'> Upload CSV</button>

          <button type='button' onClick={this.toggleDialog} className='pt-button btn-addcustomer'>+ Add a Customer</button>

          <div className='pt-input-group'>

            <input className='pt-input input-search' placeholder='Search input' dir='auto' />
            <span className='pt-icon pt-icon-search btn-icon-search' />
          </div>
          <FilterData fcFilter={this.props.fcFilter} />
          {/* <input className="pt-input .modifier" type="text" placeholder="Search for a name, ID or contact" dir="auto" /> */}

        </div>
      </div>
    )
  }
}

class ItemTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.data,
      isShow: false

    }
    this.update = props.update
    this.checkIt = this.checkIt.bind(this)
    this.openShow = this.openShow.bind(this)
  }

  openShow () {
    this.setState({isShow: !this.state.isShow})
  }
  checkIt (id) {
    this.props.fcaddSelected(id, !this.props.data.isChecked)
  }
  render () {
    return (
      <tr className='itemtable' key={this.props.data.data.id} >
        <td>
          <div style={{'display': 'None'}}>
            {
              this.state.isShow ? <AddCustomer data={this.props.data.data} isOpen fcUpdate={this.update} fcClose={this.openShow} /> : ''
            }
          </div>
          <label className='pt-control pt-checkbox checkbox-choose'>
            <input type='checkbox' checked={this.props.data.isChecked} onClick={() => this.checkIt(this.props.data.data.id)} />

            <span className='pt-control-indicator' />

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

class TableForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.datas
    }
  }
  render () {
    return (
      <tbody key='tbody'>
        {
          this.props.datas.map((user) => {
            return (<ItemTable data={user} fcaddSelected={this.props.fcaddSelected} update={this.props.update} key={user.data.id} />)
          })
        }

      </tbody>
    )
  }
}

class TableUser extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      listSelected: [],
      count: 1,
      countOf: 0,
      countInPage: 8,
      total: 0,
      conditionFilter: ''

    }
    this.apiUrl = 'http://partners-alpha.ap-southeast-1.elasticbeanstalk.com'
  }
  componentDidMount () {
    // Make HTTP reques with Axios
    axios.get(this.apiUrl + '/fakeCustomers?limit=' + this.state.countInPage)
      .then((res) => {
        // Set state with result

        let count = Math.floor(res.data.pagination.total / this.state.countInPage)
        if (res.data.pagination.total % this.state.countInPage !== 0) {
          count += 1
        }

        const temp = res.data.data.map((item) => {
          return {data: item, isChecked: false}
        })
        this.setState({data: temp, count: count, total: res.data.pagination.total})
      })
  }
  filterData (obj) {
    let link = ''
    if (obj.isEmail) {
      link = '&emailCondition=' + obj.checkboxEmail
    }
    if (obj.gender) {
      link += '&genderCondition=' + obj.checkboxFemale
    }
    axios.get(this.apiUrl + '/fakeCustomers?limit=' + this.state.countInPage + link)
      .then((res) => {
        const temp = res.data.data.map((item) => {
          return {data: item, isChecked: false}
        })
        let count = Math.floor(res.data.pagination.total / this.state.countInPage)
        if (res.data.pagination.total % this.state.countInPage !== 0) {
          count += 1
        }
        if (count === 0) {
          count = 1
        }
        this.setState({data: temp, total: res.data.pagination.total, countOf: 0, count: count, conditionFilter: link, listSelected: []})
      })
  }
  addSelected (id, val) {
    if (val) {
      const listSelected = this.state.listSelected
      listSelected.push(id)
      const temp = this.state.data.map((item) => {
        if (item.data.id === id) {
          return {data: item.data, isChecked: true}
        }
        return item
      })
      this.setState({listSelected: listSelected, data: temp})
    } else {
      const listSelected = this.state.listSelected.filter((item) => {
        if (item !== id) { return item } else return null
      })
      console.log(listSelected)

      const temp = this.state.data.map((item) => {
        if (item.data.id === id) {
          return {data: item.data, isChecked: false}
        }
        return item
      })
      this.setState({listSelected: listSelected, data: temp})
    }
  }

  addCustomer (customer) {
    let countOf = this.state.countOf

    let start = countOf * this.state.countInPage

    axios.get(this.apiUrl + '/fakeCustomers?offset=' + start + '&limit=' + this.state.countInPage + this.state.conditionFilter)
      .then((res) => {
        // Set state with result

        const temp = res.data.data.map((item) => {
          return {data: item, isChecked: false}
        })
        let count = Math.floor(res.data.pagination.total / this.state.countInPage)
        if (res.data.pagination.total % this.state.countInPage !== 0) {
          count += 1
        }
        this.setState({data: temp, count: count, countOf: countOf, listSelected: []})
      })
  }
  updateCustomer (customer) {
    const temp = this.state.data.map((item) => {
      if (item.data.id === customer.id) {
        return {data: customer, isChecked: item.isChecked}
      }
      return item
    })

    this.setState({data: temp})
  }
  checkItemInList (val) {
    let temp = false
    this.state.listSelected.forEach((item) => {
      if (item === val) {
        temp = true
      }
    })

    return temp
  }
  handleSelectedAll () {
    const tem = this.state.data.map((item) => {
      return item.data.id
    })
    const temp = this.state.data.map((item) => {
      return {data: item.data, isChecked: true}
    })
    this.setState({listSelected: tem, data: temp})
  }

  handleDeselectedAll () {
    const temp = this.state.data.map((item) => {
      return {data: item.data, isChecked: false}
    })
    this.setState({listSelected: [], data: temp})
  }
  handleRemove () {
    // let total = this.state.total;
    // total -= this.state.listSelected.length;
    this.state.data.filter((item) => {
      if (this.checkItemInList(item.data.id)) {
        axios.delete(this.apiUrl + '/fakeCustomers/' + item.data.id).then((res) => {
          let countOf = this.state.countOf
          if (countOf + 1 >= this.state.count) {
            countOf -= 1
          }
          let start = countOf * this.state.countInPage

          axios.get(this.apiUrl + '/fakeCustomers?offset=' + start + '&limit=' + this.state.countInPage + this.state.conditionFilter)
            .then((res) => {
              // Set state with result

              const temp = res.data.data.map((item) => {
                return {data: item, isChecked: false}
              })
              let count = Math.floor(res.data.pagination.total / this.state.countInPage)
              if (res.data.pagination.total % this.state.countInPage !== 0) {
                count += 1
              }

              if (count === 0) {
                count = 1
                countOf = 0
              }
              this.setState({data: temp, count: count, countOf: countOf, listSelected: []})
            })
        })
        return null
      } else {
        return item
      }
    })
  }
  handleNext () {
    let countOf = this.state.countOf

    countOf += 1
    let start = countOf * this.state.countInPage

    axios.get(this.apiUrl + '/fakeCustomers?offset=' + start + '&limit=' + this.state.countInPage + this.state.conditionFilter)
      .then((res) => {
        // Set state with result
        const temp = res.data.data.map((item) => {
          return {data: item, isChecked: false}
        })
        this.setState({data: temp, countOf: countOf, listSelected: []})
      })
  }
  handlePrevious () {
    let countOf = this.state.countOf
    countOf -= 1
    let start = countOf * this.state.countInPage
    axios.get(this.apiUrl + '/fakeCustomers?offset=' + start + '&limit=' + this.state.countInPage + this.state.conditionFilter)
      .then((res) => {
        // Set state with result
        const temp = res.data.data.map((item) => {
          return {data: item, isChecked: false}
        })
        this.setState({data: temp, countOf: countOf, listSelected: []})
      })
  }

  render () {
    return (
      <div>
        <div className='body content' >
          <Rowsearch add={this.addCustomer.bind(this)} fcFilter={this.filterData.bind(this)} />

          <table >
            <thead key='thead' >
              <tr>
                <th className='th1' />
                <th className='th2'>
                FIRST NAME
                </th>
                <th className='th2'>
                LAST NAME
                </th>
                <th className='th2'>
                EMAIL
                </th>
                <th className='th2'>
                MOBILE NUMBER
                </th>
                <th className='th2'>
                MEMBERSHIP PLAN
                </th>
              </tr>
            </thead>

            <TableForm datas={this.state.data} fcaddSelected={this.addSelected.bind(this)} update={this.updateCustomer.bind(this)} key={this.state.data.id} />

          </table>
          {/* <span>
            {this.state.data.length}
          </span> */}
        </div>
        <SwapPage count={this.state.count} countOf={this.state.countOf} fcNext={this.handleNext.bind(this)} fcPrevious={this.handlePrevious.bind(this)} />
        <div >
          <FooterCustomer countCustomer={this.state.listSelected.length} fcSeletedAll={this.handleSelectedAll.bind(this)} fcDeselectedAll={this.handleDeselectedAll.bind(this)} fcDelete={this.handleRemove.bind(this)} />
        </div>
      </div>
    )
  }
}

class App extends Component {
  render () {
    return (
      <div>
        <div >

          <TableUser />

        </div>

        <script src='https://fb.me/react-15.1.0.js' />
        <script src='https://fb.me/react-dom-15.1.0.js' />
      </div>

    )
  }
}

export default App
