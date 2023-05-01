export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const setCurrentUser = (currentUser) => {
  return {
    type: SET_CURRENT_USER,
    payload: currentUser,
  };
};
