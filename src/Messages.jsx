import React from 'react';
import styled from 'styled-components/macro';

let Message = styled.div({
  border: '1px solid #fcfcfc',
  padding: '0.5em',
  backgroundColor: '#fcfcfc',
  borderRadius: '10px',
  margin: '1em',
  minWidth: '14em',
  maxWidth: '25em'
});

let H4 = styled.h4`
  color:#00000;
  &:nth-child(even){
    color: black;
  }
`

export function Messages(props) {
  if (!props.messages) {
    return '';
  }
  return <ul>
      {props.messages.map(message => {
        let fullUser = props.usersContext.allUsers[message.author._id] || {};
        return <Message key={message._id}>
          <H4> {fullUser.userName}</H4>
          <p>{message.text}</p>
        </Message>;
      })}
    </ul>;
} 