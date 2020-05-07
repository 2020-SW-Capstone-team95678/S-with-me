import React, { PureComponent } from 'react';

import InlineList from '../../common-ui/InlineList';
import BookPreview from './BookPreview';

export default class BookOverview extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <InlineList spacingBetween={1}>
          <BookPreview name="문제집 1" />
          <BookPreview name="문제집 2" />
          <BookPreview name="문제집 3" />
        </InlineList>
      </React.Fragment>
    );
  }
}
