import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
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
      if (filter.type === 'BOTH') {
        requestBookList(filter.value.grade, filter.value.subject, pageNumber * 1 + 1);
      } else if (filter.type === 'SUBJECT') {
        requestBookList(grade, filter.value.subject, pageNumber * 1 + 1);
      } else if (filter.type === 'GRADE') {
        requestBookList(filter.value.grade, null, pageNumber * 1 + 1);
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
      if (filter.type === 'BOTH') {
        requestBookList(filter.value.grade, filter.value.subject, pageNumber * 1 - 1);
      } else if (filter.type === 'SUBJECT') {
        requestBookList(grade, filter.value.subject, pageNumber * 1 - 1);
      } else if (filter.type === 'GRADE') {
        requestBookList(filter.value.grade, null, pageNumber * 1 - 1);
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
        <Button
          content="이전 페이지"
          basic
          disabled={prevDisabled}
          icon="left arrow"
          labelPosition="left"
          onClick={this.handlePrevPress}
        />
        <Button
          content="다음 페이지"
          basic
          disabled={nextDisabled}
          icon="right arrow"
          labelPosition="right"
          onClick={this.handleNextPress}
        />
      </InlineList>
    );
  }
}
