import { combineReducers } from '@reduxjs/toolkit';
import userReducer from 'src/store/apps/user';
import reportReducer from 'src/store/apps/report';
import notificationReducer from 'src/store/apps/notification';
import { RESET_STORE } from './actions';

const appReducer = combineReducers({
  user: userReducer,
  report: reportReducer,
  notification: notificationReducer
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    // This resets the state to the initial state
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
