import React, { Component } from 'react'
import Iconuser from './usericon.png'
import './App.css'

// const Navbarheader = () => {
//   return (
//     <nav class="pt-navbar pt-dark">
//       <div class='container'>

//         <div class="pt-navbar-group pt-align-left">
//           <div class="pt-navbar-heading"><span class="Logo"><b>ROVO</b> </span></div>
//           <div class="green">
//               <span>for<b > Greenvale Tennis Club</b></span>
//           </div>
//         </div>
//         <div class="pt-navbar-group pt-align-right">
//           <button class="btn-user pt-button pt-minimal"> <img src={iconuser}/><span>Stacy</span> </button>
//           {/* <button class="pt-button pt-minimal pt-icon-document">Files</button>
//           <span class="pt-navbar-divider"></span>
//           <button class="pt-button pt-minimal pt-icon-user"></button>
//           <button class="pt-button pt-minimal pt-icon-notifications"></button>
//           <button class="pt-button pt-minimal pt-icon-cog"></button> */}
//         </div>

//       </div>
//     </nav>
//   )
// }

class App extends Component {
  render () {
    return (
      <div>
        <div className='App'>
          <nav className='pt-navbar pt-dark background-navbar'>
            <div className='container'>

              <div className='pt-navbar-group pt-align-left'>
                <div className='icon-menu'>
                  <i className='fas fa-bars' />
                </div>
                <div className='pt-navbar-heading'><span className='Logo'><b>ROVO</b> </span></div>
                <div className='green'>
                  <span>for<b > Greenvale Tennis Club</b></span>
                </div>
              </div>
              <div className='pt-navbar-group pt-align-right'>
                <button className=' pt-button pt-minimal btn-user'> <img src={Iconuser} alt=""/><span><b>Stacy</b></span>

                  <i className='fas fa-sort-down' />
                </button>
                {/* <button class="pt-button pt-minimal pt-icon-document">Files</button>
                <span class="pt-navbar-divider"></span>
                <button class="pt-button pt-minimal pt-icon-user"></button>
                <button class="pt-button pt-minimal pt-icon-notifications"></button>
                <button class="pt-button pt-minimal pt-icon-cog"></button> */}
              </div>

            </div>
          </nav>

        </div>

        <script src='https://fb.me/react-15.1.0.js' />
        <script src='https://fb.me/react-dom-15.1.0.js' />
      </div>
    )
  }
}

export default App
