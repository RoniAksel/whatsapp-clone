import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components/macro'
 

const Body = styled.div((props)=>({
  overflow: `auto`,
  width: props.width,
  minWidth: props.minWidth,
  ...props
}))

const Container = styled.div(props =>({
  display:`flex`,
  flexDirection: `column`,
  backgroundImage: `url(${props.bgImage})`,
  ...props
}))

const Header = styled.div(props =>({
  backgroundColor: 'rgb(237,237,237)',
  border: '1px solid rgb(218,218,218)',
  borderTop: 'none',
  padding: '1em',
  ...props
}))

const Update = styled.div(props => ({
  backgroundColor:'#9DE1FE',
}))

export function Pane(props){
  return <Container {...props}>
  <Header>
  {props.header}
  </Header>
  <Update>{props.update}</Update>
  <Body>
  {props.children}
  </Body>
  </Container>
}


// export function Pane (props){
//   let pane = {
//     width: props.width,
//     minWidth: props.minWidth,
//   }  
  
//   let column = {
//       overflow: `auto`,
//       ...pane
//     }
//     return <div style={column}>{props.children}</div>
//   }