import React, { PureComponent } from 'react';
import { Button } from 'semantic-ui-react';

export default class ScoringButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
    this.tick = this.tick.bind(this);
    this.handleScoringButtonClick = this.handleScoringButtonClick.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  handleScoringButtonClick(id, realAnswer, myAnswer, dateTime) {
    const { page, setLastMyProblemPage, setSolvedDateTime, setIsRight, myBookId } = this.props;
    setSolvedDateTime(id, dateTime);
    if (realAnswer.replace(/"/g, '') === String(myAnswer)) {
      setIsRight(id, true);
    } else {
      setIsRight(id, false);
    }
    setLastMyProblemPage(myBookId, page);
  }
  render() {
    const dateTime = this.state.date.getTime();
    const { id, answer, myAnswer } = this.props;
    return (
      <Button
        size="medium"
        basic
        color="green"
        content="개별 채점"
        onClick={() => this.handleScoringButtonClick(id, answer, myAnswer, dateTime)}
      />
    );
  }
}
