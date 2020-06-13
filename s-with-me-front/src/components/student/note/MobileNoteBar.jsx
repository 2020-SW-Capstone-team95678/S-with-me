import React from 'react';
import { Segment } from 'semantic-ui-react';
import NoteViewContainer from '../../../containers/student/note/NoteViewContainer';

export default function MobileNoteBar(props) {
  const { noteList } = props;
  if (noteList.length === 0) {
    return null;
  } else {
    return (
      <div>
        <Segment>
          스와이프하여 문제를 이동해주세요. 한 페이지당 8문제 입니다. <br />
          상단 메뉴에서 보기 방식을 변경할 수 있습니다.
        </Segment>
        {/* <Carousel useKeyboardArrows showStatus={true} showThumbs={false}>
          {noteList.map((note, i) => (
            <div className="my-slide content">
              <NoteViewContainer note={note} key={i} />
            </div>
          ))}
        </Carousel> */}
      </div>
    );
  }
}
