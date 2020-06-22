import React from 'react';
import Text from '../../../common-ui/Text';
import MyMathSolutionView from './MyMathSolutionView';
import ProblemPreviewPage from '../problem/ProblemPreviewPage';
import { Segment } from 'semantic-ui-react';

export default function MySolutionView(props) {
  const { isNewSolution, solutionType, note } = props;
  const { isMath, tempIsMath } = note;
  if (solutionType === 'text') {
    if ((isMath && !isNewSolution) || (tempIsMath && isNewSolution)) {
      return <MyMathSolutionView isMath tempIsMath isNewSolution note={note} />;
    } else {
      return (
        <div>
          <Text>{isNewSolution ? note.myNewTextSolution : note.textSolution}</Text>
        </div>
      );
    }
  } else if (solutionType === 'img') {
    return (
      <div>
        <img
          src={isNewSolution ? note.myNewImageSolution : note.imageSolution}
          alt="나의 이미지 풀이"
        />
      </div>
    );
  } else if (solutionType === 'link') {
    return (
      <div style={{ padding: 3 }}>
        <ProblemPreviewPage
          myProblemId={isNewSolution ? note.myNewLinkSolution : note.linkSolutionId}
          isNote
        />
      </div>
    );
  } else if (solutionType === 'hand') {
    return (
      <div>
        <img
          src={isNewSolution ? note.myNewHandSolution : note.handSolution}
          alt="나의 손글씨 풀이"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    );
  } else return null;
}
