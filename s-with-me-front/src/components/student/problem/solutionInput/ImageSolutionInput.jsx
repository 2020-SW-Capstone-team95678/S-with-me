import React, { useState } from 'react';

export default function ImageSolutionInput(props) {
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');

  const handleFileOnChange = event => {
    const { setMyNewImageSolution, id, isNote, setImageSolution } = props;
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setPreviewURL(reader.result);
      if (isNote) setMyNewImageSolution(id, reader.result);
      else setImageSolution(id, reader.result);
    };
    reader.readAsDataURL(file);
  };

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
        name="mySolutionImage"
        onChange={handleFileOnChange}
      />
      {solution_preview}
    </div>
  );
}
