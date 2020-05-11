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
    this.state = { myBookList: [], classificationMethod: 'default' };
    this.setClassificationMethod = this.setClassificationMethod.bind(this);
  }

  setClassificationMethod(method) {
    this.setState({ classificationMethod: method });
  }

  componentDidMount() {
    Api.get('/myBookList').then(response =>
      this.setState({
        myBookList: response.data,
      }),
    );
  }

  render() {
    const { styles } = this.props;
    const { myBookList } = this.state;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <div {...css(styles.body)}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, padding: 3 }}>
              <LibraryFolderList />
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
