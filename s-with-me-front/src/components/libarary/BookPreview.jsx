import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Card from '../../common-ui/Card';
import Button from '../../common-ui/Button';
import Heading from '../../common-ui/Heading';
import InlineList from '../../common-ui/InlineList';

export default class BookPreview extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    // coverSource: PropTypes.node,
  };

  render() {
    const { name } = this.props;
    return (
      <Card vertical={4} horizontal={4}>
        <Button primary small>
          삭제
        </Button>
        {/* cover */}
        <Heading level={4}>{name}</Heading>
        <InlineList spacingBetween={1}>
          <Button>목차 보기</Button>
          <Button>이어 풀기</Button>
        </InlineList>
      </Card>
    );
  }
}
