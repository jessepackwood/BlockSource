import React, { Component } from 'react';
import Header from '../../containers/Header/Header';
import Routes from '../Routes/Routes';
import './App.css';

export default class App extends Component {

  render() {
    return (
      <div className="app">
        <Header/>
        <Routes/>
      </div>
    );
  }
}