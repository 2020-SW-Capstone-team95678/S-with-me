import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';

export default function InstallPWA() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      console.log('we are being triggered :D');
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('transitionend', handler);
  }, []);

  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return (
      <Button
        className="link-button"
        negative
        icon="dont"
        labelPosition="right"
        content="다운받을 수 없습니다."
      />
    );
  }
  return (
    <Button
      className="link-button"
      positive
      icon="checkmark"
      labelPosition="right"
      content="네, 다운받을래요"
      onClick={onClick}
    />
  );
}
