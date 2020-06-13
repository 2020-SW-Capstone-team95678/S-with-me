import React from 'react';
import { withOrientationChange } from 'react-device-detect';
import { Segment } from 'semantic-ui-react';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import ProblemViewContainer from '../../../containers/student/problem/ProblemViewContainer';

function MobileProblemBar(props) {
  const { page, myProblemList } = props;
  const { isLandscape } = props;
  if (myProblemList.length === 0) {
    return null;
  } else {
    return (
      <div>
        <CarouselProvider
          naturalSlideWidth={window.innerWidth}
          naturalSlideHeight={isLandscape ? window.innerHeight * 0.6 : window.innerHeight * 0.7}
          totalSlides={8}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ButtonBack>이전 문제</ButtonBack>
            <Segment>스와이프하여 문제를 이동해주세요. 한 페이지당 8문제 입니다.</Segment>
            <ButtonNext>다음 문제</ButtonNext>
          </div>
          <Slider>
            {myProblemList.map((myProblem, i) => (
              <Slide index={i} key={i}>
                <ProblemViewContainer myProblem={myProblem} page={page} />
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      </div>
    );
  }
}

export default withOrientationChange(MobileProblemBar);
