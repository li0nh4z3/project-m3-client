import './LoginPage.css';
import '../../App.css';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import authService from '../../services/auth.service';
import Input from '../../components/Forms/Input';
import Button from '../../components/Forms/Button';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <section className='LoginPage animeLeft'>
      <div className='forms'>
        <h1 className='title'>Login</h1>

        <form onSubmit={handleLoginSubmit}>
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
          <Button type='submit'>Login</Button>
        </form>

        {errorMessage && <p className='error-message'>{errorMessage}</p>}

        <Link to={'/lostPassword'} className='lost-password'>
          Lost your password?
        </Link>

        <div className='create-account'>
          <h2 className='subtitle'>Create account</h2>
          <p>Don't have an account yet? Create account.</p>
          <Link to={'/signup'} className='button'>
            Create
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
