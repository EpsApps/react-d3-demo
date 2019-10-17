import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import votingStatistics from './votingStatistics';

export const reducers = {
    votingStatistics
}

const rootReducer = combineReducers({
    ...reducers
});

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
}