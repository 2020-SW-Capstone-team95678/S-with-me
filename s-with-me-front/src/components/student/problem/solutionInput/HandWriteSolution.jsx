import React from 'react';
import { SketchField, Tools } from 'react-sketch';


class HandWriteSolution extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawings: [],
      pencil: true,
    };
  }

  _save = () => {
   // const {setHandSolution,id} =this.props; 여기도 쓸거같아서 안지웠어용
    const drawings = this._sketch.toDataURL('image/png');
    console.log(drawings);
    const drawData=JSON.stringify(drawings);
    console.log(drawData);
    //setHandSolution(id, drawData);
  };

  _change = () => {
    const pencil = this.state.pencil;
    this.setState = {
      pencil: !pencil,
    };
  };

  render = () => {
    const pencil = this.state;
    
    return (
      <div>
        {pencil ? (
          <div>
            <div position="static" style={{ display:'flex',backgroundColor: 'green' }}>
              <button style={{flex:1}} onClick={this._change}>지우개</button>
            </div>

            <SketchField
              name="sketch"
              className="canvas-area"
              ref={c => (this._sketch = c)}
              width="100%"
              height="50%"
              tool={Tools.Pencil}
              lineColor="black"
              lineWidth={3}
              onChange={this._save}
            />
          </div>
        ) : (
          <div>
            ><div position="static" style={{ display:'flex',backgroundColor: 'green' }}>
              <button style={{flex:1}} onClick={this._change}>연필</button>
            </div>

            <SketchField
              name="sketch"
              className="canvas-area"
              ref={c => (this._sketch = c)}
              width="100%"
              height="50%"
              tool={Tools.Pencil}
              lineColor="white"
              lineWidth={5}
              onChange={this._save}
            />
          </div>
        )}
      </div>
    );
  };
}

export default HandWriteSolution;
