import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';

const initialNavState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

console.log('@@@ initialNavState', JSON.stringify(initialNavState, null, '  '));

const initialAuthState = { isLoggedIn: false };

function nav(state = initialNavState, action) {
  switch (action.type) {
    case 'Login':
      return AppNavigator.router.getStateForAction(NavigationActions.back(), state);
    case 'Logout':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Login' }), state);
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
}

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  nav,
  auth,
});

export default AppReducer;
