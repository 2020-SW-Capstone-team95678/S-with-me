import React from 'react';
import { WithStore } from 'pure-react-carousel';
import CanvasDraw from 'react-canvas-draw';
import { Icon, Menu } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';

class MobileHandWriteSolution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawings: [],
      activeItem: 'write',
      controlWeghit: false,
      lineWidth: 3,
      value: 0,
    };
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleLineWeghit = e => {
    const { controlWeghit } = this.state;
    this.setState({ controlWeghit: !controlWeghit });
  };
  _save = () => {
    const { id, setHandSolution, isNote, setMyNewHandSolution } = this.props;
    const drawings = this.canvas.current.canvasContainer.children[1].toDataURL();
    if (isNote) setMyNewHandSolution(id, drawings);
    else setHandSolution(id, drawings);
  };
  render = () => {
    const { activeItem, lineWidth, controlWeghit } = this.state;
    return (
      <div
        style={{ display: 'flex' }}
        onPointerOut={() => this.props.carouselStore.setStoreState({ touchEnabled: true })}
        onPointerEnter={() => this.props.carouselStore.setStoreState({ touchEnabled: false })}
      >
        <div style={{ disply: 'flex', alignContent: 'center' }}>
          <Menu compact icon="labeled" vertical size="mini">
            <Menu.Item name="write" active={activeItem === 'write'} onClick={this.handleItemClick}>
              <Icon name="pencil" />
              연필
            </Menu.Item>
            <Menu.Item name="erase" active={activeItem === 'erase'} onClick={this.handleItemClick}>
              <Icon name="eraser" />
              지우개
            </Menu.Item>
            <Menu.Item onClick={this.handleLineWeghit} key="Line">
              Line
            </Menu.Item>
            {controlWeghit ? (
              <Slider
                color="red"
                inverted={false}
                settings={{
                  start: this.state.lineWidth,
                  min: 0,
                  max: 10,
                  step: 1,
                  onChange: value => {
                    this.setState({
                      lineWidth: value,
                    });
                  },
                }}
              />
            ) : null}
          </Menu>
        </div>
        <CanvasDraw
          ref={this.canvas}
          brushColor={activeItem === 'write' ? 'black' : 'white'}
          brushRadius={lineWidth}
          lazyRadius="0"
          gridColor="white"
          canvasWidth="100%"
          canvasHeight="200"
          onChange={this._save}
        />
      </div>
    );
  };
}

export default WithStore(MobileHandWriteSolution);
