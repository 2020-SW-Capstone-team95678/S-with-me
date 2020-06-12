import React from 'react';
import { WithStore } from 'pure-react-carousel';
import { SketchField, Tools } from 'react-sketch';
import { Icon, Menu } from 'semantic-ui-react';

class HandWriteSolution extends React.Component {
  constructor(props) {
    super(props);
    this.state = { drawings: [], activeItem: 'write' };
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  _save = () => {
    const { id, setHandSolution, isNote, setMyNewHandSolution } = this.props;
    const drawings = this._sketch.toDataURL('image/png');
    console.log(drawings);
    const drawData = JSON.stringify(drawings);
    console.log(drawData);
    if (isNote) setMyNewHandSolution(id, drawData);
    else setHandSolution(id, drawData);
  };

  componentDidMount() {
    this.props.carouselStore.setStoreState({ touchEnabled: false });
  }

  render = () => {
    const { activeItem } = this.state;
    return (
      <div style={{ display: 'flex' }}>
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
          </Menu>
        </div>
        <SketchField
          name="sketch"
          className="canvas-area"
          ref={c => (this._sketch = c)}
          width="100%"
          height="50%"
          tool={Tools.Pencil}
          lineColor={activeItem === 'write' ? 'black' : 'white'}
          lineWidth={activeItem === 'write' ? '3' : '5'}
          onChange={this._save}
        />
      </div>
    );
  };
}

export default WithStore(HandWriteSolution);
