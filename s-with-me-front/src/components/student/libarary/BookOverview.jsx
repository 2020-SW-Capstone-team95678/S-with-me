import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import InlineList from '../../../common-ui/InlineList';
import BookPreview from './BookPreview';

export default class BookOverview extends PureComponent {
  static propTypes = {
    myBookList: PropTypes.arrayOf(
      PropTypes.shape({
        myBookId: PropTypes.number,
        folder: PropTypes.node,
        book: PropTypes.node,
      }),
    ),
  };

  render() {
    const { myBookList } = this.props;
    return (
      <React.Fragment>
        <InlineList spacingBetween={1}>
          {myBookList.map(({ myBookId, book }) => (
            <BookPreview name={book.name} cover={book.cover} id={myBookId} />
          ))}
        </InlineList>
      </React.Fragment>
    );
  }
}
