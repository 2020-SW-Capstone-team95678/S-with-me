import { FETCH_BOOKS } from '../../actions/publisher/libraryActions';

const initState = {
};

  
export default (state = initState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case FETCH_BOOKS:{
        return {
            ...state,
            user: {},
            loggedIn: false
        }
    }
    
    default:
        return state
  }
}