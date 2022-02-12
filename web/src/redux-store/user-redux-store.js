import { createStore } from 'redux'
import SessionStorage from '../util/session-storage';

const USER = "USER"

const reducer = (state = SessionStorage.get(USER), action) => {
  switch(action.type) {
    case 'USER_LOGIN':
      SessionStorage.set(USER, action.user);
      return action.user;
    default:
      return state;
  }
}

const user_store = createStore(reducer);

export default user_store;