import React, { PureComponent } from 'react';

import { subjects } from '../../../constants/subjects';
import LibraryFolderTableContainer from '../../../containers/student/book/LibraryFolderTableContainer';
import LibrarySubjectTableContainer from '../../../containers/student/book/LibrarySubjectTableContainer';
import LibraryFilterContainer from '../../../containers/student/book/LibraryFilterContainer';

export default class LibraryFilterList extends PureComponent {
  state = {};
  selectFilter = filter => {
    const studentId = window.sessionStorage.getItem('studentId');
    if (filter === 'latest') {
      this.props.requestMyBookList({ studentId: studentId });
    } else if (filter === 'alphabet') {
      this.props.requestMyBookList({ studentId: studentId }, 'ALPHABET');
    }
    this.setState({ filter: filter });
  };

  render() {
    const { folders } = this.props;
    const { filter } = this.state;
    return (
      <div>
        <LibraryFilterContainer selectFilter={this.selectFilter} />
        {filter === 'subject' ? (
          <LibrarySubjectTableContainer subjectList={subjects} />
        ) : (
          <LibraryFolderTableContainer folders={folders} />
        )}
      </div>
    );
  }
}
