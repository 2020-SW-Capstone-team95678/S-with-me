import React, { PureComponent } from 'react';

import Text from '../../../common-ui/Text';
import VerticalList from '../../../common-ui/VerticalList';

export default class OldMyAnswer extends PureComponent {
  options = [
    { optionNum: 1, optionContent: '1번 보기' },
    { optionNum: 2, optionContent: '2번 보기' },
    { optionNum: 3, optionContent: '3번 보기' },
    { optionNum: 4, optionContent: '4번 보기' },
    { optionNum: 5, optionContent: '5번 보기' },
  ];

  render() {
    if (this.props.isOptional) {
      return (
        <VerticalList spacingBetween={1}>
          {this.options.map(option => (
            <Text>
              {option.optionNum} : {option.optionContent}
            </Text>
          ))}
          <Text>지난 나의 정답 : {this.props.myAnswer}</Text>
        </VerticalList>
      );
    } else {
      return <Text>지난 나의 정답 : {this.props.myAnswer}</Text>;
    }
  }
}
