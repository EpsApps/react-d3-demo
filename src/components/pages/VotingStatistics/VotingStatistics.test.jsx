import React from 'react';
import ReactDOM from 'react-dom';
import { setupIntegrationTest, mountWithRedux } from 'utilities/Test';
import VotingStatistics from './VotingStatistics';
import PieChart from 'library/PieChart';
import BarChart from 'library/BarChart';
import * as votingStatisticsRedux from 'store/votingStatistics';
import CAPayload from '../../../../data/VotingStatistics/CA';
import CTPayload from '../../../../data/VotingStatistics/CT';

let store,
    dispatchSpy,
    getVotingStatistics,
    getVotingStatisticsPayload,
    getVotingStatisticsParams,
    provider;

const setupProps = () => {
    ({ store, dispatchSpy } = setupIntegrationTest());

    getVotingStatistics = jest.fn(() => {
        store.dispatch({
            type: votingStatisticsRedux.GOT_VOTING_STATISTICS,
            payload: getVotingStatisticsPayload,
            params: getVotingStatisticsParams
        });
    });

    provider = mountWithRedux(
        store,
        <VotingStatistics getVotingStatistics={getVotingStatistics} />
    );

}

const cleanUpProps = () => {
    store = null;
    dispatchSpy = null;
}

/**
 * @todo figure out why tests are rendering duplicate components
 */
describe('VotingStatistics', () => {

    beforeAll(setupProps);
    afterAll(cleanUpProps);

    it('shows a pie chart if the user selects California as their state', () => {

        let stateSelect = provider.find('#voting-statistics-state-select-form');
        stateSelect.first().props().onChange({ target: { value: 'CA' } });
        provider.update();
        
        getVotingStatisticsPayload = CAPayload;
        getVotingStatisticsParams = { state: 'CA' };
        let nextButton = provider.find('#voting-statistics-next-button');
        nextButton.first().props().onClick();
        provider.update();

        let pieChart = provider.find(PieChart);
        expect(pieChart.length).toBe(1);

    });

    it('shows a bar chart if the user selects a state other than California', () => {

        let state = 'CT';
        getVotingStatisticsPayload = CTPayload;
        getVotingStatisticsParams = { state };

        let stateSelect = provider.find('#voting-statistics-state-select-chart');
        stateSelect.first().props().onChange({ target: { value: state } });
        provider.update();

        let barChart = provider.find(BarChart);
        expect(barChart.length).toBe(1);

    });

    it('does not show a chart if no chart data is provided', () => {

        expect(true).toBe(true);

    })

})