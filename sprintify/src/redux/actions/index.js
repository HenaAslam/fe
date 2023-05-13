export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const GET_BOARDS = "GET_BOARDS";
export const ADD_BOARD = "ADD_BOARD";

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
        return boards;
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
