import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {Panes} from './Panes2'
import {Pane} from './Pane2'
import {Chats} from './Chats'
import {Messages} from './Messages'
import Background from './img/bg.png'

export function App() {
  let [chats, setChats] = useState([]);
  let [selectedId, setSelectedId] = useState(null);
  let [messages, setMessages] = useState([]);
    
  // useEffect(()=>{
  //   fetch(`https://jsonplaceholder.typicode.com/posts`)
  //     .then(res => res.json())
  //     .then(postsRes => setPosts(postsRes))
  // },[])

  useEffect(()=>{
    import('./data/chats.js')
      .then(module => {
        let chats = module.chats;
        setChats(chats);
        setSelectedId(chats[0].id);
      });
  },[])
  
  useEffect(() => {
    if (!selectedId) {
      return;
    }
    import(`./data/messages_${selectedId}.js`)
      .then((module) => {
        let messages = module.messages;
        setMessages(messages);
      })
  }, [selectedId]);


  // useEffect(()=>{
  //   if(!selectedId){
  //     return
  //   }
  //   fetch(`https://jsonplaceholder.typicode.com/comments?postId=${selectedId}`)
  //     .then(res => res.json())
  //     .then(comments => setComments(comments))
  // }, [selectedId])
  
  let selectedChat = chats.find((p) => p.id === selectedId);
  
    return <Panes>
    <Pane width={'25%'} minWidth={'300px'} header="Hello Roni" update="Get notified of new messages">
      <Chats chats={chats} onSelectChat={setSelectedId}></Chats>
    </Pane>
    <Pane width={'75%'} 
    bgImage={Background} 
    header={`${selectedChat.users.map(user =>name).join(',') (${selectedChat.id})}`}>
    <Messages message={selectedChat} messages={chats}></Messages>
    </Pane>
  </Panes>
  }


  <div style={{backgroundColor:'#9DE1FE',padding:'1em'}}>
  Get notified of new messages
  </div>