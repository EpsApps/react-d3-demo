import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUITextField from '@material-ui/core/TextField';
import './TextField.css';

const styles = {
    root: {
        minWidth: '200px',
        marginTop: '15px',
        display: 'block'
    },
    inputRoot: {
        minWidth: '200px'
    }
};

class TextField extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static propTypes = {
    }

    /**
     * @todo refactor spread implementation to fix console warning
     */
    render() {
        return (
            <MUITextField
                className={this.props.classes.root}
                inputProps={{
                    className: this.props.classes.inputRoot
                }}
                {...this.props} />
        );
    }

}

export default withStyles(styles)(TextField);