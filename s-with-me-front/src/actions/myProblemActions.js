export const SET_MY_ANSWER = 'myProblem/SET_MY_ANSWER';
export const SET_IS_CONFUSED = 'myProblem/SET_IS_CONFUSED';
export const SET_MY_SOLUTION = 'myProblem/SET_MY_SOLUTION';
export const SET_SOLVED_DATETIME = 'myProblem/SET_SOLVED_DATETIME';
export const SET_IS_RIGHT = 'myProblem/SET_IS_RIGHT';
export const SET_IS_SOLVED = 'myProblem/SET_IS_SOLVED';

export const setMyAnswer = (id, myAnswer) => ({
  type: SET_MY_ANSWER,
  payload: { id, myAnswer },
});

export const setIsConfused = (id, confused) => ({
  type: SET_IS_CONFUSED,
  payload: { id, confused },
});

export const setMySolution = (id, mySolution) => ({
  type: SET_MY_SOLUTION,
  payload: { id, mySolution },
});

export const setSolvedDateTime = (id, solvedDateTime) => ({
  type: SET_SOLVED_DATETIME,
  payload: { id, solvedDateTime },
});

export const setIsRight = (id, right) => ({
  type: SET_IS_RIGHT,
  payload: { id, right },
});

export const setIsSolved = (id, solved) => ({
  type: SET_IS_SOLVED,
  payload: { id, solved },
});
