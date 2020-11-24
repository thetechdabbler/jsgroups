import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import spinnerReducer from './reducer/spinnerReducer';
import modalReducer from './reducer/modalReducer';

const rootReducer = combineReducers({
    spinner: spinnerReducer,
    modal: modalReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
export default store;