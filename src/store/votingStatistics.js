import API from './API';

export const GETTING_VOTING_STATISTICS = 'GETTING_VOTING_STATISTICS';
export const GOT_VOTING_STATISTICS = 'GOT_VOTING_STATISTICS';
export const ERROR_GETTING_VOTING_STATISTICS = 'ERROR_GETTING_VOTING_STATISTICS';

export const getVotingStatistics = (state) => (dispatch) => {
    dispatch({ type: GETTING_VOTING_STATISTICS });
    let requestOptions = {
        method: 'GET',
        uri: `${API.getBaseURL()}/voting-statistics/${state}.json`
    };
    let successOptions = {
        type: GOT_VOTING_STATISTICS,
        params: { state }
    };
    let errorOptions = {
        type: ERROR_GETTING_VOTING_STATISTICS
    };
    dispatch(API.request(requestOptions, successOptions, errorOptions));
}

const initialState = {
    loading: false
}

export default function votingStatistics(state = initialState, action) {
    switch (action.type) {
        case GETTING_VOTING_STATISTICS:
            return { ...state, loading: true };
        case GOT_VOTING_STATISTICS:
            return { ...state, [action.params.state]: action.payload, loading: false };
        case GOT_VOTING_STATISTICS:
            return { ...state, loading: false };
        default:
            return state;
    }
}