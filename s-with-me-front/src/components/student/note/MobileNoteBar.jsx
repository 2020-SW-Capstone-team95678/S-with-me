import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import NoteViewContainer from '../../../containers/student/note/NoteViewContainer';

export default function MobileNoteBar(props) {
  const { noteList } = props;
  if (noteList.length === 0) {
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

            <Segment>스와이프하여 문제를 이동해주세요. 한 페이지당 8문제 입니다.</Segment>

            <ButtonNext>
              다음 문제
              <Icon name="right arrow" />
            </ButtonNext>
          </div>
          <Slider>
            {noteList.map((note, i) => (
              <Slide index={i} key={i}>
                <div style={{ overflow: 'auto' }}>
                  <NoteViewContainer note={note} key={i} />
                </div>
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      </div>
    );
  }
}
