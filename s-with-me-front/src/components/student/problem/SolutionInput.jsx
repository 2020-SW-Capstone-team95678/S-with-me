import React, { PureComponent } from 'react';

export default class SolutionInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { file: '', previewURL: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleFileOnChange = this.handleFileOnChange.bind(this);
  }
  handleChange(e) {
    const { setMySolution, id } = this.props;
    e.preventDefault();
    setMySolution(id, e.target.value);
  }
  handleFileOnChange(event) {
    const { setMySolution, id } = this.props;
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        previewURL: reader.result,
      });
      setMySolution(id, reader.result);
    };
    reader.readAsDataURL(file);
  }
  render() {
    const { solutionFilterType } = this.props;
    let solution_preview = null;
    if (this.state.file) {
      solution_preview = (
        <img
          className="profile_preview"
          src={this.state.previewURL}
          height="100"
          alt="solution_preview"
        />
      );
    }
    if (solutionFilterType === 'text') {
      return (
        <div style={{ padding: '5px' }}>
          <textarea
            type="text"
            onChange={this.handleChange}
            name="textSolutionInput"
            style={{
              width: '100%',
              height: '110px',
              resize: 'none',
            }}
          />
        </div>
      );
    } else if (solutionFilterType === 'img') {
      return (
        <div style={{ padding: '5px' }}>
          <input
            type="file"
            accept="image/jpg,impge/png,image/jpeg,image/gif"
            name="mySolutionImage"
            onChange={this.handleFileOnChange}
          />
          {solution_preview}
        </div>
      );
    } else {
      return <div style={{ padding: '5px' }}>링~크</div>;
    }
  }
}
