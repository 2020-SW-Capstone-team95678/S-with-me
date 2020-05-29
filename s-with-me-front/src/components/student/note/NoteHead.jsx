import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Button from '../../../common-ui/Button';
import NoteFolderFilterContainer from '../../../containers/student/note/NoteFolderFilterContainer';

class NoteHead extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { viewFolderList: false };
  }

  render() {
    const { styles } = this.props;
    const { viewFolderList } = this.state;
    return (
      <div {...css(styles.container)}>
        <div style={{ flex: 1, padding: 3 }}>
          <Button small>과목별 보기</Button>
        </div>
        <div style={{ flex: 1, padding: 3, display: 'flex' }}>
          <Button small onPress={() => this.setState({ viewFolderList: !viewFolderList })}>
            폴더별 보기
          </Button>
          {viewFolderList ? <NoteFolderFilterContainer /> : null}
        </div>
        <div style={{ flex: 1, padding: 3 }}>
          <Button small>최신순 보기</Button>
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
}))(NoteHead);
