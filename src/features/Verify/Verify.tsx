import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Verify.scss';



type VerifyProps = {
  wss: WebSocket,
  processing: boolean,
};

export const Verify = ({ wss, processing }: VerifyProps) => {
   
  const [winCode, setWinCode] = useState(null);
  const [notPassVerify, setNotPassVerify] = useState(false);
  const handleCheckResult = () => wss.send('verify');

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const processVerify = ({ data }: { data: string }) => {
      if (data.includes('verify')) {

        if (data.includes('Password')) {
          setWinCode(data.slice(data.lastIndexOf(' ')).trim());
        } else {
          setNotPassVerify(true);
          timeoutId = setTimeout(() => setNotPassVerify(false), 3000);
        }

      }
    };
    
    wss.addEventListener('message', processVerify);

    return () => {
      wss.removeEventListener('message', processVerify);
      clearTimeout(timeoutId);
    };

  }, []);

  return (
    <p className='verify'>
      <button
        className={`verify__button ${notPassVerify ? 'verify__button--error' : ''}`}
        disabled={processing || notPassVerify}
        onClick={handleCheckResult}
      >
        {notPassVerify ? 'Тест не пройдет' : 'Проверить результат'}
      </button>
      {winCode && <p className='verify__code'>Ваш выигрышный код: {winCode}</p>}
    </p>
  );
};

Verify.propTypes = {
  wss: PropTypes.shape({
    send: PropTypes.func,
  }).isRequired,
};