import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import {BrowserRouter} from 'react-router-dom';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './store/rootReducer.js';

const store = createStore(reducer);

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
     <BrowserRouter>
          <App />
     </BrowserRouter>
    </Provider>
)
