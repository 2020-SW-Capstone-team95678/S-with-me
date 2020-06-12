import React, { PureComponent } from 'react';

import TextSolutionInput from '../problem/solutionInput/TextSolutionInput';
import ImageSolutionInput from '../problem/solutionInput/ImageSolutionInput';
import HandWriteSolution from '../problem/solutionInput/HandWriteSolution';
import LinkSolutionInputContainer from '../../../containers/student/note/LinkSolutionInputContainer';

export default class NewSolutionInput extends PureComponent {
  render() {
    const { id, myBookId, setSolutionType, setTempIsMath } = this.props;
    const { setMyNewTextSolution, setMyNewImageSolution, setMyNewHandSolution } = this.props;
    const { solutionType, onChange, values } = this.props;
    if (solutionType === 'link') {
      return (
        <LinkSolutionInputContainer
          isNote
          id={id}
          myBookId={myBookId}
          onChange={onChange}
          values={values}
        />
      );
    } else if (solutionType === 'img') {
      return <ImageSolutionInput isNote id={id} setMyNewImageSolution={setMyNewImageSolution} />;
    } else if (solutionType === 'hand') {
      return <HandWriteSolution isNote id={id} setMyNewHandSolution={setMyNewHandSolution} />;
    } else {
      return (
        <TextSolutionInput
          isNote
          id={id}
          setSolutionType={setSolutionType}
          setMyNewTextSolution={setMyNewTextSolution}
          setTempIsMath={setTempIsMath}
        />
      );
    }
  }
}
