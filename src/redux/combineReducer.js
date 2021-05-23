import {combineReducers} from 'redux';

import contactReducer from './reducer/contactReducer'

const rootReducer = combineReducers({
  contact: contactReducer,
  
});

export default rootReducer;