import React from 'react';
import { Segment } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './MobileProblemBar.css';
import ProblemViewContainer from '../../../containers/student/problem/ProblemViewContainer';

export default function MobileProblemBar(props) {
  const { page, myProblemList, isTablet } = props;
  if (myProblemList.length === 0) {
    return null;
  } else {
    return (
      <div>
        <Segment>
          스와이프하여 문제를 이동해주세요. 한 페이지당 8문제 입니다. <br />
          페이지 내 문제를 전체 채점하려면 상단의 이 페이지 전체 채점을 눌러주세요.
        </Segment>
        <Carousel useKeyboardArrows showStatus={true} showThumbs={false}>
          {myProblemList.map((myProblem, i) => (
            <div className="my-slide content">
              <ProblemViewContainer myProblem={myProblem} page={page} key={i} isTablet={isTablet} />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}
