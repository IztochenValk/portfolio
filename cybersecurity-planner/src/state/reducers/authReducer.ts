const initialState = {
  isAuthenticated: false,
  userEmail: "",
};

export default function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case "SET_AUTHENTICATED_STATE":
      return { ...state, isAuthenticated: action.payload };
    case "LOGIN":
      return { ...state, isAuthenticated: true, userEmail: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, userEmail: "" };
    default:
      return state;
  }
}
