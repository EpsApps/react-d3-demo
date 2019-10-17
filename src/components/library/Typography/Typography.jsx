import React, { Component } from 'react';
import MUITypography from '@material-ui/core/Typography';
import './Typography.css';

class Typography extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static propTypes = {
    }

    render() {
        return (
            <MUITypography {...this.props} />
        );
    }

}

export default Typography;