export const SET_MY_PROBLEM_LIST = 'myProblem/SET_MY_PROBLEM_LIST';
export const SET_MY_ANSWER = 'myProblem/SET_MY_ANSWER';
export const SET_IS_CONFUSED = 'myProblem/SET_IS_CONFUSED';
export const SET_MY_SOLUTION = 'myProblem/SET_MY_SOLUTION';
export const SET_SOLVED_DATETIME = 'myProblem/SET_SOLVED_DATETIME';
export const SET_IS_RIGHT = 'myProblem/SET_IS_RIGHT';

export const setMyProblemList = myProblemList => ({
  type: SET_MY_PROBLEM_LIST,
  payload: myProblemList,
});

export const setMyAnswer = (id, myAnswer) => ({
  type: SET_MY_ANSWER,
  payload: { id, myAnswer },
});

export const setIsConfused = (id, isConfused) => ({
  type: SET_IS_CONFUSED,
  payload: { id, isConfused },
});

export const setMySolution = (id, mySolution) => ({
  type: SET_MY_SOLUTION,
  payload: { id, mySolution },
});

export const setSolvedDateTime = (id, solvedDateTime) => ({
  type: SET_SOLVED_DATETIME,
  payload: { id, solvedDateTime },
});

export const setIsRight = (id, isRight) => ({
  type: SET_IS_RIGHT,
  payload: { id, isRight },
});
