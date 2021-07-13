import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components/macro';

const PostReg = styled.div``;

const Post = styled(PostReg)`
padding: 1em;
border-bottom: 1px solid #F3F3F3;
&:hover{
  background-color: #F5F5F5;
}
`

const PostMain = styled.div({
  overflow: `auto`
})

export function Posts (props){
    return <PostMain>
    {props.posts.map(post => <Post key={post.id} onClick={()=> props.onSelectPost(post.id)}><h5>From user number: {post.userId}</h5><p>{post.title}</p></Post>)}
    </PostMain>
  }
  