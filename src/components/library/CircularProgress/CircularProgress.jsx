import React, { Component } from 'react';
import MUICircularProgress from '@material-ui/core/CircularProgress';
import './CircularProgress.css';

class CircularProgress extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <div className='CircularProgress-Background' />
                <div className='CircularProgress-Container'>
                    <MUICircularProgress
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                        size={60}
                        thickness={7} />
                </div>
            </div>
        );
    }

}

export default CircularProgress;