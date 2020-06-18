import React, { PureComponent } from 'react';

import NoteHead from './NoteHead';
import NoteList from './NoteList';
import { Sidebar, Ref } from 'semantic-ui-react';

export default class NoteApp extends PureComponent {
  componentDidMount() {
    const { requestNoteList } = this.props;
    const studentId = window.sessionStorage.getItem('studentId');
    requestNoteList({ studentId: studentId });
  }

  handleViewOrigin = () => {
    const { requestNoteList, setNoteFilter } = this.props;
    const studentId = window.sessionStorage.getItem('studentId');
    requestNoteList({ studentId: studentId });
    setNoteFilter();
  };

  render() {
    const { noteList, laoding } = this.props;
    const targetRef = React.createRef();
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Sidebar.Pushable>
          <div style={{ hight: 5, padding: 3 }}>
            <NoteHead handleViewOrigin={this.handleViewOrigin} />
          </div>
          <div style={{ flex: 1, padding: 3 }}>
            <Ref innerRef={targetRef}>
              <NoteList noteList={noteList} isLoading={laoding} />
            </Ref>
          </div>
        </Sidebar.Pushable>
      </div>
    );
  }
}
