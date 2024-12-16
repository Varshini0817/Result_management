import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { alertSlice } from './alerts';
import { staffMemSlice } from './staffMem';

const rootReducer = combineReducers({
    alert : alertSlice.reducer,
    staffMem : staffMemSlice.reducer
});

const store = configureStore({
    reducer : rootReducer,
});

export default store;