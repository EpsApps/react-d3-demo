import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MUISelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './Select.css';

const styles = {
    root: {
        minWidth: '200px',
        marginTop: '15px',
        display: 'block'
    },
    inputRoot: {
        minWidth: '178px'
    }
};

class Select extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func,
        items: PropTypes.object
    }

    renderInputLabel = () => {
        if (this.props.label) {
            return (
                <InputLabel shrink htmlFor='age-label-placeholder'>
                    {this.props.label}
                </InputLabel>
            )
        }
    }

    renderMenuItems = () => {
        return Object.keys(this.props.items).map((key, index) => {
            return (
                <MenuItem
                    key={`${this.props.key}-menu-item-${index}`}
                    value={key}>
                    {this.props.items[key]}
                </MenuItem>
            )
        });
    }

    render() {
        return (
            <FormControl id={this.props.id} className={this.props.classes.root} style={this.props.style}>
                {this.renderInputLabel()}
                <MUISelect
                    id={`${this.props.id}-muiselect`}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    inputProps={{
                        name: this.props.key,
                        id: `${this.props.id}-muiselect-input`,
                        className: this.props.classes.inputRoot
                    }}
                    displayEmpty
                    name={this.props.key}>
                    {this.renderMenuItems()}
                </MUISelect>
            </FormControl>
        );
    }

}

export default withStyles(styles)(Select);