import React from 'react';
import styled from 'styled-components';
import Robot from '../assets/Robot.gif';

export default function Welcome({currentUser}) {
  return (
    <Container>
    <img src={Robot} alt="Robot" />
    <h1> Welcome 
        <span>{currentUser.username}</span>
        {currentUser && currentUser.username && `!`}
    </h1>
    <h3>Please select a chat to Start Messaging. </h3>
    </Container>
  )
}




const Container = styled.div`
display:flex;
justify-content: center;
align-items: center;
flex-direction: column;
color:white;
img{
    height: 25rem;
}

span{
    color:blue;
}


`;