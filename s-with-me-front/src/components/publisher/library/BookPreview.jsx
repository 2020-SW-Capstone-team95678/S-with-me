import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../common-ui/Card';
import Button from '../../../common-ui/Button';
import Heading from '../../../common-ui/Heading';
import InlineList from '../../../common-ui/InlineList';

const BookPreview = ({ name, monthly_sales, onEditClick, onRemoveClick }) => {
    return (
      <Card vertical={4} horizontal={4}>
        <Heading level={4}>{name}</Heading>
        <InlineList spacingBetween={1}>
          <Button onPress={onEditClick}>수정</Button>
          <Button onPress={onRemoveClick}>삭제</Button>
        </InlineList>
        <Heading level={6}>누적 판매량 : {monthly_sales}</Heading>
      </Card>
    );
}

BookPreview.propTypes = {
  name: PropTypes.string.isRequired,
  monthlySales: PropTypes.number,
  onEditClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
}


export default BookPreview;