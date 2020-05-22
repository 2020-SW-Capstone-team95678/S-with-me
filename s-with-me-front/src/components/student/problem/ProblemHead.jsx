import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import Button from '../../../common-ui/Button';
import Heading from '../../../common-ui/Heading';
import { Redirect } from 'react-router-dom';

class ProblemHead extends PureComponent {
  static propTypes = {
    ...withStylesPropTypes,
  };
  constructor(props) {
    super(props);
    this.handleCloseBook = this.handleCloseBook.bind(this);
    this.handleTotalScroing = this.handleTotalScroing.bind(this);
    this.state = { isFinished: false };
  }

  handleCloseBook() {
    const { id, updateLastPageNumber, myBookList } = this.props;
    for (let myBook of myBookList) {
      const { myBookId } = myBook;
      if (myBookId === id * 1) {
        updateLastPageNumber(id, { lastPageNumber: myBook.lastPageNumber }, () =>
          this.setState({ isFinished: true }),
        );
      }
    }
  }

  handleTotalScroing() {
    const { updateMyProblem, myProblemList, setIsSolved } = this.props;
    for (let myProblem of myProblemList) {
      let formValue = {
        confused: myProblem.confused,
        myAnswer: myProblem.myAnswer,
        mySolution: myProblem.mySolution,
        right: myProblem.right,
        solvedDateTime: myProblem.solvedDateTime,
        solved: true,
      };
      if (!myProblem.myAnswer || myProblem.myAnswer.length !== 0) {
        updateMyProblem(myProblem, formValue, () => {
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
