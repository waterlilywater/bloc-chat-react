import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.roomsRef = this.props.firebase.database().ref("rooms");
    this.state = {
      rooms: [],
      currentRoom: {}
    };

    this.props.callbackFromParent(this.state.currentRoom);
  }


  componentDidMount() {
    this.roomsRef.limitToFirst(1).on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;

      this.setState({
        currentRoom: room
      });
    });


    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;

      this.setState({
        rooms: this.state.rooms.concat(room)
      });
    })
  }

  createRoom(e) {
    e.preventDefault();
      var newRoomName = e.currentTarget.children[0].value
      this.roomsRef.push({
        name: newRoomName
      });
    }

    setActiveRoom(e) {
        this.setState({
          currentRoom: {
            name: e.currentTarget.textContent,
            key: e.currentTarget.getAttribute('id')
          }
        });
        this.props.callbackFromParent({
          name: e.currentTarget.textContent,
          key: e.currentTarget.getAttribute('id')
        });
      }


  render() {
    return(
      <div>
        <ul>
          {
            this.state.rooms.map(room =>
              <li id={room.key} onClick={(e) => this.setActiveRoom(e)} key={room.key}>{room.name}</li>
            )
          }
        </ul>
        <form onSubmit={(e) => this.createRoom(e)}>
          <input type="text" name="roomName" id="roomName" placeholder="Room Name" />
          <button type="submit">Add New Room</button>
        </form>
      </div>
	);
  }
}

export default RoomList;
