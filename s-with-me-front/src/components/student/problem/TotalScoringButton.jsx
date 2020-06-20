import React, { PureComponent } from 'react';
// import Button from '../../../common-ui/Button';
import { Popup, Button } from 'semantic-ui-react';

export default class TotalScoringButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { date: new Date(), answerList: [] };
    this.tick = this.tick.bind(this);
    this.handleTotalScroing = this.handleTotalScroing.bind(this);
  }
  tick() {
    this.setState({ date: new Date() });
  }
  handleTotalScroing() {
    const { id, pagination, myProblemList, answerList } = this.props;
    const { setSolvedDateTime, setLastMyProblemPage, setIsRight } = this.props;
    for (let myProblem of myProblemList) {
      if (myProblem.myAnswer && !myProblem.isSolved) {
        setSolvedDateTime(myProblem.myProblemId, this.state.date.getTime());
        setLastMyProblemPage(id, pagination.number);
        const found = answerList.find(({ problemId }) => problemId === myProblem.problemId);
        if (found.answer.replace(/"/g, '') === String(myProblem.myAnswer)) {
          setIsRight(myProblem.myProblemId, true);
        } else setIsRight(myProblem.myProblemId, false);
      }
    }
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    const { loadingUpdateMyProblemList } = this.props;
    return (
      <Popup
        content="페이지당 8문제 입니다"
        trigger={
          <Button
            basic
            color="red"
            size="small"
            content="이 페이지 전체 채점"
            onClick={this.handleTotalScroing}
            disabled={loadingUpdateMyProblemList}
          />
        }
      />
    );
  }
}
