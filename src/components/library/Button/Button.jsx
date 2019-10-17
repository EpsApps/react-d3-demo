import React, { Component } from 'react';
import MUIButton from '@material-ui/core/Button';

import './Button.css';

class Button extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static propTypes = {
    }

    render() {
        return (
            <MUIButton {...this.props} />
        );
    }

}

export default Button;