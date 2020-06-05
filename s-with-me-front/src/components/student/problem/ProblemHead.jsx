import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Button from '../../../common-ui/Button';
import Heading from '../../../common-ui/Heading';
import Form from '../../../common-ui/Form';
import { Redirect } from 'react-router-dom';
import Api from '../../../Api';
import TotalScoringButtonContainer from '../../../containers/student/problem/TotalScoringButtonContainer';

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
        formValue = { ...formValue, textSolution: myProblem.textSolution };
      } else if (myProblem.solutionType === 'img') {
        formValue = { ...formValue, imageSolution: myProblem.imageSolution };
      } else if (myProblem.solutionType === 'link') {
        formValue = { ...formValue, linkSolutionId: myProblem.linkSolutionId };
      }
      if (myProblem.myAnswer && !myProblem.isSolved) {
        console.log(formValue);
        updateMyProblem(myProblem.myProblemId, formValue, () => {
          setIsSolved(myProblem.myProblemId, true);
        });
      }
    }
  }

  render() {
    const { styles, loadingUpdatePageNumber, id, myProblemList } = this.props;
    const { bookName, viewWrongOnly, answerList } = this.state;

    if (!this.state.isFinished) {
      return (
        <div {...css(styles.container)}>
          <div style={{ flex: 1 }} {...css(styles.head)}>
            <Button
              xsmall
              onPress={() => this.handleCloseBook()}
              disabled={loadingUpdatePageNumber}
            >
              문제집 닫기
            </Button>
          </div>
          <div style={{ flex: 1 }} {...css(styles.head)}>
            <Button xsmall onPress={() => this.handleViewWrongOnly()}>
              {viewWrongOnly ? '전체 보기' : '틀린 문제만 보기'}
            </Button>
          </div>
          <div style={{ flex: 6 }} {...css(styles.head)}>
            <Heading level={4}>{bookName}</Heading>
          </div>
          <div style={{ flex: 1.5 }} {...css(styles.head)}>
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
  head: {
    display: 'flex',
    justifyContent: 'center',
    width: 100,
    padding: 3,
  },
}))(ProblemHead);
