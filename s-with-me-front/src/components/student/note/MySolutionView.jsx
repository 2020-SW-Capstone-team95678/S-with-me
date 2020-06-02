import React from 'react';
import Text from '../../../common-ui/Text';
import Button from '../../../common-ui/Button';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import { PREVIEW_PROBLEM } from '../../../constants/modals';

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
      <div style={{ padding: 3 }}>
        <Text>{isNewSolution ? '나의 새' : null}풀이 </Text>
        <Modal>
          {({ openModal }) => (
            <Button
              small
              onPress={() => {
                if (isNewSolution) {
                  openModal(PREVIEW_PROBLEM, {
                    myProblemId: note.myNewLinkSolution,
                  });
                } else {
                  openModal(PREVIEW_PROBLEM, {
                    myProblemId: note.linkSolutionId,
                  });
                }
              }}
            >
              링크된 문제 보기
            </Button>
          )}
        </Modal>
      </div>
    );
  } else return null;
}
