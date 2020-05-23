import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import Button from '../../../common-ui/Button';
import Heading from '../../../common-ui/Heading';
import { Redirect } from 'react-router-dom';
import Api from '../../../Api';

class ProblemHead extends PureComponent {
  static propTypes = {
    ...withStylesPropTypes,
  };
  constructor(props) {
    super(props);
    this.handleCloseBook = this.handleCloseBook.bind(this);
    this.handleTotalScroing = this.handleTotalScroing.bind(this);
    this.state = { isFinished: false, date: new Date() };
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.setState({ date: new Date() });
  }
  componentDidMount() {
    clearInterval(this.timerId);
  }

  handleCloseBook() {
    const { id, updateLastPageNumber, myBookList } = this.props;
    for (let myBook of myBookList) {
      const { myBookId } = myBook;
      if (myBookId === id * 1) {
        updateLastPageNumber(id, { lastPageNumber: myBook.lastPageNumber * 1 }, () =>
          this.setState({ isFinished: true }),
        );
      }
    }
  }

  handleTotalScroing() {
    const {
      id,
      updateMyProblem,
      myProblemList,
      setIsSolved,
      setIsRight,
      setSolvedDateTime,
      setLastMyProblemPage,
      pagination,
    } = this.props;
    for (let myProblem of myProblemList) {
      Api.get('/student/library/my-book/my-problems', {
        params: { problemId: myProblem.problemId },
      }).then(({ data }) => {
        if (myProblem.myAnswer && !myProblem.isSolved) {
          if (data.answer === String(myProblem.myAnswer)) setIsRight(myProblem.myProblemId, true);
          else setIsRight(myProblem.myProblemId, false);
          setSolvedDateTime(myProblem.myProblemId, this.state.date.getTime());
          setLastMyProblemPage(id, pagination.number);
        }
      });
      const formValue = {
        isConfused: myProblem.isConfused,
        isRight: myProblem.isRight,
        isSolved: true,
        myAnswer: String(myProblem.myAnswer),
        mySolution: myProblem.mySolution,
        solvedDateTime: myProblem.solvedDateTime,
      };
      if (myProblem.myAnswer && !myProblem.isSolved) {
        updateMyProblem(myProblem.myProblemId, formValue, () => {
          setIsSolved(myProblem.myProblemId, true);
        });
      }
    }
  }

  render() {
    const { styles, loadingUpdatePageNumber, loadingUpdateMyProblemList, id } = this.props;
    if (!this.state.isFinished) {
      return (
        <div {...css(styles.container)}>
          <div style={{ display: 'flex', justifyContent: 'center', width: 100, padding: 3 }}>
            <Button
              xsmall
              onPress={() => this.handleCloseBook()}
              disabled={loadingUpdatePageNumber}
            >
              문제집 닫기
            </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flex: 1, padding: 3 }}>
            <Heading level={4}>기본 문제집</Heading>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: 100, padding: 3 }}>
            <Button
              small
              disabled={loadingUpdateMyProblemList}
              onPress={() => this.handleTotalScroing()}
            >
              전체 채점
            </Button>
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
}))(ProblemHead);
