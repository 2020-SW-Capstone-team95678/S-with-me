import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Card from '../../../common-ui/Card';
import Button from '../../../common-ui/Button';
import Heading from '../../../common-ui/Heading';
import InlineList from '../../../common-ui/InlineList';

export default class BookPreview extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    monthlySales: PropTypes.number,
    // coverSource: PropTypes.node,
  };

  render() {
    const { name, monthly_sales } = this.props;
    return (
      <Card vertical={4} horizontal={4}>
        {/* cover */}
        <Heading level={4}>{name}</Heading>
        <InlineList spacingBetween={1}>
          <Button>수정</Button>
          <Button>삭제</Button>
        </InlineList>
        <Heading level={6}>누적 판매량 : {monthly_sales}</Heading>
      </Card>
    );
  }
}
