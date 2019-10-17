import React, { Component } from 'react';
import { connect } from 'react-redux';
import Geography from 'utilities/Geography';
import Paper from 'library/Paper';
import Select from 'library/Select';
import Button from 'library/Button';
import TextField from 'library/TextField';
import Typography from 'library/Typography';
import BarChart from 'library/BarChart';
import PieChart from 'library/PieChart';
import CircularProgress from 'library/CircularProgress';
import { getVotingStatistics } from 'store/votingStatistics';
import { isMobile } from 'utilities/Browser';
import './VotingStatistics.css';

const DATA_SET_TOTAL_POPULATION = 'totalPopulation';
const DATA_SET_TOTAL_CITIZEN = 'totalCitizen';
const DATA_SET_TOTAL_REGISTERED = 'totalRegistered';
const DATA_SET_TOTAL_VOTED = 'totalVoted';
const DATA_SET_HISPANIC_POPULATION = 'hispanicPopulation';
const DATA_SET_HISPANIC_CITIZEN = 'hispanicCitizen';
const DATA_SET_HISPANIC_REGISTERED = 'hispanicRegistered';
const DATA_SET_HISPANIC_VOTED = 'hispanicVoted';
const DATA_SET_PERCENT_HISPANIC_POPULATION = 'percentHispanicPopulation';
const DATA_SET_PERCENT_HISPANIC_REGISTERED = 'percentHispanicRegistered';
const DATA_SET_PERCENT_HISPANIC_VOTED = 'percentHispanicVoted';

const DATA_SET_SELECT_TITLES = {
    [DATA_SET_TOTAL_POPULATION]: 'Total Population',
    [DATA_SET_TOTAL_CITIZEN]: 'Total Citizens',
    [DATA_SET_TOTAL_REGISTERED]: 'Total Registered',
    [DATA_SET_TOTAL_VOTED]: 'Total Voted',
    [DATA_SET_HISPANIC_POPULATION]: 'Hispanic Population',
    [DATA_SET_HISPANIC_CITIZEN]: 'Hispanic Citizens',
    [DATA_SET_HISPANIC_REGISTERED]: 'Hispanic Registered',
    [DATA_SET_HISPANIC_VOTED]: 'Hispanic Voted',
    [DATA_SET_PERCENT_HISPANIC_POPULATION]: 'Percent Hispanic Population',
    [DATA_SET_PERCENT_HISPANIC_REGISTERED]: 'Percent Hispanic Registered',
    [DATA_SET_PERCENT_HISPANIC_VOTED]: 'Percent Hispanic Voted'
};

const DATA_SET_CHART_TITLES = {
    [DATA_SET_TOTAL_POPULATION]: 'Total Population (in Thousands)',
    [DATA_SET_TOTAL_CITIZEN]: 'Total Citizens (in Thousands)',
    [DATA_SET_TOTAL_REGISTERED]: 'Total Registered Voters (in Thousands)',
    [DATA_SET_TOTAL_VOTED]: 'Total Actual Voted (in Thousands)',
    [DATA_SET_HISPANIC_POPULATION]: 'Total Hispanic Population (in Thousands)',
    [DATA_SET_HISPANIC_CITIZEN]: 'Total Hispanic Citizens (in Thousands)',
    [DATA_SET_HISPANIC_REGISTERED]: 'Total Hispanic Registered Voters (in Thousands)',
    [DATA_SET_HISPANIC_VOTED]: 'Total Hispanic Actual Voted (in Thousands)',
    [DATA_SET_PERCENT_HISPANIC_POPULATION]: 'Hispanic Population as a Percent of State Population',
    [DATA_SET_PERCENT_HISPANIC_REGISTERED]: 'Hispanic Registered Voters as a Percent of Hispanic State Population',
    [DATA_SET_PERCENT_HISPANIC_VOTED]: 'Hispanic Actual Voted as a Percent of Hispanic State Population'
}

const getDataSetChartTitle = (state, dataSet, range) => {
    return `${Geography.states[state]}: ${DATA_SET_CHART_TITLES[dataSet]} from ${range[0]} - ${range[1]}`;
}

class VotingStatistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            zip: '',
            state: '',
            page: 1,
            dataSet: DATA_SET_TOTAL_POPULATION
        }
    }

    static propTypes = {
    }

    getVotingStatistics = (state) => {
        if (!this.props.votingStatistics[state]) {
            this.props.getVotingStatistics(state);
        }
    }

    onStateChange = (event) => {
        this.setState({ state: event.target.value });
        if (this.state.page === 2) {
            this.getVotingStatistics(event.target.value);
        }
    }

    onTextFieldChange = (field) => (event) => {
        this.setState({ [field]: event.target.value })
    }

    setPage = (page) => {
        this.setState({ page });
    }

    onNextClick = () => {
        this.setPage(2);
        this.getVotingStatistics(this.state.state);
    }

    getBodyClassName = () => {
        let className = 'VotingStatistics-Body';
        if (isMobile()) className += ' VotingStatistics-Body_type_mobile';
        return className;
    }

    renderProfileForm = () => {
        return (
            <React.Fragment>
                <div className={this.getBodyClassName()}>
                    <Typography
                        variant='h4'>
                        Profile Information
                        </Typography>
                    <TextField
                        label='First Name'
                        onChange={this.onTextFieldChange('firstName')}
                        value={this.state.firstName} />
                    <TextField
                        label='Last Name'
                        onChange={this.onTextFieldChange('lastName')}
                        value={this.state.lastName} />
                    <TextField
                        label='Street'
                        onChange={this.onTextFieldChange('street')}
                        value={this.state.street} fullWidth />
                    <TextField
                        label='City'
                        onChange={this.onTextFieldChange('city')}
                        value={this.state.city} />
                    <TextField
                        label='Zip'
                        onChange={this.onTextFieldChange('zip')}
                        value={this.state.zip} />
                    <Select
                        value={this.state.state}
                        items={Geography.states}
                        onChange={this.onStateChange}
                        label='State'
                        key='state-select' />
                </div>
                <div className='VotingStatistics-Footer'>
                    <Button
                        variant='contained'
                        color='primary'
                        style={{
                            float: 'right'
                        }}
                        disabled={(this.state.state) ? false : true}
                        onClick={this.onNextClick}>
                        Next
                    </Button>
                </div>
            </React.Fragment>
        )
    }

    onDataSetChange = (event) => {
        this.setState({ dataSet: event.target.value });
    }

    getChartHeight = () => {
        let chartHeight = window.innerHeight - 240;
        if (isMobile()) chartHeight -= 90;
        return chartHeight;
    }

    getChartWidth = () => {
        return window.innerWidth - 60;
    }

    renderPieChart = () => {
        if (!this.props.votingStatistics[this.state.state]) return;
        let unprocessedData = this.props.votingStatistics[this.state.state];
        let mappedData = {};
        Object.keys(unprocessedData).forEach((year) => {
            mappedData[year] = unprocessedData[year][this.state.dataSet];
        });
        return (
            <PieChart
                height={this.getChartHeight()}
                width={this.getChartWidth()}
                data={mappedData} />
        )
    }

    renderBarChart = () => {
        if (!this.props.votingStatistics[this.state.state]) return;
        let unprocessedData = this.props.votingStatistics[this.state.state];
        let processedData = [];
        Object.keys(unprocessedData).forEach((year) => {
            processedData.push({
                label: year,
                value: unprocessedData[year][this.state.dataSet]
            });
        });
        return (
            <BarChart
                height={this.getChartHeight()}
                width={this.getChartWidth()}
                data={processedData} />
        )
    }

    renderChart = () => {
        let chart;
        switch (this.state.state) {
            case 'CA':
                chart = this.renderPieChart();
                break;
            default:
                chart = this.renderBarChart();
        }
        return (
            <React.Fragment>
                <div className={this.getBodyClassName()}>
                    <Typography
                        style={{
                            marginBottom: '10px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                        variant='h4'>
                        {getDataSetChartTitle(this.state.state, this.state.dataSet, [2006, 2012])}
                    </Typography>
                    <Select
                        style={{ marginBottom: '20px', marginRight: '20px', display: 'inline-block' }}
                        value={this.state.state}
                        items={Geography.states}
                        onChange={this.onStateChange}
                        label='State'
                        key='state-select' />
                    <Select
                        style={{ marginBottom: '20px', display: 'inline-block' }}
                        value={this.state.dataSet}
                        items={DATA_SET_SELECT_TITLES}
                        onChange={this.onDataSetChange}
                        label='Data Set'
                        key='data-set-select' />
                    {chart}
                </div>
                <div className='VotingStatistics-Footer'>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => this.setPage(1)}>
                        Previous
                    </Button>
                </div>
            </React.Fragment>
        )
    }

    render() {
        let content;
        switch (this.state.page) {
            case 1:
                content = this.renderProfileForm();
                break;
            case 2:
                content = this.renderChart();
                break;
            default:
                break;
        }
        let circularProgress;
        if (this.props.votingStatistics.loading) {
            circularProgress = (
                <CircularProgress />
            )
        }
        let className = 'VotingStatistics';
        return (
            <div className={className}>
                <Paper style={{
                    width: 'calc(100% - 60px)',
                    height: 'calc(100% - 60px)',
                    padding: '30px'
                }}>
                    {content}
                </Paper>
                {circularProgress}
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        votingStatistics: state.votingStatistics
    }
}

function mapDispatchToProps() {
    return {
        getVotingStatistics
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(VotingStatistics);