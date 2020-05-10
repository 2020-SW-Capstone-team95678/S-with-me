import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import AppNav, { HEIGHT } from '../AppNav';
import Button from '../../../common-ui/Button';

import VerticalList from '../../../common-ui/VerticalList';
import ProblemView from './ProblemView';
import InlineList from '../../../common-ui/InlineList';

class ProblemApp extends PureComponent {
  render() {
    const { styles } = this.props;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <div {...css(styles.body)}>
          <div style={{ display: 'flex', flexDirection: 'column' }} {...css(styles.container)}>
            <div style={{ hight: 10, padding: 3 }}>
              <Button small>문제집 닫기</Button>
              기본 문제집입니다.
              <Button small>전체 채점</Button>
            </div>
            <div style={{ flex: 1, padding: 3 }}>
              <InlineList spacingBetween={30} verticalAlign="top">
                <VerticalList spacingBetween={10}>
                  <ProblemView problemNum={10} content="예시 객관식 문제입니다" isOptional />
                </VerticalList>
                <VerticalList spacingBetween={10}>
                  <ProblemView problemNum={11} content="예시 주관식 문제입니다" />
                </VerticalList>
              </InlineList>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProblemApp.propTypes = {
  ...withStylesPropTypes,
  children: PropTypes.node,
};

export default withStyles(({ unit }) => ({
  wrapper: {
    marginTop: HEIGHT,
  },
  body: {
    padding: unit * 4,
  },
}))(ProblemApp);
