import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import { Button, Segment } from 'semantic-ui-react';
import Heading from '../../../common-ui/Heading';
import Form from '../../../common-ui/Form';
import { Redirect } from 'react-router-dom';
import Api from '../../../Api';
import TotalScoringButtonContainer from '../../../containers/student/problem/TotalScoringButtonContainer';
import { isMobile, isMobileOnly } from 'react-device-detect';

class ProblemHead extends PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.handleViewWrongOnly = this.handleViewWrongOnly.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isFinished: false,
      bookName: '',
      viewWrongOnly: false,
      bookId: '',
      answerList: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const { subChapterId, page } = this.props;
    Api.get('/student/library/my-book/book-id', {
      params: { myBookId: this.props.id },
    }).then(({ data }) => {
      if (this._isMounted) this.setState({ bookName: data.bookName });
    });
    Api.get(`/student/library/my-book/main-chapter/sub-chapter/${subChapterId}`, {
      params: { page: page },
    })
      .then(({ data }) => {
        if (this._isMounted) this.setState({ answerList: data });
      })
      .catch(error => console.log(error.message));
  }
  componentWillUnmount() {
    const { updateMyBook, pagination, subChapterId, id } = this.props;
    const formValue = {
      lastPageNumber: pagination.number * 1,
      lastSubChapterId: subChapterId,
    };
    updateMyBook(id, formValue, () => {
      this._isMounted = false;
    });
  }

  handleCloseBook = () => {
    const { updateMyBook, pagination, subChapterId, id } = this.props;
    const formValue = {
      lastPageNumber: pagination.number * 1,
      lastSubChapterId: subChapterId,
    };
    updateMyBook(id, formValue, () => this.setState({ isFinished: true }));
  };

  handleViewWrongOnly() {
    const { viewWrongOnly } = this.state;
    this.props.handleViewWrongOnly();
    this.setState({ viewWrongOnly: !viewWrongOnly });
  }

  handleSubmit() {
    const { updateMyProblem, setIsSolved, myProblemList } = this.props;
    for (let myProblem of myProblemList) {
      let formValue = {
        isConfused: myProblem.isConfused,
        isRight: myProblem.isRight,
        isSolved: true,
        solutionType: myProblem.solutionType,
        myAnswer: String(myProblem.myAnswer),
        solvedDateTime: myProblem.solvedDateTime,
      };
      if (myProblem.solutionType === 'text') {
        if (myProblem.isMath) {
          const mathSolution = JSON.stringify(myProblem.textSolution);
          formValue = { ...formValue, textSolution: mathSolution };
        }
        formValue = { ...formValue, textSolution: myProblem.textSolution };
      } else if (myProblem.solutionType === 'img') {
        formValue = { ...formValue, imageSolution: myProblem.imageSolution };
      } else if (myProblem.solutionType === 'link') {
        formValue = { ...formValue, linkSolutionId: myProblem.linkSolutionId };
      } else if (myProblem.solutionType === 'hand') {
        formValue = { ...formValue, handSolution: myProblem.handSolution };
      }
      if (myProblem.myAnswer && !myProblem.isSolved) {
        updateMyProblem(myProblem.myProblemId, formValue, () => {
          setIsSolved(myProblem.myProblemId, true);
        });
      }
    }
  }

  render() {
    const { styles, loadingUpdatePageNumber, id, myProblemList } = this.props;
    const { bookName, viewWrongOnly, answerList } = this.state;
    if (isMobile) {
      if (!this.state.isFinished) {
        return (
          <Segment textAlign="center" size="mini">
            <Button
              icon="close"
              floated="left"
              basic
              color="black"
              size="mini"
              content="나가기"
              onClick={() => this.handleCloseBook()}
              disabled={loadingUpdatePageNumber}
            />
            <Heading level={isMobileOnly ? 5 : 4}>{bookName}</Heading>
          </Segment>
        );
      } else {
        return <Redirect to={`/library/myBook/${id}`} />;
      }
    } else {
      if (!this.state.isFinished) {
        return (
          <div {...css(styles.container)}>
            <div style={{ flex: 1 }} {...css(styles.head)}>
              <Button
                icon="close"
                basic
                color="red"
                size="tiny"
                onClick={() => this.handleCloseBook()}
                disabled={loadingUpdatePageNumber}
                content="문제집 닫기"
              />
            </div>
            <div style={{ flex: 1 }} {...css(styles.head)}>
              <Button size="tiny" basic color="red" onClick={() => this.handleViewWrongOnly()}>
                {viewWrongOnly ? '전체 보기' : '틀린 문제 보기'}
              </Button>
            </div>
            <div style={{ flex: 3 }} {...css(styles.head)}>
              <Heading level={4}>{bookName}</Heading>
            </div>
            <div style={{ flex: 2 }} {...css(styles.head)}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Consumer>
                  {() => (
                    <TotalScoringButtonContainer
                      id={id}
                      myProblemList={myProblemList}
                      answerList={answerList}
                    />
                  )}
                </Form.Consumer>
              </Form>
            </div>
          </div>
        );
      } else {
        return <Redirect to={`/library/myBook/${id}`} />;
      }
    }
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
    border: '1px solid',
  },
  head: {
    display: 'flex',
    justifyContent: 'center',
    width: 100,
    padding: 3,
  },
}))(ProblemHead);
