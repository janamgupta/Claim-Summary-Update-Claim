/* eslint-disable no-unused-vars */
import React from 'react';
import {createStore} from 'redux';
import { claimReducer } from './reducers.js';
const initialState = {
    claims:[]
}

export const store = createStore(claimReducer, initialState);