import React, { PureComponent } from 'react';

import Text from '../../../common-ui/Text';
import VerticalList from '../../../common-ui/VerticalList';
import Spacing from '../../../common-ui/Spacing';
import withLoading from '../../../common-ui/withLoading';

import NoteViewContainer from '../../../containers/student/note/NoteViewContainer';

const LoadingMessage = (
  <Spacing vertical={4} horizontal={2}>
    <Text large>데이터를 불러들이고 있습니다.</Text>
  </Spacing>
);

class NoteList extends PureComponent {
  render() {
    const { noteList } = this.props;
    const noteList1 = noteList.slice(0, noteList.length / 2 + 1);
    const noteList2 = noteList.slice(noteList.length / 2 + 1);
    return (
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
    );
  }
}

export default withLoading(LoadingMessage)(NoteList);
