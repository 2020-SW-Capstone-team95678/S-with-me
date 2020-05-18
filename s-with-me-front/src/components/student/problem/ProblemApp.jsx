import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import AppNav, { HEIGHT } from '../AppNav';

import MyProblemListContainer from '../../../containers/student/problem/MyProblemListContainer';
import ProblemHead from './ProblemHead';

class ProblemApp extends PureComponent {
  render() {
    const { styles } = this.props;
    const { myBookId } = this.props.match.params;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <div {...css(styles.body)}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ hight: 5, padding: 3 }}>
              <ProblemHead id={myBookId} />
            </div>
            <div style={{ flex: 1, padding: 3 }}>
              <MyProblemListContainer />
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
