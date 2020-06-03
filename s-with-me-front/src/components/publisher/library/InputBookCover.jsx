import React, { PureComponent } from 'react';

export default class InputBookCover extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { file: '', previewURL: '' };
    this.handleFileOnChange = this.handleFileOnChange.bind(this);
  }

  handleFileOnChange(event) {
    const { setCover } = this.props;
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        previewURL: reader.result,
      });
      setCover(reader.result);
    };
    reader.readAsDataURL(file);
  }

  render() {
    const { file, previewURL } = this.state;
    let solution_preview = null;
    if (file) {
      solution_preview = (
        <img className="profile_preview" src={previewURL} height="100" alt="solution_preview" />
      );
    }

    return (
      <div style={{ padding: '5px', paddingTop: 5 }}>
        <input
          type="file"
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          name="cover"
          onChange={this.handleFileOnChange}
        />
        {solution_preview}
      </div>
    );
  }
}
