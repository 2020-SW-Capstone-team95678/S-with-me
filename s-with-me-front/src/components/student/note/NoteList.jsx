import React, { PureComponent } from 'react';

import Text from '../../../common-ui/Text';
import VerticalList from '../../../common-ui/VerticalList';
import Spacing from '../../../common-ui/Spacing';
import { isMobile } from 'react-device-detect';
import withLoading from '../../../common-ui/withLoading';

import NoteViewContainer from '../../../containers/student/note/NoteViewContainer';
import PaginationContainer from '../../../containers/student/PaginationContainer';
import MobileNoteBar from './MobileNoteBar';

const LoadingMessage = (
  <Spacing vertical={4} horizontal={2}>
    <Text large>데이터를 불러들이고 있습니다.</Text>
  </Spacing>
);

class NoteList extends PureComponent {
  render() {
    const { noteList } = this.props;
    const noteList1 = noteList.slice(0, noteList.length / 2);
    const noteList2 = noteList.slice(noteList.length / 2);
    if (isMobile) {
      return (
        <React.Fragment>
          <MobileNoteBar noteList={noteList} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '3px',
              paddingBottom: '3px',
            }}
          >
            <PaginationContainer isNote />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '3px',
              paddingBottom: '3px',
            }}
          >
            <PaginationContainer isNote />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1, padding: 3 }}>
              <VerticalList spacingBetween={10}>
                {noteList1.map((note, index) => (
                  <NoteViewContainer note={note} key={index} />
                ))}
              </VerticalList>
            </div>
            <div style={{ flex: 1, padding: 3 }}>
              <VerticalList spacingBetween={10}>
                {noteList2.map((note, index) => (
                  <NoteViewContainer note={note} key={index} />
                ))}
              </VerticalList>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '3px',
              paddingBottom: '3px',
            }}
          >
            <PaginationContainer isNote />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default withLoading(LoadingMessage)(NoteList);
