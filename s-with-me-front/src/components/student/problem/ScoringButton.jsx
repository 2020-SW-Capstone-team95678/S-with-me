import React, { PureComponent } from 'react';
import Button from '../../../common-ui/Button';

export default class ScoringButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
    this.tick = this.tick.bind(this);
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
  render() {
    const dateTime = this.state.date.getTime();
    const { children, setSolvedDateTime, id } = this.props;
    return (
      <Button
        onPress={() => {
          setSolvedDateTime(id, dateTime);
        }}
      >
        {children}
      </Button>
    );
  }
}
