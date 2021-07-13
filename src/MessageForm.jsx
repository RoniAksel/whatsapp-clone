import React from 'react';
import styled from 'styled-components/macro';
import {FaLaugh, FaPaperclip, FaMicrophone} from 'react-icons/fa'

const Input = styled.input`
    padding: 0.75em;
    border-radius: 25px;
    width: 75%;
    border:none;

    &:focus{
        outline:none;
    }
    &:active{
        outline:none;
    }
`

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;

`

export function MessageForm ({onNewMessage}){
    return <Form onSubmit={onSubmit}>
    <FaLaugh className="fontIcon"/>
    <FaPaperclip className="fontIcon" />
    <Input placeholder="Type a message" id={'newMessage'}></Input>
    <FaMicrophone className="fontIcon" />
  </Form>

    function onSubmit(e){
    e.preventDefault();
    onNewMessage(e.target.newMessage.value)
    }
}

