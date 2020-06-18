import React from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import '../../problem/MobileProblemBar/MobileProblemBar.scss';

import NoteViewContainer from '../../../../containers/student/note/NoteViewContainer';
import NoteSliderButton from './NoteSliderButton';

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
          <NoteSliderButton />
          <Slider>
            {noteList.map((note, i) => (
              <Slide index={i} key={i} innerClassName="innerSlide">
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
