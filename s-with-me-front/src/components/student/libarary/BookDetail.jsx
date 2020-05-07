import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import AppNav, { HEIGHT } from '../AppNav';
import Card from '../../../common-ui/Card';
import Heading from '../../../common-ui/Heading';
import Button from '../../../common-ui/Button';

class BookDetail extends PureComponent {
  static propTypes = {
    ...withStylesPropTypes,
  };
  render() {
    const { styles } = this.props;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <div {...css(styles.body)}>
          <div style={{ display: 'flex' }} {...css(styles.container)}>
            <div style={{ flex: 1, flexDirection: 'row', padding: 3 }}>
              <div
                style={{
                  height: 100,
                  flexDirection: 'column',
                  padding: 3,
                  border: '1px red solid',
                }}
              >
                문제집 사진
              </div>
              <div style={{ flex: 1, flexDirection: 'column', padding: 3 }}>
                <Card>
                  <Heading level={3}>목표</Heading>
                  <Heading level={4}>월별 목표</Heading>
                  <Heading level={5}>Chapter1 풀기</Heading>
                </Card>
                <Card>
                  <Heading level={3}>달성도</Heading>
                  <Heading level={5}>70% 달성!!</Heading>
                </Card>
              </div>
            </div>
            <div style={{ flex: 4, flexDirection: 'row', padding: 3 }}>
              Chapter List
              <Button>이어 풀기</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(({ unit }) => ({
  wrapper: {
    marginTop: HEIGHT,
  },
  body: {
    padding: unit * 4,
  },
}))(BookDetail);
