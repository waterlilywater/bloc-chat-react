import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: {}
    }
  }

componentDidMount() {
  firebase.database().ref('rooms').limitToFirst(1).on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;

    this.setState({
      activeRoom: room
    });
  });
}

myCallback = (dataFromChild) => {
  this.setState({
    activeRoom: {
      name: dataFromChild.name,
      key: dataFromChild.key
    }
  })
}



render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
          <RoomList callbackFromParent={this.myCallback} firebase={firebase} activeRoom={this.state.activeRoom} />
        </header>
        <main>
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
        </main>
      </div>
    );
  }
}

export default App;
