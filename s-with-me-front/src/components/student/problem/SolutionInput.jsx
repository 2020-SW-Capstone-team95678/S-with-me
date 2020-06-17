import React, { PureComponent } from 'react';
import { isMobile } from 'react-device-detect';

import LinkSolutionInputContainer from '../../../containers/student/note/LinkSolutionInputContainer';
import ImageSolutionInput from './solutionInput/ImageSolutionInput';
import TextSolutionInput from './solutionInput/TextSolutionInput';
// import HandWriteSolutionInput from './solutionInput/HandWriteSolution';
// import MobileHandWriteSolutionInput from './solutionInput/MobileHandWriteSolutionInput';

export default class SolutionInput extends PureComponent {
  render() {
    const { solutionType, onChange, values } = this.props;
    const { id, myBookId, setSolutionType, setIsMath } = this.props;
    const { setTextSolution, setImageSolution, setHandSolution } = this.props;
    if (solutionType === 'link') {
      return (
        <LinkSolutionInputContainer
          id={id}
          myBookId={myBookId}
          onChange={onChange}
          values={values}
        />
      );
    } else if (solutionType === 'img') {
      return <ImageSolutionInput id={id} setImageSolution={setImageSolution} />;
    } else if (solutionType === 'hand') {
      return null;
      // if (isMobile)
      //   return <MobileHandWriteSolutionInput id={id} setHandSolution={setHandSolution} />;
      // else return <HandWriteSolutionInput id={id} setHandSolution={setHandSolution} />;
    } else {
      return (
        <TextSolutionInput
          id={id}
          setSolutionType={setSolutionType}
          setTextSolution={setTextSolution}
          setIsMath={setIsMath}
        />
      );
    }
  }
}
