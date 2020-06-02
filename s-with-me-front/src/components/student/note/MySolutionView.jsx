import React from 'react';
import Text from '../../../common-ui/Text';

export default function MySolutionView(props) {
  const { isNewSolution, solutionType, note } = props;
  if (solutionType === 'text') {
    return (
      <div>
        <Text>{isNewSolution ? '나의 새' : null}풀이</Text>
        <br />
        <Text>{isNewSolution ? note.myNewTextSolution : note.textSolution}</Text>
      </div>
    );
  } else if (solutionType === 'img') {
    return (
      <div>
        <Text>{isNewSolution ? '나의 새' : null}풀이</Text>
        <img
          src={isNewSolution ? note.myNewImageSolution : note.imageSolution}
          alt="나의 이미지 풀이"
        />
      </div>
    );
  } else if (solutionType === 'link') {
    return (
      <div>
        <Text>{isNewSolution ? '나의 새' : null}풀이</Text>
        {isNewSolution ? note.myNewLinkSolution : note.linkSolutionId}
      </div>
    );
  } else return null;
}
