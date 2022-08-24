import { createRoot } from 'react-dom/client';
import { Application } from './Application';
import './index.scss';

const root = createRoot(document.querySelector('#app'));
root.render(<Application />);
