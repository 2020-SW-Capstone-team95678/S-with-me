import React, { PureComponent } from 'react';
import { Menu, Icon } from 'semantic-ui-react';

export default class SolutionFilter extends PureComponent {
  state = { activeItem: 'text', touchEnabled: true };
  handleItemClick = (e, { name }) => {
    const { id, setSolutionType } = this.props;
    this.setState({ activeItem: name });
    setSolutionType(id, name);
  };
  render() {
    const { activeItem } = this.state;
    return (
      <Menu color="orange" widths={4}>
        <Menu.Item name="text" active={activeItem === 'text'} onClick={this.handleItemClick}>
          <Icon name="file text" />
          텍스트 풀이 입력
        </Menu.Item>
        <Menu.Item name="img" active={activeItem === 'img'} onClick={this.handleItemClick}>
          <Icon name="file image outline" />
          이미지 풀이 입력
        </Menu.Item>
        <Menu.Item name="hand" active={activeItem === 'hand'} onClick={this.handleItemClick}>
          <Icon name="signup" />
          손글씨 풀이 입력하기
        </Menu.Item>
        <Menu.Item name="link" active={activeItem === 'link'} onClick={this.handleItemClick}>
          <Icon name="pin" />
          비슷한 문제 연결하기
        </Menu.Item>
      </Menu>
    );
  }
}
