import { RESET, persistor } from '../redux/store.js';
import store from '../redux/store.js';

function resetStates() {
  // Dispatch the LOGOUT action
  store.dispatch({ type: RESET });

  // Purge the persisted state
  persistor.purge();

}

// Export the function
export default resetStates;