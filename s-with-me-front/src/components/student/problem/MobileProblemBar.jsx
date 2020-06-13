import React from 'react';
import { withOrientationChange } from 'react-device-detect';
import { Segment, Button, Icon } from 'semantic-ui-react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import ProblemViewContainer from '../../../containers/student/problem/ProblemViewContainer';

function MobileProblemBar(props) {
  const { page, myProblemList, isLandscape } = props;
  if (myProblemList.length === 0) {
    return null;
  } else {
    return (
      <div>
        <CarouselProvider
          naturalSlideWidth={window.innerWidth}
          isIntrinsicHeight={true}
          // naturalSlideHeight={isLandscape ? window.innerHeight * 0.65 : window.innerHeight * 0.7}
          totalSlides={8}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button icon labelPosition="left">
              <ButtonBack className="buttonBack">이전 문제</ButtonBack>
              <Icon name="left arrow" />
            </Button>
            <Segment>스와이프하여 문제를 이동해주세요. 한 페이지당 8문제 입니다.</Segment>
            <Button icon labelPosition="right">
              <ButtonNext>다음 문제</ButtonNext>
              <Icon name="right arrow" />
            </Button>
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
