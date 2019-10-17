import API from './API';

export const GETTING_STATE = 'GETTING_STATE';
export const GOT_STATE = 'GOT_STATE';
export const ERROR_GETTING_STATE = 'ERROR_GETTING_STATE';

export const getVotingStatistics = (state) => (dispatch) => {
    dispatch({ type: GETTING_STATE });
    let requestOptions = {
        method: 'GET',
        uri: `${API.getBaseURL()}/voting-statistics/${state}.json`
    };
    let successOptions = {
        type: GOT_STATE,
        params: { state }
    };
    let errorOptions = {
        type: ERROR_GETTING_STATE
    };
    dispatch(API.request(requestOptions, successOptions, errorOptions));
}

const initialState = {
    loading: false
}

export default function votingStatistics(state = initialState, action) {
    switch (action.type) {
        case GETTING_STATE:
            return { ...state, loading: true };
        case GOT_STATE:
            return { ...state, [action.params.state]: action.payload, loading: false };
        case GOT_STATE:
            return { ...state, loading: false };
        default:
            return state;
    }
}