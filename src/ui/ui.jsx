import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {MainComponent} from './main-component';

ReactDOM.render(
    <BrowserRouter>
        <MainComponent />
    </BrowserRouter>,
  document.getElementById('root')
);