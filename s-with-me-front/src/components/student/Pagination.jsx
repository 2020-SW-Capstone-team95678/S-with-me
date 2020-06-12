import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../../common-ui/Button';
import InlineList from '../../common-ui/InlineList';

export default class Pagination extends PureComponent {
  static propTypes = {
    hasNext: PropTypes.bool,
    loading: PropTypes.bool,
    requestMyProblemList: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleNextPress = this.handleNextPress.bind(this);
    this.handlePrevPress = this.handlePrevPress.bind(this);
  }

  handleNextPress() {
    const { pageNumber, subChapterId, myBookId, isNote, filter, isBookstore } = this.props;
    const { requestNoteList, requestMyProblemList, requestFilteredNoteList } = this.props;
    const { requestBookList, requestSearchResultList } = this.props;
    if (isNote) {
      const studentId = window.sessionStorage.getItem('studentId');
      if (filter.type === 'SUBJECT') {
        requestFilteredNoteList(
          studentId,
          filter.type,
          { subject: filter.value },
          pageNumber * 1 + 1,
        );
      } else if (filter.type === 'FOLDER') {
        requestFilteredNoteList(
          studentId,
          filter.type,
          { folderId: filter.value },
          pageNumber * 1 + 1,
        );
      } else {
        requestNoteList({ studentId: studentId }, pageNumber * 1 + 1);
      }
    } else if (isBookstore) {
      const grade = window.sessionStorage.getItem('grade');
      const { subject, grade: filteredGrade } = filter.value;
      if (filter.type === 'BOTH') {
        requestBookList(filteredGrade, subject, pageNumber * 1 + 1);
      } else if (filter.type === 'SUBJECT') {
        requestBookList(grade, subject, pageNumber * 1 + 1);
      } else if (filter.type === 'GRADE') {
        requestBookList(filteredGrade, null, pageNumber * 1 + 1);
      } else if (filter.type === 'SEARCH') {
        requestSearchResultList(filter.value, pageNumber * 1 + 1);
      } else {
        requestBookList(grade, null, pageNumber * 1 + 1);
      }
    } else {
      requestMyProblemList(myBookId, { subChapterId: subChapterId }, pageNumber * 1 + 1);
    }
  }

  handlePrevPress() {
    const { pageNumber, subChapterId, myBookId, isNote, filter, isBookstore } = this.props;
    const { requestNoteList, requestMyProblemList, requestFilteredNoteList } = this.props;
    const { requestBookList, requestSearchResultList } = this.props;
    if (isNote) {
      const studentId = window.sessionStorage.getItem('studentId');
      if (filter.type === 'SUBJECT') {
        requestFilteredNoteList(
          studentId,
          filter.type,
          { subject: filter.value },
          pageNumber * 1 - 1,
        );
      } else if (filter.type === 'FOLDER') {
        requestFilteredNoteList(
          studentId,
          filter.type,
          { folderId: filter.value },
          pageNumber * 1 - 1,
        );
      } else {
        requestNoteList({ studentId: studentId }, pageNumber * 1 - 1);
      }
    } else if (isBookstore) {
      const grade = window.sessionStorage.getItem('grade');
      const { subject, grade: filteredGrade } = filter.value;
      if (filter.type === 'BOTH') {
        requestBookList(filteredGrade, subject, pageNumber * 1 - 1);
      } else if (filter.type === 'SUBJECT') {
        requestBookList(grade, subject, pageNumber * 1 - 1);
      } else if (filter.type === 'GRADE') {
        requestBookList(filteredGrade, null, pageNumber * 1 - 1);
      } else if (filter.type === 'SEARCH') {
        requestSearchResultList(filter.value, pageNumber * 1 - 1);
      } else {
        requestBookList(grade, null, pageNumber * 1 - 1);
      }
    } else {
      requestMyProblemList(myBookId, { subChapterId: subChapterId }, pageNumber * 1 - 1);
    }
  }
  render() {
    const { loading, pageNumber, hasNext } = this.props;
    const prevDisabled = loading || pageNumber <= 1;
    const nextDisabled = loading || !hasNext;
    return (
      <InlineList align="right">
        <Button disabled={prevDisabled} onPress={this.handlePrevPress}>
          이전 페이지 이동
        </Button>
        <Button disabled={nextDisabled} onPress={this.handleNextPress}>
          다음 페이지 이동
        </Button>
      </InlineList>
    );
  }
}
