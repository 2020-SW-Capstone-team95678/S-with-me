import React, { PureComponent } from 'react';
import { Checkbox, Button } from 'semantic-ui-react';

export default class IsConfusedInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isConfused: false };
    this.setConfused = this.setConfused.bind(this);
  }

  setConfused() {
    const { isConfused } = this.state;
    const { id, setIsConfused } = this.props;
    this.setState({ isConfused: !isConfused });
    setIsConfused(id, !isConfused);
  }

  render() {
    const { isConfused } = this.state;
    return (
      <Button color="olive" size="small" basic>
        <Checkbox onChange={this.setConfused} checked={isConfused} label="헷갈렸어요" />
      </Button>
    );
  }
}
