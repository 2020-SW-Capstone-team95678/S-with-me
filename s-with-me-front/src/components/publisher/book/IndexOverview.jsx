import React, { PureComponent } from 'react';

import InlineList from '../../../common-ui/InlineList';
import Button from '../../../common-ui/Button';
import BookPreview from './IndexPreview';

export default class IndexOverview extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <InlineList spacingBetween={1}>
          <BookPreview name="목차 1" monthlySales={30} />
          <BookPreview name="목차 2" monthlySales={20} />
          <BookPreview name="목차 3" monthlySales={10} />
          <Button primary>목차추가+</Button>
        </InlineList>
      </React.Fragment>
    );
  }
}
