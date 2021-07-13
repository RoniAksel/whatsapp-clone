import React, { useEffect, useRef, useState } from 'react';
import { Messages } from './Messages';
import { Pane, Panes } from './Panes';
import { Chats } from './Chats';
import { MessageForm } from './MessageForm';
import Background from './img/bg.png';

let get = (route) => fetch(`http://localhost:8080/api/${route}`, {
  credentials: 'include',
  mode: 'cors'
})
  .then(res => res.json());


export function App() {
  let [chats, setChats] = useState([]);
  let [chatId, setChatId] = useState(null);
  let [messages, setMessages] = useState([]);
  let [lastPoll, setLastPoll] = useState(Date.now());
  let [myUser, setMyUser] = useState({});
  let [friends, setFriends] = useState([]);
  let [usersContext, setUsersContext] = useState({
    myUser: {},
    allUsers: {}
  });
    let timer = useRef(null);

  // let usersContext = useRef({
  //   myUser:{},
  //   allUsers:{}
  // })

  useEffect(loadMyFriends, [myUser?._id]);
  useEffect(updateUsersContext, [myUser, friends]);
  useEffect(loadMyUser, []);
  useEffect(loadChats, [myUser._id]);
  useEffect(loadMessages, [chatId, lastPoll]);
  useEffect(startTimer, [lastPoll]);


  let selectedChat = chats.find((chat) => chat._id === chatId);

  return <Panes>
    <Pane width={'25%'} minWidth={'200px'}
      profilePic = {myUser.picURL}
      header={` ${myUser.firstName} ${myUser.lastName}`}
      body={<Chats
        chats={chats}
        onSelectChat={setChatId}
        usersContext={usersContext}
      >
        </Chats>}>
    </Pane>
    <Pane width={'75%'}
      header={`${getChatUsersList(selectedChat)}`}
      body={<Messages messages={messages} usersContext={usersContext}></Messages>}
      bgImage = {Background}
      footer={<MessageForm onNewMessage={onNewMessage}></MessageForm>}
      lastScroll={lastPoll}>
    </Pane>
  </Panes>;

function getChatUsersList(chat) {
  return chat?.userIds.map(user => {
    let fullUser = usersContext.allUsers[user._id] || {};
    return fullUser.userName;
  }).join(', ');
}

function loadMyUser(){
  get('me')
  .then(user=>{
    setMyUser(user)
  })
}

  function loadMyFriends() {
    if (!myUser._id) {
      return;
    }
    get('users')
      .then(users => {
        let friends = users.filter(user => user._id !== myUser._id);
        setFriends(friends);
      });
  }

function onNewMessage(body) {
  fetch(`/api/chats/${chatId}/messages`, {
    method: 'POST'
  })
    .then(res => {
      let newMessage = {
        chatId,
        body,
        user: {name: 'Roni'},
      };
      console.log(`Sending to the server: ${JSON.stringify(newMessage)}`);
      setLastPoll(Date.now());
    });
}

function loadChats() {
  if (!myUser._id) {
    return;
  }
  get(`chats?userid=${myUser._id}`).then(chats => {
    setChats(chats);
    setChatId(chats[0]._id);
  });
}
  function loadMessages() {
    if (!chatId) {
      return;
    }
    get(`chats/${chatId}/messages`)
      .then((messages) => {
        console.log('messages', messages)
        setMessages(messages);
      })
  }

  function startTimer() {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLastPoll(Date.now());
    }, 5000);
  }
  
  function updateUsersContext() {
    let newUsersContext = {
      myUser,
      allUsers: friends.concat(myUser).reduce((map, user) => {
        map[user._id] = user;
        return map;
      }, {})
    };
    setUsersContext(newUsersContext)
  }


}



// function addFakeMessage(messages) {
//   let messageBeforeLast = messages[messages.length - 2];
//   let newMessage = {...messageBeforeLast, id: Date.now()};
//   messages.push(newMessage);
//   return messages;
// }