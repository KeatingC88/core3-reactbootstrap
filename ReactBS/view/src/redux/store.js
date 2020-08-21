import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

import thunk from "redux-thunk";
/*
const middlewares = [thunk];
console.log(middlewares);
*/

export default createStore(rootReducer, applyMiddleware(thunk));