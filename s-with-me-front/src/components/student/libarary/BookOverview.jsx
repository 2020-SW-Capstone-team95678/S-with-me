import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import InlineList from '../../../common-ui/InlineList';
import BookPreview from './BookPreview';

import Text from '../../../common-ui/Text';
import Spacing from '../../../common-ui/Spacing';
import withLoading from '../../../common-ui/withLoading';

const LoadingMessage = (
  <Spacing vertical={4} horizontal={2}>
    <Text large>데이터를 불러들이고 있습니다.</Text>
  </Spacing>
);

class BookOverview extends PureComponent {
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
          {myBookList.map((myBook, index) => (
            <BookPreview myBook={myBook} key={index} />
          ))}
        </InlineList>
      </React.Fragment>
    );
  }
}

export default withLoading(LoadingMessage)(BookOverview);
