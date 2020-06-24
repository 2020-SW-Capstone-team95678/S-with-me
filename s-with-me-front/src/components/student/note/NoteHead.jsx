import React, { PureComponent } from 'react';

import { Menu, Sidebar, Button, Dropdown } from 'semantic-ui-react';
import NoteFolderFilterContainer from '../../../containers/student/note/NoteFolderFilterContainer';
import NoteSubjectFilterContainer from '../../../containers/student/note/NoteSubjectFilterContainer';
import { isMobileOnly } from 'react-device-detect';

export default class NoteHead extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'latest', visible: false };
  }
  render() {
    const { activeItem } = this.state;
    const { targetRef } = this.props;

    const NoteMenu = () => (
      <Menu stackable>
        <Menu.Item
          name="최신순 보기"
          active={activeItem === 'latest'}
          onClick={() => {
            this.setState({ activeItem: 'latest' });
            this.setState({ viewFolderList: false, viewSubjectList: false });
            this.props.handleViewOrigin();
          }}
        />
        <Dropdown item text="폴더별 보기" onClick={() => this.setState({ activeItem: 'folder' })}>
          {activeItem === 'folder' ? <NoteFolderFilterContainer /> : null}
        </Dropdown>
        <Dropdown item text="과목별 보기" onClick={() => this.setState({ activeItem: 'subject' })}>
          {activeItem === 'subject' ? <NoteSubjectFilterContainer /> : null}
        </Dropdown>
      </Menu>
    );
    if (isMobileOnly) {
      return (
        <React.Fragment>
          <Sidebar
            as={Menu}
            animation="push"
            direction="top"
            onHide={() => this.setState({ visible: false })}
            target={targetRef}
            visible={this.state.visible}
          >
            <NoteMenu />
          </Sidebar>
          <Sidebar.Pusher dimmed={this.state.visible}>
            <Button
              attached="top"
              content="보기 방식 변경"
              icon="eye"
              basic
              color="orange"
              onClick={() => this.setState({ visible: true })}
            />
          </Sidebar.Pusher>
        </React.Fragment>
      );
    } else return <NoteMenu />;
  }
}
