import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components/macro'

const CommentStyle = styled.div``

const Comment = styled(CommentStyle)`
    background-color: #F7F7F7;
    border-radius: 10px;
    padding: 0.5rem;
    margin: 0.5rem;
    box-shadow: 0px 7px 12px 0px rgba(0,0,0,0.19);
    width: 16rem;
    &:nth-child(odd){
        align-self: flex-end;
    }
`

// const Comment = styled.div({
//     backgroundColor: `#F7F7F7`,
//     borderRadius: `10px`,
//     padding: `0.5em`,
//     margin: `0.5rem`,
//     boxShadow: `0px 7px 12px 0px rgba(0,0,0,0.19)`,
//     width: `16rem`,
// });


const FlexDiv = styled.div({
    display : `flex`,
    justifyContent: `space-between`,
})

const H2 = styled.h2({
    color: `tomato`
})

const P = styled.p({
    fontWeight: `600`,
    color: `tomato`
})

const ULFlex = styled.ul``;

const Ul = styled(ULFlex)`
display:flex;
flex-direction:column;
`

export function Comments (props){
    if(!props.post || !props.comments){
        return `No Posts`
    }

    return <div>
    <Ul>
    {props.comments.map(comment => 
    <Comment key={comment.id}>
    <FlexDiv>
    <P> {comment.name}</P>
    </FlexDiv>
    <p>{comment.body}</p>
    </Comment>)}
    </Ul>
    </div>
};

