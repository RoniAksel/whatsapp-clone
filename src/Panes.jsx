import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';

export let Panes = styled.main({
  display: 'flex',
  width: '100vw',
  height: '100vh'
});

const Header = styled.div(props =>({
    backgroundColor: 'rgb(237,237,237)',
    border: '1px solid rgb(218,218,218)',
    borderTop: 'none',
    padding: '1em',
    display: 'flex',
    alignItems: 'center',
    ...props
  }))

let Body = styled.div({
  overflow: 'auto',
  flexGrow: "1"
});

const Container = styled.div(props =>({
    display:`flex`,
    flexDirection: `column`,
    backgroundImage: `url(${props.bgImage})`,
    ...props
  }))

  const Footer = styled.div`
  padding: 1em;
  background-color: #F0F0F0;
  border-top: 1px solid #F1F1F1;
  align-item: flex-end;
  ;
  `

  const ProfilePic = styled.img`
  border-radius: 50%;
  width: 2.5rem;
  border: 1px solid #f1f1f1;
`

export function Pane({width, minWidth, header, body, bgImage, footer, lastScroll, profilePic}) {

  let ref = useRef(null);

  useEffect(()=>{
    ref.current.scrollTo(0, ref.current.scrollHeight)
  }, [lastScroll])

  return <Container {...{width, minWidth,bgImage, profilePic}}>
    <Header>{profilePic && <ProfilePic src={profilePic}></ProfilePic>} {header}</Header>
    <Body ref={ref}>{body}</Body>
    {footer && <Footer>{footer}</Footer>}
  </Container>
}
