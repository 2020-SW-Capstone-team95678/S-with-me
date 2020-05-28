import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import AppNav, { HEIGHT } from '../AppNav';
import NoteHead from './NoteHead';
import NoteList from './NoteList';

class NoteApp extends PureComponent {
  static propTypes = {
    ...withStylesPropTypes,
    children: PropTypes.node,
  };

  componentDidMount() {
    const { requestNoteList } = this.props;
    const studentId = window.sessionStorage.getItem('studentId');
    requestNoteList({ studentId: studentId });
  }

  render() {
    const { styles, noteList } = this.props;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <div {...css(styles.body)}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ hight: 5, padding: 3 }}>
              <NoteHead />
            </div>
            <div style={{ flex: 1, padding: 3 }}>
              <NoteList noteList={noteList} />
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
}))(NoteApp);
