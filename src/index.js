import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom';
import { StateProvider } from './Components/StateProvider';
import reducer, { initialState } from './Components/reducer';
const Main = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));