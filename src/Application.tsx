import { useEffect, useRef, useState } from 'react';
import './Application.scss';
import { Grid } from './features/Grid/Grid';
import { Menu } from './features/Menu/Menu';

export const Application = () => {

  const wss = useRef(null);
  const [connected, setConnected] = useState(false);
  const [creatingNewGame, setCreatingNewGame] = useState(false);

  useEffect(() => {
    wss.current = new WebSocket('wss://hometask.eg1236.com/game-pipes/');
    wss.current.onopen = () => {
      // eslint-disable-next-line no-console
      console.log('Connection opened');
      setConnected(true);
    };

    // eslint-disable-next-line no-console
    wss.current.onclose = () => console.log('Connection closed');
    return () => wss.current.close();
  }, []);
  
  if (!connected) return null;

  const childProps = {
    wss: wss.current,
    creatingNewGame,
    setCreatingNewGame,
  };

  return (
    <div className='application'>
      <Menu {...childProps} />
      <Grid {...childProps} />
    </div>
  );
};