import React, { PureComponent } from 'react';

import CheckBox from '../../../common-ui/CheckBox';

export default class IsConfusedInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isConfused: false };
    this.setConfused = this.setConfused.bind(this);
  }

  setConfused() {
    const { isConfused } = this.state;
    const { myProblemId, setIsConfused } = this.props;
    this.setState({ isConfused: !isConfused });
    setIsConfused(myProblemId, !isConfused);
  }

  render() {
    const { isConfused } = this.state;
    return (
      <CheckBox name="confused" onChange={this.setConfused} checked={isConfused} autoFocus>
        헷갈렸어요
      </CheckBox>
    );
  }
}
