import React from 'react';

import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './MobileProblemBar.scss';
import ProblemViewContainer from '../../../../containers/student/problem/ProblemViewContainer';
import SliderButton from './SliderButton';

export default function MobileProblemBar(props) {
  const { page, myProblemList, myBookId, subChapterId } = props;
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
          <SliderButton myBookId={myBookId} subChapterId={subChapterId} />
          <Slider>
            {myProblemList.map((myProblem, i) => (
              <Slide index={i} key={i} innerClassName="innerSlide">
                <ProblemViewContainer myProblem={myProblem} page={page} />
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      </div>
    );
  }
}
