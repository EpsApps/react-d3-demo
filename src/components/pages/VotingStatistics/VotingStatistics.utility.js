import Geography from 'utilities/Geography';

export const DATA_SET_TOTAL_POPULATION = 'totalPopulation';
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

export const DATA_SET_SELECT_TITLES = {
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

export const getDataSetChartTitle = (state, dataSet, range) => {
    return `${Geography.states[state]}: ${DATA_SET_CHART_TITLES[dataSet]} from ${range[0]} - ${range[1]}`;
}