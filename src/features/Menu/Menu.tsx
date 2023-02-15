import { ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import './Menu.scss';



type MenuProps = {
  wss: WebSocket,
  creatingNewGame: boolean,
  setCreatingNewGame: (arg: boolean) => void
};

export const Menu = ({ wss, creatingNewGame, setCreatingNewGame }: MenuProps) => {
  
  const [level, setLevel] = useState<number | string>(1);

  const hanldeChooseLevel = (event: ChangeEvent<HTMLSelectElement>) => {
    setLevel(event.target.value);
  };
  
  const handleStart = () => {
    setCreatingNewGame(true);
    wss.send(`new ${level}`);
  };

  return (
    <ul className='menu'>
      <li className='menu__item'>
        <label className='menu__button-label' htmlFor='level'>Уровень:</label>
        <select className='menu__button' disabled={creatingNewGame} name="" id="level" onChange={hanldeChooseLevel}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </li>
      <li className='menu__item'>
        <button className='menu__button' disabled={creatingNewGame} onClick={handleStart}>Начать игру</button>
      </li>
    </ul>
  );
};

Menu.propTypes = {
  wss: PropTypes.shape({
    send: PropTypes.func,
  }).isRequired,
  creatingNewGame: PropTypes.bool.isRequired,
  setCreatingNewGame: PropTypes.func.isRequired,
};
