import React from 'react';
import styled from 'styled-components/macro';
import UserIcon from './img/profile-icon.png'

const ProfilePic = styled.img`
  border-radius: 50%;
  width: 3rem;
`
const Chat = styled.div`
border-bottom: 1px solid #F1F1F1;
padding: 1em;
cursor: pointer;
display:flex;
align-items:center;
  &:hover{
    background-color: #F8F8F8
  }
`

const Span = styled.span`
margin-left: 0.25em;
`
export function Chats(props) {
  return <ul>
    {props.chats.map(chat => {
      return <Chat key={chat._id} onClick={() => props.onSelectChat(chat._id)}>
        <ProfilePic src={UserIcon}/>
        { chat.userIds.map((user) => {
          let fullUser = props.usersContext.allUsers[user._id] || {};
          return <Span>{`${fullUser.firstName} ${fullUser.lastName} `}</Span>
      })}
      </Chat>
    })}
  </ul>
} 