import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import Button from '../../../common-ui/Button';
import Heading from '../../../common-ui/Heading';
import { Link } from 'react-router-dom';

class ProblemHead extends PureComponent {
  static propTypes = {
    ...withStylesPropTypes,
  };

  render() {
    const { styles, id } = this.props;
    return (
      <div {...css(styles.container)}>
        <div style={{ display: 'flex', justifyContent: 'center', width: 100, padding: 3 }}>
          <Link to={`/library/myBook/${id}`}>
            <Button xsmall>문제집 닫기</Button>
          </Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flex: 1, padding: 3 }}>
          <Heading level={4}>기본 문제집</Heading>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', width: 100, padding: 3 }}>
          <Button small>전체 채점</Button>
        </div>
      </div>
    );
  }
}

export default withStyles(({ color, unit }) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: unit * 2,
    paddingRight: unit * 2,
    backgroundColor: color.secondary,
  },
}))(ProblemHead);
