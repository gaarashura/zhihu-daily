import { createStore } from 'redux';
import '../ReactotronConfig';
import todoApp from './reducer';
const store = createStore(todoApp);
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
export default store;
console.log(store.getState());
