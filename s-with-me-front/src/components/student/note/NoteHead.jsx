import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Button from '../../../common-ui/Button';
import NoteFolderFilterContainer from '../../../containers/student/note/NoteFolderFilterContainer';
import NoteSubjectFilterContainer from '../../../containers/student/note/NoteSubjectFilterContainer';

class NoteHead extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { viewFolderList: false, viewSubjectList: false };
  }

  render() {
    const { styles } = this.props;
    const { viewFolderList, viewSubjectList } = this.state;
    return (
      <div {...css(styles.container)}>
        <div style={{ flex: 1, padding: 3, display: 'flex' }}>
          <Button small onPress={() => this.setState({ viewSubjectList: !viewSubjectList })}>
            과목별 보기
          </Button>
          {viewSubjectList ? <NoteSubjectFilterContainer /> : null}
        </div>
        <div style={{ flex: 1, padding: 3, display: 'flex' }}>
          <Button small onPress={() => this.setState({ viewFolderList: !viewFolderList })}>
            폴더별 보기
          </Button>
          {viewFolderList ? <NoteFolderFilterContainer /> : null}
        </div>
        <div style={{ flex: 1, padding: 3 }}>
          <Button
            small
            onPress={() => {
              this.setState({ viewFolderList: false, viewSubjectList: false });
              this.props.handleViewOrigin();
            }}
          >
            최신순 보기
          </Button>
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
