import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import AppNav, { HEIGHT } from '../AppNav';
import LibraryFolderList from './LibraryFolderList';
import BookOverview from './BookOverview';

class LibraryApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      folders: [
        { id: 1, name: '2017' },
        { id: 2, name: '2018' },
      ],
    };
  }

  static defaultProps = {
    myBookList: [],
    requestMyBookList: () => {},
  };

  componentDidMount() {
    // studentId 가져오기
    const { requestMyBookList } = this.props;
    requestMyBookList({ studentId: 1 });
  }

  render() {
    const { styles, myBookList, loading } = this.props;
    const { folders } = this.state;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <div {...css(styles.body)}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, padding: 3 }}>
              <LibraryFolderList folders={folders} />
            </div>
            <div style={{ flex: 3, padding: 3 }}>
              <BookOverview myBookList={myBookList} isLoading={loading} />
            </div>
            <div style={{ flex: 1, padding: 3 }}>이 달의 목표 ..</div>
          </div>
        </div>
      </div>
    );
  }
}

LibraryApp.propTypes = {
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
}))(LibraryApp);
