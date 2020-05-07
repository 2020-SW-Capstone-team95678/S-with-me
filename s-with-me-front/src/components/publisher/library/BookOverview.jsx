import React, { PureComponent } from 'react';

import InlineList from '../../../common-ui/InlineList';
import Button from '../../../common-ui/Button';
import BookPreview from './BookPreview';

export default class BookOverview extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <InlineList spacingBetween={1}>
          <BookPreview name="문제집 1" monthlySales={30} />
          <BookPreview name="문제집 2" monthlySales={20} />
          <BookPreview name="문제집 3" monthlySales={10} />
          <Button primary>+</Button>
        </InlineList>
      </React.Fragment>
    );
  }
}
