import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import votingStatistics from './votingStatistics';

const rootReducer = combineReducers({
    votingStatistics
});

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
}