import {
  INPUT_CHANGE,
  OUTPUT_CHANGE,
  STAKE_TYPE,
  INPUTTOKEN,
  OUTPUTTOKEN,
  TRIGGER,
} from '../constants'

const initialState = {
  inputValue: 0,
  outputValue: 0,
  stakeType: 'STAKE',
  inputToken: 'ETH',
  outputToken: 'LS-ETH',
  trigger: 'INPUT'
}

const inputReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case INPUT_CHANGE:
      return {
        ...state,
        inputValue: payload,
      }
    case OUTPUT_CHANGE:
      return {
        ...state,
        outputValue: payload,
      }
    case STAKE_TYPE:
      return {
        ...state,
        stakeType: payload
      }
    case INPUTTOKEN:
      return {
        ...state,
        inputToken: payload
      }
    case OUTPUTTOKEN:
      return {
        ...state,
        outputToken: payload
      }
    case TRIGGER:
      return {
        ...state,
        trigger: payload
      }
    default:
      return state
  }
}

export default inputReducer