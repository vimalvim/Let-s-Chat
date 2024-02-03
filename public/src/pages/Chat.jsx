import React, { useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute , host} from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);



//adding multiple users in the ui.
  useEffect(() => {
    const fetchUserAndContacts = async () => {
      try {
        const storedUser = localStorage.getItem('chat-app-user');
        if (!storedUser) {
          navigate('/login');
        } else {
          const user = JSON.parse(storedUser);
          setCurrentUser(user);

          if (user.isAvatarImageSet) {
            const response = await axios.get(`${allUsersRoute}/${user._id}`);
            setContacts(response.data);
          } 
//same code api for all user route.
          // if (user.isAvatarImageSet) {
          //   try {
          //     const response = await axios.get(`${allUsersRoute}/${user._id}`);
          //     setContacts(response.data);
          //   } catch (fetchError) {
          //     console.error('Error fetching users:', fetchError);
          //   }
          // }

          if (user.isAvatarImageSet) {
            socket.current = io(host);
            socket.current.emit("add-user", user._id);

            socket.current.on("connect", () => {
              console.log("Socket.IO connected");
          });

          socket.current.on("disconnect", () => {
              console.log("Socket.IO disconnected");
          });
          socket.current.on("error", (error) => {
            console.error("Socket.IO error:", error);
          });
          
          }
          else {
            navigate('/setAvatar');
          }
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUserAndContacts();
    // Cleanup socket connection on component unmount
  return () => {
    if (socket.current) {
      socket.current.disconnect();
    }
  };
  }, [navigate]);




  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className='container'>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {/* {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentUser={currentUser} />
        )
        } */}
        {/* {currentUser && <Welcome currentUser={currentUser} />} */}

        {(currentUser && currentChat === undefined) ? (
          <Welcome currentUser={currentUser} />
        ) : ( 
          <ChatContainer currentChat={currentChat}  currentUser={currentUser} socket={socket}/>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;



































