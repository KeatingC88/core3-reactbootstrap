import { combineReducers } from 'redux';

import user from "./user";// User Authentication Data.
import users from "./users";// api/Users actions.
import visibilityFilter from "./visibilityFilter";//Admin Page Visibility Filter using api/Users.

export default combineReducers({ user, users, visibilityFilter });