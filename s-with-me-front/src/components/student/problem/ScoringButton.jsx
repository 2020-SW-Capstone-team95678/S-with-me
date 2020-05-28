import React, { PureComponent } from 'react';
import Button from '../../../common-ui/Button';

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
    this.setState({
      date: new Date(),
    });
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  handleScoringButtonClick(id, realAnswer, myAnswer, dateTime) {
    const { setLastMyProblemId, setSolvedDateTime, setIsRight, myBookId } = this.props;
    setSolvedDateTime(id, dateTime);
    if (realAnswer === String(myAnswer)) {
      setIsRight(id, true);
    } else {
      setIsRight(id, false);
    }
    setLastMyProblemId(myBookId, id);
  }
  render() {
    const dateTime = this.state.date.getTime();
    const { children, id, answer, myAnswer } = this.props;
    return (
      <Button
        type="submit"
        onPress={() => this.handleScoringButtonClick(id, answer, myAnswer, dateTime)}
      >
        {children}
      </Button>
    );
  }
}
