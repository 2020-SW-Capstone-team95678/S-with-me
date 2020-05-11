import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Card from '../../../common-ui/Card';
import Button from '../../../common-ui/Button';
import Heading from '../../../common-ui/Heading';
import InlineList from '../../../common-ui/InlineList';

export default class BookPreview extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    cover: PropTypes.node,
  };

  render() {
    const { name, cover } = this.props;
    return (
      <Card vertical={20} horizontal={4}>
        {cover}
        <Button primary small>
          삭제
        </Button>
        <Heading level={5}>{name}</Heading>
        <InlineList spacingBetween={1}>
          <Button xsmall>목차 보기</Button>
          <Button xsmall>이어 풀기</Button>
        </InlineList>
      </Card>
    );
  }
}
