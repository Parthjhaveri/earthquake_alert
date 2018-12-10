import { createStore, combineReducers } from 'redux';
import quake_data_reducer from '../reducers/quake_data_reducer.js';

const root_reducer = combineReducers({
	quake_data: quake_data_reducer
})

const store = createStore(
	root_reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;