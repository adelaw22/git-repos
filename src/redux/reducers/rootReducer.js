import { combineReducers } from 'redux'
import sampleReducer from './reducerSample'

export default combineReducers({
  sample: sampleReducer,
})