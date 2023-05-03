export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const GET_BOARDS = "GET_BOARDS";
export const setCurrentUser = (currentUser) => {
  return {
    type: SET_CURRENT_USER,
    payload: currentUser,
  };
};

export const fetchBoardsAction = (token) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/boards`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        let boards = await response.json();
        dispatch({
          type: GET_BOARDS,
          payload: boards,
        });
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
// actions.js

export const UPDATE_ACCESS_TOKEN = "UPDATE_ACCESS_TOKEN";

export function updateAccessToken(newToken) {
  return {
    type: UPDATE_ACCESS_TOKEN,
    payload: newToken,
  };
}
