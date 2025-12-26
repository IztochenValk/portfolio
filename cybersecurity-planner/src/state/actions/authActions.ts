export const login = (userEmail: string) => ({
  type: "LOGIN",
  payload: userEmail,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const setAuthenticatedState = (isAuthenticated: boolean) => ({
  type: "SET_AUTHENTICATED_STATE",
  payload: isAuthenticated,
});
