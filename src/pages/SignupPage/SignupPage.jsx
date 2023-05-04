import './SignupPage.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import Input from '../../components/Forms/Input';
import Button from '../../components/Forms/Button';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, username };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate('/login');
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className='SignupPage'>
      <h1>Create account</h1>

      <form onSubmit={handleSignupSubmit}>
        <Input
          label='Username'
          type='text'
          name='username'
          value={username}
          onChange={handleUsername}
        />
        <Input
          label='E-mail'
          type='email'
          name='email'
          value={email}
          onChange={handleEmail}
        />
        <Input
          label='Password'
          type='password'
          name='password'
          value={password}
          onChange={handlePassword}
        />
        <Button type='submit'>Create</Button>
      </form>

      {errorMessage && <p className='error-message'>{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={'/login'}> Login</Link>
    </div>
  );
}

export default SignupPage;