import React, { PureComponent } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { withStyles, css } from '../../../common-ui/withStyles';

class SolutionFilter extends PureComponent {
  state = { activeItem: 'text', touchEnabled: true };
  handleItemClick = (e, { name }) => {
    const { id, setSolutionType } = this.props;
    this.setState({ activeItem: name });
    setSolutionType(id, name);
  };
  render() {
    const { styles } = this.props;
    const { activeItem } = this.state;
    return (
      <Menu color="orange" widths={4}>
        <Menu.Item name="text" active={activeItem === 'text'} onClick={this.handleItemClick}>
          <Icon name="file text" />
          <div {...css(styles.filter)}>텍스트 풀이 입력</div>
        </Menu.Item>
        <Menu.Item name="img" active={activeItem === 'img'} onClick={this.handleItemClick}>
          <Icon name="file image outline" />
          <div {...css(styles.filter)}>이미지 풀이 입력</div>
        </Menu.Item>
        <Menu.Item name="hand" active={activeItem === 'hand'} onClick={this.handleItemClick}>
          <Icon name="signup" />
          <div {...css(styles.filter)}>손글씨 풀이 입력</div>
        </Menu.Item>
        <Menu.Item name="link" active={activeItem === 'link'} onClick={this.handleItemClick}>
          <Icon name="pin" />
          <div {...css(styles.filter)}>비슷한 문제 연결</div>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withStyles(({ responsive }) => ({
  filter: {
    [responsive.small]: {
      display: 'none',
    },
  },
}))(SolutionFilter);
