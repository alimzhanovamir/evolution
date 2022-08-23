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
      console.log('Connection opened');
      setConnected(true);
    };

    wss.current.onclose = () => console.log('Connection closed');
    return () => wss.current.close();
  }, []);
  
  if (!connected) return null;

  return (
    <div className='application'>
      <Menu wss={wss.current} creatingNewGame={creatingNewGame} setCreatingNewGame={setCreatingNewGame} />
      <Grid wss={wss.current} creatingNewGame={creatingNewGame} setCreatingNewGame={setCreatingNewGame} />
    </div>
  );
};