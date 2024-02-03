import React, {useState} from 'react';
import styled from 'styled-components';
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";


export default function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState('');

    const handleEmojiPickerHideShow = ()=>{
        setShowEmojiPicker(!showEmojiPicker);
    }

    // const handleEmojiClick=(event)=>{
    //     console.log(emoji);
    //     let message = msg;
    //     message += emoji.emoji;
    //     setMsg(message);
    // };
    //   const handleEmojiClick = (event, emojiObject) => {
//   if (emojiObject && emojiObject.emoji) {
//     setMsg((prevMsg) => prevMsg + emojiObject.emoji);
//   }
// }

//emoji codes
const handleEmojiClick = (event) => {
//   console.log("Event:", event);
  let message = msg;
  message += event.emoji;
  setMsg(message);
  console.log(message);
};

    const  sendChat = (event)  => {
        event.preventDefault();
        if(msg.length>0) {
            handleSendMsg(msg);
            setMsg('')
        }
    } 
      
  return (
    <Container>
    <div className='button-container'>
        <div className='emoji'>
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
            <div className='picker'>
            {
                showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
            }
            </div>
        </div>
    </div>
    <form className='input-container' onSubmit={(e)=> sendChat(e)}>
        <input type='text' placeholder='type your message here' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
        <button className="submit">
            <IoMdSend />
        </button>
    </form>
    </Container>
  )
}

const Container = styled.div`
display: grid;
grid-template-columns: 5% 95%;
align-items: center;
background-color: black;
padding: 0 2rem;
padding-bottom: 0.3rem;
@media screen and (min-width: 720px) and (max-width: 1080px) {
padding:0 1rem;
gap: 1rem;
}
.button-container{
    // display: flex;
    // align-items: center;
    // color:white;
    // gap: 1rem;
    
    color: #ffcc4d;
    font-size: 25px;
    margin-bottom: -5px;
    
    .picker{
    position: absolute;
    top:190px;
    
        svg{
             font-size:1.5rem;
             color: #ffff00c8;
             cursor: pointer;
        }
        .emoji-picker-react{
            position: absolute;
            top:-300px;
        }
    }
}

.input-container{
    width:100%;
    display: flex;
    align-content: center;
    gap:2rem;
    backgroud-color:#ffffff34;
    input{
        width:90%;
        background-color: transparent;
        align-content: center;
        color:white;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;
        &::selection{
            background-color: #9186f3;
        }
        &:focus {
            outline: none;
        }
    }
    button {
        padding:0.3rem 2rem;
        border-radius:2rem;
        display:flex;
        justify-content:center;
        align-items: center;
        background-color:#9186f3;
        border :none;

        @media screen and (min-width: 720px) and (max-width: 1080px) {
          padding: 0.3rem 1rem;
          svg{
            font-size: 1rem;
          }
          }

        svg{
            font-size: 2rem;
            color:white;
        }
    }
}

`;















