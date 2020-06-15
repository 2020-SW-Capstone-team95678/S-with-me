import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { isMobileOnly } from 'react-device-detect';
import { Segment, Sidebar, Button } from 'semantic-ui-react';
import Card from '../../../common-ui/Card';
import LibraryFilterList from './LibraryFilterList';
import BookOverview from './BookOverview';
import CurriculumList from './CurriculumList';

class LibraryApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { visible: false, showFilter: false };
  }

  static defaultProps = {
    myBookList: [],
    folderList: [],
    curriculumList: [],
    requestMyBookList: () => {},
    requestFolderList: () => {},
    requestCurriculumList: () => {},
  };

  componentDidMount() {
    const { requestMyBookList, requestFolderList, requestCurriculumList } = this.props;
    const studentId = window.sessionStorage.getItem('studentId');
    requestMyBookList({ studentId: studentId });
    requestFolderList({ studentId: studentId });
    requestCurriculumList({ studentId: studentId });
  }

  render() {
    const { myBookList, bookListLoading, folderLoading, folderList, styles } = this.props;
    const { requestMyBookList } = this.props;
    const { curriculumList } = this.props;
    if (isMobileOnly) {
      return (
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Segment}
            animation="overlay"
            direction="top"
            onHide={() => this.setState({ visible: false })}
            visible={this.state.visible}
            showFilter={this.state.showFilter}
          >
            {this.state.showFilter ? (
              <LibraryFilterList
                folders={folderList}
                isLoading={folderLoading}
                requestMyBookList={requestMyBookList}
              />
            ) : (
              <div>
                <Card vertical={4}>
                  <div {...css(styles.head)}>나의 커리큘럼</div>
                </Card>
                <CurriculumList curriculumList={curriculumList} />
              </div>
            )}
          </Sidebar>
          <Sidebar.Pusher dimmed={true && this.state.visible}>
            <Segment>
              <Button.Group attached="top">
                <Button
                  onClick={() => this.setState({ visible: true, showFilter: true })}
                  basic
                  color="red"
                >
                  정렬 방식 선택하기
                </Button>
                <Button
                  onClick={() => this.setState({ visible: true, showFilter: false })}
                  basic
                  color="red"
                >
                  나의 커리큘럼 보기
                </Button>
              </Button.Group>
              <Card vertical={4}>
                <div {...css(styles.head)}>나의 문제집</div>
              </Card>
              <BookOverview myBookList={myBookList} isLoading={bookListLoading} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      );
    }
    return (
      <DndProvider backend={HTML5Backend}>
        <div {...css(styles.app)}>
          <div style={{ flex: 1 }} {...css(styles.table)}>
            <LibraryFilterList
              folders={folderList}
              isLoading={folderLoading}
              requestMyBookList={requestMyBookList}
            />
          </div>
          <div style={{ flex: 3 }} {...css(styles.table)}>
            <Card vertical={4}>
              <div {...css(styles.head)}>나의 문제집</div>
            </Card>
            <BookOverview myBookList={myBookList} isLoading={bookListLoading} />
          </div>
          <div style={{ flex: 1 }} {...css(styles.table)}>
            <Card vertical={4}>
              <div {...css(styles.head)}>나의 커리큘럼</div>
            </Card>
            <CurriculumList curriculumList={curriculumList} />
          </div>
        </div>
      </DndProvider>
    );
  }
}

export default withStyles(({ responsive }) => ({
  head: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 11,
    paddingTop: 11,
    fontWeight: 'bold',
  },
  app: {
    display: 'flex',
    [responsive.small]: {
      flexDirection: 'column',
    },
    flexDirection: 'row',
  },
  table: {
    border: '1px solid',
    borderColor: '#D9CBC7',
    borderRadius: '0.5rem',
  },
}))(LibraryApp);
