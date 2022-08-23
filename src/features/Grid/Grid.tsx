import { useEffect, useState } from 'react';
import { FixedSizeGrid  as GridInner } from 'react-window';
import { Verify } from '../Verify/Verify';
import './Grid.scss';



const getSize = (count: number): number => count > 16 ? 16 * 50 : count * 50;

type GridProps = {
  wss: WebSocket,
  creatingNewGame: boolean,
  setCreatingNewGame: (arg: boolean) => void
};

export const Grid = ({ wss, creatingNewGame, setCreatingNewGame }: GridProps) => {

  const [map, setMap] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isRotatedCell, setRotatedCell] = useState('');

  const handleClick = (x: number, y: number) => {
    setRotatedCell(`${x}-${y}`);
    wss.send(`rotate ${x} ${y}`);
  };

  useEffect(() => {
    const processMap = ({ data }: { data: string }) => {
      
      if (data.includes('new') || data.includes('rotate')) {
        setProcessing(true);
        wss.send('map');
      }
      
      if (data.includes('map')) {  
        const matrix = data
          .trim()
          .split('\n')
          .slice(1)
          .map((line: string) => line.split(''));
        
        setMap(matrix);
      }
    };

    wss.addEventListener('message', processMap);

    return () => wss.removeEventListener('message', processMap);
  }, []);

  useEffect(() => {
    setRotatedCell('');
    setProcessing(false);
    if (creatingNewGame) setTimeout(() => setCreatingNewGame(false), 1000);
  }, [map]);  


  if (creatingNewGame) return <div className='grid-creating'>Creating new game</div>;

  if (!map) return null;

  return (
    <>
      <GridInner
        className={`grid ${processing ? 'grid--processing' : ''}`}
        width={getSize(map.length)}
        height={getSize(map.length)}
        columnWidth={50}
        columnCount={map[0].length}
        rowHeight={50}
        rowCount={map.length}
      >
        {({ columnIndex, rowIndex, style }) => (
          <button 
            className={`grid-button ${isRotatedCell === `${columnIndex}-${rowIndex}` ? 'grid-button--rotated' : '' }`}
            style={style}
            onClick={() => handleClick(columnIndex, rowIndex)}
          >
            <span className='grid-button__inner'>
              <span className='grid-button__symbol'>{map[rowIndex][columnIndex]}</span>
            </span>
          </button>
        )}
      </GridInner>
      <Verify wss={wss} />
    </>
  );
};