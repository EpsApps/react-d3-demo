import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducers } from 'store';

export function setupIntegrationTest(actions = []) {
    // creating a jest mock function to serve as a dispatch spy for asserting dispatch actions if needed
    const dispatchSpy = jest.fn(() => ({}));
    const reducerSpy = (state, action) => dispatchSpy(action);
    // applying thunk middleware to the the store
    const emptyStore = applyMiddleware(thunk)(createStore);
    const combinedReducers = combineReducers({
        reducerSpy,
        ...reducers
    });
    // creating the store
    const store = emptyStore(combinedReducers);
    actions.forEach((action) => {
        store.dispatch(action);
    });
    return { store, dispatchSpy };
}

export function mountWithRedux(store, component) {
    return mount(
        <Provider store={store}>
            {component}
        </Provider>
    );
}