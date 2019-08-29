import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.messageRef = this.props.firebase.database().ref('messages');
    this.state = {
      messages: [],
      title: this.props.activeRoom.name,
      roomKey: this.props.activeRoom.key
    }
  }


componentDidMount() {
  this.messageRef.on('child_added', snapshot => {
    var message = snapshot.val();
    message.key = snapshot.key;

    this.setState({
      messages: this.state.messages.concat(message)
    });
  });
}


static getDerivedStateFromProps(props, state) {
  if (props.activeRoom.name !== state.title) {
    return {
      title: props.activeRoom.name,
      roomKey: props.activeRoom.key
    };
  }

return null;

}


render() {
  return (
    <div>
      <h2>{this.state.title}</h2>
      {
          this.state.messages.filter(m => m.roomId.toString() ===
          this.state.roomKey).map(message =>
            <p key={message.key} id={message.key}><span
            className="userName">{message.username}: </span>
            {message.content}</p>
          )
        }
      </div>
    );
  }
}


export default MessageList;
