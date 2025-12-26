const initialState = {
  value: 0,
};

export default function progressReducer(state = initialState, action: any) {
  switch (action.type) {
    case "INCREASE_PROGRESS":
      return { ...state, value: state.value + action.payload };
    case "DECREASE_PROGRESS":
      return { ...state, value: state.value - action.payload };
    case "RESET_PROGRESS":
      return { ...state, value: 0 };
    default:
      return state;
  }
}
