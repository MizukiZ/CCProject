import { TOGGLE_CALCULATOR_MODAL } from "../actions/actionTypes"

export default function calculatorReducer(state = false, action) {
  switch (action.type) {
    case TOGGLE_CALCULATOR_MODAL:
      // toggle boolean value
      return !state
    default:
      return state
  }
}
