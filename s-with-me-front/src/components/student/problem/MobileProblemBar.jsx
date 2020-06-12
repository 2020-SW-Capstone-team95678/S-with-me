import React from 'react';
import { Segment } from 'semantic-ui-react';

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
        <Segment>
          스와이프하여 문제를 이동해주세요. 한 페이지당 8문제 입니다. <br />
          페이지 내 문제를 전체 채점하려면 상단의 이 페이지 전체 채점을 눌러주세요.
        </Segment>
        <CarouselProvider naturalSlideWidth={100} naturalSlideHeight={50} totalSlides={8}>
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
          <Slider>
            {myProblemList.map((myProblem, i) => (
              <Slide index={i}>
                <ProblemViewContainer myProblem={myProblem} page={page} />
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      </div>
    );
  }
}
