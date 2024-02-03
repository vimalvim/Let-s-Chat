import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute, checkUserRoute} from '../utils/APIRoutes';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const toastoptions = {
    position: 'bottom-right',
    autoclose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, []);


  //api for check user exist in db.
  const checkUserExists = async (username) => {
    try {
      const response = await axios.get(`${checkUserRoute}?username=${username}`);

      return response.data.exists;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  };

  //validation
  const handleValidation = async () => {
    const { password, username } = values;
    if (password === '' || username === '') {
      toast.error('Email and password are required', toastoptions);
      return false;
    } else if (username.length < 3) {
      toast.error('Username must be at least 3 characters long', toastoptions);
      return false;
    }

    try {
      const exists = await checkUserExists(username);
      console.log('User exists:', exists);

      if (!exists) {
        toast.error("You don't have an account. Register Your account to login", toastoptions);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  };

  //checks the credential using the api in db.
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (await handleValidation()) {
      const url = loginRoute;
      const headers = {
        'Content-Type': 'application/json',
      };

      const data = {
        username: values.username,
        password: values.password,
      };

      try {
        const { data: responseData } = await axios.post(url, data, { headers });

        if (responseData.status === false) {
          toast.error(responseData.msg, toastoptions);
        } else if (responseData.status === true) {
          localStorage.setItem('chat-app-user', JSON.stringify(responseData.user));
          navigate('/');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
            <img src={Logo} alt='Logo' />
            <h1>LET'S CHAT</h1>
          </div>

          <input type='text' placeholder='Username' name='username' onChange={(e) => handleChange(e)} />
          <input type='password' placeholder='Password' name='password' onChange={(e) => handleChange(e)} />

          <button type='submit'>LOGIN</button>
          <span>
            Don't have an account? <Link to='/register'>Register</Link>{' '}
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content: center;
gap: 1rem;
align-items:center;
background-color:#76328f;

.brand{
  display:flex;
  align-items:center;
  gap:1rem;
  justify-content:center;
  img {
    height :5rem;
  }
  h1{
    color:white;
    text-transform: uppercase;
  }
}

form{
  display:flex;
  flex-direction:column;
  gap:2rem;
  // background-color: #00000076;
  border-radius:2rem;
  padding:3rem 5rem;
  input{
     background-color:black;
     padding:1rem;
     border:0.1rem solid #4e0eff;
     border-radius:0.4rem;
     color:white;
     width:100%;
     font-size:1rem;

     &:focus{
      border:0.1rem solid #997af0;
      outline:none;
     }
  }

  button {
    background-color:#997af0;
    color:white;
    padding:1rem 2rem;
    border:none;
    font-weight:bold;
    cursor:pointer;
    border-radius:0.4rem;
    font-size:1rem;
    text-transform:uppercase;
    transition:0.5s ease-in-out;

    &:hover {
      background-color:#4e0eff;
    }

  }

  span{
    color:white;
    text-transform:uppercase;
    a{
      color:#4e0eff;
      text-decoration:none;
      font-weight:bold;
    }
  }
}

`;

export default Login;
