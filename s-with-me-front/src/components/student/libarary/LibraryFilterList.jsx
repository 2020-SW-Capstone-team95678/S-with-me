import React, { PureComponent } from 'react';

import Card from '../../../common-ui/Card';
import LibraryFilter from './LibraryFilter';
import LibraryFolderTableContainer from '../../../containers/student/book/LibraryFolderTableContainer';
import LibrarySubjectTableContainer from '../../../containers/student/book/LibrarySubjectTableContainer';

export default class LibraryFilterList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { filter: null, subjectList: ['국어', '수학', '영어', '사회'] };
  }

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
    const { filter, subjectList } = this.state;
    return (
      <div>
        <Card vertical={2}>
          <LibraryFilter selectFilter={this.selectFilter} />
        </Card>
        {filter === 'subject' ? (
          <LibrarySubjectTableContainer subjectList={subjectList} />
        ) : (
          <LibraryFolderTableContainer folders={folders} />
        )}
      </div>
    );
  }
}
