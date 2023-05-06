export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const GET_BOARDS = "GET_BOARDS";
export const GET_TASKS = "GET_TASKS";
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

export const fetchTasksAction = (token, boardId, columnId) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${boardId}/columns/${columnId}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        let tasks = await response.json();
        dispatch({
          type: GET_TASKS,
          payload: tasks,
        });
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
