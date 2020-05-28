import React, { PureComponent } from 'react';

import NoteHead from './NoteHead';
import NoteList from './NoteList';

export default class NoteApp extends PureComponent {
  componentDidMount() {
    const { requestNoteList } = this.props;
    const studentId = window.sessionStorage.getItem('studentId');
    requestNoteList({ studentId: studentId });
  }

  render() {
    const { noteList, laoding } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ hight: 5, padding: 3 }}>
          <NoteHead />
        </div>
        <div style={{ flex: 1, padding: 3 }}>
          <NoteList noteList={noteList} isLoading={laoding} />
        </div>
      </div>
    );
  }
}
