import React, { Component } from 'react';
import './grid.css';
import './SwapPage.css';

class SwapPage extends Component{
    constructor(props){
        super(props);
        // console.log(props);
    }
    handlePrevious(){
        this.props.fcPrevious();
    }
    handleNext(){
        this.props.fcNext();
    }

    render(){
        return(
            <div className="container">
                <div className="row change-page">
                    <button className="pt-button btn-previous" onClick={() => this.handlePrevious()}
                    disabled={this.props.countOf === 0}
                    >
                        Previous
                    </button>
                    <button className="pt-button btn-count">
                        {this.props.countOf+1}
                    </button>
                    <span className="ofCount">
                    of {this.props.count}
                    </span>
                    <button className="pt-button btn-next" onClick={() => this.handleNext()}
                    disabled={this.props.countOf+1 === this.props.count}
                    
                    >
                        Next
                    </button>
                </div>
            </div>
        )
    }
}

export default SwapPage;