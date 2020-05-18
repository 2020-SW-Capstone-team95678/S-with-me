import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import AppNav, { HEIGHT } from '../AppNav';
import LibraryFolderList from './LibraryFolderList';
import BookOverview from './BookOverview';

import Api from '../../../Api';

class LibraryApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      myBookList: [],
      folders: [
        { id: 1, name: '2017' },
        { id: 2, name: '2018' },
      ],
    };
  }

  componentDidMount() {
    Api.get('/student/library', { params: { studentId: 1 } }).then(response =>
      this.setState({
        myBookList: response.data.myBookList,
      }),
    );
  }

  render() {
    const { styles } = this.props;
    const { myBookList, folders } = this.state;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <div {...css(styles.body)}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, padding: 3 }}>
              <LibraryFolderList folders={folders} />
            </div>
            <div style={{ flex: 3, padding: 3 }}>
              <BookOverview myBookList={myBookList} />
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
