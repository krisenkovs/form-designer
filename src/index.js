import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FormDesigner from './FormDesigner';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<FormDesigner />, document.getElementById('root'));

serviceWorker.unregister();
