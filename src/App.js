import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

var firebaseConfig = {
  apiKey: "AIzaSyDV_Df_h-Pw0Zauvebslp3JTx5tg4xgS_I",
  authDomain: "bloc-chat-123f.firebaseapp.com",
  databaseURL: "https://bloc-chat-123f.firebaseio.com",
  projectId: "bloc-chat-123f",
  storageBucket: "bloc-chat-123f.appspot.com",
  messagingSenderId: "459866027157",
  appId: "1:459866027157:web:45a2eb6f917d84d0"
};
firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return ( <
      div >

      <
      header >

      <
      h1 > bloc chat < /h1> <
      RoomList firebase = {
        firebase
      }
      />


      <
      /header>


      <
      /div>

    );
  }

}

export default App;
