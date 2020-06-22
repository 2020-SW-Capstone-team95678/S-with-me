import React, { useState } from 'react';
import MathSolutionPreview from './MathSolutionPreview';
import { TextArea, Checkbox, Popup, Icon, Modal, Button } from 'semantic-ui-react';
import MathTutorial from './MathTutorial';
import { isMobile } from 'react-device-detect';

export default function TextSolutionInput(props) {
  const [isMath, setIsMathState] = useState(false);
  const [textSolution, setTextSolutionState] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = e => {
    const { setSolutionType, id, isNote } = props;
    const { setTextSolution, setMyNewTextSolution } = props;
    e.preventDefault();
    setTextSolutionState(e.target.value);
    if (isNote) setMyNewTextSolution(id, e.target.value);
    else setTextSolution(id, e.target.value);
    setSolutionType(id, 'text');
  };

  const handleMath = (e, { checked }) => {
    const { id, setTempIsMath, setIsMath, isNote } = props;
    setIsMathState(!isMath);
    if (isNote) setTempIsMath(id, !isMath);
    else setIsMath(id, !isMath);
  };

  const show = () => setOpen(true);
  const close = () => setOpen(false);
  return (
    <div style={{ padding: '5px', paddingTop: 5 }}>
      <div style={{ display: 'flex', border: '1px solid', borderBottom: '0px' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Checkbox toggle label="수식 입력하기" onChange={handleMath} checked={isMath} />
        </div>
        {isMobile ? (
          <div onClick={show}>
            <Icon fitted size="large" acircular name="question circle outline" basic />
          </div>
        ) : (
          <Popup
            trigger={
              <div onClick={show}>
                <Icon fitted size="large" acircular name="question circle outline" basic />
              </div>
            }
            position="top right"
          >
            수식 입력 방법이 궁금해요!
          </Popup>
        )}
      </div>
      <div style={{ display: 'flex', paddingBottom: 5 }}>
        <TextArea
          name="textSolutionInput"
          onChange={handleChange}
          placeholder="풀이를 입력하세요"
          style={{ width: '100%', height: '120px', resize: 'none' }}
        />
      </div>
      {isMath ? <MathSolutionPreview textSolution={textSolution} /> : null}
      <Modal dimmer="inverted" open={open} onClose={close}>
        <MathTutorial />
        <Modal.Actions>
          <Button positive icon="checkmark" content="알겠어요" onClick={close} />
        </Modal.Actions>
      </Modal>
    </div>
  );
}
