import React from 'react';
import { Icon } from 'semantic-ui-react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import ProblemViewContainer from '../../../containers/student/problem/ProblemViewContainer';

export default function MobileProblemBar(props) {
  const { page, myProblemList } = props;
  if (myProblemList.length === 0) {
    return null;
  } else {
    return (
      <div>
        <CarouselProvider
          naturalSlideWidth={window.innerWidth}
          isIntrinsicHeight={true}
          disableKeyboard={true}
          dragEnabled={false}
          totalSlides={8}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ButtonBack className="buttonBack">
              <Icon name="left arrow" />
              이전 문제
            </ButtonBack>
            <ButtonNext>
              다음 문제
              <Icon name="right arrow" />
            </ButtonNext>
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
