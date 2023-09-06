export const initialState = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) { 
    case "SET_USER":
      return {
        ...state,
        user: action.user ? {
          token: action.user.token || null,
          user: {
            id: action.user.user ? action.user.user.id || null : null,
            username: action.user.user ? action.user.user.username || null : null,
          },
        } : null,
      };
    case "SET_EMAIL":
      return {
        ...state,
        user: {
          ...state.user,
          email: action.user.email || null,
        },
      };
    default:
      return state;
  }
};

export default reducer;