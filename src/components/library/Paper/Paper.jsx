import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MUIPaper from '@material-ui/core/Paper';
import './Paper.css';

class Paper extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static propTypes = {
        children: PropTypes.any
    }

    render() {
        return (
            <MUIPaper {...this.props} />
        );
    }

}

export default Paper;