import React, { Component } from 'react';
import { connect } from 'react-redux';
import VotingStatistics from 'pages/VotingStatistics';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static propTypes = {
    }

    render() {
        return (
            <div className='App'>
              <VotingStatistics/>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps() {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(App);