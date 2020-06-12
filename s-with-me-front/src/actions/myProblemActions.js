export const SET_MY_ANSWER = 'myProblem/SET_MY_ANSWER';
export const SET_IS_CONFUSED = 'myProblem/SET_IS_CONFUSED';
export const SET_SOLUTION_TYPE = 'myProblem/SET_SOLUTION_TYPE';
export const SET_MY_TEXT_SOLUTION = 'myProblem/SET_MY_TEXT_SOLUTION';
export const SET_MY_IMAGE_SOLUTION = 'myProblem/SET_MY_IMAGE_SOLUTION';
export const SET_MY_LINK_SOLUTION = 'myProblem/SET_MY_LINK_SOLUTION';
export const SET_MY_HAND_SOLUTION = 'myProblem/SET_MY_HAND_SOLUTION';
export const SET_SOLVED_DATETIME = 'myProblem/SET_SOLVED_DATETIME';
export const SET_IS_RIGHT = 'myProblem/SET_IS_RIGHT';
export const SET_IS_SOLVED = 'myProblem/SET_IS_SOLVED';
export const SET_IS_MATH = 'myProblem/SET_IS_MATH';

export const setMyAnswer = (id, myAnswer) => ({
  type: SET_MY_ANSWER,
  payload: { id, myAnswer },
});

export const setIsConfused = (id, isConfused) => ({
  type: SET_IS_CONFUSED,
  payload: { id, isConfused },
});

export const setSolutionType = (id, solutionType) => ({
  type: SET_SOLUTION_TYPE,
  payload: { id, solutionType },
});

export const setTextSolution = (id, textSolution) => ({
  type: SET_MY_TEXT_SOLUTION,
  payload: { id, textSolution },
});

export const setImageSolution = (id, imageSolution) => ({
  type: SET_MY_IMAGE_SOLUTION,
  payload: { id, imageSolution },
});

export const setLinkSolutionId = (id, linkSolutionId) => ({
  type: SET_MY_LINK_SOLUTION,
  payload: { id, linkSolutionId },
});

export const setHandSolution = (id, handSolution) => ({
  type: SET_MY_HAND_SOLUTION,
  payload: { id, handSolution },
});

export const setSolvedDateTime = (id, solvedDateTime) => ({
  type: SET_SOLVED_DATETIME,
  payload: { id, solvedDateTime },
});

export const setIsRight = (id, isRight) => ({
  type: SET_IS_RIGHT,
  payload: { id, isRight },
});

export const setIsSolved = (id, isSolved) => ({
  type: SET_IS_SOLVED,
  payload: { id, isSolved },
});

export const setIsMath = (id, isMath) => ({
  type: SET_IS_MATH,
  payload: { id, isMath },
});
