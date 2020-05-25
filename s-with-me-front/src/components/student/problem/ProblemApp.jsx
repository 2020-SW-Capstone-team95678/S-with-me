import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';
import queryString from 'query-string';

import AppNav, { HEIGHT } from '../AppNav';

import MyProblemListContainer from '../../../containers/student/problem/MyProblemListContainer';
import NotificationContainer from '../../../containers/NotificationContainer';
import ProblemHeadContainer from '../../../containers/student/problem/ProblemHeadContainer';

class ProblemApp extends PureComponent {
  render() {
    const { styles } = this.props;
    const { myBookId, subChapterId } = this.props.match.params;
    const query = queryString.parse(this.props.location.search);
    const page = query.page || 1;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <div {...css(styles.body)}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ hight: 5, padding: 3 }}>
              <ProblemHeadContainer id={myBookId} />
            </div>
            <div style={{ flex: 1, padding: 3 }}>
              <MyProblemListContainer subChapterId={subChapterId} page={page} />
            </div>
          </div>
          <NotificationContainer />
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
