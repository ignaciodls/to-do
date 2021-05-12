import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import tasksReducer from './TodoDuck'
import modalReducer from './ModalDuck'
import userReducer from './UserDuck'

const rootReducer = combineReducers({
    todo : tasksReducer,
    modal : modalReducer,
    user : userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    return store
}